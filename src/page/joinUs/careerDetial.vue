<template>
 <div class="career">
    <div class="title">
        <h4>{{careerData.Name}}</h4>
    </div>
    <div class="txtDes" v-html="careerData.Content"></div>
 </div>
</template>

<script>
export default {
 data() {
    return {
        careerData:[]
    }
 },
 methods: {

 },
 mounted(){
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        FiledNames:['Content','Name'],
        DataJSONString: JSON.stringify({ CommonInfoType: 110 }),
        Resource: "CommonInfo",
        PageControl: { PageSize:0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        this.careerData = JSON.parse(res.data).Rows[0];
    }).catch((err)=>{
        throw err;
    });
 },
 components: {

 }
}
</script>

<style scoped lang="less">
.career{
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
       .return{
            text-align: right;
            margin-right: .2rem;
            a{
                display: block;
                font-size: .13rem;
                cursor: pointer;
                color: #004387;
                background: url("../../assets/img/return.png") no-repeat left center;
                background-size: .05rem .08rem;
                text-indent: .08rem; 
            }
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
