<template>
 <div class="news">
    <div class="news" v-if="showDetial">
        <SmallBanner>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>公司动态</el-breadcrumb-item>
                <el-breadcrumb-item>公司新闻</el-breadcrumb-item>
            </el-breadcrumb>
            <img :src="imgUrl" slot="banner">
        </SmallBanner>
        <div class="cont">
            <!-- 判断后台列表图片字段里是否有图片，如果有就取这个。如果没有就取内容字段里的第一张图片，如果还没有那就把这条新闻的列表格式改成没图片的样子。 -->
            <div class="mainNew" v-if="styShow">
                <img :src="NewsList.ImagePath">
                <div class="main_dec">
                <h4>{{NewsList.Name}}</h4>
                <p class="time">{{NewsList.PubDate | FormatTime}}</p>
                <p>{{NewsList.Overview}}</p>
                <div class="lookDet"><router-link :to='"/state/companyNews/companydetial/"+NewsList.ID' target="_blank">查看详情</router-link></div>
                </div>
            </div>
            <div class="small_news" v-else>
                <router-link :to='"/state/companyNews/companydetial/"+NewsList.ID' class="news" target="_blank">
                    <div class="news_dec">
                        <h4>{{NewsList.Name}}</h4>
                        <p class="time">{{NewsList.PubDate | FormatTime}}</p>
                        <p>{{NewsList.Overview}}</p>
                    </div>
                    <img src="../../assets/img/xiangxi.jpg">
                </router-link>
            </div>
            <!-- 其他新闻 -->
            <div class="small_news">
                <router-link :to='"/state/companyNews/companydetial/"+item.ID' class="news" v-for="(item,index) in AllList" :key="index" target="_blank">
                    <div class="news_dec">
                        <h4>{{item.Name}}</h4>
                        <p class="time">{{item.PubDate | FormatTime}}</p>
                        <p>{{item.Overview}}</p>
                    </div>
                    <img src="../../assets/img/xiangxi.jpg">
                </router-link>
            </div>
            <!-- 分页器 -->
            <div class="page"><Pagination :total='totalPage' :pageSize='PageSize' :page="page" @currentPage="currentPage"></Pagination></div>
        </div>
     </div>
    <router-view v-else></router-view>
 </div>
</template>

<script>
import SmallBanner from '../../component/smallBanner'
import Pagination from '../../component/Pagination'
export default {
 data() {
    return {
        // 第一条新闻
        NewsList:[],
        totalPage:0,
        page:1,
        PageSize: 5,
        showDetial:true,
        // 请求的全部数据
        AllList:[],
        // img路径
        imgUrl:"",
        // 判断应该用哪个布局
        styShow:true,
    }
 },
 methods: {
    listenRoute(){
        if(this.$route.path == "/state/companyNews"){
            this.showDetial = true;
        }else{
            this.showDetial = false;
        }
    },
    getData(){
        this.$axios.post('/api/Table/TableAction',{
            Action: "SearchAllEnabled",
            DataJSONString: JSON.stringify({}),
            Resource: "News",
            PageControl: { PageSize:this.PageSize, PageIndex: this.page, OrderBy: "DisplayIndex DESC,ID DESC"}
        }).then((res)=>{
            this.AllList = JSON.parse(res.data).Rows;

            for(let m=0;m< this.AllList.length;m++){
                if( this.AllList[m].Overview == null){
                    let cont =  this.AllList[m].Content;
                    var dd = cont.replace(/<\/?.+?>/g,"");
                    var dds = dd.replace(/ /g,"");//dds为得到后的内容
                     this.AllList[m].Overview = dds.substring(0,131); 
                }
            }
            
            if(this.page == 1){
                this.AllList = this.AllList.slice(1);
            }
            this.totalPage = JSON.parse(res.data).PagingInfo.AllRecordCount;
        }).catch((err)=>{
            throw err;
        });   
    },
    currentPage(index){
        this.page = index;
        this.getData();
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
        Action: "SearchAllEnabled",
        DataJSONString: JSON.stringify({}),
        Resource: "News",
        PageControl: { PageSize:this.PageSize, PageIndex: this.page, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        let list = JSON.parse(res.data).Rows;
        // 判断后台的概述是否为空
        for(let m=0;m<list.length;m++){
            if(list[m].Overview == null || list[m].Overview == ""){
                let cont = list[m].Content;
                var dd = cont.replace(/<\/?.+?>/g,"");
                var dds = dd.replace(/ /g,"");//dds为得到后的内容
                list[m].Overview = dds.substring(0,131);
            }
        }
        
        this.NewsList = list[0];
        // 截取img的src路径
        let img = this.NewsList.Content;
        let regex = /<img.*?src="(.*?)"/;
        let imgSrc = regex.exec(img);
        if(imgSrc != null){
            imgSrc = imgSrc[1];
        }
        // 判断后台列表图片字段里是否有图片，如果有就取这个。如果没有就取内容字段里的第一张图片，如果还没有那就把这条新闻的列表格式改成没图片的样子。
        if(this.NewsList.ImagePath != null){
            this.styShow = true;
        }else if(this.NewsList.ImagePath == null && imgSrc != null){
            this.NewsList.ImagePath = imgSrc;
        }else{
            this.styShow = false;
        }
        
        this.AllList = list.slice(1);
        this.totalPage = JSON.parse(res.data).PagingInfo.AllRecordCount;
    }).catch((err)=>{
        throw err;
    });   

    this.listenRoute();
 },
 components: {
    SmallBanner,
    Pagination 
 },
 watch:{
    $route(){
    this.listenRoute();
    }
 },
 filters:{
    FormatTime(val){
        if(val != null){
            val = val.substring(0,10);
        }
        return val;
    }
 }
}
</script>

<style scoped lang="less">
.cont{
    padding: .20rem;
    h4{
        font-size: 18px;
        line-height: .36rem;
        font-weight: bold;
        margin-top: .12rem;
        color: #333333;
    }
    .time{
        font-size: 12px;
        color: #666666;
    }
    p{
        line-height: .24rem;
        font-size: 14px;
        color: #333;
    }
    .mainNew{
        display: flex;

        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        padding-bottom: .22rem;
        border-bottom: .01rem dashed #b2b2b2; 
        h4{
            margin-top: .12rem;
        }
        .time{
            margin-bottom: .18rem;
        }
        img{
            margin-right: .80rem;
            width: 5.2rem;
            height: 2.7rem;
            max-width: 5.2rem;
        }
        .lookDet{
            margin-top: .17rem;
            display: flex;
            justify-content: flex-end;
            a{
                display: block;
                width: 1rem;
                height: .32rem;
                text-align: center;
                line-height: .32rem;
                color: #fff;
                background: #93aec9;
                font-size: 12px;
            }
        }
        .main_dec{
            flex: 1;
        }
    }
    .news{
        display: flex;
        justify-content: center;
        align-items: center;

        padding: .12rem 0;
        border-bottom: .01rem dashed #b2b2b2;
        .news_dec{
            flex: 1;
        }
        img{
            margin-left: .76rem;
            width: 1rem;
            height: 1.02rem;
            max-width: 1rem;
        }
    }
}
</style>

