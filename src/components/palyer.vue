<template>
  <div class="player" style="background-color:#e5e5e5;height:100px;">
    <div class="left" style="width:100px;height:100px;">
      <img :src="urlimg" style="width:100px;height:100px;">
    </div>
    <div class="center" style="font-size:30px;width:150px;text-align:center;margin:40px 0px 0px 20px;">
      <van-notice-bar :text="title" :speed="100" style="font-size:15px;width:50px;backrground-color:#e5e5e5 !important;"/>
      <van-icon name="play" />
      <i class="el-icon-caret-right"></i>
      <audio :src="src"></audio>
    </div>
    <div class="right" style="font-size:30px;margin:40px 0px 0px 20px;text-align:center;">
      <i class="el-icon-download"></i>
    </div>
    <div style="clear:both;"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        src: '',
        urlimg: '',
        title: ''
      }
    },
    props: ['message', "playimg", 'songtitle'],
    created() {
      this.src = this.message;
      this.urlimg = this.playimg;
      this.title = this.songtitle
      console.log(this.title)
    }

  }
</script>

<style scoped>
  .player div {
    float: left;
  }
  .van-notice-bar{
    background-color:#e5e5e5;
  }
</style>
