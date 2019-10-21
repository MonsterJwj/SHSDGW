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
        /deep/span{
            display: block;
            height: auto;
        }
        /deep/img{
            margin: .4rem auto;
            width: 7.9rem;
            max-width: 7.9rem;
        }
        /deep/.ke-insertfile>span{
            height: .4rem;
            line-height: .4rem;
            width: 3.96rem;
            background: #f7f7f7 url('../../assets/img/icon_word.png') no-repeat .2rem center;
            background-size: .14rem .16rem;
            text-indent: .4rem;

        }
    }         
}
</style>
