import { IMove } from "./game.method";

export const setMove=({
    player_index,
    player_move,
    direction,
    player_deck,
    game_zone,
    id
}:IMove)=>
    `UPDATE game set player_move=${player_move} ,direction='${direction}', player_${player_index}_deck='${JSON.stringify(player_deck)}', game_zone='${JSON.stringify(game_zone)}' WHERE id=${id}`
