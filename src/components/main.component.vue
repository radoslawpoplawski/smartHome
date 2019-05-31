<template>
    <div style="display: flex;">
        <div @click="turnOn" style="margin: 5px; padding: 10px; text-align: center; display: inline-block; cursor: pointer; width: 100px; height: 100px; background-color: green; border-radius: 5px;">
           FAN ON
        </div>
        <div @click="turnOff" style="margin: 5px; padding: 10px; text-align: center; display: inline-block; cursor: pointer; width: 100px; height: 100px; background-color: red; border-radius: 5px;">
           FAN OFF
        </div>
        <div @click="moveUp" style="margin: 5px; padding: 10px; text-align: center; display: inline-block; cursor: pointer; width: 100px; height: 100px; background-color: yellow; border-radius: 5px;">
           BLIND UP
        </div>
        <div @click="moveDown" style="margin: 5px; padding: 10px; text-align: center; display: inline-block; cursor: pointer; width: 100px; height: 100px; background-color: grey; border-radius: 5px;">
           BLIND DOWN
        </div>
    </div>
</template>

<script>
  import {apiService} from "../services/api.service";

  export default {
    name: 'MainComponent',
    data () {
      return {}
    },
    methods: {
      turnOn () {
        apiService.fanOn().then(res => {
          // alert(res)
        })
      },
      turnOff () {
        apiService.fanOff().then(res => {
          // alert(res)
        })
      },
      moveUp () {
        apiService.moveUp().then(res => {
          // alert(res)
        })
      },
      moveDown () {
        apiService.moveDown().then(res => {
          // alert(res)
        })
      }
    },
    created () {}
  }
</script>

<style src="../assets/scss/components/main.component.scss" lang="scss"></style>
