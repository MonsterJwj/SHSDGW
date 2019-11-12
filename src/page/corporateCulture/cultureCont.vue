<template>
 <div>
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
.text{
    width: 100%;
    /deep/div{
        img{
            max-width: 11.39rem;
        }
    }
}
</style>
