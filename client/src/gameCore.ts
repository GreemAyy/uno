import { ICard, type IGame } from "./query/game.query"
import { findIndex } from "./tools/funcs"

export interface IMove {
    deck?:IGame
    playerID:number
    task:string,
    card?:ICard
}


export enum TaskManager{
    move = 'move',
    take_2 = 'take_2',
    take_4 = 'take_4',
    uno_fail = 'uno_fail'
}

enum CardTask{
    change_direction='change_direction',
    change_color='change_color',
    plus_2="plus_2",
    plus_4='plus_4',
    skip_move='skip_move'
}

export const core = ({deck,playerID,task,card}:IMove) => {
    if(task==TaskManager.move) return (()=>{
        let _ = move(deck!, card!, playerID)
        _.type = task; return _})()

    else if(task==TaskManager.take_2) return (()=>{
        let _ = plus(deck!,playerID,2)
        _.type = task; return _})()

    else if(task==TaskManager.take_4) return (()=>{
        let _ = plus(deck!,playerID,4)
        _.type = task; return _})()
}

const plus=(deck:IGame,playerID:number,plusNum:number)=>{
    const playerIndex = findIndex(Number(playerID),deck)
    //@ts-ignore
    let playerDeck:ICard[] = deck?.[`player_${playerIndex}_deck`] 
    const remaining = deck.total_deck
    playerDeck.push(...remaining.splice(0,plusNum))
    return {
        player_move:playerIndex,
        player_deck:playerDeck,
        total_deck:remaining,
        type:'',
        id:deck.id
    }
}

const move = (deck:IGame, card:ICard, playerID:number|string) =>{
    const playerIndex = findIndex(Number(playerID),deck)
    const doMove = incDecMove(deck,card?.value)
    const gameZone = deck.game_zone
    gameZone.unshift(card)
    //@ts-ignore
    let playerDeck:ICard[] = deck?.[`player_${playerIndex}_deck`]
    let count = 0
    playerDeck = playerDeck.filter(item=>{
        if(item.value!=card.value&&item.color!=card.color)
            return item
        else if(item.value==card.value&&item.color==card.color){
            if(count==0) count++
        }else return item
    })
    console.log(playerIndex)
    return {
        player_index:playerIndex,
        player_move:doMove.index,
        direction:doMove.dir,
        game_zone:gameZone,
        player_deck:playerDeck,
        type:'',
        id:deck.id
    }
}

const incDecMove=(deck:IGame,task:string)=>{
    let dir = deck.direction
    let moveIndex = deck.player_move
    const _ = () => {
        if(moveIndex==deck.player_count) moveIndex=1
        else if(moveIndex==1) moveIndex=deck.player_count
        else moveIndex = dir=='by'?moveIndex+1:moveIndex-1
    }
    if(task==CardTask.change_direction){
        dir=dir=='by'?'vs':'by';_()}
    else if(task==CardTask.skip_move) {_()} /*->*/ _()
    return {dir,index:moveIndex}
}