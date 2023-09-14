<script setup lang="ts">
import {useStore} from 'vuex'
import {setCookie} from '../../tools/cookie.ts'
import {regQuery} from '../../query/user.query.ts'

const store = useStore()

const reg = async()=>{
   const res = await regQuery('guest')
    if(res.status==200){
        setCookie('id',res.id)
        store.commit("setId",res.id)
    }
}
</script>

<template lang="pug">
header.home-header()
    .home-header-title() 
        span UNO 
    .home-header-user()
        .reg-btn(v-if="store.state.userStore.id==null"
        @click='reg') Войти как гость
        .user-id(v-else) ID: {{store.state.userStore.id}}
    .home-header-create-game()
        .btn-create-game()
</template>

<style lang="scss">
.home-header{
    display: flex;
    padding: 20px 0;
    justify-content: center;
    flex-direction: column;
}
.home-header-title {
    display: flex;
    justify-content: center;
    span{
        display: block;
        font-size: 60px;
        font-weight: 800;
        color: yellow;
        background-color: red;
        padding: 5px 15px;
        border-radius: 200px 100px 200px 100px;
        transform: rotate(-5deg);
        cursor: pointer;
    }
}
.home-header-user{
    display: flex;
    justify-content: center;
    margin: 20px 0 0;
}
.reg-btn{
    font-size: 30px;
    background-color: black;
    color: white;
    font-weight: 600;
    padding: 0 10px;
    border-radius: 25px;
    cursor: pointer;
}
.user-id{
    font-size: 35px;
    font-weight: 600;
}
</style>