<template>
    <div class="Detail">
        <div class="detailDec">
            <h5>{{detialList.Name}}</h5>
            <p>{{detialList.NewsDate}}</p>
            <div class="textDec" v-html="detialList.Content"></div>
        </div>
    </div>
</template>

<script>
export default {
 data() {
    return {
        // 科技资质祥情表
        detialList:[]
    }
 },
 mounted(){
     // 科技资质与获奖祥情表
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        DataJSONString: JSON.stringify({ TechInnovationType: 3 }),
        Resource: "TechInnovation",
        PageControl: { PageSize: 0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
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
 }
}
</script>

<style scoped lang="less">
.Detail{
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
            margin-bottom: .2rem;
        }
        .textDec{
            width: 80%;
            /deep/p{
                font-size: 14px;
                color: #333333;
                line-height: .26rem;
                img{
                    margin: .2rem auto;
                    width: 5.57rem;
                    height: 3.95rem;
                    &:nth-child(2){
                        margin: 0 .10rem;
                    }
                }
            }
            
        }
    }
}
</style>
