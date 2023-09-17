export interface ICard {
    color:string,
    value:string|number,
    pickedColor?:string|null
}

export interface IDeck{
    player_1_deck?:ICard[]
    player_2_deck?:ICard[]
    player_3_deck?:ICard[]
    player_4_deck?:ICard[]
    player_5_deck?:ICard[]
    total_deck?:ICard[]
    game_zone?:ICard[]
}

function shake<T>(list:T[]){
    const random = (max:number) => Math.floor(Math.random()*max)
    const total = []
    const checkInclude:number[] = []
    while(total.length!=list.length){
        const randomVal = random(list.length)
        if(!checkInclude.includes(randomVal)){
            checkInclude.push(randomVal)
            total.push(list[randomVal])
        }
    }
    return total
}

export const generateDeck=(playersCount:number)=>{
    if(playersCount>5) 
        throw new Error('Max players 5')
    const deck:ICard[] = shake(gen())
    const total:IDeck = {}
    for(let i = 0;i<playersCount;i++){
        const T= `player_${i+1}_deck`
        //@ts-ignore
        total[T]=deck.splice(0,6)
    }
    total.game_zone=deck.splice(0,1)
    total.total_deck=deck
    return total
}

const gen = () => {
    const values = [0,1,2,3,4,5,6,7,8,9,'change_direction','plus_2','skip_move'];
    const colors = ['red','green','blue','yellow'];
    const deck:ICard[] = []
    for(let value of values){
        const item = colors.map(item=>({color:item,value}))
        deck.push(...item)
    }
    for(let i =0 ;i<2;i++){
        deck.push(
            {color:'black',pickedColor:null,value:"change_color"},
            {color:'black',value:"plus_4"},
        )
    }
    return [...deck,...deck]
}