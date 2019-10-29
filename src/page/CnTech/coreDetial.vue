<template>
    <div class="Detail">
        <div class="detailDec">
            <h5>{{detialList.Name}}</h5>
            <p>{{detialList.PubDate | FormatTime}}</p>
            <div class="textDec" v-html="detialList.Content"></div>
        </div>
    </div>
</template>

<script>
export default {
 data() {
    return {
        // 核心科技祥情表
        detialList:[]
    }
 },
 mounted(){
     // 核心科技祥情表
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchID",
        FieldNames:['Name','PubDate','ID','Content'],
        DataJSONString: JSON.stringify({ID: this.$route.params.id}),
        Resource: "TechInnovation",
        PageControl: { PageSize: 0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        this.detialList = JSON.parse(res.data)[0];
    }).then((res)=>{ 
        document.title = this.detialList.Name + '_核心科技_科技创新' + '_上海隧道工程有限公司';
    }).catch((err)=>{
      throw err;
    });
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
            width: 100%;
            /deep/p{
                font-size: 14px;
                color: #333333;
                line-height: .26rem;
                img{
                    width: 5.57rem;
                    max-width: 5.57rem;
                }
            }
            
        }
    }
}
</style>
