<template>
 <div class="duty">
    <div class="dis">
        <h4>与自然共呼吸 与城市共发展 与人才共成长</h4>
        <img src="../../assets/img/duty.jpg">
    </div>
    <a href="#">上海隧道工程有限公司2017年度社会责任报告</a>
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
        console.log(this.responsibilityList);
    }).catch((err)=>{
      throw err;
    });
 },
 components: {

 }
}
</script>

<style scoped lang="less">
.duty{
    font-size: .24rem;
    font-weight: normal;
    font-stretch: normal;
    line-height: .26rem;
    letter-spacing: 0rem;
    color: #004387;
    a{
        background: #f7f7f7 url("../../assets/img/icon_word.png") no-repeat .20rem center;
        font-size: .16rem;
        font-weight: normal;
        letter-spacing: 0rem;
        color: #004387;
        padding: .13rem .27rem .10rem .41rem;
    }
    .dis{
        margin-top: .40rem; 
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
            margin: .40rem 0;
            width: 7.9rem;
            height: 3.5rem;
        }
    }          
}
</style>
