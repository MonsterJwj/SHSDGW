<template>
 <div class="aptitude">
     <!-- 科技资质 -->
    <div class="aptitude" v-for="(item,index) in aptitudeList" :key="index">
        <router-link :to='"/cntech/aptitudedetail/"+item.ID' target="_blank">
            <div class="describe">
                <h6>{{item.Name}}</h6>
                <p class="time">{{item.PubDate | FormatTime}}</p>
                <p>{{item.Overview}}</p>
            </div>
            <div class="lookXiangxi"><img src="../../assets/img/xiangxi.jpg"></div>
        </router-link>
    </div>
    <!-- 分页器 -->
    <div class="page"><Pagination :total='totalPage' :pageSize='PageSize' :page="page" @currentPage="currentPage"></Pagination></div>
 </div>
</template>

<script>
import Pagination from '../../component/Pagination'
export default {
 data() {
    return {
        aptitudeList:[],
        totalPage:0,
        page:1,
        PageSize: 5
    }
 },
 methods:{
    getData(){
        this.$axios.post('/api/Table/TableAction',{
            Action: "SearchBlurEnabled",
            FieldNames:['Name','PubDate','ID','Overview'],
            DataJSONString: JSON.stringify({ TechInnovationType: 2 }),
            Resource: "TechInnovation",
            PageControl: { PageSize: this.PageSize, PageIndex: this.page, OrderBy: "DisplayIndex DESC,ID DESC"}
        }).then((res)=>{
            this.aptitudeList = JSON.parse(res.data).Rows;
            this.totalPage = JSON.parse(res.data).PagingInfo.AllRecordCount;
        }).catch((err)=>{
        throw err;
        });
    },
    currentPage(index){
        this.page = index;
        this.getData();
    }
 },
 mounted(){
    //  科技资质与获奖
    this.getData();
 },
  components: {
    Pagination 
 },
 filters:{
    FormatTime(val){
        if(val != null){
            val = val.substring(0,10);
        }
        return val;
    }
 }
}
</script>

<style scoped lang="less">
.aptitude{
    .researchPic{
        /deep/div{
            display: flex;
            justify-content: center;
            img{
                margin-top: .4rem;
                width: 7.57rem;
                height: 9.46rem;
            }
        }
    }
    .aptitude{
        padding: .32rem 0;
        border-bottom: .01rem dashed #b2b2b2;
        a{
            display: flex;
            align-items: center;
            .describe{
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0rem;
                color: #333333;
                h6{
                    font-size: 18px;
                    line-height: .36rem;
                    font-weight: bold;
                }
                .time{
                    font-size: 12px;
                    line-height: .36rem;
                    color: #666666;
                }
                p{
                    font-size: 14px;
                    line-height: .24rem;
                }
            }
            
        }
        .lookXiangxi{
            margin-left: .71rem;
        }
    }
}
</style>
