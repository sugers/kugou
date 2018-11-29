<template>
  <section>
     <router-view/>
    <div class="search">
      <van-search placeholder="请输入搜索关键词" v-model="value" />
    </div>
    <div class="singerclass">
      <div class="returnicon">
        <i class="el-icon-arrow-left" @click="returns()"></i>
        <span>{{titleclass}}</span>
      </div>
      <div>
        <ul>
          <li v-for="(item,index) in singerlist" :key="index" >
           <div @click="jumbchildren(item.singerid)">
              <div class="img">
              <img :src="item.imgurl" alt="">
            </div>
            <div class="span">
              <span>{{item.singername}}</span>
            </div>
            <div style="clear:both;"></div>
           </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        singerlist: [],
        singername: '',
        imgurl: '',
        titleclass: '',
        value: ""
      }
    },
    created() {
      this.getsingerinfo();
    },
    methods: {
      returns() {
        this.$router.push({
          path: '/',
          name: 'Newsong'
        })
      },
      getsingerinfo() {
        let singerclass = this.$route.params.singerclass;
        let singerid = this.$route.params.singerid
        this.titleclass = singerclass
        let url = "/api/singer/list/" + singerid + "?json=true";
        this.axios.get(url).then(res => {
          console.log(res)
          this.singerlist = res.data.singers.list.info;
          this.singerlist.forEach(val => {
            val.imgurl = val.imgurl.split("{size}");
            val.imgurl = val.imgurl[0] + "400" + val.imgurl[1];
          });
        }).catch(err => {
          //todo
        })
      },
      jumbchildren(id) {
        this.$router.push({
          path: '/singersong',
          name: 'Singersong',
           params: {
            "singerid":id
          }
        })
      }
    }
  }
</script>

<style scoped>
  .singerclass ul li {
    padding: 20px;
    height: 80px;
    line-height: 80px;
    text-align: left;
  }

  .singerclass ul li+li {
    margin-top: 20px;
  }

  .singerclass ul li div {
    float: left;
  }

  .singerclass ul li .img img {
    width: 80px;
    height: 80px;
  }

  .singerclass ul li .span {
    margin-left: 20px;
    font-size: 20px;
  }

  .returnicon {
    height: 45px;
    line-height: 45px;
    font-size: 20px;
    position: relative;
  }

  .returnicon i {
    font-size: 30px;
    position: absolute;
    left: 20px;
    top: 10px;
  }
</style>
