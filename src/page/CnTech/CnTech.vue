<template>
 <div class="cntech">
    <SmallBanner> 
        <div v-show="titleShow == 1"><span>科技创新</span><span class="arrows"></span></div>
        <div v-show="titleShow == 2"><span>科技创新</span><span class="arrows"></span><span>科技资质与获奖</span><span class="arrows"></span><span>详情</span><span class="arrows"></span></div>
        <div v-show="titleShow == 3"><span>科技创新</span><span class="arrows"></span><span>核心科技</span><span class="arrows"></span><span>详情</span><span class="arrows"></span></div>
        <img :src="imgUrl" slot="banner">    
    </SmallBanner>
    <div class="cntechCont">
        <ul v-show="navShow">
            <li v-for="(item,index) in navTitle" :key="index">
                <router-link :to="item.src">{{item.title}}</router-link>
            </li>
        </ul>
        <router-view></router-view>
    </div>
 </div>
</template>

<script>
import SmallBanner from '../../component/smallBanner'
export default {
 data() {
    return {
        navShow:true,
        titleShow:1,
        navTitle:[
            {
                src:"/cntech/research",
                title:"研发体系"
            },
            {
                src:"/cntech/aptitude",
                title:"科技资质与获奖"
            },
            {
                src:"/cntech/coretechnology",
                title:"核心科技"
            }
        ],
        imgUrl:""
    }
 },
 components: {
    SmallBanner
 },
 mounted(){
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        FieldNames:['ImagePath'],
        DataJSONString: JSON.stringify({CommonInfoType:17}),
        Resource: "CommonInfo",
        PageControl: { PageSize:0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        let img = JSON.parse(res.data).Rows[0];
        this.imgUrl = img.ImagePath;
    }).catch((err)=>{
        throw err;
    });
    this.listenRoute();
 },
 methods:{
    listenRoute(){
        if(this.$route.path == "/cntech/aptitude" || this.$route.path == "/cntech/research" || this.$route.path == "/cntech/coretechnology"){
            this.navShow = true;
            this.titleShow = 1;
        }else if(this.$route.path == "/cntech/aptitudedetail/"+this.$route.params.id){
            this.navShow = false;
            this.titleShow = 2;
        }else{
            this.navShow = false;
            this.titleShow = 3;
        }
    }
 },
 watch:{
    $route(){
       this.listenRoute();
    }
 }
}
</script>

<style scoped lang="less">
.cntechCont{
    padding: .20rem .20rem 0 .20rem;
    ul{
        display: flex;
        li{
            flex: 1;
            border: solid .01rem #004387;
            font-size: .16rem;
            color: #666;
            cursor: pointer;
            &:nth-child(2){
                border-right: none;
                border-left: none;
            }
            a{
                display: block;
                height: .40rem;
                line-height: .40rem;
                text-align: center;
            }
            .router-link-active{
                background: #004387;
                color: #fff;
            }
        }
    }
}
</style>
