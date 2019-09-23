<template>
    <div class="foot" v-html="footInfo.Content"></div>
</template>

<script>
export default {
 data() {
    return {
        footInfo:[]
    }
 },
 methods: {

 },
 mounted(){
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        FieldNames:['Content'],
        DataJSONString: JSON.stringify({CommonInfoType : 103}),
        Resource: "CommonInfo",
        PageControl: { PageSize: 0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        this.footInfo = JSON.parse(res.data).Rows[0];
    }).catch((err)=>{
      throw err;
    });
 }
}
</script>

<style scoped lang="less">
.foot{
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    margin-top: .50rem;
    padding: .16rem 0 .16rem 0;
    border-top: .01rem solid #ccc;
    /deep/p{
        height: .22rem;
        font-size: .14rem;
    }
}
</style>
