<template>
 <div class="research">
    <div class="aptitude researchPic" v-html="researchList.Content"></div>
 </div>
</template>

<script>
export default {
 data() {
    return {
        researchList:[]
    }
 },
 mounted(){
    //  研发体系
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        FieldNames:['Content'],
        DataJSONString: JSON.stringify({ TechInnovationType: 1 }),
        Resource: "TechInnovation",
        PageControl: { PageSize: 0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        this.researchList = JSON.parse(res.data).Rows[0];
    }).catch((err)=>{
        throw err;
    });
 }
}
</script>

<style scoped lang="less">
.research{
    .researchPic{
        /deep/div{
            margin-top: 30px;
            img{
                max-width: 7.57rem;
            }
        }
    }
}
</style>
