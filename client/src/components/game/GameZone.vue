<script lang="ts" setup>
import SingleCard from '../../UI/SingleCard.vue';
import { IGame } from '../../query/game.query';

const props = defineProps<{deck:IGame}>()
</script>

<template>
<div class="game-zone">
    <div class="center-zone">
        <div class="last-game-card">
            <SingleCard v-if="props.deck" :item="props?.deck?.game_zone[0]" :type="'_'"/>
        </div>
        <div class="remaining_deck">
            <div class="remaining_deck_data">
                {{ props?.deck?.total_deck.length }}
            </div>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.remaining_deck_data{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    color: black;
    padding: 1vw;
    background-color: white;
    border-radius: 50%;
    font-weight: 600;
}
.remaining_deck{
    width: 9vw;
    height: 13vw;
    border-radius: 1vw;
    font-size: 3vw;
    background-color: black;
    position: relative;
    margin: .5vw;
}
.game-zone{
    display: flex;
    justify-content: center;
}
.center-zone{
    display: flex;
    border-radius: 1.5vw;
    padding: 1.5vw;
    box-shadow: 0 0 20px grey;
}
</style>