<template>
 <div class="t_news">
     <div v-if="showDetial">
        <SmallBanner>
            <span>公司动态</span><span class="arrows"></span><span>行业新闻</span><span class="arrows"></span>
            <img :src="imgUrl" slot="banner">
        </SmallBanner>
        <div class="cont">
            <div class="mainNew" v-if="styShow">
                <img :src="tradeList.ImagePath">
                <div class="main_dec">
                <h4>{{tradeList.Name}}</h4>
                <p class="time">{{tradeList.NewsDate}}</p>
                <p>{{tradeList.Overview}}</p>
                <div class="lookDet"><router-link :to='"/state/tradeNews/tradedetial/"+tradeList.ID' target="_blank">查看详情</router-link></div>
                </div>
            </div>
             <div class="small_news" v-else>
                <router-link :to='"/state/tradeNews/tradedetial/"+tradeList.ID' class="news" target="_blank">
                    <div class="news_dec">
                        <h4>{{tradeList.Name}}</h4>
                        <p class="time">{{tradeList.NewsDate}}</p>
                        <p>{{tradeList.Overview}}</p>
                    </div>
                    <img src="../../assets/img/xiangxi.jpg">
                </router-link>
            </div>
            <div class="small_news">
                <router-link :to='"/state/tradeNews/tradedetial/"+item.ID' class="news" v-for="(item,index) in somelist" :key="index" target="_blank">
                    <div class="news_dec">
                        <h4>{{item.Name}}</h4>
                        <p class="time">{{item.NewsDate}}</p>
                        <p>{{item.Overview}}</p>
                    </div>
                    <img src="../../assets/img/xiangxi.jpg">
                </router-link>
            </div>
            <div class="page"><Pagination :total='totalPage' :page="page" @currentPage="currentPage"></Pagination></div>
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
        tradeList:[],
        AllList:[],
        somelist:[],
        imgUrl:"",
        showDetial:true,
        page:1,
        totalPage:0,
        PageSize:4,
        styShow:true
    }
 },
 methods:{
    currentPage(index){
        this.page = index;
        this.getData();
    },
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
            PageControl: { PageSize:0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
        }).then((res)=>{
            let list = JSON.parse(res.data).Rows;

            this.AllList = list.slice(1);
            this.totalPage = this.AllList.length;
            this.somelist = this.AllList.slice((this.page-1)*this.PageSize,this.page*this.PageSize);
        }).catch((err)=>{
            throw err;
        });
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
        PageControl: { PageSize:0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        let list = JSON.parse(res.data).Rows;
        this.tradeList = list[0];
        // 截取img的src路径
        let img = this.tradeList.Content;
        let regex = /<img.*?src="(.*?)"/;
        let imgSrc = regex.exec(img)[1];
        // 判断后台列表图片字段里是否有图片，如果有就取这个。如果没有就取内容字段里的第一张图片，如果还没有那就把这条新闻的列表格式改成没图片的样子。
        if(this.tradeList.ImagePath != null){
            this.styShow = true;
        }else if(this.tradeList.ImagePath == null && imgSrc != ""){
            this.tradeList.ImagePath = imgSrc;
        }else{
            this.styShow = false;
        }
        this.AllList = list.slice(1);
        this.totalPage = this.AllList.length;
        this.somelist = this.AllList.slice((this.page-1)*this.PageSize,this.page*this.PageSize);
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
 }
}
</script>

<style scoped lang="less">
.cont{
    padding: .20rem;
    h4{
        font-size: .18rem;
        line-height: .36rem;
        font-weight: bold;
        margin-top: .12rem;
        color: #333333;
    }
    .time{
        font-size: .12rem;
        color: #666666;
    }
    p{
        line-height: .24rem;
        font-size: .14rem;
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
            width: 5.2rem;
            height: 2.7rem;
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
    }
}
</style>
