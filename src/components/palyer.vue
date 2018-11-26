<template>
  <div class="player" style="background-color:#e5e5e5;height:100px;">
    <div class="left" style="width:100px;height:100px;">
      <img :src="urlimg" style="width:100px;height:100px;">
    </div>
    <div class="center" style="font-size:30px;width:150px;text-align:center;margin:40px 0px 0px 20px;">
      <van-notice-bar :text="title" :speed="30" style="font-size:15px;width:50px;backrground-color:#e5e5e5 !important;" />
      <van-icon name="play" ref="autoplay" playshow @click="changeplay($event)" />
      <i class="el-icon-caret-right" @click="clickNext($event)"></i>
      <audio :src="src" id="music"></audio>
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
        title: '',
        playshow: false
      }
    },
    props: ['message', "playimg", 'songtitle'],
    watch: {
      'playimg': {
        handler() {
          this.getprops()
        }
      }
    },
    created() {
      this.getprops();
    },
    methods: {
      getprops() {
        this.src = this.message;
        this.urlimg = this.playimg;
        this.title = this.songtitle
      },
      changeplay(e) {
        var audio = document.getElementById('music');
        if (this.playshow) {
          e.target.className = "van-icon van-icon-play";
          audio.pause();
          this.playshow = false;
        } else {
          e.target.className = "van-icon van-icon-pause";
          audio.play();
          this.playshow = true;
        }
      },
      clickNext(e){
        console.log(e)
      }
    }

  }
</script>

<style scoped>
  .player div {
    float: left;
  }

  .van-notice-bar {
    background-color: #e5e5e5;
  }
</style>
