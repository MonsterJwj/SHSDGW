<template>
 <div class="histroy">
     <SmallBanner>
        <span>关于我们</span><span class="arrows"></span><span>发展历程</span><span class="arrows"></span>
        <img :src="imgUrl" slot="banner">
        <h4 slot="title">发展历程</h4>
     </SmallBanner>
     <div class="his_content" v-html="historyList.Content"></div>
 </div>
</template>

<script>
import SmallBanner from '../../component/smallBanner'
export default {
 data() {
    return {
        historyList:[],
        imgUrl:""
    }
 },
 mounted(){
     this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        FieldNames:['ImagePath'],
        DataJSONString: JSON.stringify({CommonInfoType:6}),
        Resource: "CommonInfo",
        PageControl: { PageSize:0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        let img = JSON.parse(res.data).Rows[0];
        this.imgUrl = img.ImagePath;
    }).catch((err)=>{
        throw err;
    });
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchAllEnabled",
        FieldNames:['Content'],
        DataJSONString: JSON.stringify({}),
        Resource: "DevelopmentHistory",
        PageControl: { PageSize: 0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
      this.historyList = JSON.parse(res.data).Rows[0];
    }).catch((err)=>{
      throw err;
    });
 },
 components: {
     SmallBanner
 }
}
</script>

<style scoped lang="less">
.histroy{
    .sma_banner{
        h4{
            margin-bottom: 0;
        }
    }
    .his_content{
        font-size: 14px;
        padding: 0 .20rem .20rem .20rem;
        /deep/p{
            font-weight: bold;
            line-height: .26rem;
            letter-spacing: 0rem;
            color: #004387;
            margin: .34rem 0;
        }
        /deep/ul{
            font-size: 14px;
            padding-left: .2rem;
            li{
                font-weight: normal;
                letter-spacing: 0rem;
                color: #333333;
                line-height: .24rem;
                &:before {
                    content: "";
                    display: inline-block;
                    width: .08rem;
                    height: .08rem;
                    background-color: #004387;
                    border-radius: 50%;
                    margin-right: .07rem;
                    margin-left: -.18rem;
                }
            }
        }
    }
}
</style>
