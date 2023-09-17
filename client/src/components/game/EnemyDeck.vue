<script lang="ts" setup>
import { computed } from 'vue';
import { ICard, IGame } from '../../query/game.query';
//@ts-ignore
import {useStore} from 'vuex'
const store = useStore()
const props = defineProps<{deck?:IGame}>()
const id = store.state.userStore.id
const deckID = computed(()=>[
    props?.deck?.player_1_id,
    props?.deck?.player_2_id,
    props?.deck?.player_3_id,
    props?.deck?.player_4_id,
    props?.deck?.player_5_id])
</script>

<template>
<div 
v-for="(playerid, idx) of deckID.splice(0,props?.deck?.player_count)">
    <div v-if="playerid!=id" class="enemy-card">
        <div
        class="enemy-card-data">
            {{ props?.deck?.[`player_${idx+1}_deck`].length}}
        </div>
    </div>
</div>
</template>

<style lang="scss">
.enemy-card-data{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.enemy-card{
    width: 9vw;
    height: 13vw;
    border-radius: 1vw;
    font-size: 5vw;
    background-color: rgb(200, 200, 200);
    position: relative;
}
</style>