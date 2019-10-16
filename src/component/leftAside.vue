<template>
  <div class="aside">
    <!-- 主体侧边栏 -->
    <ul id="menu">
			<li v-for="(item,index) in navList" :key="index" @click="handleClick(index)">
				<span :class="{'bg': oneIndex == index}" v-if="item.type == 0">{{item.name}}</span>
        <a :href="item.url" target="blank" v-else>{{item.name}}</a>
        <el-collapse-transition>
          <ul class="twoNav" v-show="item.show">
              <li :class="{'nobg': twoIndex == i}" v-for="(k,i) in item.twoNav" :key="i"  @click.stop="handleClick(index, i)">{{k.name}}</li>
          </ul>
        </el-collapse-transition>
			 </li>
		</ul>
    <!-- 招聘人才侧边栏 -->
    <div class="recruitAside" v-show="joinAsideShow">
      <p>{{joinTitle}}</p>
      <ul>
        <li>
          <router-link to="/joinUs/socialTalents" v-show="joinAllShow == 1">全部</router-link>
          <router-link to="/joinUs/currentstudents" v-show="joinAllShow == 2">全部</router-link>
          <router-link to="/joinUs/internship" v-show="joinAllShow == 3">全部</router-link>
        </li>
        <li v-for="(item,index) in joinNav" :key="index">
          <router-link :to='"/joinUs/socialinfo/"+item.ID' v-show="joinAllShow == 1">{{item.Name}}</router-link>
          <router-link :to='"/joinUs/studentinfo/"+item.ID' v-show="joinAllShow == 2">{{item.Name}}</router-link>
          <router-link :to='"/joinUs/internshipinfo/"+item.ID' v-show="joinAllShow == 3">{{item.Name}}</router-link>
        </li>
      </ul>
    </div>
    <!-- 侧边栏 二维码 -->
    <div class="equipment">
        <img src="../assets/img/erweima.jpg" alt="上海隧道二维码">
        <div class="equ">
          <a href="#" class="weibo"></a>
          <a href="#" class="wechat"></a>
          <a href="#" class="book"></a>
        </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        joinNav:[],
        joinTitle:"",
        joinAllShow:"",
        joinAsideShow:false,
        nowIndex:1,
        oldIndex:1,
        oneIndex: 0,
        // 防抖节流，避免页面刷新调用侧边栏时，陷入死循环
        flag:true,
        twoIndex: -1,
        navList:[
          {
            url:"/home",
            name:"首页",
            show:false,
            type:0
          },
          {
            url:"/about",
            name:"关于我们",
            show:false,
            type:0,
            twoNav:[
              {
                url:"/about/companyProfile",
                name:"公司概况"
              },
              {
                url:"/about/framework",
                name:"企业架构"
              },
              {
                url:"/about/developmentHistroy",
                name:"发展历程"
              },
              {
                url:"/about/honor",
                name:"荣誉资质"
              }
            ]
          },
          {
            url:"http://dj.stec.sh.cn/",
            name:"党群工作",
            type:1,
            show:false
          },
          {
            url:"/state",
            name:"公司动态",
            show:false,
            type:0,
            twoNav:[
              {
                url:"/state/companyNews",
                name:"公司新闻"
              },
              {
                url:"/state/tradeNews",
                name:"行业新闻"
              }
            ]
          },
          {
            url:"/scode",
            name:"业务范围",
            show:false,
            type:0,
            twoNav:[
              {
                url:"/scode/invest",
                name:"投资"
              },
              {
                url:"/scode/project",
                name:"工程建设"
              },
              {
                url:"/scode/product",
                name:"产品制造"
              }
            ]
          },
          {
            url:"/joinUs",
            name:"加入我们",
            show:false,
            type:0
          },
          {
            url:"/culture",
            name:"企业文化",
            show:false,
            type:0
          },
          {
            url:"/cntech",
            name:"科技创新",
            show:false,
            type:0
          }
        ]
      }
    },
    mounted(){
      this.listenRoute();
    },
    methods: {
      handleClick(oneIndex, twoIndex){
        if(twoIndex == null){   //一级
          this.twoIndex = -1;
          this.oneIndex = oneIndex;
          //合上
          this.navList[1].show = false;
          this.navList[3].show = false;
          this.navList[4].show = false;
          if(oneIndex == 1 || oneIndex == 3 || oneIndex == 4){    //展开
            this.navList[oneIndex].show = true;
            return;
          }

          if(this.navList[oneIndex].type != 1){
            this.$router.push({
              path: this.navList[oneIndex].url
            })
          }
        }
        
        if(twoIndex>=0){  //二级
          this.twoIndex = twoIndex;
          this.$router.push({
            path: this.navList[oneIndex].twoNav[twoIndex].url
          })
        }
      },
      listenRoute(){
        let path = this.$route.path
        let a;
        let b = -1;
        for(let i = 0; i < this.navList.length; i++){
          if(path.indexOf(this.navList[i].url) != -1){
            a = i;
          }
          if(this.navList[i].twoNav){
            for(let j = 0; j < this.navList[i].twoNav.length; j++){
              if(path.indexOf(this.navList[i].twoNav[j].url) != -1 ){
                a = i;
                b = j;
                break;
              }
            }
          }
        }
        this.oneIndex = a;
        if(b > -1){
          this.twoIndex = b;
          this.navList[a].show = true;
        }
      },
      recruit(){
        if(this.$route.path == "/joinUs/currentstudents" || this.$route.path == "/joinUs/studentinfo/"+this.$route.params.id){
          // 获取校园招聘类型的全部企业信息
          this.$axios.post('/api/Table/TableAction',{
            Action: "SearchByJobType",
            FieldNames:['Name','ID'],
            DataJSONString: JSON.stringify({ID:1}),
            Resource: "CompanyInfo",
            PageControl: { PageSize:0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
          }).then((res)=>{
            this.joinNav = JSON.parse(res.data);
          }).catch((err)=>{
              throw err;
          });
          this.joinTitle = "应届学生招聘单位";
          this.joinAllShow = 2;
        }else if(this.$route.path == "/joinUs/socialTalents" || this.$route.path == "/joinUs/socialinfo/"+this.$route.params.id){
          // 获取社会招聘类型的全部企业信息
          this.$axios.post('/api/Table/TableAction',{
            Action: "SearchByJobType",
            FieldNames:['Name','ID'],
            DataJSONString: JSON.stringify({ID:2}),
            Resource: "CompanyInfo",
            PageControl: { PageSize:0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
          }).then((res)=>{
            this.joinNav = JSON.parse(res.data);
          }).catch((err)=>{
              throw err;
          });
          this.joinTitle = "社会人才招聘单位";
          this.joinAllShow = 1;
        }else if(this.$route.path == "/joinUs/internship" || this.$route.path == "/joinUs/internshipinfo/"+this.$route.params.id){
          // 获取实习招聘类型的全部企业信息
          this.$axios.post('/api/Table/TableAction',{
            Action: "SearchByJobType", 
            FieldNames:['Name','ID'],
            DataJSONString: JSON.stringify({ID:3}),
            Resource: "CompanyInfo",
            PageControl: { PageSize:0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
          }).then((res)=>{
            this.joinNav = JSON.parse(res.data);
          }).catch((err)=>{
              throw err;
          });
          this.joinTitle = "实习见习招聘单位";
          this.joinAllShow = 3;
        }
      },
      joinAside(){
        if(this.$route.path == "/joinUs/currentstudents" || this.$route.path == "/joinUs/internship" || this.$route.path == "/joinUs/socialTalents" || this.$route.path == "/joinUs/studentinfo/"+this.$route.params.id || this.$route.path == "/joinUs/internshipinfo/"+this.$route.params.id || this.$route.path == "/joinUs/socialinfo/"+this.$route.params.id){
          this.joinAsideShow = true;
        }else{
          this.joinAsideShow = false;
        }
      }   
    },
    updated(){
      this.joinAside();
     
      if(this.flag){
        this.flag = false;
        this.recruit();
        setTimeout(()=>{
          this.flag = true;
        },100);
      }
    },
    watch:{
      $route(){
        this.listenRoute();
        this.joinAside();
      }
    }
  }
</script>
<style scoped lang="less">
  
  .aside {
    width: 1.8rem;
    border-right: .02rem solid #d8d9d9;
    padding-right: .3rem;

    #menu {
      padding-top: .10rem;
      .bg {
          background: #004387;
          color: #fff;
        }
        .nobg{
          background: #93aec9;
                color: #fff;
        }

      li {
        width: 1.50rem;
        cursor: pointer;
        color: #666;
        font-size: 14px;
        line-height: .36rem;
        text-align: center;
        span{
          display: block;
          background: #fff;
        }
        .twoNav{
          margin-top: .10rem;
          background: #f5f5f5;
          width: 1.50rem;
          .router-link-active {
            background: #93aec9;
            color: #fff;
          }
        }
        a{
          color: #666;
          font-size: 14px;
          line-height: .36rem;
          text-align: center;
          display: block;
        }
      }
    }
    .equipment {
      margin-top: .47rem;
      width: 1.50rem;

      display: flex;
      flex-direction: column;
      align-items: center;
      img{
        width: .93rem;
        height: .93rem;
      }

      .equ {
        margin: .20rem 0 0 .02rem;
        display: flex;

        a {
          margin-right: .10rem;
          display: block;
          width: .20rem;
          height: .20rem;
        }

        .weibo {
          background: url("../assets/img/weibo.jpg") no-repeat;
          background-size: 100% 100%;
        }

        .wechat {
          background: url("../assets/img/WeChat.jpg") no-repeat;
          background-size: 100% 100%;
        }

        .book {
          background: url("../assets/img/book.jpg") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }

  // 招聘人才 侧边栏
  .recruitAside{
    margin-top: .43rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0;
    p{
      font-size: .16rem;
      color: #333333;
      text-indent: .15rem;
      padding: .1rem 0;
      background: url("../assets/img/gang.jpg") no-repeat left center;
      background-size: .04rem .16rem;
      border-bottom: .01rem solid #004387;
    }
    ul{
      margin-top: .08rem;
    }
    li{
      font-size: 14px;
      line-height: .20rem;
      a{
        display: block;
        color: #666666;
        padding: .1rem .13rem .08rem .1rem;
      }
      .router-link-active {
        background: #93aec9;
        color: #fff;
      }
    }
  }
</style>
