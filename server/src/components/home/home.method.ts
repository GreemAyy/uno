import { generateDeck,type ICard } from "../../gameFuncs/generate";
import { app, DB } from "../..";
import { queryChangeStatus, queryCheckUserHaveGames, queryCreateGame, queryGetGames, queryUpdateId } from "./home.path";

export interface IGame {
    id:            number;
    player_count:  number;
    player_move:   number;
    direction:     string;
    total_deck:    ICard[];
    player_1_id:   number;
    player_2_id:   number;
    player_3_id:   number;
    player_4_id:   number;
    player_5_id:   number;
    player_1_deck: ICard[];
    player_2_deck: ICard[];
    player_3_deck: ICard[];
    player_4_deck: ICard[];
    player_5_deck: ICard[];
    game_zone:     ICard[];
    status:        string;
}
export interface ReqBodyCreateGame{
    player_count:number
    player_1_id:number
}
interface ReqBodyConnectGame{
    id:number,
    player_id:number
}

export async function getGames(){
    app.get('/api/game/get',async(req,res)=>{
        const getGames = await DB.query(queryGetGames())
        res.send(
            getGames?.error?
            {status:400,responseText:'error'}:
            {status:200,responseText:'done',data:getGames?.result}
        )
    })
}

export async function createGame(){
    app.post('/api/game/create', async(req,res)=>{
        const body:ReqBodyCreateGame = req.body
        const query = queryCreateGame({body,deck:generateDeck(body.player_count)})
        if(await checkUserHaveGames(body.player_1_id))
            res.send({status:200,responseText:'already'})
        else{
            try{
                const create = await DB.query(query)
                res.send({status:200,id:create.result.insertId,responseText:'created'})
            }catch(e){
                res.send({status:400,responseText:'error'})
            }
        }
    })
}

export async function connectGame(){
    app.post('/api/game/connect', async(req,res)=>{
        const body :ReqBodyConnectGame = req.body
        const checkUser = await checkUserHaveGames(body.player_id)
        const game :IGame = await (await getGame(body.id))?.result[0]
        console.log(body)
        if(body.player_id==null) {
            res.send({status:404,responseText:'error'})
            return 
        }
        if(game){
            if(checkUser?.id==body.id)
                res.send({status:200,responseText:'connected'})
            else if(!checkUser){
                const conn = await connect(game, body.player_id)
                res.send({status:200,responseText:conn})
            }else
                res.send({status:200,responseText:'already'})
        }
        else
            res.send({status:404,responseText:'error'})
    })
}

async function connect(game:IGame,player_id:number){
    let result = "denied"
    for(let i = 2;i<=5;i++){
        /*@ts-ignore*/
        const pickedPlayerID = game?.[`player_${i}_id`]
        if(pickedPlayerID==0&&i<=game.player_count){
            const queryStr = queryUpdateId(i,player_id,game.id)
            await DB.query(queryStr);
            if(i==game.player_count)
                await DB.query(queryChangeStatus(game.id,'game'))
            result='connected'; break;
        }
    }
    return result
}


async function getGame(id:number){
    const req = await DB.query('SELECT * FROM `game` WHERE id='+id)
    return req
}

async function checkUserHaveGames(id:number){
    const query = queryCheckUserHaveGames(id)
    const check = await DB.query(query)
    return check?.result?.[0]
}