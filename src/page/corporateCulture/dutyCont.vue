<template>
 <div class="duty">
    <div class="dis" v-for="(item,index) in responsibilityList" :key="index">
        <div class="cont" v-html="item.Content"></div>
    </div>
 </div>
</template>

<script>
export default {
 data() {
    return {
        responsibilityList:[]
    }
 },
 mounted(){
     // 社会责任
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        DataJSONString: JSON.stringify({ CultureType: 2 }),
        Resource: "Culture",
        PageControl: { PageSize: 0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        this.responsibilityList = JSON.parse(res.data).Rows;
    }).catch((err)=>{
      throw err;
    });
 }
}
</script>

<style scoped lang="less">
.duty{
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: .26rem;
    letter-spacing: 0rem;
    color: #333;
    .cont{
        /deep/img{
            margin: .4rem auto;
            width: 7.9rem;
            height: 3.5rem;
        }
        /deep/p{
            text-indent: .28rem;
        }
    }         
}
</style>
