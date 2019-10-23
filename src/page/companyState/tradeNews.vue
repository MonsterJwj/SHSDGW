<template>
 <div class="t_news">
     <div v-if="showDetial">
        <SmallBanner>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>公司动态</el-breadcrumb-item>
                <el-breadcrumb-item>行业新闻</el-breadcrumb-item>
            </el-breadcrumb>
            <img :src="imgUrl" slot="banner">
        </SmallBanner>
        <div class="cont">
            <!-- 最上方的大新闻 -->
            <div class="mainNew" v-if="styShow">
                <img :src="tradeList.ImagePath">
                <div class="main_dec">
                <h4>{{tradeList.Name}}</h4>
                <p class="time">{{tradeList.PubDate | FormatTime}}</p>
                <p>{{tradeList.Overview}}</p>
                <div class="lookDet"><router-link :to='"/state/tradeNews/tradedetial/"+tradeList.ID' target="_blank">查看详情</router-link></div>
                </div>
            </div>
             <div class="small_news" v-else>
                <router-link :to='"/state/tradeNews/tradedetial/"+tradeList.ID' class="news" target="_blank">
                    <div class="news_dec">
                        <h4>{{tradeList.Name}}</h4>
                        <p class="time">{{tradeList.PubDate | FormatTime}}</p>
                        <p>{{tradeList.Overview}}</p>
                    </div>
                    <img src="../../assets/img/xiangxi.jpg">
                </router-link>
            </div>
            <!-- 其他新闻 -->
            <div class="small_news">
                <router-link :to='"/state/tradeNews/tradedetial/"+item.ID' class="news" v-for="(item,index) in AllList" :key="index" target="_blank">
                    <div class="news_dec">
                        <h4>{{item.Name}}</h4>
                        <p class="time">{{item.PubDate | FormatTime}}</p>
                        <p>{{item.Overview}}</p>
                    </div>
                    <img src="../../assets/img/xiangxi.jpg">
                </router-link>
            </div>
            <div class="page"><Pagination :total='totalPage' :pageSize='PageSize' :page="page" @currentPage="currentPage"></Pagination></div>
        </div>
     </div>
     <router-view v-else></router-view>
 </div>
</template>

<script>
import Pagination from '../../component/Pagination'
import SmallBanner from '../../component/smallBanner'
export default {
 data() {
    return {
        // 最上面的新闻
        tradeList:[],
        // 当前页显示的全部新闻
        AllList:[],
        imgUrl:"",
        showDetial:true,
        page:1,
        totalPage:0,
        PageSize:5,
         // 判断应该用哪个布局
        styShow:true
    }
 },
 methods:{
    listenRoute(){
        if(this.$route.path == "/state/tradeNews"){
            this.showDetial = true;
        }else{
            this.showDetial = false;
        }
    },
    getData(){
        this.$axios.post('/api/Table/TableAction',{
            Action: "SearchAllEnabled",
            DataJSONString: JSON.stringify({}),
            Resource: "TradeNews",
            PageControl: { PageSize: this.PageSize, PageIndex: this.page, OrderBy: "DisplayIndex DESC,ID DESC"}
        }).then((res)=>{
            this.AllList = JSON.parse(res.data).Rows;

            // 概述
            for(let m=0;m<this.AllList.length;m++){
                if(this.AllList[m].Overview == null){
                    let cont = this.AllList[m].Content;
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
        DataJSONString: JSON.stringify({CommonInfoType:10}),
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
        Resource: "TradeNews",
        PageControl: { PageSize: this.PageSize, PageIndex: this.page, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        let list = JSON.parse(res.data).Rows;

         // 判断后台的概述是否为空
        for(let m=0;m<list.length;m++){
            if(list[m].Overview == null){
                let cont = list[m].Content;
                var dd = cont.replace(/<\/?.+?>/g,"");
                var dds = dd.replace(/ /g,"");//dds为得到后的内容
                list[m].Overview = dds.substring(0,131);
            }
        }

        this.tradeList = list[0];

        // 截取img的src路径
        let img = this.tradeList.Content;
        let regex = /<img.*?src="(.*?)"/;
        let imgSrc = regex.exec(img);
        if(imgSrc != null){
            imgSrc = imgSrc[1];
        }

        // 判断后台列表图片字段里是否有图片，如果有就取这个。如果没有就取内容字段里的第一张图片，如果还没有那就把这条新闻的列表格式改成没图片的样子。
        if(this.tradeList.ImagePath != null){
            this.styShow = true;
        }else if(this.tradeList.ImagePath == null && imgSrc != null){
            this.tradeList.ImagePath = imgSrc;
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
            margin-right: .8rem;
            width: 5rem;
            height: 3rem;
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
