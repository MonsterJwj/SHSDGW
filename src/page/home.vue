<template>
 <div class="home">
    <play-img></play-img>
    <div class="news">
       <Accordion></Accordion>
    </div>
    <div class="profession">
      <div class="pro_Box" v-for="(item,index) in picsList" :key="index">
        <router-link :to="item.URLLink.substring(1)">
          <img :src="item.ImagePath">
        </router-link>
      </div>
    </div>
 </div>
</template>

<script>
import PlayImg from '../component/playImg'
import Accordion from '../component/homeAccordion'
export default {
 data() {
  return {
    // 业务范围
    picsList:[]
  }
 },
 methods: {

 },
 computed: {
  
 },
 mounted(){
   this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        DataJSONString: JSON.stringify({CommonInfoType:102}),
        Resource: "CommonInfo",
        PageControl: { PageSize: 0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        this.picsList = JSON.parse(res.data).Rows;
    }).catch((err)=>{
      throw err;
    });
 },
 components: {
    Accordion,
    PlayImg
 }
}
</script>

<style scoped lang="less">
.home{
    width: 100%;
    .news{
      padding: .20rem 0 0 .20rem;
      overflow: hidden;
    }
    .profession{
      margin-top: .30rem;
      padding-left: .20rem;
      display: flex;
      .pro_Box{
        position: relative;
        margin-right: .16rem;
        height: 1.1rem;

        flex: 1;
        .cover{
          width: 50%;
          height: 100%;
          background: #2674b7;
          opacity: .7;
          
          position: absolute;
          top: 0;
          right: 0;
        }
        img{
          width: 100%;
          height: 1.1rem;
        }
      }
      .pro_Box:last-child{
        margin-right: 0;
      }
    }
}
</style>
