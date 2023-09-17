<script setup lang="ts">
import { computed } from 'vue';
import { ICard, IGame } from '../query/game.query';
import {findIndex,checkCanMove,getSign} from '../tools/funcs'

const props = defineProps<{item:ICard,deck?:IGame,playerid?:number,type:string}>()
const item = computed(()=>props.item)
const deck = computed(()=>props.deck)
const playerid=computed(()=>props.playerid)
</script>

<template>
    <div
    class="single-player-card"
    v-if="props.type=='user_card'"
     :style="{background:item.color,color:item.color!='yellow'?'white':'black'}"
     :class="{'disabled':findIndex(Number(playerid),deck!)!=deck!.player_move||!checkCanMove(item, deck!.game_zone[0])}"
     >
        <div 
        class="card-data">
            {{!isNaN(Number(item.value))?item.value:getSign(item.value)}}
        </div>
    </div>
    <div
     class="single-player-card-none"
     v-else
     :style="{background:item.color,color:item.color!='yellow'?'white':'black'}">
        <div 
        class="card-data">
            {{!isNaN(Number(item.value))?item.value:getSign(item.value)}}
        </div>
    </div>
    
</template>

<style lang="scss">
.disabled{
    pointer-events: none;
    opacity: .25;
}
.single-player-card{
    overflow: hidden;
    width: 9vw;
    height: 13vw;
    border-radius: 1vw;
    font-size: 5vw;
    font-weight: 700;
    position: relative;
    cursor: pointer;
    transition: all .3s;
    margin: .5vw;
    &:hover{
        width: 10vw;
        height: 14vw;
        font-size: 7vw;
        margin: 0;
        box-shadow: 0 0 10px rgb(120, 120, 120);
    }
}

.single-player-card-none{
    overflow: hidden;
    width: 9vw;
    height: 13vw;
    border-radius: 1vw;
    font-size: 5vw;
    font-weight: 700;
    position: relative;
    transition: all .3s;
    margin: .5vw;
}
.card-data{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
</style>