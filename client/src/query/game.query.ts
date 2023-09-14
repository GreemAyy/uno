import ky from "ky"
import { _URL } from "../c"
import {type IListItem } from "../tools/i"

export interface IGame{
    id:number
    player_count:number
    status:string
}
type IReqCreate = {status:ReqStatus,responseText:string,id?:number}
export enum ReqStatus{
    OK=200,
    Error=400
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