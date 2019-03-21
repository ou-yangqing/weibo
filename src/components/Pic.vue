<template>
<div class="play" v-if="opens">
<button @click="dec">退出</button>
<img :src="urls"/>
</div>
</template>

<script>
export default {
  name: 'Pic',
  props:['opens','urls'],
  methods:{
    dec(){
       this.$emit('decs')
    }
  }
}
</script>

<style>
.play{
width: 100%;
height: 100%;
position: fixed;
left: 0;
top: 0;
background: black !important;
z-index: 101;
}
video{
width: 100%;
}
</style>