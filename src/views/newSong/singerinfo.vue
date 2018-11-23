<template>
  <div class="singer">
     <ul>
        <li v-for="(singeritem,index) in singerArr" :key="index" >
         <div>
            <span>{{singeritem.classname}}</span>
            <van-icon name="arrow"/>
         </div>
        </li>
     </ul>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        singerArr:[],
      }
    },
    created() {
      this.getsonger();
    },
    methods:{
      getsonger(){
        let url='/api/singer/class&json=true'
        this.axios.get(url).then(res=>{
          this.singerArr=res.data.list
            console.log(res.data.list)
        }).catch(err=>{
          //todo
        })
      }
    }
  }
</script>

<style scoped>
  .singer ul li{
    margin:10px;
    font-size:18px;
    background-color: #fbfbfb;
    border-radius:5px;
  }
  .singer ul li div{
    position:relative;
    padding:20px;
    text-align:left;
  }
  .singer ul li div i{
    position: absolute;
    right: 10px;
  }
</style>
