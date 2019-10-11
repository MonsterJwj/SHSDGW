<template>
 <div class="talentDetial">
    <div class="title">
        <h4>{{talentData.Name}}</h4>
    </div>
    <div class="txtDes" v-html="talentData.Content"></div>
 </div>
</template>

<script>
export default {
 data() {
    return {
        talentData:[]
    }
 },
 mounted(){
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        FiledNames:['Content','Name'],
        DataJSONString: JSON.stringify({ CommonInfoType: 111 }),
        Resource: "CommonInfo",
        PageControl: { PageSize:0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        this.talentData = JSON.parse(res.data).Rows[0];
    }).catch((err)=>{
        throw err;
    });
 }
}
</script>

<style scoped lang="less">
.talentDetial{
    .title{
        display: flex;
        align-items: center;
        margin-top: .2rem;
        h4{
            font-size: 24px;
            font-weight: normal;
            line-height: .36rem;
            letter-spacing: 0rem;
            color: #004387;
            flex: 1;
        }
    }
    .txtDes{
        margin-top: .2rem;
        /deep/p{
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: .26rem;
            letter-spacing: 0;
            color: #333333;
            text-indent: .28rem;
            margin-top: .28rem;
        }
    }
}
</style>
