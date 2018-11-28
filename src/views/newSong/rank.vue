<template>
  <div class="rankList">
    <ul>
      <li v-for="(ranklist,index) in ranklist " :key='index'>
        <div class="rankleft">
          <img :src='ranklist.banner7url' />
        </div>
        <div class="rankright" @click="rankdetail(ranklist.rankid)">
          <p>{{ranklist.rankname}}</p>
          <van-icon name="arrow" />
        </div>
        <div class="clear:both;"></div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ranklist: [],
        rankid: ""
      }
    },

    created() {
      this.songrank()
    },
    methods: {
      songrank() {
        let url = '/api/rank/list&json=true'
        let size = 400;
        this.axios.get(url).then(res => {
          this.ranklist = res.data.rank.list
          this.ranklist.forEach(val => {
            let rankarr = val.bannerurl.split('{size}');
            let rankbig = val.banner7url.split('{size}')
            val.bannerurl = rankarr[0] + "400" + rankarr[1];
            val.banner7url = rankbig[0] + "400" + rankbig[1];
          })
        }).catch(err => {
          //todo
        })
      },
      rankdetail(id) {
        this.$router.push({
          path: '/rankdetail',
          name: 'Rankdetail',
          params: {
            "rankid": id,
            "page": 1
          }
        })
      }
    }
  }
</script>

<style scoped>
  .rankList ul li {
    height: 100px;
    padding: 20px 0px;
    margin: 0px 20px;
    border-bottom: 1px solid #e5e5e5;
  }

  .rankList ul li div {
    display: inline-block;
    float: left;
    position: relative;
  }

  .rankList ul li .rankleft {
    width: 40%;
    height: 100%;
  }

  .rankList ul li .rankleft img {
    max-width: 100%;
    height: 100%;
    margin: 0px;
  }

  .rankList ul li .rankright {
    float: right;
    text-align: left;
    width: 60%;
    font-size: 20px;
    height: 100%;
    line-height: 50px;
  }

  .rankList ul li .rankright p {
    display: inline-block;
  }

  .rankList ul li .rankright i {
    position: absolute;
    right: 0;
    top: 30px;
  }
</style>
