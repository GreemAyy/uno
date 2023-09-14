<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import {connectGame} from '../../query/game.query'
//@ts-ignore
import {useStore} from 'vuex'
import {type IListItem } from '../../tools/i';
import { Socket } from 'socket.io-client';
const props = defineProps<{list:IListItem[],socket:Socket}>()
const store = useStore()
const list = computed(()=>props.list)
const allReadyJoin =()=>{
    let isJoined = null
    for(let item of list.value){
        isJoined=find(item)
    }
    return isJoined
}
const find = (item:IListItem)=>{
    if(store.state.userStore.id==null) return false
    const array = [ item.player_1_id,
                    item.player_2_id,
                    item.player_3_id,
                    item.player_4_id,
                    item.player_5_id ]
    return array.includes(Number(store.state.userStore.id))?true:false
}

const connect=async(item:IListItem)=>{
    const connectToGame = await connectGame(item.id,store.state.userStore.id)
    if(connectToGame.responseText=='connected'){
        props.socket.emit("update")
        window.location.pathname='/game/'+item.id
    }else
        store.commit("setBottomNotify",{isOpen:true,status:"error",data:'У вас уже есть начатая игра!'})
}
</script >

<template lang="pug">
.games-list
    .game-list-item(v-if="list.length>0" v-for="(item, idx) in list") 
        .left()
            .game-item-id №{{ item.id }}
            .players-count(:style="{width:item.player_count*35+'px'}")
                .players-count-item(v-for="(countItem, idxCount) in new Array(item.player_count)"
                :style="{left:(idxCount)*35+'px'}")
            .quan-of-players() {{item.player_count}}
        .right()
            .btn-connect-to-game(:class="{in:find(item)}" @click="connect(item)") {{find(item)?"Войти":item.status=='wait'?"Присоедениться":'Игра уже идёт'}}
    .no-res(v-else) Пока что нет начатых игр
</template>

<style lang="scss" scoped>
.in{
    background-color: red;
    color: white;
}

.btn-connect-to-game{
    
    padding: 0 10px;
    border-radius: 15px;
    cursor: pointer;
}
.left{
    display: flex;
}
.no-res{
    font-size: 40px;
    text-align: center;
    font-weight: 700;
    text-decoration: underline;
    margin: 15px 0;
}
.players-count{
    position: relative;
    display: flex;
    align-items: center;
    margin: 20px;
    
}
.players-count-item{
    position: absolute;
    border: 3px solid rgb(135, 187, 234,1);
    width: 50px;
    height: 50px;
    background-color: red;
    border-radius: 50%;
}

.games-list{
    width: 50%;
    margin: 0 auto;
}

.game-list-item{
    justify-content: space-between;
    display: flex;
    align-items: center;
    background-color: rgb(135, 187, 234,1);
    padding: 10px;
    font-size: 30px;
    border-radius: 20px;
    margin: 25px 0 0;
    font-weight: 600;
    width: 100%;
}

</style>