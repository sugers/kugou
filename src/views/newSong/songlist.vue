<template>
  <div class="songInfo">
    <ul>
      <li v-for="(infoitem,index) in info " :key='index'>
        <div class="rankleft">
          <img :src='infoitem.imgurl' />
        </div>
        <div class="rankright" @click="runsongdetail(infoitem.specialid)">
          <p>
            <span>{{infoitem.specialname}}</span>
            <span style="margin-top:5px;">
              <i class="el-icon-service"></i>
              {{infoitem.playcount}}
            </span>

          </p>

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
        info: [],
      }
    },
    created() {
      this.getsonglist()
    },
    methods: {
      runsongdetail(id){
        this.$router.push({
          path: '/sonlistdetail',
          name: 'Songlistdetail',
          params: {
            "songid": id,
          }
        })
      },
      getsonglist() {
        let url = '/api/plist/index&json=true';
        this.axios.get(url).then(res => {
          console.log(res)
          this.info = res.data.plist.list.info
          this.info.forEach(val => {
            let infoarr = val.imgurl.split('{size}');
            val.imgurl = infoarr[0] + "400" + infoarr[1];
          })
        }).catch(err => {
          //todo
        })
      }
    }
  }
</script>

<style scoped>
  .songInfo ul li {
    height: 100px;
    padding: 20px 0px;
    margin: 0px 20px;
    border-bottom: 1px solid #e5e5e5;
  }

  .songInfo ul li div {
    display: inline-block;
    float: left;
    position: relative;
  }

  .songInfo ul li .rankleft {
    width: 40%;
    height: 100%;
  }

  .songInfo ul li .rankleft img {
    max-width: 100%;
    height: 100%;
    margin: 0px;
  }

  .songInfo ul li .rankright {
    float: right;
    text-align: left;
    width: 60%;
    font-size: 20px;
    height: 100%;
  }

  .songInfo ul li .rankright p {
    display: inline-block;
    width: 80%;
  }
  .songInfo ul li .rankright p span{
    display:block;
    font-size:16px;
  }

  .songInfo ul li .rankright .van-icon {
    position: absolute;
    right: 0;
    top: 30px;
  }
</style>
