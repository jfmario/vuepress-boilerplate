<!-- 
Component FeaturedImage
Usage:
  <FeaturedImage caption="Caption Text" src="/path/to/img" />
-->

<template>
  <div
    class="custom-block tip"
    style="float:right; margin-left:4px; width:30%;"
  >
    
    <img
      style="margin-top:8px"
      v-bind:src="src"
    />
    
    <p>{{ caption }}</p>
  </div>
</template>

<script>
  export default {
    props: ['src', 'caption']
  };
</script>