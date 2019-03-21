<template>
<div class="sear">
<div class="sear-top">
   <span class="b iconfont icon-xiazai6" @click="ret"></span>
   <i class="s iconfont icon-sousuo"></i>
   <input @keydown.enter.exact="search(hotsear.note,$event)" type="text" v-if="hotsear" :placeholder="hotsear.tip+hotsear.note"/>
</div>
<div class="sear-content">
	<ul>
		<li @click="sear(sc.title_sub)" v-if="hocars" v-for="(sc,l) in hocars.group" :key="l">
			<span>{{sc.title_sub}}</span>
			<img :src="sc.icon"/>
		</li>
	</ul>
</div>
<div class="seit">
	<ul>
		<li v-for="(it,e) in hocitem.group" :key="e">
			<img :src="it.pic"/>
			<span>{{it.title_sub}}</span>
		</li>
	</ul>
</div>

</div>
</template>

<script>
export default {
  name: 'Search',
  data(){
  	return {
  		hotsear:{},
  		hocars:{},
  		hocitem:{}
  	}
  },
  created(){
       https://m.weibo.cn/api/container/getIndex?containerid=231583&page_type=searchall
         this.axios.get('/api/container/getIndex?containerid=231583&page_type=searchall')
         .then(response => {
               this.hotsear=response.data.data.hotwords[0]
               this.hocars=response.data.data.cards[0].card_group[0]
               this.hocitem=response.data.data.cards[0].card_group[1]
             }, err => {
                 alert(err)
             })  
  },
  methods:{
  	search(content,$event){
  		let val=!$event.target.value? content:$event.target.value 
  		this.$router.push({path:'/searchpage',query:{value:val}})
  		
  	},
  	sear(val){
  		this.$router.push({path:'/searchpage',query:{value:val}})
  	},
  	ret(){
              this.$router.go(-1)
   }
  }
}
</script>

<style>
	div,input,span,li,img{
		box-sizing: border-box;
	}
	.sear div{
		background: #fff;
	}
.sear{
	width: 100%;
	height: 100%;
	background: #ebebec;
	position: fixed;
	max-width: 750px;
}
.s{
	position: absolute;
	top: 13px;
	left: 50px;
}
.sear .sear-top{
	width: 100%;
	height: 44px;
	background: #fff;
	padding: 8px;
	border-bottom:1px solid #e6e6e6;
	font-size: 16px;
	color: #333;
	
}
.sear .sear-top span{
	float: left;
	width: 35px;
	height: 28px;
}
.sear .sear-top input{
	list-style: none;
	outline:none;
	border: none;
	float: left;
	width: calc(100% - 35px);
	height: 28px;
	background: #e3e4e6;
	border-radius: 3px;
	padding-left: 25px;
}
.sear-content{
	background: #fff;
	width: 100%;
	border-bottom:1px solid #e6e6e6;
	padding-left: 10px;
	padding-right: 10px;
	overflow: hidden;
}
.sear-content li{
	line-height: 44px;
	float: left;
	color: #333;
	width: 50%;
	height: 44px;
	text-align: left;
	font-size: 16px;
	padding-right: 15px;
	position: relative;
	padding-left: 5px;
}
.sear-content li:nth-child(even){
	padding-left: 10px;
}
.sear-content li:nth-child(even):before{
	content:"";
	width: 1px;
	background: #e6e6e6;
	height: 28px;
	position: absolute;
	left: -5px;
	top: 8px;
}
.sear-content span{
	float: left;
    white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: calc(100% - 20px);
}
.sear-content li img{
	display: inline-block;
	float: left;
	margin-left: 3px;
	margin-top: 15px;
	width: 14px;
	height: 14px;
},
.sear>.seit{
	overflow: hidden;
	width: 100%;
}
.sear .seit ul{
	overflow: hidden;
}
.sear .seit li{
	font-size: 12px;
	height: 79px;
	padding-top: 12px;
	padding-bottom: 12px;
	float: left;
	width: 20%;
	text-align: center;
	position: relative;
}
.sear .seit li:before{
   content:"";
	width: 1px;
	background: #e6e6e6;
	height: 44px;
	position: absolute;
	right: 0;
	top: 16px;
}
.sear .seit li:after{
   content:"";
	width: 30px;
	background: #e6e6e6;
	height: 1px;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	margin: 0 auto;
}
.sear .seit li:nth-child(5n+0):before{
	width: 0 ;
}
.sear .seit li:nth-child(11):after,.sear .seit li:nth-child(12):after,.sear .seit li:nth-child(13):after,.sear .seit li:nth-child(14):after,.sear .seit li:nth-child(15):after{
	width: 0;
}
.sear .seit li img{
    margin: 0 auto;
	width: 36px;
	height: 36px;
}
.sear .seit li span{
	display: inline-block;
	width: 100%;
	height: 19px;
}
</style>