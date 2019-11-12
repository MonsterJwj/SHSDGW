<template>
 <div class="project">
     <SmallBanner>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>业务范围</el-breadcrumb-item>
            <el-breadcrumb-item>产品制造</el-breadcrumb-item>
        </el-breadcrumb>
        <img :src="imgUrl" slot="banner">
        <h4 slot="title">产品制造</h4>
     </SmallBanner>
     <div class="cont">
        <div class="scodeImg">
            <img :src="contImg">
        </div>
        <div class="txt">
            <!-- <span id="equipment-title">装备制造</span> -->
            <div id="equipment" v-if="equipmentList.length > 0">
                <div class="equipment-cont" v-html="equipmentList[0].Content"></div>
            </div>
            <!-- <span id="component-title">构件</span> -->
            <div id="component" v-if="componentList.length > 0">
                <div class="component-cont" v-html="componentList[0].Content"></div>
            </div>
            <!-- <span id="waterproof-title">防水材料</span> -->
            <div id="waterproof" v-if="waterproofList.length > 0">
                <div class="waterproof-cont" v-html="waterproofList[0].Content"></div>
            </div>
            <!-- <span id="milepost-title">上海隧道里程碑</span> -->
            <div id="milepost" v-if="milepostList.length > 0" >
                <div class="milepost-cont" v-html="milepostList[0].Content"></div>
                <div class="play-img" v-if="imgList.length > 0">
                    <swiper :options="swiperOption" ref="mySwiper">
                        <!-- slides -->
                        <swiper-slide v-for="(item,index) in imgList" :key="index"><img :src="item" /></swiper-slide>
                        <!-- Optional controls -->
                        <div class="swiper-pagination"  slot="pagination"></div>
                    </swiper>
                </div>
            </div>
        </div>
     </div>
 </div>
</template>

<script>
import SmallBanner from '../../component/smallBanner'
export default {
 data() {
    return {
        // 装备制造请求过来的数据
        equipmentList:[],
        // 构件请求过来的数据
        componentList:[],
        // 防水材料请求过来的数据
        waterproofList:[],
        // 上海隧道里程碑
        milepostList:[],
        imgUrl:"",
        contImg:"",
        // 轮播图片
        imgList:[],
        swiperOption: {
            autoplay: {
                delay: 2000,//3秒切换一次
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            loop:true
        }
    }
 },
 mounted(){
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        FieldNames:['ImagePath'],
        DataJSONString: JSON.stringify({CommonInfoType:13}),
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
        FieldNames:['Content'],
        DataJSONString: JSON.stringify({CommonInfoType:102}),
        Resource: "CommonInfo",
        PageControl: { PageSize: 0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        let list = JSON.parse(res.data).Rows[0];
        // 截取图片路径
        let img = list.Content;
        var regex = /<img.*?src="(.*?)"/;
        this.contImg = regex.exec(img)[1];
    }).catch((err)=>{
      throw err;
    });

    //  装备制造
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        FieldNames:['Content'],
        DataJSONString: JSON.stringify({ ProductType: 1 }),
        Resource: "Manufacture",
        PageControl: { PageSize: 1, PageIndex: 1, OrderBy: "DisplayIndex DESC,ECDate DESC"}
    }).then((res)=>{
        this.equipmentList = JSON.parse(res.data).Rows;
        // if( this.equipmentList.length == 0){
        //     document.getElementById('equipment-title').style.display = 'none';
        // }
    }).catch((err)=>{
      throw err;
    });
    // 构件
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        FieldNames:['Content'],
        DataJSONString: JSON.stringify({ ProductType: 2 }),
        Resource: "Manufacture",
        PageControl: { PageSize: 1, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        this.componentList = JSON.parse(res.data).Rows;
        // if( this.componentList.length == 0){
        //     document.getElementById('component-title').style.display = 'none';
        // }
    }).catch((err)=>{
      throw err;
    });
    // 防水材料
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        FieldNames:['Content'],
        DataJSONString: JSON.stringify({ ProductType: 3 }),
        Resource: "Manufacture",
        PageControl: { PageSize: 1, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        this.waterproofList = JSON.parse(res.data).Rows;
        // if( this.waterproofList.length == 0){
        //     document.getElementById('waterproof-title').style.display = 'none';
        // }
    }).catch((err)=>{
      throw err;
    });
    // 上海隧道里程碑
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        FieldNames:['Content','Memo'],
        DataJSONString: JSON.stringify({ ProductType: 4 }),
        Resource: "Manufacture",
        PageControl: { PageSize: 1, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        this.milepostList = JSON.parse(res.data).Rows;
        // if( this.milepostList.length == 0){
        //     document.getElementById('milepost-title').style.display = 'none';
        // }
        if(this.milepostList[0].Memo != null){
            // 截取img的src路径
            let img = this.milepostList[0].Memo;
            while (img.indexOf('src=')>=0) {
                img=img.substring(img.indexOf('src=')+5);
                this.imgList.push(img.substring(0,img.indexOf('" ')));
            }
        }
    }).catch((err)=>{
      throw err;
    });
 },
 components: {
    SmallBanner
 }
}
</script>

<style scoped lang="less">
.cont{
    padding: 0 .20rem;
    .scodeImg{
        padding: .20rem;
        background: #f7f7f7;
        img{
            max-width: 11.1rem;
        }
    }
    span{
        display: inline-block;
        padding: 0 .2rem;
        height: .30rem;
        text-align: center;
        line-height: .30rem;
        font-size: 16px;
        color: #fff;
        background: #004387;
        font-weight: bold;
        margin-top: .40rem;
    }
    .txt{
        /deep/h6{
            margin-top: .17rem;
            font-weight: bold;
            color: #004387;
            font-size: 14px;
        }
        /deep/p{
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: .26rem;
            letter-spacing: 0rem;
            color: #333;
        }
        /deep/img{
            max-width: 11.39rem;
        }
    }
    /deep/.milepost-cont{
        font-size: 14px;
        line-height: .26rem;
    }
    .play-img{
        margin-top: .17rem;
        img{
            max-width: 11.5rem;
            max-height: 4.5rem;
            margin: 0 auto;
            display: block;
        }
    }
}
</style>