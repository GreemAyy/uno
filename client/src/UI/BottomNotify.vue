<script lang="ts" setup>
//@ts-ignore
import {useStore} from 'vuex'
import { watch } from 'vue';
const store = useStore()

</script>

<template >
<div class="bottom-notify"
    :style="{'right':store.state.UIStore.bottomNotifyIsOpen?'10px':'-100%'}">
    <div class="bottom-notify-text"
    :class="{[store.state.UIStore.bottomNotifyStatus]:true}">
       {{store.state.UIStore.bottomNotifyData}}
    </div>
</div>
</template>

<style lang="scss">
    .bottom-notify{
        transition: all .3s;
        position: fixed;
        bottom: 10px;
        right: 10px;
        font-size: 30px;
        font-weight: 600;
    }
    .bottom-notify-text{
        border-radius: 15px;
        padding: 10px;
    }
    .default{
        border: 3px solid grey;
    }
    .ok{
        border: 3px solid rgb(47, 255, 47)
    }
    .error{
        border: 3px solid red
    }
</style>