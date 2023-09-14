import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history:createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {path:"/home",
        /*@ts-ignore*/
        component:()=>import('./views/Home.vue')},
        {path:'/game/:id',
        /*@ts-ignore*/
        component:()=>import('./views/Game.vue')}
    ]
})

export default router