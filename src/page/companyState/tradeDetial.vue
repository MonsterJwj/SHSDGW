<template>
 <div class="newsDetial">
    <SmallBanner>
        <span>公司动态</span><span class="arrows"></span><span>行业新闻</span><span class="arrows"></span><span>新闻详情</span><span class="arrows"></span>
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
        Action: "SearchID",
        DataJSONString: JSON.stringify({ID:this.$route.params.id}),
        Resource: "TradeNews",
        PageControl: { PageSize:0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        this.detialList = JSON.parse(res.data)[0];
        console.log(this.detialList)
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
