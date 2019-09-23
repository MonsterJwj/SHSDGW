<template>
 <div class="projectDetial">
    <div class="mainDeti">
        <div class="txt">
            <!-- 标题 -->
            <h4>{{detialData.Name}}</h4>
            <!-- 重要信息 -->
            <div class="introduce" v-html="detialData.Important"></div>
            <!-- 详细介绍 -->
            <div class="describe" v-html="detialData.Description"></div>
        </div>
        <!-- 图集 -->
        <div class="detPic">
            <img :src="imgList[imgIndex]">
            <div class="smallPic">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(slide, index) in imgList" :key="index"><img :src="slide" @click="changeImg(index)"></swiper-slide> 
                </swiper>
                <div class="swiper-button-next swiper-button-black"></div>
                <div class="swiper-button-prev swiper-button-black"></div>
            </div>
        </div> 
    </div>
 </div>
</template>

<script>
import SmallBanner from '../../component/smallBanner'
export default {
 data() {
    return {
        detialData:[],
        num:"",
        imgIndex:0,
        imgList:[],
        swiperOption: {
            slidesPerView: 4,
            spaceBetween: 9,
            slidesPerGroup: 1,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        }
    }
 },
 methods: {
    changeImg(index){
        this.imgIndex = index;
    }
 },
 mounted(){
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        DataJSONString: JSON.stringify({ECType : 1}),
        Resource: "EngineeringConstruction",
        PageControl: { PageSize: 0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        this.detialData = JSON.parse(res.data).Rows;
        
        for(let i=0;i<this.detialData.length;i++){
            // 根据id获取对应的内容
            if(this.$route.params.id == this.detialData[i].ID){
                this.detialData = this.detialData[i];
                // 截取图片路径
                let img = this.detialData.SliderBar;
                let imgReg = /<img\b.*?(?:\>|\/>)/gi;
                let arr = img.match(imgReg);
                for(let m=0;m<arr.length;m++){
                    let imgArr = arr[m].split("\"");
                    this.imgList.push(imgArr[1]);
                }
            }
        }
    }).catch((err)=>{
      throw err;
    });

    this.num = this.$route.params.id;
 },
 components: {
    SmallBanner
 }
}
</script>

<style scoped lang="less">
.projectDetial{
    margin: .23rem .2rem 0 .2rem;
    padding: .2rem .2rem .33rem .18rem;
    background: #f8f8f8;

    .mainDeti{
        display: flex;
    }
    .txt{
        h4{
            font-size: .18rem;
            font-weight: bold;
            font-stretch: normal;
            line-height: .36rem;
            letter-spacing: 0;
            color: #333333;
            margin-bottom: .13rem;
        }
        /deep/p{
            font-size: .14rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: .24rem;
            letter-spacing: 0;
            color: #333333;
            span{
                display: inline-block;
                width: .6rem;
                margin-right: .21rem;
            }
        }
        .describe{
            text-indent: .28rem;
            margin-top: .19rem;
            /deep/img{
                margin-top: .2rem;
                width: 5rem;
                height: 3rem;
            }
        }
    }
    .detPic{
        margin-left: .43rem;
        width: 5.6rem;
        img{
            width: 5.6rem;
            height: 3.4rem;
            cursor: pointer;
        }
        .smallPic{
            margin-top: .2rem;
            width: 5.6rem;
            position: relative;
            .swiper-container,.swiper-wrapper{
                width: 5.2rem;
                .swiper-slide{
                    width: 1.21rem!important;
                    &:first-child{
                        margin-left: .08rem;
                    }
                }
            }
            img{
                width: 1.21rem;
                height: .73rem;
                margin: 0;
            }
            .swiper-button-prev{
                left: -.08rem;
                margin-top: 0;
                transform: translateY(-50%);
            }
            .swiper-button-next{
                right: -.05rem;               
            }
            .swiper-button-prev.swiper-button-black{
                background: url("../../assets/img/project_det_arrowsL.jpg") no-repeat center center;
                background-size: .11rem .17rem;
            }
            .swiper-button-next.swiper-button-black{
                background: url("../../assets/img/project_det_arrowsR.jpg") no-repeat center center;
                background-size: .11rem .17rem;
            }
        }
    }
}
</style>
