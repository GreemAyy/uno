import { IDeck } from "../../gameFuncs/generate";
import type { ReqBodyCreateGame } from "./home.method";

const js = (array:any[]|undefined)=> array==undefined?JSON.stringify([]):JSON.stringify(array)

export function queryCreateGame({body,deck}:{body:ReqBodyCreateGame,deck:IDeck}){
    return `INSERT INTO game (id, player_count, player_move, direction, total_deck, player_1_id, player_2_id, player_3_id, player_4_id, player_5_id, player_1_deck,player_2_deck, player_3_deck, player_4_deck, player_5_deck, game_zone, status) 
    VALUES (null, ${body.player_count}, 1 ,'by', '${js(deck.total_deck)}' ,${body.player_1_id},0 ,0 ,0 ,0, '${js(deck.player_1_deck)}','${js(deck.player_2_deck)}','${js(deck.player_3_deck)}','${js(deck.player_4_deck)}','${js(deck.player_5_deck)}','[]','wait')`
}

export function queryCheckUserHaveGames(id:number){
    return `SELECT * FROM game WHERE (player_1_id=${id} or player_2_id=${id} OR player_3_id=${id} or player_4_id=${id} OR player_5_id=${id}) and (status='wait' or status='game')`
}

export function queryUpdateId(idx:number,player_id:number,game_id:number){
    return `UPDATE game SET player_${idx}_id = ${player_id} WHERE id=${game_id}`
}

export function queryChangeStatus(id:number,status:string){
    return `UPDATE game set status='${status}' WHERE id = ${id}`
}