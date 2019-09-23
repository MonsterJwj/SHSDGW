<template>
 <div class="column">
    <SmallBanner>
        <span>加入我们</span><span class="arrows"></span>
        <img src="../../assets/img/banner.jpg" slot="banner">
    </SmallBanner>
    <div class="contBox">
        <ul class="introduceList">
            <li>
                <router-link to="/joinUs/columnintroduced/careerdetial" target="_blank"><img :src="careerList.ImagePath"></router-link>
            </li>
            <li>
                <router-link to="/joinUs/columnintroduced/talentdetial" target="_blank"><img :src="talentList.ImagePath"></router-link>
            </li>
            <li>
                <router-link to="/joinUs/columnintroduced/honordetial" target="_blank"><img :src="honorList.ImagePath"></router-link>
            </li>
        </ul>
         <div class="recruit" v-if="recruitPicShow">
            <ul>
                <li>
                    <router-link to="/joinUs/socialTalents"><img src="../../assets/img/join_pic01.jpg" alt=""></router-link>
                </li>
                <li>
                    <router-link to="/joinUs/currentstudents"><img src="../../assets/img/join_pic02.jpg" alt=""></router-link>
                </li>
                <li>
                    <router-link to="/joinUs/internship"><img src="../../assets/img/join_pic03.jpg" alt=""></router-link>
                </li>
            </ul>
        </div>
        <router-view v-else></router-view>
    </div> 
 </div>
</template>

<script>
import SmallBanner from '../../component/smallBanner'
export default {
 data() {
    return {
        recruitPicShow: true,
        // 职业发展
        careerList:[],
        // 人才建设
        talentList:[],
        // 荣誉绩效
        honorList:[]
    }
 },
 methods: {
    listenRoute(){
        if(this.$route.path == "/joinUs/columnintroduced"){
            this.recruitPicShow = true;
        }else{
            this.recruitPicShow = false;
        }
    }
 },
 mounted(){
     //110.加入我们-职业建设；111.加入我们-人才建设；112.加入我们-荣誉绩效
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        FiledNames:['ImagePath'],
        DataJSONString: JSON.stringify({ CommonInfoType: 110 }),
        Resource: "CommonInfo",
        PageControl: { PageSize:0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        this.careerList = JSON.parse(res.data).Rows[0];
    }).catch((err)=>{
        throw err;
    });
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        FiledNames:['ImagePath'],
        DataJSONString: JSON.stringify({ CommonInfoType: 111 }),
        Resource: "CommonInfo",
        PageControl: { PageSize:0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        this.talentList = JSON.parse(res.data).Rows[0];
    }).catch((err)=>{
        throw err;
    });
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        FiledNames:['ImagePath'],
        DataJSONString: JSON.stringify({ CommonInfoType: 112 }),
        Resource: "CommonInfo",
        PageControl: { PageSize:0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        this.honorList = JSON.parse(res.data).Rows[0];
    }).catch((err)=>{
        throw err;
    });

    this.listenRoute();
 },
 components:{
    SmallBanner
 },
 watch:{
     $route(){
         this.listenRoute();
     }
 }
}
</script>

<style scoped lang="less">
.column{
    .contBox{
        padding: 0 .2rem;
    }
    .introduceList{
        display: flex;
        margin: .13rem 0;
        li{
            margin-right: .14rem;
            cursor: pointer;
            &:last-child{
                margin-right: 0;
            }
            img{
                width: 3.74rem;
                height: 1.1rem;
            }
        }
    }
    .recruit{
        width: 11.5rem;
        height: 4.38rem;
        background: url("../../assets/img/join_bg.jpg") no-repeat;
        background-size: 11.5rem 4.38rem;

        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        ul{
            display: flex;
            margin: 0 .3rem .3rem 0;
            li{
                a{
                    img{
                        width: 2.63rem;
                        height: 2.55rem;
                    }
                }
            }
        }
    }
}
</style>

