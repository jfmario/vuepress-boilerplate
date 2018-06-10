
<template>
  <iframe
    width="560"
    height="315"
    :src="'https://www.youtube.com/embed/' + videoId"
    frameborder="0"
    allow="autoplay; encrypted-media"
    allowfullscreen>
  </iframe>
</template>

<script>
export default {
  props: ['videoId']
}
</script>