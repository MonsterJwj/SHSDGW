<template>
 <div class="column">
    <SmallBanner>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>加入我们</el-breadcrumb-item>
        </el-breadcrumb>
        <img :src="imgUrl" slot="banner">
    </SmallBanner>
    <div class="contBox">
        <ul class="introduceList">
            <li>
                <router-link to="/joinUs/columnintroduced/careerdetial" target="_blank"><img :src="careerList.ImagePath"></router-link>
            </li>
            <li>
                <router-link to="/joinUs/columnintroduced/honordetial" target="_blank"><img :src="honorList.ImagePath"></router-link>
            </li>
        </ul>
         <div class="recruit" v-if="recruitPicShow">
            <ul>
                <li>
                    <router-link to="/joinUs/socialTalents"><img src="../../assets/img/join_pic01.5cf115c.png"></router-link>
                </li>
                <li>
                    <router-link to="/joinUs/currentstudents"><img src="../../assets/img/join_pic02.186727d.png"></router-link>
                </li>
                <li>
                    <router-link to="/joinUs/internship"><img src="../../assets/img/join_pic03.08be78d.png"></router-link>
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
        // 荣誉绩效
        honorList:[],
        // banner图片路径
        imgUrl:""
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
     this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        FieldNames:['ImagePath'],
        DataJSONString: JSON.stringify({CommonInfoType:20}),
        Resource: "CommonInfo",
        PageControl: { PageSize:0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        let img = JSON.parse(res.data).Rows[0];
        this.imgUrl = img.ImagePath;
    }).catch((err)=>{
        throw err;
    });

     //110.加入我们-职业建设；112.加入我们-荣誉绩效
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
            flex: 1;
            margin-right: .14rem;
            cursor: pointer;
            &:last-child{
                margin-right: 0;
            }
            img{
                max-width: 100%;
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
                &:nth-child(1){
                    display: none;
                }
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

