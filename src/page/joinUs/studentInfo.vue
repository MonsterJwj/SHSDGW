<template>
 <div class="recruitAll">
     <div class="picCover" v-show="coverShow">
        <div class="bigPic">
            <div class="bigBox">
                <div id="playerVideo" v-if="imgIndex == 1 && this.showVideo == true"></div>
                <img :src="imgList[imgIndex]"  v-else>
                <span @click="coverClose">X</span>
            </div>
        </div>
     </div>
     <div class="styBanner">
        <div class="topTit">
            <span>加入我们</span><span class="arrows"></span><span>校园招聘</span><span class="arrows"></span><span>{{companyName}}</span><span class="arrows"></span>
        </div>
        <div class="pic_play">
            <swiper :options="swiperOption">
                <swiper-slide v-for="(slide, index) in imgList" :key="index"><img :src="slide" @click="magnify(index)"></swiper-slide> 
            </swiper>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
        </div>
    </div>
    <div class="mainCont">
        <div class="companyIntr" v-for="(item,index) in companyInfo" :key="index">
            <h4>{{item.Name}}</h4>
            <div class="info" v-html="intrData"></div>
            <div class="lookMore"><span @click="lookMore">查看更多</span></div>
            <div class="packUp"><span @click="packUp">收起</span></div>
        </div>
    </div>
    <div class="table">
        <div class="school_tit">
            <h4>校园招聘</h4>
            <div class="rightSea">
                <input type="text" placeholder="请输入职位" v-model="inputVal" @keyup.enter="search"><span class="search" @click="search">搜索</span>
            </div>
        </div>
        <el-table :data="companyAll" style="width: 11.5rem" :show-header="showHead">
            <el-table-column prop="Name">
            </el-table-column>
            <el-table-column prop="CompanyInfoName">
            </el-table-column>
            <el-table-column width="160px">{{recruitStatus}}
            </el-table-column>
            <el-table-column prop="PubDate" width="160px">
            </el-table-column>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item>
                        <div class="duty" v-html="props.row.Content"></div>
                        <a :href="companyInfo[0].URLLink" target="_blank" class="apply">立即申请</a>
                    </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="page"><Pagination :total='totalPage' :page="page" @currentPage="currentPage"></Pagination></div>
 </div>
</template>

<script>
import Pagination from '../../component/Pagination'
export default {
 data() {
    return {
        totalPage:0,
        page:1,
        pageSize:4,
        // 控制表头
        showHead:false,
        // 招聘状态
        recruitStatus:"",
        // 遮盖层是否显示
        coverShow:false,
        // 控制图片显示哪一张
        imgIndex:0,
        // 滑动图片集
        imgList:[],
        // 招聘列表全部
        companyAll:[],
        // 企业信息
        companyInfo:[],
        // 企业名称
        companyName:"",
        // input值
        inputVal:"",
        // 企业介绍
        intrData:"",
        // 企业介绍全部信息
        intrAll:[],
        // 当搜索职位，使用分页器时，判断渲染哪个函数
        shouldFn:0,
        // 是否初始化视频
        showVideo:false,
        // swiper配置
        swiperOption: {
            slidesPerView: 4,
            slidesPerGroup: 1,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
        }
    }
 },
 methods: {
    magnify(index){
        this.coverShow = true;
        this.imgIndex = index;

        if(this.imgIndex == 1 && this.showVideo == true){
            var player = new Aliplayer({
                id: "playerVideo",
                source: companyInfo[0].VideoPath,
                width: "6rem",
                height: "4rem",
                /* To set an album art, you must set 'autoplay' and 'preload' to 'false' */
                autoplay: true,
                preload: false,
            }, function(player) {
                console.log("The player is created");
            });
        }
    },
    coverClose(){
        this.coverShow = false;
    },
    search(){
        this.shouldFn = 1;
        let txt = "%" + this.inputVal + "%";
        //  获取对应招聘类型  公司的企业校园招聘职位信息
        this.$axios.post('/api/Table/TableAction',{
            Action: "SearchBlurEnabled",
            DataJSONString: JSON.stringify({JobType:1,Name:txt}),
            Resource: "Job",
            PageControl: { PageSize:this.pageSize, PageIndex: this.page, OrderBy: "DisplayIndex DESC,ID DESC"}
        }).then((res)=>{
            this.companyAll = JSON.parse(res.data).Rows;
            for(let i=0;i<=this.companyAll.length-1;i++){
                // 获取失效日期
                let staleDated = this.companyAll[i].ExpiredDate;
                let resdate = staleDated.replace(/-/g,"/");
                // 失效日期时间戳
                let timestamp = new Date(resdate).getTime();
                // 当前时间戳
                let nowStamp = new Date().getTime();
                // 判断是否 日期失效
                if(staleDated == "" || timestamp > nowStamp){
                    this.recruitStatus = "正在招聘"
                }else{
                    this.recruitStatus = "已结束"
                }
                this.companyAll[i].PubDate = this.companyAll[i].PubDate.substring(0,10);
            }
            this.totalPage = JSON.parse(res.data).PagingInfo.AllRecordCount;
        }).catch((err)=>{
            throw err;
        });
    },
    lookMore(){
        this.intrData = this.intrAll.join("");
        document.getElementsByClassName("lookMore")[0].style.display = "none";
        document.getElementsByClassName("packUp")[0].style.display = "block";
    },
    packUp(){
        this.intrData = this.intrAll.slice(0,2).join("");
        document.getElementsByClassName("lookMore")[0].style.display = "block";
        document.getElementsByClassName("packUp")[0].style.display = "none";
    },
    currentPage(index){
        this.page = index;
        // 判断渲染职位请求的函数，还是全部职位的函数
        if(shouldFn == 0){
            this.getdata();
        }else{
            this.search();
        }
        this.shouldFn = 0;
    },
    getdata(){
        this.$axios.post('/api/Table/TableAction',{
            Action: "SearchBlurEnabled",
            DataJSONString: JSON.stringify({JobType:1,CompanyInfoID:this.$route.params.id}),
            Resource: "Job",
            PageControl: { PageSize:this.pageSize, PageIndex: this.page, OrderBy: "DisplayIndex DESC,ID DESC"}
        }).then((res)=>{
            
            this.companyAll = JSON.parse(res.data).Rows;
            for(let i=0;i<=this.companyAll.length-1;i++){
                // 获取失效日期
                let staleDated = this.companyAll[i].ExpiredDate;
                let resdate = staleDated.replace(/-/g,"/");
                // 失效日期时间戳
                let timestamp = new Date(resdate).getTime();
                // 当前时间戳
                let nowStamp = new Date().getTime();
                // 判断是否 日期失效
                if(staleDated == "" || timestamp > nowStamp){
                    this.recruitStatus = "正在招聘"
                }else{
                    this.recruitStatus = "已结束"
                }
                this.companyAll[i].PubDate = this.companyAll[i].PubDate.substring(0,10);
            }           
            
            this.totalPage = JSON.parse(res.data).PagingInfo.AllRecordCount;
        }).catch((err)=>{
            throw err;
        });
    }
 },
 mounted(){
    //  获取对应招聘类型  公司的企业校园招聘职位信息
    this.getdata();
    //  获取对应招聘类型  公司的企业信息
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchID",
        DataJSONString: JSON.stringify({ID:this.$route.params.id}),
        Resource: "CompanyInfo"
    }).then((res)=>{
        this.companyInfo = JSON.parse(res.data);
        this.companyName = this.companyInfo[0].Name;

        // 截取内容里的前两段
        this.intrAll = this.companyInfo[0].Content.split("<br />");
        this.intrData = this.intrAll.slice(0,2).join("");
       
        // 截取img的src路径
        let img = this.companyInfo[0].SliderBar;
        let imgReg = /<img\b.*?(?:\>|\/>)/gi;
        let arr = img.match(imgReg);
        for(let m=0;m<arr.length;m++){
            let imgArr = arr[m].split("\"");
            this.imgList.push(imgArr[1]);
        }

        // 判断视频路径是否为空
        if(this.companyInfo[0].VideoPath != null){
            this.showVideo = true;
        }

    }).catch((err)=>{
        throw err;
    })
 },
 components: {
    Pagination
 }
}
</script>

<style scoped lang="less">
.recruitAll{
    // 遮盖层相关内容样式
    .picCover{
        position: fixed;
        top: 0;
        left: -2.37rem; 

        width: 19.2rem;
        height: 970px;
        background: rgba(0,0,0, .7);
        z-index: 99;
        
    }
    .bigBox{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
    .bigPic{
        height: 970px;
        position: relative;
        img{
            width: 6rem;
            height: 4rem;
            border: .06rem solid #fff;
        }
        // video{
        //     width: 6rem;
        //     height: 4rem;
        //     border: .06rem solid #fff;
        // }
        span{
            display: block;
            background: #fff;
            width: .2rem;
            height: .2rem;
            border-radius: 50%;
            text-align: center;
            line-height: .2rem;
            cursor: pointer;

            position: absolute;
            top: .1rem;
            right: .1rem;
        }
    }
    // banner
    .styBanner{
        width: 11.9rem;
        color: #fff;
        .topTit{
            background: #004387;
            height: .30rem;
            display: flex;
            align-items: center;
            span{
                margin-left: .20rem;
            }
            .arrows{
                display: inline-block;
                width: .05rem;
                height: .10rem;
                background: url("../../assets/img/triangle.png") no-repeat;
                background-size: 100% 100%;
            }
        }
        .pic_play{
            position: relative;
            img{
                width: 3rem;
                height: 2rem;
                cursor: pointer;
            }
            .swiper-container .swiper-wrapper{
                position: absolute!important;
            }
        }
    }
    .mainCont{
        padding: .2rem;
        .companyIntr{
            padding-bottom: .2rem;
            border-bottom: .01rem dashed #d2d2d2;
            h4{
                font-size: 24px;
                line-height: .36rem;
                letter-spacing: 0;
                color: #004387;
                margin-bottom: .28rem;
            }
            /deep/p{
                font-size: 14px;
                line-height: .26rem;
                letter-spacing: 0;
                color: #333333;
                text-indent: .28rem;
                margin-bottom: .27rem;
            }
            .packUp,.lookMore{
                padding-right: .14rem;
                text-align: right;
                font-size: 14px;
                line-height: .26rem;
                color: #004387;
                background: url("../../assets/img/join_blueArrows.png") no-repeat right center;
                background-size: .09rem .05rem;
                cursor: pointer;
            }
            .packUp{
                display: none;
            }
        }
    } 
}
.school_tit{
    display: flex;
    h4{
        font-size: 24px;
        font-weight: normal;
        line-height: .36rem;
        letter-spacing: 0rem;
        color: #004387;
        flex: 1;
    }
    .rightSea{
        display: flex;
        align-items: center;
        input{
            border: .01rem solid #e5e6e7;
            width: 1.57rem;
            height: .26rem;
            text-indent: .14rem;
        }
        .search{
            display: inline-block;
            width: .41rem;
            height: .26rem;
            line-height: .26rem;
            text-align: center;
            background: #93aec9;
            color: #fff;
            cursor: pointer;
        }
    }
}
.table .apply{
    display: block;
    width: 1.6rem;
    height: .4rem;
    line-height: .4rem;
    text-align: center;
    background: #f49d00;
    color: #fff;
    border-radius: .05rem;
    font-size: 14px;
    margin-top: .28rem;
}
.table .duty{
    /deep/p{
        font-size: 14px;
        color: #333;
        line-height: .24rem;
        }
}
</style>
