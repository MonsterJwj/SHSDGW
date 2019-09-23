<template>
 <div class="aptitude">
     <!-- 科技资质 -->
    <div class="aptitude" v-for="(item,index) in aptitudeList" :key="index">
        <router-link :to='"/cntech/aptitudedetail/"+item.ID' @click.native="toNewDetail" target="_blank">
            <div class="describe">
                <h6>{{item.Name}}</h6>
                <p class="time">{{item.NewsDate}}</p>
                <p>{{item.Overview}}</p>
            </div>
            <div class="lookXiangxi"><img src="../../assets/img/xiangxi.jpg"></div>
        </router-link>
    </div>
 </div>
</template>

<script>
import Tab from '../../component/tab'
export default {
 data() {
    return {
        aptitudeList:[]
    }
 },
 methods: {
    toNewDetail(){
        this.$store.commit("changeNew");
    }
 },
 mounted(){
    //  科技资质与获奖
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        DataJSONString: JSON.stringify({ TechInnovationType: 2 }),
        Resource: "TechInnovation",
        PageControl: { PageSize: 0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        this.aptitudeList = JSON.parse(res.data).Rows;
    }).catch((err)=>{
      throw err;
    });
 },
 components:{
    Tab
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
                    font-size: .18rem;
                    line-height: .36rem;
                    font-weight: bold;
                }
                .time{
                    font-size: .12rem;
                    line-height: .36rem;
                    color: #666666;
                }
                p{
                    font-size: .14rem;
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
