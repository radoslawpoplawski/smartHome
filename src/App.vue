<template>
    <div>
      <router-view></router-view>
    </div>
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {
        loading: true
      }
    },
    methods: {}
  }
</script>

<style src="./assets/scss/app.scss" lang="scss"></style>
