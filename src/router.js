import Vue from 'vue'
import Router from 'vue-router'
import Hot from './views/Hot'
import New from './views/New'
import Car from './views/Car'
import Digital from './views/Digital'
import Emotional from './views/Emotional'
import Game from './views/Game'
import Funny from './views/Funny'
import Movie from './views/Movie'
import Social from './views/Social'
import Sports from './views/Sports'
import Star from './views/Star'
import Details from './views/Details'
import Search from './views/Search'
import SearchPage from './views/SearchPage'






Vue.use(Router)

const routes = [
    {path:'/',name:'102803',component: Hot},
    {path:'/8',name:'102803_ctg1_5188_-_ctg1_5188',component: Car},
    {path:'/6',name:'102803_ctg1_5088_-_ctg1_5088',component: Digital},
    {path:'/3',name:'102803_ctg1_1988_-_ctg1_1988',component: Emotional},
    {path:'/10',name:'102803_ctg1_4888_-_ctg1_4888',component: Game},
    {path:'/2',name:'102803_ctg1_4388_-_ctg1_4388',component: Funny},
    {path:'/9',name:'102803_ctg1_3288_-_ctg1_3288',component: Movie},
    {path:'/1',name:'102803_ctg1_7978_-_ctg1_7978',component: New},
    {path:'/5',name:'102803_ctg1_4188_-_ctg1_4188',component: Social},
    {path:'/7',name:'102803_ctg1_1388_-_ctg1_1388',component: Sports},
    {path:'/4',name:'102803_ctg1_4288_-_ctg1_4288',component: Star},
    {path:'/details',name:'details',component: Details},
    {path:'/search',name:'search',component: Search},
    {path:'/searchpage',name:'searchpage',component: SearchPage}
]

const router = new Router({
    routes
})

export default router