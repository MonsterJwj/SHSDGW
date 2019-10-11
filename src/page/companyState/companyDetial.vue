<template>
 <div class="newsDetial">
    <SmallBanner>
        <span>公司动态</span><span class="arrows"></span><span>公司新闻</span><span class="arrows"></span><span>新闻详情</span><span class="arrows"></span>
        <img :src="imgUrl" slot="banner">
     </SmallBanner>
     <div class="detialNews">
        <div class="newCont">
            <div class="detailDec">
                <h5>{{detialList.Name}}</h5>
                <p>{{detialList.NewsDate}}</p>
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
        Action: "SearchAllEnabled",
        DataJSONString: JSON.stringify({}),
        Resource: "News",
        PageControl: { PageSize:0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        this.detialList = JSON.parse(res.data).Rows;
        for(let i=0;i<this.detialList.length;i++){
            // 根据id获取对应的内容
            if(this.$route.params.id == this.detialList[i].ID){
                this.detialList = this.detialList[i];
            }
        }
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
            margin: .19rem 0 .32rem 0;
            display: flex;
            flex-direction: column;
            font-size: 14px;
            /deep/img{
                width: 6rem;
                height: 4.01rem;
                &:nth-child(2){
                    margin-top: .2rem;
                }
            }
            /deep/p{
                line-height: .26rem;
                margin-bottom: .26rem;
                text-indent: .25rem;
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
