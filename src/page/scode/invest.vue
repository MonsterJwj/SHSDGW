<template>
 <div class="scode">
     <SmallBanner>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>业务范围</el-breadcrumb-item>
            <el-breadcrumb-item>投资</el-breadcrumb-item>
        </el-breadcrumb>
        <img :src="imgUrl" slot="banner">
        <h4 slot="title">投资</h4>
     </SmallBanner>
     <div class="cont">
        <div class="scodeImg">
            <img :src="contImg">
        </div>
        <div class="txtCont" v-for="(item,index) in investList" :key="index">
            <div class="txt" v-html="item.Content"></div>
        </div>
     </div>
 </div>
</template>

<script>
import SmallBanner from '../../component/smallBanner'
export default {
 data() {
    return {
        investList:[],
        imgUrl:"",
        contImg:""
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
        this.investList = JSON.parse(res.data).Rows;
    }).catch((err)=>{
        throw err;
    });

    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        FieldNames:['Content'],
        DataJSONString: JSON.stringify({CommonInfoType:102}),
        Resource: "CommonInfo",
        PageControl: { PageSize: 0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        let list = JSON.parse(res.data).Rows[2];
        // 截取图片路径
        let img = list.Content;
        var regex = /<img.*?src="(.*?)"/;
        this.contImg = regex.exec(img)[1];
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
            max-width: 11.1rem;
        }
    }
    .txt{
        /deep/h6{
            margin-top: .26rem;
            font-weight: bold;
            color: #004387;
            font-size: 14px;
            font-stretch: normal;
            line-height: .26rem;
        }
        /deep/p{
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: .26rem;
            letter-spacing: 0rem;
            color: #333;
        }
        img{
            max-width: 11.39rem;
        }
    }
}

</style>
