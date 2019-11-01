<template>
 <div class="core">
    <div class="core-img" v-html="coretechList.Content"></div>
    <!-- <div class="aptitude" v-for="(item,index) in coretechList" :key="index">
       <router-link :to='"/cntech/coredetia/"+item.ID' target="_blank">
            <div class="describe">
                <h6>{{item.Name}}</h6>
                <p class="time">{{item.PubDate | FormatTime}}</p>
                <p>{{item.Overview}}</p>
            </div>
            <div class="lookXiangxi"><img src="../../assets/img/xiangxi.jpg"></div>
       </router-link>
    </div> -->
    <!-- 分页器 -->
    <!-- <div class="page"><Pagination :total='totalPage' :pageSize='PageSize' :page="page" @currentPage="currentPage"></Pagination></div> -->

 </div>
</template>

<script>
// import Pagination from '../../component/Pagination'
export default {
 data() {
    return {
        coretechList:[],
        // totalPage:0,
        // page:1,
        // PageSize: 5
    }
 },
 methods:{
    getData(){
        this.$axios.post('/api/Table/TableAction',{
            Action: "SearchBlurEnabled",
            FieldNames:['Content'],
            DataJSONString: JSON.stringify({ TechInnovationType: 3 }),
            Resource: "TechInnovation",
            PageControl: { PageSize: 0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
        }).then((res)=>{
            this.coretechList = JSON.parse(res.data).Rows[0];
        }).catch((err)=>{
            throw err;
        });
    }
    // currentPage(index){
    //     this.page = index;
    //     this.getData();
    // }
 },
 mounted(){
    //  核心科技
    this.getData();
 }
//  components: {
//     // Pagination 
//  },
//  filters:{
//     FormatTime(val){
//         if(val != null){
//             val = val.substring(0,10);
//         }
//         return val;
//     }
//  }
}
</script>

<style scoped lang="less">
.core-img{
    display: flex;
    align-items: center;
    margin-top: 30px;
    /deep/img{
        max-width: 11.5rem;
    }
}
// .aptitude{
//     padding: .32rem 0;
//     border-bottom: .01rem dashed #b2b2b2;
   
    // a{
    //     display: flex;
    //     align-items: center;
    //     .describe{
    //         font-weight: normal;
    //         font-stretch: normal;
    //         letter-spacing: 0rem;
    //         color: #333333;
    //         h6{
    //             font-size: 18px;
    //             line-height: .36rem;
    //             font-weight: bold;
    //         }
    //         .time{
    //             font-size: 12px;
    //             line-height: .36rem;
    //             color: #666666;
    //         }
    //         p{
    //             font-size: 14px;
    //             line-height: .24rem;
    //         }
    //     }
        
    // }
    // .lookXiangxi{
    //     margin-left: .71rem;
    //     img{
    //         width: 1rem;
    //         height: 1.02rem;
    //         max-width: 1rem;
    //     }
    // }
// }
</style>
