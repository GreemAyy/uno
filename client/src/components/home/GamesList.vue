<script lang="ts" setup>
interface IGame{
    id:number
    player_count:number
    status:string
}
import List from './List.vue';
import { onMounted, ref } from 'vue'
import {createGame, getGames, ReqStatus} from '../../query/game.query'
import { _URL } from '../../c';
import { Socket, io } from 'socket.io-client';
//@ts-ignore
import {useStore} from 'vuex'
import { type IListItem } from '../../tools/i';
const store = useStore()
const isOpen = ref(false)
const pickedNumber = ref(1)
const pick=(idx:number)=>{
    if(idx>0) pickedNumber.value=idx
}
const listSocket = io(_URL,{path:'/home'})
const gameList = ref<any>([])


onMounted(async()=>{
    const getList = await getGames()
    gameList.value=getList
    listSocket.on("update",async()=>{
        const getList = await getGames()
        gameList.value=getList
    })
})

const create=async()=>{
    const id = store.state.userStore.id
    if(id!=null){
        const req= await createGame(pickedNumber.value+1,id)
        if(req.status==ReqStatus.OK&&req.responseText=='created') {
            listSocket.emit("update")
            store.commit("setBottomNotify",{isOpen:true,status:"ok",data:'Успешно!'})
        }
        else if(req.status==ReqStatus.OK&&req.responseText=='already')
            store.commit("setBottomNotify",{isOpen:true,status:"error",data:'У вас уже есть начатая игра!'})
        isOpen.value=false
    }
}
</script>

<template lang="pug">
.btn-create-game(@click="isOpen=!isOpen" :class="{opened:isOpen}") {{isOpen?"Закрыть":"Создать игру"}}
.game-settings(v-if='isOpen') 
    .players-picker()
        .players-picker-header() Выберите кол-во игроков
        .player-picker-items()
            .player-picker-item(v-for="(item, idx) in new Array(5)"
            @click='pick(idx)'
            :class="{'first-pick':idx==0,'picked':idx<=pickedNumber}") 
            .players-quan() {{pickedNumber+1}}
        .create-game(@click='create' ) Создать игру
List(:list="gameList" :socket='listSocket')
</template>

<style lang="scss" scoped> 
.create-game{
    text-align: center;
    font-size: 30px;
    font-weight: 700;
    margin: 15px 0 0;
    cursor: pointer;
}
.players-quan{
    font-size: 30px;
    font-weight: 600;
    margin-left:10px;
}

.player-picker-item{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: grey;
    cursor: pointer;
    margin: 0 5px;
    transition: all .3s; 
}
.first-pick{
    cursor: default;
    opacity: .5;
}
.picked{
    background-color: red;
}
.player-picker-items{
    margin: 10px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.players-picker-header {
    text-align: center;
    font-size: 25px;
    font-weight: 600;
}
.btn-create-game{
    font-size:35px;
    font-weight:600;
    text-align:center;
    background-color:black;
    color:white;
    cursor:pointer;
    transition:all .3s
}
.opened{
    background-color: white;
    color: black;
}
.game-settings{
    z-index: 100;
    background-color: white;
    width: 100%;
    position: absolute;
    border-top: 1px solid rgb(233, 233, 233);
    padding: 15px;
    border-radius: 0 0 25px 25px;
    box-shadow: 0 10px 10px rgb(221, 221, 221);
}
</style>