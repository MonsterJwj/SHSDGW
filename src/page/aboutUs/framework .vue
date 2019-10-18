<template>
 <div class="framework">
     <SmallBanner>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>关于我们</el-breadcrumb-item>
            <el-breadcrumb-item>企业框架</el-breadcrumb-item>
        </el-breadcrumb>
        <img :src="imgUrl" slot="banner">
        <h4 slot="title">企业架构</h4>
     </SmallBanner>
     <div class="frameImg" v-html="frameList.Content">

     </div>
 </div>
</template>

<script>
import SmallBanner from '../../component/smallBanner'
export default {
 data() {
    return {
        frameList:[],
        imgUrl:""
    }
 },
 mounted(){
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        FieldNames:['ImagePath'],
        DataJSONString: JSON.stringify({CommonInfoType:5}),
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
        Resource: "CorporateSturcture",
        PageControl: { PageSize: 1, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
      this.frameList = JSON.parse(res.data).Rows[0];
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
.frameImg{
    /deep/img{
        margin-left: .61rem;
        width:10.69rem;
        height: 19.41rem;
        max-width: 10.69rem;
    }
}
</style>
