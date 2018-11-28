<template>
  <section>
    <div class="search">
      <van-search placeholder="请输入搜索关键词" />
    </div>
    <div class="van-hairline--bottom van-doc-nav-bar van-nav-bar _bars" style="z-index: 1;position:absolute;width:100%;">
      <div class="van-nav-bar__left">
        <i class="van-icon van-icon-arrow van-nav-bar__arrow growback"></i>
        <span style="font-size:20px;margin-left:20px;height:100%;display:inline-block;">{{specialname}}</span>
      </div>
    </div>
    <div class="img"><img :src="banner7url" alt="" style="width:100%;"></div>
    <div class="expound" style="position:absolute;top:360px;background: #fff;text-align: left;font-size: 18px;">
      <div class="suolie" style="height:25px;overflow: hidden;width:80%;text-overflow:ellipsis;padding:0px 50px 0px 10px;position:relative;">
        {{text}}
        <i class="el-icon-arrow-down changeicon" style="position:absolute;top:0;right:15px;" @click="changecss()"></i>
      </div>

    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        banner7url: "",
        specialname: '',
        text: '',
        isActive: 'false'
      }
    },
    created() {
      this.getsonlidt();
    },
    methods: {
      getsonlidt() {
        let id = this.$route.params.songid;
        let url = "/api/plist/list/" + id + "?json=true"
        this.axios.get(url).then(res => {
          this.specialname = res.data.info.list.specialname;
          this.text = res.data.info.list.intro;
          this.banner7url = res.data.info.list.imgurl.split("{size}");
          this.banner7url = this.banner7url[0] + "400" + this.banner7url[1];
          console.log(res)
        }).catch(err => {
          //todo
        })
      },
      changecss() {
        this.isActive = !this.isActive
        if (this.isActive) {
          // document.getElementsByName('changeicon')[0].className = "el-icon-arrow-up changeicon"
          document.getElementsByClassName('suolie')[0].style.cssText = "height:auto;overflow:auto;width:80%;padding:20px 50px 0px 20px;"
        } else {
          // document.getElementsByName('changeicon')[0].className = "el-icon-arrow-down changeicon"
          document.getElementsByClassName('suolie')[0].style.cssText = "height:25px;overflow: hidden;width:80%;text-overflow:ellipsis;padding:0px 50px 0px 10px;position:relative;"
        }
      }
    }
  }
</script>

<style>
  ._bars {
    width: 100%;
    line-height: 3rem;
    background: -webkit-linear-gradient(top, rgba(0, 0, 0, .6), rgba(0, 0, 0, 0));
    padding: 0 2.1429rem;
    position: relative;
    text-align: center;
    color: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .growback {
    width: 0.85714rem;
    display: inline-block;
    background-size: 100%;
    font-size: 30px;
    color: #fff !important;
    margin-left: 20px;
  }

  .van-hairline--bottom::after {
    border: none;
  }
</style>
