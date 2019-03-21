<template>
	<div>
	<Content :content="containers" :s="n"></Content></div>
</template>

<script>
import Content from '../components/Content'
export default {
  name: 'Digital',
   props:['containers','n'],
  components:{
    Content
  }
}

</script>

<style>
</style>