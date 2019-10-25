<template>
 <div class="profile">
     <SmallBanner>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>关于我们</el-breadcrumb-item>
            <el-breadcrumb-item>公司概况</el-breadcrumb-item>
        </el-breadcrumb>
        <img :src="imgUrl" slot="banner">
        <h4 slot="title">公司概况</h4>
     </SmallBanner>
     <div class="play">
        <div id="playerVideo" ref="aboutVideo"></div>
    </div>
    <div class="pro_content" v-html="profileList.Content"></div>
 </div>
</template>

<script>
import SmallBanner from '../../component/smallBanner'
export default {
 data() {
    return {
        profileList:[],
        imgUrl:""
    }
 },
 methods: {
    
 },
 components: {
    SmallBanner
 },
 mounted(){
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        FieldNames:['ImagePath'],
        DataJSONString: JSON.stringify({CommonInfoType:4}),
        Resource: "CommonInfo",
        PageControl: { PageSize:0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        let img = JSON.parse(res.data).Rows[0];
        this.imgUrl = img.ImagePath;
    }).catch((err)=>{
        throw err;
    });
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchAllEnabled",
        DataJSONString: JSON.stringify({}),
        Resource: "CompanyProfile",
        PageControl: { PageSize: 1, PageIndex: 1, OrderBy: "DisplayIndex"}
    }).then((res)=>{
        this.profileList = JSON.parse(res.data).Rows[0];
        // 截取img的src路径
        let img = this.profileList.Memo.toString();
        let regex = /<img.*?src="(.*?)"/;
        this.profileList.Memo = regex.exec(img)[1];

        // 初始化视频
        var player = new Aliplayer({
		id: "playerVideo",
		source: this.profileList.VideoURL,
		width: "8.51rem",
		height: "4.08rem",
		autoplay: false,
        isLive: false,
        cover: this.profileList.Memo
	}, function(player) {
		console.log("The player is created");
	});
    }).catch((err)=>{
        throw err;
    });

    
 }


    
}
</script>

<style scoped lang="less">
.pro_content{
    padding: .20rem;
    box-sizing: border-box;
    /deep/p{
        // margin: .20rem 0;
        font-size: 14px;
        font-weight: normal;
        line-height: .26rem;
        letter-spacing: 0;
        color: #333333;
    }
    /deep/div{
        line-height: .26rem;
        color: #333333;
    }
}
.play{
    width: 8.51rem;
    height: 4.08rem;
    margin: 0 auto;
    .cover{
        /deep/img{
            width: 8.51rem;
            height: 4.08rem;
        }
    }
}
</style>
