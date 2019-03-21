<template>
  <div id="app">
  	<div class="login" @click="opens" v-if="$route.name!=='details'&&$route.name!=='search'&&$route.name!=='searchpage'" ref="lo">注册/登录</div>
  	<div class="login1" v-if="$route.name==='searchpage'">微博内打开</div>
  	<div class="login2" v-if="isoff">
  		<span class="off" @click="off">x</span>
  		<span class="login-title">登录注册更精彩</span>
  		<span class="p">登录注册表示同意<i>隐私条款</i>，<i>隐私条款</i></span>
  		<span class="phone">
  			<select>
  <option value="volvo">+86</option>
  <option value="saab"></option>
  <option value="opel"></option>
  <option value="audi"></option>
</select>
<input placeholder="输入手机号" />
  		</span>
  		<span class="yz">获取验证码</span>
  		<span class="zh">用账号密码登录</span>
  		<span class="qtdl">其他登录方式</span>
  		<span class="qq"><i><img src="../public/img/QQ.png" /></i></span>
  		<span class="qq1">QQ</span>
  	</div>
  	<div class="heard" v-if="$route.name!=='details'&&$route.name!=='search'&&$route.name!=='searchpage'">
		<div class="searc">
		<div class="logo">
		<img src="../public/img/weibologo.png"/>
		</div>
		<div class="input">
		      <span class="text" v-if="list.hot" @click="search"><i class="iconfont icon-sousuo"></i>大家都在搜:{{list.hot.hotWord}}</span>
		</div>
		<div class="wr">
		   <i class="iconfont icon-bianji"></i>
		</div>
		</div>
		<div class="nav">
		    <ul>
		    	<li v-for="(c,i) in list.channel" :key="i" v-if="c.gid">
		    	     <router-link :to="{name:c.gid}" exact>{{c.name}}</router-link>
		    	</li>
		    </ul>
		</div>
		<div class="jt">
			<i class="iconfont icon-jiantou"></i>
		</div>
	</div>
	<router-view :containers="container" :n="num"></router-view>
  <button @click="loading" v-if="$route.name!=='details'&&$route.name!=='search'&&$route.name!=='searchpage'">加载更多</button>
  </div>
</template>
<script>
import Content from './components/Content'
  const list='/api/api/config/list'
	import router from './router.js'
      export default {
        name: 'app',
        data(){
        	return {
        		  container:{},
        		  list:{},
        		  gid:'',
        		  isshow:true,
        		  xr:false,
        		  num:1,
        		  isoff:false
        	}
        },
        created() {
        this.gid=this.$route.name
          this.axios.get('/api/container/getIndex/',{
                params:{
                  containerid:this.gid,
                  openAp:0,
                  page:0
                }
            })
            .then(response => {
            		if(response.data.data){
                 this.container=response.data.data.cards
                }
             }, err => {
                 alert(err)
             })
        
             this.axios.get(list).then(response => {
                 this.list=response.data.data
             }, err => {
                 alert(err)
             })
        },
        
      mounted() {
        window.addEventListener('scroll', this.handleScroll, true)
        },
        router,
        methods:{
          search(){ 
          	this.$router.push({path:'/search',query:{sear:this.list.hot.hotWord}})
          },
          player(ul){
              this.open=true
              console.log(ul)
          },
          handleScroll(){ 
          	if(this.$refs.lo){
                 if(window.pageYOffset===0){
                 	    this.$refs.lo.style.display="block"
                 }else{
                 	 this.$refs.lo.style.display="none"
                 }
                 }
          },
          off(){
          	this.isoff=false
          },
          opens(){
          	this.isoff=true
          },
          loading(){
                this.num++
                this.axios.get('/api/container/getIndex/',{
                params:{
                  containerid:this.gid,
                  openAp:0,
                  page:this.num
                }
               }).then(response => {
               	if(response.data.data){
               for(var i=0;i<response.data.data.cards.length;i++){
                    this.container.push(response.data.data.cards[i])    
               }
               }
       
             }, err => {
                 alert(err)
             })
          }
           
        },
        watch:{
          $route(val){
          	if(val.name!=='details'&&val.name!=='search'&&val.name!=='searchpage'){
                this.gid=val.name
                this.axios.get('/api/container/getIndex/',{
                params:{
                  containerid:this.gid,
                  openAp:0,
                  page:0
                }
               }).then(response => {
               		if(response.data.data){
                 this.container=response.data.data.cards
                 }
             }, err => {
                 alert(err)
             })
            }else{
        
            }
          	}
         }
      }
</script>

<style>
	div{
		box-sizing: border-box;
	}
  #app{
   max-width: 750px;
   margin: 0 auto;
   position: relative;
   background: #ebebec;
   height: 100%;
  }
  .login{
  	width: 130px;
  	height: 38px;
  	background: #1b9af4;
  	color: hsla(0,0%,100%,.9);
    box-shadow: 0 6px 30px 0 rgba(52,96,183,.28);
    position: fixed;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: 50px;
    z-index:120;
    text-align: center;
    line-height: 38px;
    border-radius: 38px;

  }
   .login1{
  	width: 130px;
  	height: 38px;
  	    background: #fd993c;
  	color: hsla(0,0%,100%,.9);
    box-shadow: 0 6px 30px 0 rgba(52,96,183,.28);
    position: fixed;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: 50px;
    z-index:120;
    text-align: center;
    line-height: 38px;
    
    border-radius: 38px;

  }
 .login2{
  	position: fixed;
  	width: 100%;
  	height: 100%;
  	top: 0;
  	background: #fff;
  	z-index: 150;
  	padding-left: 24px;
  	padding-right: 24px;
  	overflow: hidden;
  	}
  	.login2 .phone{
  		float: left;
  		width: 100%;
  		height: 45px;
  		margin-top: 60px;
  		border-bottom: 1px solid #cac8c8;
  	}
  	.login2 .off{
  		font-size: 30px;
  		position: absolute;
  		left: 10px;
  		top: 0;
  	}
  	.login2 .login-title{
  		float: left;
  		width:100%;
  		    color: #000;
  		    font-size: 30px;
  		    height: 73.6px;
  		    line-height: 73.6px;
  	padding-top: 16.8px;
  	padding-bottom: 16.8px; 
  	margin-top: 20px;	    
  	}
  	.login2 .p{
  		float: left;
  		padding-top: 10px;
  		color: #636363;
  	}
  	.login2 .p i{
  		    color: #507DAF;
  	}
  	.login2 .yz{
  		float: left;
  		width: 100%;
  		height: 40px;
  		border-radius: 40px;
  		background: rgba(27,154,244,.5);
  		margin-top: 84px;
  		color: #fff;
  		font-size: 17px;
  		line-height: 40px;
    text-align: center;
  	}
  	.login2 .zh{
  		float: left;
  		width: 100%;
  		height: 13.6px;
  		 color: #507DAF;
  		 font-size: 13.6px;
  		 margin-top: 15px;
  	}
  	.login2 .qtdl{
  		float: left;
  		width: 100%;
  		 color: #939393;
    text-align: center;
    margin-top: 70px;
    font-size: 13.6px;
  	}
  		.login2 .qq{
  			float: left;
  			width: 100%;
  			height: 45.4px;
  			position: relative;
  		}
  		.login2 .qq i{
  			width: 30px;
  			height: 30px;
  			margin: 0 auto;
  			position: absolute;
  			top: 35px;
  			left: 0;
  			right: 0;
 
  		}
  		.login2 .qq1{
  			margin-top: 25px;
  			float: left;
  			width: 100%;
  			text-align: center;
  			height: 10.4px;
  			font-size: 10px;
  			color: #939393;
  		}
  	.login2 .qq i>img{
  			width: 30px;
  			height: 30px;
  		}
	.heard{
	  max-width: 750px;
		width: 100%;
		height: 84px;
		background: #fafafa;
		border-color: #e6e6e6;
		position: fixed;
		top: 0;
		z-index: 100;
	
	}
	.searc{
	
		width: calc(100%);
		height: 40px;
		padding-left:12px;
		padding-right:12px;
	}
	.searc .logo{
	float: left;
	  width: 26px;
	  height: 40px;
	  position: relative;
 
	}
	.searc .input{
		margin-left: 10px;
	float: left;
	 width: calc(100% - 26px - 20px - 20px);
	 height: 40px;
	 padding: 6px;
	}
	.searc .input>.text{
		height: 28px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	display:block;
	   width: 100%;
	   background: #ebebec;
	   border-radius: 1px;
	   color: #bdbdbd;
	   font-size: 14px;
	  line-height: 28px;
	  padding-left: 10px;
	  box-sizing: border-box;
	}
	.searc .wr{
	float: left;
	width: 20px;
	  height: 40px;

	}
	.searc img{
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

	}
	.nav{
		float: left;
		width: calc(100% - 43px);

		height: 44px;
		overflow-x: auto;
		white-space:nowrap;
        
	}
	.nav::-webkit-scrollbar{
       display:none;
	}
	
	.nav ul{
		width:235%;
		height: 100%;
	}
	.nav li{
		float: left;
		width: 9%;
		line-height: 44px;
		text-align: center;
		font-size: 16px;
		
	}
	.nav li a{
	   color: #a5adb5;
	}
	.nav li a.router-link-active{
   position:relative;
	 color: #000;
	}
	.nav li a.router-link-active:after{
	  content: '_';
	  position: absolute;
	 font-size: 32px;
	  top: -14px;
	  left: 0;
	  right: 0;
	  
	}
	.jt{
		float: left;
		width: 43px;
		height: 44px;
	}
	.jt i{
		margin-left:10px ;
	}
	.jt i:before{
		font-size: 25px !important;
		color: #a5adb5;
		line-height: 44px;
		}
</style>
