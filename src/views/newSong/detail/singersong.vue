<template>
  <section>
    <div>
      <div class="img" style="position:relative;">
        <div class="returnicon">
          <i class="el-icon-arrow-left" @click="returns()"></i>
        </div>
        <img :src="imgurl" alt="" style="width:100%;">
      </div>
      <div class="song_content">
        <ul>
          <li v-for="(item,index) in singerinfo" :key='index'>
            <div class="main-content" @click="getmusicInfo(item.hash)">
              {{item.filename}}
            </div>
            <div class="iconss">
              <i class="el-icon-download"></i>
            </div>
            <div style="clear:both;"></div>
          </li>
        </ul>
      </div>
    </div>
    <van-popup v-model="show" position="bottom" :overlay="false" :lock-scroll="false">
      <Player :message="playersrc" :playimg="playimg" :songtitle="songtitle"></Player>
    </van-popup>
  </section>
</template>

<script>
import Player from '../../../components/palyer.vue'
  export default {
    data() {
      return {
        imgurl: "",
        singerinfo: [],
        show: false,
        playersrc: '',
        playimg: '',
        songtitle: ''
      }
    },
    components: {
      Player
    },
    created() {
      this.songslist();
    },
    methods: {
      returns() {
        this.$router.push({
          path: '/',
          name: 'Newsong'
        })
      },
      songslist() {
        let id = this.$route.params.singerid;
        let url = "/api/singer/info/" + id + "&json=true"
        this.axios.get(url).then(res => {
          this.imgurl = res.data.info.imgurl.split('{size}');
          this.imgurl = this.imgurl[0] + "400" + this.imgurl[1];
          this.singerinfo = res.data.songs.list
          console.log(res)
        })
      },
      getmusicInfo(hash) {
        let url = "/api/app/i/getSongInfo.php/?hash=" + hash + "&from=mkugou&cmd=playInfo";
        this.axios.get(url).then(res => {
          console.log(res)
          this.show = true;
          this.playersrc = res.data.url;
          this.playimg = res.data.imgUrl;
          let imgarr = this.playimg.split('{size}');
          this.playimg = imgarr[0] + "400" + imgarr[1];
          this.songtitle = res.data.fileName;
          if (this.show) document.getElementsByClassName('song_content')[0].style.cssText = "margin-bottom:100px";
        }).catch(err => {
          //todo
        })
      }
    }
  }
</script>

<style scoped>
  .returnicon {
    height: 45px;
    line-height: 45px;
    font-size: 30px;
    text-align: left;
    padding-left: 20px;
    position: absolute;
    width: 100%;
    z-index: 222;
    color: #fff;
    background: -webkit-linear-gradient(top, rgba(0, 0, 0, .6), rgba(0, 0, 0, 0));
  }

  .song_content {
    position: absolute;
    top: 320px;
    background: #fff;
    width: 100%;
  }

  .song_content ul li {
    padding: 10px;
    height: 45px;
    overflow: hidden;
    /* line-height: 45px; */
    font-size: 20px;
    text-align: left;
    position: relative;
  }

  .song_content ul li div {
    float: left;
  }

  .song_content ul li .main-content {
    width: 90%;
  }

  .song_content ul li .iconss {
    position: absolute;
    right: 20px;
    top: 20px;
  }
</style>
