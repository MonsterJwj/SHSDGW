<template>
 <div class="honor">
    <SmallBanner>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>关于我们</el-breadcrumb-item>
            <el-breadcrumb-item>荣誉资质</el-breadcrumb-item>
        </el-breadcrumb>
        <img :src="imgUrl" slot="banner">
        <h4 slot="title">荣誉资质</h4>
    </SmallBanner>
    <div class="hon_content">
        <p v-for="(item, index) in content" :key="index" v-html="item"></p>
    </div>
 </div>
</template>

<script>
import SmallBanner from '../../component/smallBanner'
export default {
 data() {
    return {
        honorList:[],
        imgUrl:"",
        content: []
    }
 },
mounted(){
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        FieldNames:['ImagePath'],
        DataJSONString: JSON.stringify({CommonInfoType:7}),
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
        Resource: "HonorAndQualification",
        PageControl: { PageSize: 0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        this.honorList = JSON.parse(res.data).Rows[0];
        // 为了使带有<br />标签 不添加蓝色圆点
        let p = this.honorList.Content;
        let patt1 = new RegExp('(?<=<p>)((\\w|\\W)*?)(?=<\/p>)','gi');
        let arr = p.match(patt1);
        this.content = arr.map((item) =>{
            if(item.indexOf('<br />') == -1){
                return `<span class='active'>${item}</span>`
            }else{
                return `<span>${item}</span>`
            }
        })
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
.hon_content{
    font-size: 14px;
    padding: 0 .20rem .20rem .20rem;
    /deep/p{
        font-weight: normal;
        font-stretch: normal;
        line-height: .26rem;
        letter-spacing: 0rem;
        color: #333333;
        span{
            display: inline-block;
            width: 100%;
            height: 100%;
        }
        span.active:before {
            content: "";
            display: inline-block;
            width: .08rem;
            height: .08rem;
            background-color: #004387;
            border-radius: 50%;
            margin-right: .07rem;
        }
    }
    span{
        color: #004387;
        margin-right: .07rem;
    }
}
</style>
