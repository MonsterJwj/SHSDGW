<template>
 <div class="search">
     <SmallBanner>
         <span>站内搜索</span><span class="arrows"></span>
         <img :src="imgUrl" slot="banner">
     </SmallBanner>
     <div class="searchCont">
         <div class="seaInput">
            <input type="text" placeholder="请输入您要搜索的关键字" v-model="seaValue" @keyup.enter="search" id="in">
            <span @click="search">搜索</span>
         </div>
         <p class="result">为您找到“<span>{{seaValue}}</span>”的相关结果 <span>{{totalPage}}</span> 条</p>
         <ul class="list">
             <li v-for="(item,index) in searchNews" :key="index" class="searchList">
                <router-link :to='"/state/tradeNews/tradedetial/"+ Math.abs(item.ID)' target="_blank" v-if="item.ID <= 0">
                    <h4 v-html="lightText(item.Name)"></h4>
                    <p v-html="lightText(item.Overview)"></p>
                </router-link>
                <router-link :to='"/state/companyNews/companydetial/"+item.ID' target="_blank" v-else>
                    <h4 v-html="lightText(item.Name)"></h4>
                    <p v-html="lightText(item.Overview)"></p>
                </router-link>
             </li>
         </ul>
        <div class="page"><Pagination :total='totalPage' :page="page" :pageSize = 'pagesize' @currentPage="currentPage"></Pagination></div>
     </div>
 </div>
</template>

<script>
import SmallBanner from '../component/smallBanner'
import Pagination from '../component/Pagination'
export default {
 data() {
    return {
        seaValue:this.$route.query.seaValue,
        searchNews:[],
        totalPage:0,
        page:1,
        pagesize:4,
        allList:[],
        imgUrl:""
    }
 },
 methods: {
    getData(){
        let txt = "%"+this.seaValue+"%";
        this.$axios.post('/api/Table/TableAction',{
        Action: "SearchPage",
        DataJSONString: JSON.stringify({Name:txt,Content:txt}),
        Resource: "News",
        PageControl: { PageSize: 0, PageIndex: this.page, OrderBy: "DisplayIndex DESC,ID DESC"}
        }).then((res)=>{
            this.allList = JSON.parse(res.data).Rows;
            this.searchNews = this.allList.slice((this.page-1)*this.pagesize,this.page*this.pagesize);
            this.totalPage = this.allList.length;
        }).catch((err)=>{
        throw err;
        });
    },
    search(){
        this.getData();
    },
    currentPage(index){
        this.page = index;
        this.getData();
    },
    lightText(value){
        if(value !== null){
            let val = this.seaValue;
            let light = value.split(val);
            return light.join('<span style="background:yellow;">' + val + '</span>');
        }
    }
 },
 mounted(){
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        FieldNames:['ImagePath'],
        DataJSONString: JSON.stringify({CommonInfoType:21}),
        Resource: "CommonInfo",
        PageControl: { PageSize:0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        let img = JSON.parse(res.data).Rows[0];
        this.imgUrl = img.ImagePath;
    }).catch((err)=>{
        throw err;
    });

    this.getData();
 },
 components: {
    SmallBanner,
    Pagination
 }
}
</script>

<style scoped lang="less">
.searchCont{
    padding: .3rem .2rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    .seaInput{
        width: 6.64rem;
        background-color: #eaebed;
        border-radius: .05rem;
        padding: .1rem;

        display: flex;
        justify-content: center;
        input{
            width: 5.21rem;
            height: .44rem;
            background: #fff;
            border-radius: .05rem;
            text-indent: .17rem;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            line-height: .3rem;
            letter-spacing: 0;
            margin-right: .1rem;
            &::-webkit-input-placeholder {
                color: #a9a9a9;
            }
            /* Mozilla Firefox 4 to 18 */
            &:-moz-placeholder {
                color: #a9a9a9;
            }
            /* Mozilla Firefox 19+ */
            &::-moz-placeholder {
                color: #a9a9a9;
            }
            /* Internet Explorer 10+ */
            &:-ms-input-placeholder {
                color: #a9a9a9;
            }
        }
        span{
            display: inline-block;
            width: 1.13rem;
            height: .44rem;
            line-height: .44rem;
            text-align: center;
            font-size: 16px;
            color: #fff;
            border-radius: .05rem;
            background-color: #004387;
            cursor: pointer;
        }
    }
    .result{
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        line-height: .30rem;
        letter-spacing: 0;
        color: #4a4a4a;
        margin: .28rem 0;
        span{
            color: #004387;
        }
    }
    .list{
        width: 100%;
        li{

            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0;
            border-bottom: .01rem dashed #ccc;
            padding: .21rem 0 .24rem 0;
            a{
                display: block;
                color: #333333;
                width: 100%;
            }
            /deep/h4{
                font-weight: bold;
                font-size: 18px;
                line-height: .36rem;
                margin-bottom: .14rem;
            }
            /deep/p{
                font-size: 14px;
                line-height: .24rem;
                
            }
        }
    }
}
</style>
