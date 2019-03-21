<template>
<div class="box lid">
	<div class="item" v-for="(item,i) in content" v-if="i">
	   <div class="title" v-if="item.mblog.title">
	   <img :src="item.mblog.title.icon_url"/><a href="">{{item.mblog.title.text}}</a>
	   </div>
		<div class="header" >
			<div class="left"><img :src="item.mblog.user.profile_image_url" /></div>
			<div class="center">
			<span class="name">{{item.mblog.user.screen_name}}{{item.mblog.user.mbrank}}</span>
			<span class="time">{{item.mblog.created_at}}{{item.mblog.source}}</span>
			</div>
		</div>
		<div class="details" @click="details(i,item.mblog.id,item.mblog.mid)">
		<div class="txt" v-html="item.mblog.text"></div>
		 <div class="pic" v-if="item.mblog.pics" >
		  <div v-for="(p,s) in item.mblog.pics" :key="s">
          <div class="it"><img :src="p.large.url"/></div> 	
		    </div>
		  </div></div>
		<div class="video" v-if="item.mblog.page_info&&item.mblog.page_info.media_info">
		   <img :src="item.mblog.page_info.page_pic.url"/>
		   <div class="tex" v-if="item.mblog.page_info.play_count">
		   <h4>{{item.mblog.page_info.play_count}}次观看</h4>
		   <span>{{parseInt(item.mblog.page_info.media_info.duration/60)}}:{{item.mblog.page_info.media_info.duration%60}}</span>
		   </div>
		   <span class="bt iconfont icon-bofang" @click="plays(item.mblog.page_info.media_info.mp4_720p_mp4)"></span>
		</div>
        <div class="like likes">
        <ul>
        <li>
        <span class="iconfont icon-zhuanfa"></span>
        <span v-if="item.mblog.reposts_count>10000">{{Number((item.mblog.reposts_count/10000).toFixed(1))}}万</span>
        <span v-else="item.mblog.reposts_count/10000">{{item.mblog.reposts_count}}</span></li>
        <li>
        <span class="iconfont icon-pinglun"></span>
        <span v-if="item.mblog.comments_count>10000">{{Number((item.mblog.comments_count/10000).toFixed(1))}}万</span>
        <span v-else="item.mblog.comments_count>10000">{{item.mblog.comments_count}}</span>
        </li>
        <li>
        <span class="iconfont icon-zan"></span>
        <span v-if="item.mblog.attitudes_count>10000">{{Number((item.mblog.attitudes_count/10000).toFixed(1))}}万</span>
        <span v-else="item.mblog.reposts_count>10000">{{item.mblog.attitudes_count}}</span>
        </li>
        </ul>
        </div>
</div>
  <VideoPlay @decs="decs" :opens="open" :urls="url"></VideoPlay>

</div>

</template>

<script>
import VideoPlay from './VideoPlay'
    export default {
        data(){
           return {
              open:false,
              url:'',
              lg:null
           }
        },
		name: 'Content',
		props:['content','s','lgs','hot'],
		methods:{
		   plays(ul){
		     this.open=true
		     this.url=ul
		   },
		   decs(){
		      this.open=false
		      this.url=''
		   },
		   details(val,val1,val2){
		    this.$router.push({path:'/details',query:{cid:this.$route.name,gid:val,lid:this.lgs,sid:this.s,id:val1,mid:val2,is:false,val:this.hot}})
		   }
		},
		components:{
            VideoPlay
        }
	}
</script>

<style >
.box{
overflow:hidden;
background: #fff;
}
.lid{
	padding-top: 0 !important;
}
.box div{
	background: #fff;
box-sizing: border-box;
}
.item{
width: 100%;
		padding-left:12px;
		padding-right:12px;
		border-bottom:1px solid #e6e6e6;
		background: #fff;
		
}
.title{
	width: 100%;
	height: 34.5px;
}
.title img{
	float: left;
	width: 14px;
	height: 14px;
	margin-top: 11px;
}
.title a{
	float: left;
	margin-left: 5px;
	white-space: nowrap;
	overflow: hidden;
	width: 170px;
	line-height: 34px;
	font-size: 14px;
	color: #507DAF;
}
.header{
overflow:hidden;
 margin-top: 12px;
  width: 100%;
  height: 40px;
}
.header .left{
float: left;
width: 40px;
height: 40px;
	padding-left:4px;
	padding-top:4px;
}
.header .left img{
display: block;
   width: 32px;
   height: 32px;
   border-radius: 50%;
}
.header .center{
float: left;
width: calc(100% - 73px - 40px);
height: 40px;
}
.header .center .name{
float: left;
width: 100%;
font-size:17px;
height: 19px;
}
.header .center .time{
float: left;
width: 100%;
height: 16px;
color:#939393;
font-size: 13px;
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
}
.header .right{
float: left;
width: 73px;
height: 24px;
    text-align: center;
    line-height: 24px;
    border: 1px solid #87909a;
font-size: 12px;
    cursor: pointer;
}


.header .details{
width: 100%;
overflow: hidden;
}
.txt{
   width: 100%;
   word-wrap: break-word;
   font-size: 16px;
   padding-top: 12px;
   line-height: 1.5;
}
.txt .url-icon{
width: 16px !important;
height: 24px !important;
}
.txt .url-icon img{
width: 16px !important;
height: 16px !important;
}
.pic{
margin-top: 12px;
width: 100%;
overflow: hidden;
}
.pic>div{
float: left;
width: 30%;
height: 100%;
margin-right: 3%;
padding-bottom: 8px;
}
.pic>div .it{
z-index: -1;
width: 100%;
height: 100%;
position: relative;
}
.pic>div .it:before{ 
content: ""; 
padding-top: 100%;
 vertical-align: middle; 
display: block;
}
.pic>div .it img{ 
width: 100%; 
height: 100%; 
position: absolute; 
top: 0; 
left: 0; 
}
.video{
width: 100%;
position: relative;
}
.video .bt{
width: 50px;
height: 50px;
position: absolute;
top: 0;
left:0;
bottom: 0;
right: 0;
margin: auto;
}
.video .tex{
width: 100%;
height: 16px;
position: absolute;
color: #fff;
bottom: 5px;
left:5px;
}
.video .tex h4{
float: left;
font-size: 13px;
}
.video .tex span{
float:right;
font-size: 13px;
margin-right: 10px;
}
.like{
width: 100%;
height: 50px;
overflow: hidden;
font-size: 12px;
  color: rgba(40,47,60,0.8);
padding-bottom: 16px;
padding-top: 16px;
}
.like li{
width: 25%;
float: left;
}
.like.likes li{
	width: 33% !important;
}
.like li span.iconfont{
	font-size: 18px;
	padding-right: 5px;
}
.like li:last-child span.iconfont{
	padding-left: 30px;
	font-size: 25px;
}
</style>