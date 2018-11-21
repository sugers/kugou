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
            <li v-for="(item,index) in datalist" :key="index">
              <div class="list_left">
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
        <van-tab title="歌单"><Songlist></Songlist></van-tab>
        <van-tab title="歌手"><Singerinfo></Singerinfo></van-tab>
      </van-tabs>
    </div>
  </section>
</template>

<script>
import Rank from './rank.vue';
import Songlist from './songlist.vue';
import Singerinfo from './singerinfo.vue'
  export default {
    data() {
      return {
        value: '',
        images: [],
        banner: [],
        datalist: []
      }
    },
    components:{
      Rank,
      Songlist,
      Singerinfo
    },
    created() {
      this.getbanner();
      this.test()
    },
    methods: {
      getbanner() {
        var url = "/api/?json=true";
        this.axios.get(url, {
          params: {
            page: 'json'
          }
        }).then(res => {
          console.log(res)
          this.banner = res.data.banner;
          this.datalist = res.data.data
          let _this = this;
          this.banner.forEach(function(val, index) {
            _this.images.push(val.imgurl)
          });

        }).catch(err => {
          //todo
        })
      },
      test(){
        let url="/api/?hash=17BA5C58B4D8E6AD282DA513BB3F91C9";
        this.axios.get(url).then(res=>{
          console.log(res)
        }).catch(err=>{
          //todo
        })
      }
    }
  }
</script>

<style scoped>
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
