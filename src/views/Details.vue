
<template>
<div class="xq" v-if="loading">
	<div class="top">
		<span class="b iconfont icon-xiazai6" @click="ret"></span>
		<div class="detit">微博正文</div>
		<span class="a iconfont icon-gengduo"></span>
	</div>
	<div class="item br">
	   <div class="title" v-if="detval.mblog.title">
	   <img :src="detval.mblog.title.icon_url"/><a href="">{{detval.mblog.title.text}}</a>
	   </div>
		<div class="header" >
			<div class="left"><img :src="detval.mblog.user.profile_image_url" /></div>
			<div class="center">
			<span class="name">{{detval.mblog.user.screen_name}}{{detval.mblog.user.mbrank}}</span>
			<span class="time">{{detval.mblog.created_at}}{{detval.mblog.source}}</span>
			</div>
		</div>
		<div class="details">
		<div class="txt" v-html="detval.mblog.text"></div>
		 <div class="pic" v-if="detval.mblog.pics" >
		  <div v-for="(h,a) in detval.mblog.pics" :key="a">
          <div class="it"><img :src="h.large.url"/></div> 	
		    </div>
		  </div></div>
		<div class="video" v-if="detval.mblog.page_info&&detval.mblog.page_info.media_info">
		   <img :src="detval.mblog.page_info.page_pic.url"/>
		   <div class="tex" v-if="detval.mblog.page_info.play_count">
		   <h4>{{detval.mblog.page_info.play_count}}次观看</h4>
		   <span>{{parseInt(detval.mblog.page_info.media_info.duration/60)}}:{{detval.mblog.page_info.media_info.duration%60}}</span>
		   </div>
		   <span class="bt iconfont icon-bofang" @click="plays(item.mblog.page_info.media_info.mp4_720p_mp4)"></span>
		</div>
</div>
     <div class="pl">
        <ul>
        <li @click="zf" ref="zf">
        <span v-if="detval.mblog.reposts_count>10000"><i>转发</i>{{Number((detval.mblog.reposts_count/10000).toFixed(1))}}万</span>
        <span v-else="detval.mblog.reposts_count/10000"><i>转发</i>{{detval.mblog.reposts_count}}</span> </li>
       <li class="act" @click="p" ref="p">
        <span v-if="detval.mblog.comments_count>10000"><i>评论</i>{{Number((detval.mblog.comments_count/10000).toFixed(1))}}万</span>
        <span v-else="detval.mblog.comments_count>10000"><i>评论</i>{{detval.mblog.comments_count}}</span>
        </li>
        <li  @click="z" ref="z">
        <span v-if="detval.mblog.attitudes_count>10000"><i>赞</i>{{Number((detval.mblog.attitudes_count/10000).toFixed(1))}}万</span>
        <span v-else="detval.mblog.reposts_count>10000"><i>赞</i>{{detval.mblog.attitudes_count}}</span>
        </li>	
        </ul>
     </div>
     <More :com="comments"></More>
     <button @click="addI" v-if="ibt">加载更多转发</button>
     <button @click="addJ" v-if="jbt">加载更多赞</button>
      
<VideoPlay @decs="decs" :opens="is" :urls="ur"></VideoPlay>
<div class="bottom">发表评论</div>
</div>
</template>

<script>
import VideoPlay from '../components/VideoPlay'
import More from '../components/More'

export default {
  name: 'Details',
  data(){
  	return {
  		detval:{},
  		loading: false,
  		is:false,
  		comments:{},
  		ur:'',
  		pag:false,
  		i:1,
  		j:1,
  		jbt:false,
  		ibt:false
  	}
  },
  created(){
       if(this.$route.query.is){
         this.axios.get('/api/container/getIndex/',{
                params:{
                  containerid:this.$route.query.cid,
                  openAp:0,
                  page:this.$route.query.sid
                }
             }).then(response => {
                 this.detval=response.data.data.cards[this.$route.query.gid%this.$route.query.lid]
                 this.loading = true
             }, err => {
                 alert(err)
             })  
       }else{
       	console.log('aaa')
       	this.axios.get('/api/container/getIndex?containerid=100103type%3D60%26q%3D'+this.$route.query.val+'&title=热门-'+this.$route.query.val+'&cardid=weibo_page&extparam=title%3D热门%26mid%3D%26q%3D'+this.$route.query.valu+'&luicode=10000011&lfid=100103type%3D1%26q%3D'+this.$route.query.val+'&page='+this.$route.query.sid)
       	.then(response => {
                 this.detval=this.headgroup=response.data.data.cards[0].card_group[this.$route.query.gid%this.$route.query.lid]
                 this.loading = true
             }, err => {
                 alert(err)
             }) 
       }
          this.axios.get('/api/comments/hotflow/',{
                params:{
                  id:this.$route.query.id,
                  mid:this.$route.query.mid,
                  max_id_type:0
                }
            }).then(response => {
              this.comments=response.data.data.data
             }, err => {
                 alert(err)
             })
  },
  		components:{
            VideoPlay,
            More
       },
  methods:{
          ret(){
              this.$router.go(-1)
          },
          decs(){
              this.is=false
		          this.ur=''
          },
          plays(va){
          	 this.is=true
          	this.ur=va
          },
          zf(){
          	this.$refs.zf.className='act'
          	this.$refs.p.className=''
          	this.$refs.z.className=''
          	this.jbt=false
          	this.ibt=true
          	this.axios.get('/api/api/statuses/repostTimeline/',{
                params:{
                  id:this.$route.query.id,
                  page: 1
                }
            }).then(response => {
           this.comments=response.data.data.data
   
             }, err => {
                 alert(err)
             })
          },
          p(){
          	this.$refs.zf.className=''
          	this.$refs.p.className='act'
          	this.$refs.z.className=''
          	this.jbt=false
          	this.ibt=false
          	this.axios.get('/api/comments/hotflow/',{
                params:{
                  id:this.$route.query.id,
                  mid:this.$route.query.mid,
                  max_id_type:0
                }
            }).then(response => {
              this.comments=response.data.data.data
              console.log(this.comments)
             }, err => {
                 alert(err)
             })
          	
          },
          z(){
          	this.$refs.zf.className=''
          	this.$refs.p.className=''
          	this.$refs.z.className='act'
          	this.jbt=true
          	this.ibt=false
          	this.axios.get('/api/api/attitudes/show/',{
                params:{
                  id:this.$route.query.id,
                  page:1
                }
            }).then(response => {
              this.comments=response.data.data.data
              console.log(this.comments)
             }, err => {
                 alert(err)
             })
          	
          },
          addI(){
          	this.i++
          	this.axios.get('/api/api/statuses/repostTimeline/',{
                params:{
                  id:this.$route.query.id,
                  page: this.i
                }
            }).then(response => {
            if(response.data.data!==undefined){
           	for(let z=0;z<response.data.data.data.length;z++){
           		this.comments.push(response.data.data.data[z])
           		}
           	}
             }, err => {
                 alert(err)
             })
          },
          addJ(){
          	this.j++
          	this.axios.get('/api/api/attitudes/show/',{
                params:{
                  id:this.$route.query.id,
                  page:this.j
                }
           }).then(response => {
           	for(let m=0;m<response.data.data.data.length;m++){
           		this.comments.push(response.data.data.data[m])
           	}
             
             }, err => {
                 alert(err)
             })
          }
          
  }
}
</script>

<style>
.xq div{
	box-sizing: border-box;
	
}
.xq{
	width: 100%;
	position: relative;
	padding-top: 44px;
	padding-bottom: 52px;
	
}
.top{
	width: 100%;
	height: 44px;
	background:  #fafafa;
	position: fixed;
	top: 0px;
	max-width: 750px;
	z-index: 100;
}
.top .b{
	position: absolute;
	left: 10px;
	top: 10px;
}
.top .a{
	position: absolute;
	right: 5px;
	top: 10px;
	font-size: 30px!important;
}
.top .detit{
	width: 100%;
	text-align: center;
	color: #282f3c;
	font-size: 16px;
	line-height: 44px;
}
.item.br{
	overflow: hidden;
	padding-top: 20px;
	padding-bottom: 6px;
	border-bottom: 6px solid #e6e6e6!important;
}
.pl{
	width: 100%;
	height: 40px;
	color: #a5aeb5;
	padding-left: 15px;
	font-size: 15px;
	border-bottom:2px solid #e6e6e6;
	background: #fff;
}
.pl li{
	float: left;
	width: 30%;
	line-height: 40px;
}
.pl li.act{
	color: #697480;
}
.pl li.act i{
   position:relative;
	}
.pl li.act i:after{
	  content: '_';
	  position: absolute;
	 font-size: 32px;
	  top: -16px;
	  left: 8px;
	  
	}
.bottom{
	width: 100%;
	height:50.5px;
	border-top:1px solid #e6e6e6;
	position: fixed;
	background: #fff;
	color: #a5adb5;
	font-size: 16px;
	line-height: 50.5px;
	bottom: 0;
	max-width: 750px;
	z-index: 100;
}
</style>