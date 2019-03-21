<template>
	<div class="com">
	    <ul>
	    <li v-for="(m,z) in com" :key="z">
	    	<img :src="m.user.profile_image_url"/>
	    	<div class="cont">
	    		<div :class="m.total_number?'m-t':'m-t2'">{{m.user.screen_name}}</div>
	    		<div class="m-text" v-html="m.text"></div>
	    		<div class="m-hf" v-if="m.total_number" >
	    			<a v-if="m.more_info_users" :href="m.more_info_users[0].profile_url">{{m.more_info_users[0].screen_name}}</a>等人
	    			<a href="">共{{m.total_number}}条回复></a>
	    		</div>
	    		<div class="m-time" v-if="m.number_display_strategy">{{m.created_at}}</div>
	    		<div class="m-time" v-if="m.total_number">
	    			<div class="c-time">{{Math.round((new Date().getTime()-new Date(m.created_at).getTime())/1000/60/60)}}小时前</div>
	    			<div class="c-d">
	    				   <span v-if="m.like_count>10000">{{Number((m.like_count/10000).toFixed(1))}}万</span>
                           <span v-else="m.like_count/10000">{{m.like_count}}</span>
	    			</div>
	    		</div>
	    	</div>
	    </li>
	    </ul>
	</div>
</template>

<script>
export default {
  name: 'More',
  props:['com']
}

</script>

<style>

	.com li{
		width: 100%;
		padding:10px 0 0 15px;
		box-sizing: border-box;
		overflow: hidden;
		background: #fff;
	}
	.com li img{
		float: left;
		width: 32px;
		border-radius: 50%;
		height: 32px;
	}
	.com li .cont{
		overflow: hidden;
		float: left;
		width: calc(100% - 32px);

		border-bottom: 1px solid #e6e6e6; 
		padding: 0 15px 15px 10px;
	}
	.com li .cont .m-t{
		width: 100%;
		height: 20px;
	    color: #333;
	    font-size: 16px;
	}
	.com li .cont .m-t2{
		width: 100%;
		height: 20px;
		line-height: 30px;
	    color: #333;
	    font-size: 16px;
	}
	.com li .cont .m-text{
		margin-top: 10px;
		line-height: 1.4;
		width: 100%;
	    color: #333;
	    font-size:17px;
	    word-wrap:break-word;
	    padding-bottom: 5px;
	}
	.com li .cont .m-text .url-icon{
	    line-height: 1.4;
	}
	.com li .cont .m-text .url-icon img{
	    width: 16px !important;
	    height: 16px !important;
	    margin-top: 5px;		
	}
	.com li .cont .m-hf{
		line-height: 1.4;
		padding: 11px;
		width: 100%;
		background: #f7f7f7;
		color: #333;
		word-wrap: break-word;
		font-size: 14px;
	}
	.com li .cont .m-hf a{
	     color: #507daf;
         cursor: pointer;
    }
    .com li .cont .m-time{
    	width: 100%;
    	height: 16px;
    	padding-top: 10px;
    	 font-size:11px;
         color: #999;
    }
    .com li .cont .m-time .c-time{
    	 float: left;
    }
    .com li .cont .m-time .c-d{
    	float: right;
    }
</style>