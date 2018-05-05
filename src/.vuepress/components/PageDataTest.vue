<!--
Component PageDataTest
Usage:
  <PageDataText :page="$page" />
-->

<template>
  <div>
    <p>This is the page data:</p> {{ page }}
  </div>
</template>

<script>
  export default {
    props: ['page']
  };
</script>