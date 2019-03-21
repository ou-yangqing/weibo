<template>
	<div>
	<Content :content="containers" :s="n"></Content></div>
</template>

<script>
import Content from '../components/Content'
export default {
  name: 'Funny',
    props:['containers','n'],
  components:{
    Content
  }
}
</script>

<style>
</style>