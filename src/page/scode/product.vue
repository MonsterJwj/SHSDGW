<template>
 <div class="project">
     <SmallBanner>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>业务范围</el-breadcrumb-item>
            <el-breadcrumb-item>产品制造</el-breadcrumb-item>
        </el-breadcrumb>
        <img :src="imgUrl" slot="banner">
        <h4 slot="title">产品制造</h4>
     </SmallBanner>
     <div class="cont">
        <div class="scodeImg">
            <img :src="contImg">
        </div>
        <div class="txt">
            <span>装备制造</span>
            <div class="equipment" v-html="equipmentList.Content"></div>
            <span>构件</span>
            <div class="component" v-html="componentList.Content"></div>
            <span>防水材料</span>
            <div class="waterproo" v-html="waterproofList.Content"></div>
        </div>
     </div>
 </div>
</template>

<script>
import SmallBanner from '../../component/smallBanner'
export default {
 data() {
    return {
        // 装备制造请求过来的数据
        equipmentList:[],
        // 构件请求过来的数据
        componentList:[],
        // 防水材料请求过来的数据
        waterproofList:[],
        imgUrl:"",
        contImg:""
    }
 },
 mounted(){
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        FieldNames:['ImagePath'],
        DataJSONString: JSON.stringify({CommonInfoType:13}),
        Resource: "CommonInfo",
        PageControl: { PageSize:0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        let img = JSON.parse(res.data).Rows[0];
        this.imgUrl = img.ImagePath;
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
        let list = JSON.parse(res.data).Rows[0];
        // 截取图片路径
        let img = list.Content;
        var regex = /<img.*?src="(.*?)"/;
        this.contImg = regex.exec(img)[1];
    }).catch((err)=>{
      throw err;
    });

    //  装备制造
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        FieldNames:['Content'],
        DataJSONString: JSON.stringify({ ProductType: 1 }),
        Resource: "Manufacture",
        PageControl: { PageSize: 1, PageIndex: 1, OrderBy: "DisplayIndex DESC,ECDate DESC"}
    }).then((res)=>{
        this.equipmentList = JSON.parse(res.data).Rows[0];
    }).catch((err)=>{
      throw err;
    });
    // 构件
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        FieldNames:['Content'],
        DataJSONString: JSON.stringify({ ProductType: 2 }),
        Resource: "Manufacture",
        PageControl: { PageSize: 1, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        this.componentList = JSON.parse(res.data).Rows[0];
    }).catch((err)=>{
      throw err;
    });
    // 防水材料
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        FieldNames:['Content'],
        DataJSONString: JSON.stringify({ ProductType: 3 }),
        Resource: "Manufacture",
        PageControl: { PageSize: 1, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        this.waterproofList = JSON.parse(res.data).Rows[0];
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
            height: 3.67rem;
            max-width: 11.1rem;
        }
    }
    span{
        display: inline-block;
        width: .80rem;
        height: .30rem;
        text-align: center;
        line-height: .30rem;
        font-size: 16px;
        color: #fff;
        background: #004387;
        font-weight: bold;
        margin-top: .40rem;
    }
    .txt{
        /deep/h6{
            margin-top: .17rem;
            font-weight: bold;
            color: #004387;
            font-size: 14px;
        }
        /deep/p{
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: .26rem;
            letter-spacing: 0rem;
            color: #333;
        }
    }
}
</style>