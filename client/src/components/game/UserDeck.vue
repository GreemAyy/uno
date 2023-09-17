<script setup lang="ts">
import SingleCard from '../../UI/SingleCard.vue';
import { computed, onMounted } from 'vue';
import { ICard, type IGame } from '../../query/game.query';
//@ts-ignore
import {useStore} from 'vuex'
import {findIndex} from '../../tools/funcs'

const props = defineProps<{deck:IGame}>()
const deck = computed<IGame>(()=>props?.deck)
const store = useStore()
const id = store.state.userStore.id
//@ts-ignore
const myDeck = computed<ICard[]>(()=>props.deck?.[`player_${findIndex(id,deck.value)}_deck`])
const emits = defineEmits(['move'])
const move =async(item:ICard)=>emits('move',item)

</script>

<template>
<div class="player-cards">
        <SingleCard
        @click="move(item)"
        v-for="item of myDeck" :item="item" :deck="deck" :playerid="id" :type="'user_card'"/>
</div>

</template>

<style lang="scss" scoped>
.player-cards{
    display: flex;
    width: 65%;
    justify-content: space-between;
    align-items: center;
    padding: 1vw;
    transition: all .3s;
}

</style>