<template>
<div class="page-con">
   <div class="pag-top">
       <span class="b iconfont icon-xiazai6" @click="ret"></span>
       <input @keydown.enter.exact="search" ref="sss" type="text" :value="$route.query.value" />
        <i class="iconfont icon-bianji"></i>
   </div>
   <div class="list">
       <div class="list-nav">
       <ul>
           <li v-for="(lt,t) in headcards" :class="t===0?'active':''" :key="t">{{lt.name}}</li>
       </ul>
       </div>
       <span>+</span>
   </div>
   <ListDet :content="headgroup" :s="k" :lgs="g" :hot="this.$route.query.value"></ListDet>
   <button @click="gd">加载更多</button>
    <div class="pag-bottom"></div>
</div>
</template>

<script>
import ListDet from '../components/ListDet'
export default {
  name: 'SearchPage',
  data(){
        return {
           headcards:{},
           headgroup:{},
           k:1,
           g:''
        }
  },
   created(){
   	
   	      this.axios.get('/api/container/getIndex?containerid=100103type%3D1%26q%3D'+this.$route.query.value+'%23&page_type=searchall')
         .then(response => {
       
                 this.headcards=response.data.data.cardlistInfo.cardlist_head_cards[0].channel_list  
             }, err => {
                 alert(err)
             })
         this.axios.get('/api/container/getIndex?containerid=100103type%3D60%26q%3D'+this.$route.query.value+'&title=热门-'+this.$route.query.value+'&cardid=weibo_page&extparam=title%3D热门%26mid%3D%26q%3D'+this.$route.query.value+'&luicode=10000011&lfid=100103type%3D1%26q%3D'+this.$route.query.value)
         .then(response => {
                 console.log(response.data.data)
                 if(response.data.data.cards){
                 	this.g=response.data.data.cards[0].card_group.length
                 this.headgroup=response.data.data.cards[0].card_group
                 }
                 console.log(this.headgroup,'eee')
             }, err => {
                 alert(err)
             })
  },
  components:{
    ListDet
  },
  methods:{
  	          ret(){
              this.$router.go(-1)
          },
          gd(){
          	this.k++
          	console.log(this.$refs.sss.value)
          	this.axios.get('/api/container/getIndex?containerid=100103type%3D60%26q%3D'+this.$refs.sss.value+'&title=热门-'+this.$refs.sss.value+'&cardid=weibo_page&extparam=title%3D热门%26mid%3D%26q%3D'+this.$refs.sss.value+'&luicode=10000011&lfid=100103type%3D1%26q%3D'+this.$refs.sss.value+'&page='+this.k)
          	.then(response => {
               	if(response.data.data){
               for(var i=0;i<response.data.data.cards.length;i++){
                    this.headgroup.push(response.data.data.cards[0].card_group[i])    
               }
               }
       
             }, err => {
                 alert(err)
             })
          },
          search(evt){
          	this.$route.query.value=evt.target.value
          	console.log(evt.target.value)
          	
          this.axios.get('/api/container/getIndex?containerid=100103type%3D60%26q%3D'+evt.target.value+'&title=热门-'+evt.target.value+'&cardid=weibo_page&extparam=title%3D热门%26mid%3D%26q%3D'+evt.target.value+'&luicode=10000011&lfid=100103type%3D1%26q%3D'+evt.target.value)
         .then(response => {
                  console.log(response.data.data)
                this.headgroup=response.data.data.cards[0].card_group
             }, err => {
                 alert(err)
             })
          }
  }
}
</script>

<style>
	div,input,span,li,img{
		box-sizing: border-box;
	}
.page-con{
	width: 100%;
	height: 1000px;
	position: relative;

}
.page-con .pag-top{
	width: 100%;
	height: 44px;
	background: #fff;
	padding: 8px;

	font-size: 16px;
	color: #333;
	
}
.page-con .pag-top span{
	float: left;
	width: 35px;
	height: 28px;
}
.page-con .pag-top input{
	list-style: none;
	outline:none;
	border: none;
	float: left;
	width: calc(100% - 35px - 30px);
	height: 28px;
	background: #e3e4e6;
	border-radius: 3px;
}
.page-con .list{
	overflow: hidden;
 width: 100%;
 height: 42px;
 font-size: 16px;
 color: #939393;
line-height: 42px;
text-align: center;
border-bottom:1px solid #e6e6e6;
background: #fff;
position: sticky;
top: 0;
z-index: 100;
}
.page-con .list .list-nav{
float: left;
 height: 42px;
width: calc(100% - 42px);
overflow-x: auto;
white-space:nowrap;
background: #fff;

}
.page-con .list .list-nav::-webkit-scrollbar{
   display:none;
}
.list .list-nav ul{
width: 1000%;
overflow: hidden;
}
.list .list-nav li{
float: left;
width: 57px;

}
.list .list-nav li.active{
	    color: #333;
	    position: relative;
}
.list .list-nav li.active:before{
  content:"";
  width: 22px;
  height: 3px;
  background: #DF5000;
  border-radius:20px ;
  position: absolute;
  top: 35px;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.page-con .list span{
 font-size: 25px;
float: left;
  width: 39px;
  height: 41px;
  background: #fff;
}
.pag-bottom{
width: 100%;
height: 46px;
 color: #939393;
}
</style>