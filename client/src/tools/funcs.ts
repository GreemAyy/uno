import { IGame, type ICard } from "../query/game.query"
export function checkCanMove(userCard:ICard,checkCard:ICard):boolean{
    if(checkCard?.pickedColor==userCard.color) return true
    if(checkCard?.color==userCard.color) return true
    if(userCard.color!='black'&&checkCard.color!='black'){
        if(userCard.color==checkCard.color) return true
        if(userCard.value==checkCard.value) return true
    }else{
        if(userCard.color=='black'&&checkCard.color!='black')
            return true
        else if((userCard.color=='black'&&checkCard.color=='black')&&userCard.value==checkCard.value)
            return true
    }
    return false
}

export const findIndex = (id:number,deck:IGame)=>{
    const ids = [
        deck?.player_1_id,
        deck?.player_2_id,
        deck?.player_3_id,
        deck?.player_4_id,
        deck?.player_5_id,
    ]
    for(let i = 0;i<ids.length;i++){
        if(id==ids[i]){
            return i+1; break
        }
    }
}

export const getSign=(value:string):string=>{
    switch(value){
        case 'plus_4':
           return '+4'; break
        case "plus_2":
            return '+2'; break
        case 'change_color':
            return "c"; break
        case 'change_direction':
            return 'dir'; break
        case 'skip_move':
            return 'skip'; break
        default:
            return 'null'
    }
}