<template>
 <div class="scode">
     <SmallBanner>
        <span>业务范围</span><span class="arrows"></span><span>投资</span><span class="arrows"></span>
        <img :src="imgUrl" slot="banner">
        <h4 slot="title">投资</h4>
     </SmallBanner>
     <div class="cont">
        <div class="scodeImg">
            <img src="../../assets/img/scode_f.jpg">
        </div>
        <div class="txt" v-html="investList.Content"></div>
     </div>
 </div>
</template>

<script>
import SmallBanner from '../../component/smallBanner'
export default {
 data() {
    return {
        investList:[],
        imgUrl:""
    }
 },
 mounted(){
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        FieldNames:['ImagePath'],
        DataJSONString: JSON.stringify({CommonInfoType:11}),
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
        DataJSONString: JSON.stringify({}),
        Resource: "Investment",
        PageControl: { PageSize: 1, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        this.investList = JSON.parse(res.data).Rows[0];
        console.log(this.investList);
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
.cont{
    padding: 0 .20rem;
    .scodeImg{
        padding: .20rem;
        background: #f7f7f7;
        img{
            width: 11.1rem;
        }
    }
    .txt{
        /deep/h6{
            margin-top: .26rem;
            font-weight: bold;
            color: #004387;
            font-size: .14rem;
            font-stretch: normal;
            line-height: .26rem;
        }
        /deep/p{
            font-size: .14rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: .26rem;
            letter-spacing: 0rem;
            color: #333;
        }
    }
}

</style>
