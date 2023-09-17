import ky from "ky"
import { _URL } from "../c"
import {type IListItem } from "../tools/i"

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

export interface ICard {
    color:string,
    value:string,
    pickedColor?:string|null
}

type IReqCreate = {status:ReqStatus,responseText:string,id?:number}
import { type IMove, core } from "../gameCore";
export enum ReqStatus{
    OK=200,
    Error=400
}
interface IRes{
    status:number
    responseText:string
}

export const moveQuery=async({deck,playerID,task,card}:IMove)=>{
   const data = core({deck,playerID,task,card})
   console.log(data)
   const req = await ky.post(_URL+'/api/game/move',{json:data})
   return await req.json()
}

export const getGames =async():Promise<IListItem[]>=>{
    const req = await ky.get(_URL+'/api/game/get')
    //@ts-ignore
    return (await req.json()).data
}

export const createGame=async(playerCount:number=2,playerID:number):Promise<IReqCreate>=>{
    const req = await ky.post(_URL+'/api/game/create',
    {json:{"player_count":playerCount,"player_1_id":playerID}})
    return (await req.json())
}

export const connectGame=async(gameID :number,playerID:number):Promise<{status:number,responseText:string}>=>{
    const req = await ky.post(_URL+'/api/game/connect',{
        json:{"id":gameID,'player_id':playerID}
    })
    return (await req.json())
}

export const getSingleGame=async(gameID:number,playerID:number)=>{
    const req = await ky.post(_URL+'/api/game/connect',{json:{
        id:gameID,player_id:playerID
    }})
    const data:IRes = await req.json()
    if(data.responseText=='connected'&&data.status==ReqStatus.OK){
        const getGame = await ky.post(_URL+'/api/game/get-single',{json:{gameID}})
        const gameData:{status:number,responseText:string,data:IGame} = await getGame.json()
        return gameData.status==200?gameData.data:false
    }
    return false
}