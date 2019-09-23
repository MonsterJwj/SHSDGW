<template>
 <div class="core">
       核心技术
 </div>
</template>

<script>
export default {
 data() {
       return {
              coretechList:[]
       }
 },
 mounted(){
       //  核心科技
       this.$axios.post('/api/Table/TableAction',{
              Action: "SearchBlurEnabled",
              DataJSONString: JSON.stringify({ TechInnovationType: 3 }),
              Resource: "TechInnovation",
              PageControl: { PageSize: 0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
       }).then((res)=>{
              this.coretechList = JSON.parse(res.data).Rows;
              console.log(this.coretechList);
       }).catch((err)=>{
              throw err;
       });
 },
 components: {

 }
}
</script>

<style scoped>

</style>
