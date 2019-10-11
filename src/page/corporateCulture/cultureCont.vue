<template>
 <div class="culture">
    <div class="text" v-html="cultureList.Content"></div>
 </div>
</template>

<script>
export default {
 data() {
    return {
        cultureList:[]
    }
 },
 mounted(){
     //   遂文化
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        DataJSONString: JSON.stringify({ CultureType: 1 }),
        Resource: "Culture",
        PageControl: { PageSize: 0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        this.cultureList = JSON.parse(res.data).Rows[0];
    }).catch((err)=>{
      throw err;
    });
 }
}
</script>

<style scoped lang="less">
.culture{
    position: relative;
    color: #333;
    /deep/h6{
        font-weight: bold;
        margin-top: .25rem;
    }
    /deep/h6,p{
        line-height: .26rem;
        font-size: 14px;
    }
    .text{
        width: 7.19rem;
    }
    /deep/h6:nth-child(11){
        margin-top: 0;
    }
    /deep/img{
        position: absolute;
        right: .31rem;
        top: .25rem;

        width: 3.4rem;
        height: 2.81rem;
    }      
}
</style>
