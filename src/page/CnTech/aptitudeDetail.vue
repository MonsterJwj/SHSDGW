<template>
    <div class="Detail">
        <div class="return">
            <router-link to="/cntech/aptitude" @click.native="returnBefore"><span></span>返回</router-link>
        </div>
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
 methods: {
    returnBefore(){
        // 通过改变状态管理的cntechTitle值，让科技创新的banner标题改变
        this.$store.commit("showBefore");
    }
 },
 mounted(){
     // 科技资质与获奖祥情表
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        DataJSONString: JSON.stringify({ TechInnovationType: 2 }),
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
    font-size: .14rem;
    font-weight: normal;
    letter-spacing: 0rem;
    .return{
        text-align: right;
        a{
            cursor: pointer;
            color: #004387;
            span{
                display: inline-block;
                width: .05rem;
                height: .11rem;
                background: url("../../assets/img/return.png") no-repeat center center;
                background-size: .05rem .08rem;
                margin-right: .03rem;
            }        
        }
    }
    .detailDec{
        font-size: .14rem;
        color: #333333;
        line-height: .36rem;

        display: flex;
        flex-direction: column;
        align-items: center;
        h5{
            font-size: .24rem;
            font-stretch: normal;
            line-height: .36rem;
        }
        .textDec{
            width: 80%;
            /deep/p{
                font-size: .14rem;
                color: #333333;
                line-height: .26rem;
                margin-bottom: .26rem;
                &:first-child{
                    margin: .19rem 0 .32rem 0;
                    display: flex;
                    justify-content: center;
                    font-size: 0;
                    img{
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
}
</style>
