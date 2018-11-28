
<template>
  <section>
    <div class="search">
      <van-search placeholder="请输入搜索关键词" />
    </div>
    <div class="van-hairline--bottom van-doc-nav-bar van-nav-bar _bar" style="z-index: 1;">
      <div class="van-nav-bar__left">
        <i class="van-icon van-icon-arrow van-nav-bar__arrow growback" @click="runback()"></i>
      </div>
      <div class="van-ellipsis van-nav-bar__title c_title">{{rankname}}</div>

    </div>
    <div class="img"><img :src="banner7url" alt=""></div>
    <div class="detail_content">
      <div class="van-hairline--bottom van-doc-nav-bar van-nav-bar content_bar" style="z-index: 1;">上次更新时间 ：{{datetime}}</div>
      <ul>
        <li v-for="(item,index) in detaillist" :key='index' class="set_style">
          <div class="number" :class=" sstt[index]" v-if="index<=2">
            {{index+1}}
          </div>
          <div class="l_number" v-if="index>2">
            {{index+1}}
          </div>
          <div class="main-content" @click="getmusicInfo(item.hash,index)">
            {{item.filename}}
          </div>
          <div class="icon">
            <i class="el-icon-download"></i>
          </div>
        </li>
      </ul>

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
        rankname: "",
        banner7url: "",
        datetime: new Date().toLocaleDateString(),
        detaillist: [],
        sstt: [
          "ss1",
          "ss2",
          "ss3",
        ],
        show: false,
        playersrc: '',
        playimg: '',
        songtitle: ''
      };
    },
    components: {
      Player
    },
    created() {
      this.getrankid();
    },
    methods: {
      runback() {
        this.$router.push({
          path: '/',
          name: 'Newsong'
        })
      },
      getrankid() {
        let id = Number(this.$route.params.rankid);
        let url = "/api/rank/info/?rankid=" + id + "&page=1&json=true";
        this.axios
          .get(url)
          .then(res => {
            this.rankname = res.data.info.rankname;
            this.banner7url = res.data.info.banner7url.split("{size}");
            this.banner7url = this.banner7url[0] + "400" + this.banner7url[1];

            this.detaillist = res.data.songs.list
          })
          .catch(err => {
            //todo
          });
      },
      getmusicInfo(hash, index) {
        let url = "/api/app/i/getSongInfo.php/?hash=" + hash + "&from=mkugou&cmd=playInfo";
        this.axios.get(url).then(res => {
          this.show = true;
          this.playersrc = res.data.url;
          this.playimg = res.data.imgUrl;
          let imgarr = this.playimg.split('{size}');
          this.playimg = imgarr[0] + "400" + imgarr[1];
          this.songtitle = res.data.fileName;
          if(this.show) document.getElementsByClassName('detail_content')[0].style.cssText="margin-bottom:100px";
        }).catch(err => {
          //todo
        })
      }
    }
  };
</script>

<style scoped>
  .ss1 {
    background: #e80000;
  }

  .ss2 {
    background: #ff7200;
  }

  .ss3 {
    background: #f8b300;
  }

  .growback {
    width: 0.85714rem;
    display: inline-block;
    background-size: 100%;
    font-size: 30px;
    color: #fff;
    margin-left: 20px;
  }

  .c_title {
    font-size: 20px;
    color: #fff;
  }

  ._bar {
    width: 100%;
    height: 46px;
    position: absolute;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    text-align: center;
    line-height: 46px;
    background-color: #fff;
    /* opacity: 0.8; */
    background: -webkit-linear-gradient( top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
  }

  .content_bar {
    width: 95%;
    height: 46px;
    /* position: absolute; */
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    text-align: center;
    line-height: 46px;
    background-color: #fff;
    /* opacity: 0.8; */
    background: -webkit-linear-gradient( bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
    text-align: left;
    color: #fff;
    padding-left: 20px;
  }

  .van-hairline--bottom::after {
    border-bottom-width: none;
  }

  .img img {
    width: 100%;
  }

  .detail_content {
    position: absolute;
    top: 340px;
    bottom: 0;
    background: #fff;
    width: 100%;
    /* height: 100%; */
    overflow: auto;
    /* margin-bottom: 100px; */
  }

  .set_style {
    height: 46px;
    padding: 10px 20px;
  }

  .set_style div {
    float: left;
    width: 33.33%;
    /* padding: 0px 10px; */
  }

  .set_style .number {
    width: 7%;
    margin: 0px 10px 0px 10px;
    font-size: 20px;
    border-radius: 50%/50%;
  }

  .set_style .l_number {
    width: 10%;
    height: 100%;
    font-size: 15px;
  }

  .set_style .main-content {
    width: 75%;
    height: 100%;
    text-align: left;
  }

  .set_style .icon {
    width: 10%;
    height: 100%;
    font-size: 25px;
  }


  /* .number,.main-content{
                      display:inline-block;
                    } */


  /* .main-content{
                      width:200px;
                      padding:0px 10px;
                    } */
</style>

