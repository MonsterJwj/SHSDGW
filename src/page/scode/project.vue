<template>
 <div class="project">
     <SmallBanner>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>业务范围</el-breadcrumb-item>
            <el-breadcrumb-item>工程建设</el-breadcrumb-item>
        </el-breadcrumb>
        <img :src="imgUrl" slot="banner">
        <h4 slot="title" class="sbanner">工程建设</h4>
        <!-- <select slot="rightCont" name="projectYear">
            <option value="">年份选择</option>
            <option value="2019">2019年</option>
            <option value="2018">2018年</option>
            <option value="2017">2017年</option>
        </select> -->
     </SmallBanner>
     <div class="minContent" v-if="projectShow">
        <!-- 后面可能会需要此处代码 -->
        <!-- <ul class="styleList"> -->
            <!-- <li>
                <router-link to="/"></router-link>
            </li> -->
            <!-- <li>隧道</li>
            <li>轨道交通</li>
            <li>道路桥梁</li>
            <li>建筑与房地产</li>
            <li>能源</li>
            <li>水务</li>
            <li>地下空间</li>
            <li>重大装备</li>
            <li>绿色材料</li>
        </ul> -->
        <ul class="projectIntr">
            <li v-for="(item,index) in projectCont" :key="index">
                <router-link :to='"/scode/project/projectdetial/"+item.ID' target="_blank">
                    <div class="introduce">
                        <img :src="item.Memo">
                        <p>{{item.Name}}</p>
                    </div>
                    <p>{{item.Overview}}</p>
                </router-link>
            </li>
        </ul>
     </div>
     <router-view v-else></router-view>
 </div>
</template>

<script>
import SmallBanner from '../../component/smallBanner'
export default {
 data() {
    return {
        projectCont:[],
        projectShow:true,
        imgUrl:""
    }
 },
 methods:{
    listenRoute(){
        if(this.$route.path == "/scode/project"){
            this.projectShow = true;
        }else{
            this.projectShow = false;
        }
    }
 },
 mounted(){
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        FieldNames:['ImagePath'],
        DataJSONString: JSON.stringify({CommonInfoType:12}),
        Resource: "CommonInfo",
        PageControl: { PageSize:0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        let img = JSON.parse(res.data).Rows[0];
        this.imgUrl = img.ImagePath;
    }).catch((err)=>{
        throw err;
    });
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        DataJSONString: JSON.stringify({ECType : 1}),
        Resource: "EngineeringConstruction",
        PageControl: { PageSize: 0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        this.projectCont = JSON.parse(res.data).Rows;
        // 截取图片路径
        for(let i=0;i<this.projectCont.length;i++){
            let img = this.projectCont[i].Memo;
            var regex = /<img.*?src="(.*?)"/;
            this.projectCont[i].Memo = regex.exec(img)[1];
        }
    }).catch((err)=>{
      throw err;
    });

    this.listenRoute()
 },
 components: {
    SmallBanner
 },
 watch:{
    $route(){            
        this.listenRoute()
    }
 }
}
</script>

<style scoped lang="less">
.minContent{
    padding: 0 .26rem;
    margin-top: -.1rem;
    // .styleList{
    //     display: flex;
    //     li{
    //         flex: 1;
    //         text-align: center;
    //         height: .45rem;
    //         line-height: .45rem;
    //         border: .01rem solid #c9d5e4;
    //         border-right: none;
    //         &:last-child{
    //         border-right: .01rem solid #c9d5e4;                
    //         }
    //     }
    // }
    .projectIntr{
        display: flex;
        flex-wrap: wrap;
        margin-top: .35rem;
        width: 11.3rem;
        li{
            flex: 1;
            margin-right: .18rem;
            a{
                display: block;
                .introduce{
                    border-bottom: .01rem solid #ccc;
                    img{
                        width: 2.64rem;
                        height: 1.38rem;
                        max-width: 2.64rem;
                    }
                    p{
                        line-height: .28rem;
                        color: #010101;
                        margin-bottom: 0;
                    }
                }
                p{
                    font-size: 11px;
                    -webkit-transform-origin-x: 0;
                    color: #b1b1b1;
                    margin-bottom: .15rem;
                }
            }
        }
    }
}
</style>
