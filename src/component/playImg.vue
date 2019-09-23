<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <!-- slides -->
    <swiper-slide v-for="(item,index) in imgList" :key="index"><img :src="item"></swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</template>

<script>
  export default {
    name: 'carrousel',
    data() {
      return {
        imgList:[],
        swiperOption: {
            autoplay: {
                delay: 3000,//3秒切换一次
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
                },
            loop:true
            },
        }
    },
    mounted(){
      this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        FieldNames:["Content"],
        DataJSONString: JSON.stringify({CommonInfoType:100}),
        Resource: "CommonInfo",
        PageControl: { PageSize: 0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
      }).then((res)=>{
        let bannerList = JSON.parse(res.data).Rows;
        // 截取img的src路径
        let img = bannerList[0].Content;
        let imgReg = /<img\b.*?(?:\>|\/>)/gi;
        let arr = img.match(imgReg);
        for(let m=0;m<arr.length;m++){
            let imgArr = arr[m].split("\"");
            this.imgList.push(imgArr[1]);
        }
      }).catch((err)=>{
        throw err;
      });
    }
  }
</script>

<style>
.home .swiper-container-horizontal >.swiper-pagination .swiper-pagination-bullet{
    width: 1.60rem;
    height: .10rem;
    border-radius: 0;
    background: #d9d9d9;
    border-right: .02rem solid #fff;
    margin: 0!important;
    opacity: 1;
}
.home .swiper-container-horizontal >.swiper-pagination .swiper-pagination-bullet-active{
  background: #004486;
}
.home .swiper-container-horizontal >.swiper-pagination-bullets{
  bottom: -.05rem;
}
.home .swiper-slide img{
  width: 11.9rem;
  height: 4.41rem;
}
</style>
