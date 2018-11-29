<template>
  <section>
    <div class="search">
      <van-search placeholder="请输入搜索关键词" v-model="value" />
    </div>
    <div class="tabs">
      <van-tabs>
        <van-tab title="新歌">
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
              <img :src="image" />
            </van-swipe-item>
          </van-swipe>
          <ul class="songlist">
            <li v-for="(item,index) in datalist" :class="item.audio_id" :key="index">
              <div class="list_left" :data-hash="item.hash" @click="getmusicInfo(item.hash,index)">
                <span>{{item.filename}}</span>
              </div>
              <div class="list_right">
                <i class="el-icon-download"></i>
              </div>
              <div style="clear:both"></div>
            </li>
          </ul>
        </van-tab>
        <van-tab title="排行">
          <Rank></Rank>
        </van-tab>
        <van-tab title="歌单">
          <Songlist></Songlist>
        </van-tab>
        <van-tab title="歌手">
          <Singerinfo></Singerinfo>
        </van-tab>
      </van-tabs>
    </div>
    <van-popup v-model="show" position="bottom" :overlay="false" :lock-scroll="false">
      <Player :message="playersrc" :playimg="playimg" :songtitle="songtitle"></Player>
    </van-popup>
  </section>
</template>

<script>
  import Rank from './rank.vue';
  import Songlist from './songlist.vue';
  import Singerinfo from './singerinfo.vue'
  import Player from '../../components/palyer.vue'
  export default {
    data() {
      return {
        value: '',
        images: [],
        banner: [],
        datalist: [],
        playersrc: '',
        playimg: '',
        show: false,
        songtitle: '',
      }
    },
    components: {
      Rank,
      Songlist,
      Singerinfo,
      Player
    },
    created() {
      this.getbanner();
    },
    methods: {
      getbanner() {
        var url = "/api/?json=true";
        this.axios.get(url, {
          params: {
            page: 'json'
          }
        }).then(res => {
        //    this.$store.commit('newIndex',hash)
        //  console.log(this.$store.state)
          this.banner = res.data.banner;
          this.datalist = res.data.data;

          // this.playerimg=res.data.data
          let _this = this;
          this.banner.forEach(function(val, index) {
            _this.images.push(val.imgurl)
          });


        }).catch(err => {
          //todo
        })
      },
     getmusicInfo(hash,index) {
        let url = "/api/app/i/getSongInfo.php/?hash=" + hash + "&from=mkugou&cmd=playInfo";
        this.axios.get(url).then(res => {
          this.show = true;
          this.playersrc = res.data.url;
          this.playimg = res.data.imgUrl;
          let imgarr = this.playimg.split('{size}');
          this.playimg = imgarr[0] + "400" + imgarr[1];
          this.songtitle = res.data.fileName;
        }).catch(err => {
          //todo
        })
      }
    }
  }
</script>

<style scoped>
  html,
  body {
    height: 100%;
  }

  .tabs {
    height: 100%;
    position: relative;
  }

  .tabs img {
    max-width: 100%;
    display: block;
    margin: 0 auto;
    padding-bottom: 15px;
  }

  .tabs .songlist li {
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    border-bottom: 1px solid #ccc;
  }

  .tabs .songlist .list_left {
    float: left;
    width: 70%;
    text-align: left;
    padding-left: 20px;
  }

  .tabs .songlist .list_left span {
    display: inline-block;
    line-height: 30px;
    vertical-align: middle;
  }

  .tabs .songlist .list_right {
    float: right;
    padding-right: 20px;
  }
</style>
