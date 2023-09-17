import { DB, app } from "../..";
import { queryCheckUserHaveGames } from "../home/home.path";
import { setMove } from "./game.path";

interface ReqBody{gameID:number}

export interface IMove{
    player_index:any
    player_move?:any
    direction?:any
    game_zone?:any[]
    player_deck?:any[]
    total_deck?:any[]
    type:any
    id:any
}

export async function getGame(){
    app.post('/api/game/get-single',async(req,res)=>{
        const body :ReqBody = req.body
        const game = await gameData(body.gameID)
        res.send(game)
    })
}

export async function move(){
    app.post('/api/game/move',async(req,res)=>{
        const body:IMove = req.body
        let querySrt = ''
        if(body.type=='move')
            querySrt=setMove(body)
        else if (body.type=='plus')
            querySrt=''
        const move = await DB.query(querySrt)
        res.send(move.error?
            {status:400,responseText:'error'}:
            {status:200,responseText:'set'})
    })
}

export async function getStatus(id:number){
    const status = await DB.query('SELECT `status` FROM `game` WHERE id='+id)
    return status?.error?
    {status:400,responseText:'error'}:
    {status:200,responseText:'done',data:status.result[0].status}
}

async function gameData(id:number){
    const game = await DB.query("select * from game where id ="+id)
    return game?.error?
    {status:400,responseText:'error'}:
    {status:200,responseText:'getted',data:game.result?.[0]}
}