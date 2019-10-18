<template>
 <div class="talents">
    <SmallBanner>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item  :to="{ path: '/joinUs/columnintroduced' }">加入我们</el-breadcrumb-item>
            <el-breadcrumb-item>校园招聘</el-breadcrumb-item>
        </el-breadcrumb>
        <img :src="imgUrl" slot="banner">
        <h4 slot="title">校园招聘</h4>
        <div class="rightSea" slot="rightCont">
            <input type="text" placeholder="请输入职位" @keyup.enter="search" v-model="inputVal"><span class="search" @click="search">搜索</span>
        </div>
    </SmallBanner>
    <div class="table">
        <el-table :data="schoolData" style="width: 11.5rem" :show-header="showHead">
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
                        <div class="apply-er">
                            <a :href="props.row.href" target="_blank" class="apply">立即申请</a>
                            <img :src="props.row.erHref">
                        </div>
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
import SmallBanner from '../../component/smallBanner'
import Pagination from '../../component/Pagination'
export default {
 data() {
    return {
        totalPage:0,
        page:1,
        pageSize:4,
        // 当搜索职位，使用分页器时，判断渲染哪个函数
        shouldFn:0,
        schoolData:[],
        // 控制表格的表头
        showHead:false,
        recruitStatus:"",
        imgUrl:"",
        inputVal:"",
        companyInfo:[]
    }
 },
 methods: {
    search(){
        this.shouldFn = 1;
        let txt = "%" + this.inputVal + "%";

        this.$axios.post('/api/Table/TableAction',{
            Action: "SearchBlurEnabled",
            DataJSONString: JSON.stringify({JobType:1,Name:txt}),
            Resource: "Job",
            PageControl: { PageSize:this.pageSize, PageIndex:this.page, OrderBy: "DisplayIndex DESC,ID DESC"}
        }).then((res)=>{
            this.schoolData = JSON.parse(res.data).Rows;
            for(let i=0;i<=this.schoolData.length-1;i++){
                // 获取失效日期
                let staleDated = this.schoolData[i].ExpiredDate;
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
            
                this.schoolData[i].PubDate = this.schoolData[i].PubDate.substring(0,10);
            }
            this.totalPage = JSON.parse(res.data).PagingInfo.AllRecordCount;

            // 为对应公司的立即申请添加url            
            for(let m=0;m<=this.schoolData.length-1;m++){
                for(let n=0;n<=this.companyInfo.length-1;n++){
                    if(this.schoolData[m].CompanyInfoID == this.companyInfo[n].ID){
                        this.schoolData[m].href = this.companyInfo[n].URLLink;
                        this.schoolData[m].erHref = this.companyInfo[n].Memo;
                        continue;
                    }
                }
            }      
        }).catch((err)=>{
            throw err;
        });
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
            DataJSONString: JSON.stringify({JobType:1}),
            Resource: "Job",
            PageControl: { PageSize:this.pageSize, PageIndex:this.page, OrderBy: "DisplayIndex DESC,ID DESC"}
        }).then((res)=>{
            this.schoolData = JSON.parse(res.data).Rows;
            for(let i=0;i<=this.schoolData.length-1;i++){
                // 获取失效日期
                let staleDated = this.schoolData[i].ExpiredDate;
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
            
                this.schoolData[i].PubDate = this.schoolData[i].PubDate.substring(0,10);
            }
            this.totalPage = JSON.parse(res.data).PagingInfo.AllRecordCount; 

            for(let m=0;m<=this.schoolData.length-1;m++){
                for(let n=0;n<=this.companyInfo.length-1;n++){
                    if(this.schoolData[m].CompanyInfoID == this.companyInfo[n].ID){
                        this.schoolData[m].href = this.companyInfo[n].URLLink;
                        this.schoolData[m].erHref = this.companyInfo[n].Memo;
                        continue;
                    }
                }
            }
        }).catch((err)=>{
            throw err;
        });
    }
 },
 mounted(){
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        FieldNames:['ImagePath'],
        DataJSONString: JSON.stringify({CommonInfoType:14}),
        Resource: "CommonInfo",
        PageControl: { PageSize:0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        let img = JSON.parse(res.data).Rows[0];
        this.imgUrl = img.ImagePath;
    }).catch((err)=>{
        throw err;
    });

    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchByJobType",
        FieldNames:['URLLink','ID','Memo'],
        DataJSONString: JSON.stringify({ID:1}),
        Resource: "CompanyInfo"
    }).then((res)=>{
        this.companyInfo = JSON.parse(res.data);

         // 截取二维码的url
        let imgReg = /<img\b.*?(?:\>|\/>)/gi;
        for(let k=0;k<this.companyInfo.length;k++){
            if(this.companyInfo[k].Memo != ""){
                let erImg = this.companyInfo[k].Memo;
                let erArr = erImg.match(imgReg);
                for(let t=0;t<erArr.length;t++){
                    let erUrl = erArr[t].split("\"");
                    this.companyInfo[k].Memo = erUrl[1];
                }
            }
        }
        
    }).catch((err)=>{
        throw err;
    })

    this.getdata();
    
 },
 components: {
    SmallBanner,
    Pagination
 }
}
</script>
<style lang="less">
.table .apply{
    display: block;
    width: 1.6rem;
    height: .4rem;
    line-height: .4rem;
    text-align: center;
    background: #f49d00;
    color: #fff;
    border-radius: .05rem;
    font-size: 16px;
}
.table .duty>p{
    font-size: 14px;
    color: #333;
    line-height: .24rem;
}
.apply-er{
    margin-top: .28rem;
    display: flex;
    align-items: center;
}
.apply-er img{
    width: 1rem;
    height: 1rem;
    margin-left: .6rem;
    max-width: 1rem;
}
</style>