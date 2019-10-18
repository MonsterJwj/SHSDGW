<template>
 <div class="newsDetial">
    <SmallBanner>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>公司动态</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/state/companyNews' }">公司新闻</el-breadcrumb-item>
            <el-breadcrumb-item>新闻详情</el-breadcrumb-item>
        </el-breadcrumb>
        <img :src="imgUrl" slot="banner">
     </SmallBanner>
     <div class="detialNews">
        <div class="newCont">
            <div class="detailDec">
                <h5>{{detialList.Name}}</h5>
                <p>{{detialList.PubDate | FormatTime}}</p>
                <div class="describe" v-html="detialList.Content"></div>
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
        detialList:[],
        imgUrl:""
    }
 },
 mounted(){
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        FieldNames:['ImagePath'],
        DataJSONString: JSON.stringify({CommonInfoType:8}),
        Resource: "CommonInfo",
        PageControl: { PageSize:0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        let img = JSON.parse(res.data).Rows[0];
        this.imgUrl = img.ImagePath;
    }).catch((err)=>{
        throw err;
    });
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchID",
        DataJSONString: JSON.stringify({ID:this.$route.params.id}),
        Resource: "News",
    }).then((res)=>{
        this.detialList = JSON.parse(res.data)[0];
    }).then((res)=>{ 
        document.title = this.detialList.Name + '_公司新闻_公司动态' + '_上海隧道工程有限公司';
    }).catch((err)=>{
        throw err;
    });
 },
 components: {
    SmallBanner
 },
 filters:{
    FormatTime(val){
        if(val != null){
            val = val.substring(0,10);
        }
        return val;
    }
 },
 beforeRouteLeave (to, from, next) {
     // 在当前路由改变，但是该组件被复用时调用
     // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
     // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
     // 可以访问组件实例 `this`
    if(to.meta.title){
        console.log(1111)
        document.title = this.detialList.Name + to.meta.title + '_上海隧道工程有限公司';
        next();
    }
 },
 watch:{
    $route(to,from){
        console.log(2222)
        
    }
 }
}
</script>

<style scoped lang="less">
.detialNews{
    padding: .20rem;
    font-size: 14px;
    font-weight: normal;
    letter-spacing: 0rem;
    .detailDec{
        font-size: 14px;
        color: #333333;
        line-height: .36rem;

        display: flex;
        flex-direction: column;
        align-items: center;
        h5{
            font-size: 24px;
            font-stretch: normal;
            line-height: .36rem;
        }
        .describe{
            width: 100%;
            margin: .19rem 0 .32rem 0;
            display: flex;
            flex-direction: column;
            /deep/img{
                width: 6rem;
                height: 4.01rem;
                max-width: 7rem;
                &:nth-child(2){
                    margin-top: .2rem;
                }
            }
            /deep/p{
                line-height: .26rem;
                text-indent: .25rem;
                font-size: 14px;
                &:nth-child(1){
                    display: flex;
                    justify-content: center;
                }
                &:nth-child(2){
                    display: flex;
                    justify-content: center;
                }
            }
        }
        
    }
}
</style>
