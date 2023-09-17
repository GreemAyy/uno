<script setup lang="ts">
interface IData {status:number,responseText:string,data:string}
import UserDeck from '../components/game/UserDeck.vue';
import GameZone from '../components/game/GameZone.vue';
import EnemyDeck from '../components/game/EnemyDeck.vue';
import { io, Socket } from 'socket.io-client'
import { onMounted, ref } from 'vue';
import { _URL } from '../c';
/*@ts-ignore*/
import {useStore} from 'vuex' 
import {type IGame ,type ICard,getSingleGame, moveQuery} from '../query/game.query'
import { useRoute } from 'vue-router';

const store = useStore()
const socket = io(_URL,{path:'/game'})
const game = ref<IGame>()
const route = useRoute()
const status=ref<string>()

const move = async(card:ICard)=>{
    const req = await moveQuery({deck:game.value,
            playerID:store.state.userStore.id,
            task:'move',card})
    if(req!?.status==200)
        socket.emit('move',JSON.stringify({gameID:route.params.id}))
}

onMounted(async()=>{
    if(store.state.userStore.id==null)  window.location.pathname='/home'
    const getGame = await getSingleGame(Number(route.params.id),store.state.userStore.id)
    
    if(!getGame) window.location.pathname='/home'
    else{
        //@ts-ignore
        game.value=getGame
        status.value=getGame.status
        socket.on("join",(data:IData)=>{
            if(data.data=='game')
                //@ts-ignore
                game.value.status=data.data
            status.value=data.data
        })
        socket.emit('join',JSON.stringify({gameID:route.params.id}))
    }
    socket.on('move',async _ =>{
        const getGame = await getSingleGame(Number(route.params.id),store.state.userStore.id)
        if(getGame){
            //@ts-ignore
            game.value = getGame
            status.value = getGame.status
        }
    })
})
</script>

<template>
<div v-if="status=='wait'" class="wait">
    Ожидайте игроков
</div>
<div v-else class="game">
    <div class="enemy-block">
        <EnemyDeck :deck="game" />
    </div>
    <GameZone :deck="game!"/>
    <div class="player-zone">
        <UserDeck @move="move" :deck="game!"/>
    </div>
</div>
</template>

<style lang="scss">
.enemy-block{
    display: flex;
    justify-content: center;
    padding: 1vw;
}
.wait{
    position: absolute;
    font-size: 50px;
    left: 50%;
    font-weight: 600;
    top: 50%;
    transform: translate(-50%,-50%);
}
.player-zone{
    display: flex;
    justify-content: center;
}
</style>