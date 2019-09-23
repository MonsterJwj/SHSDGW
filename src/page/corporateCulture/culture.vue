<template>
 <div class="culture">
    <SmallBanner>
        <span>企业文化</span><span class="arrows"></span>
        <img :src="imgUrl" slot="banner">
    </SmallBanner>
    <div class="cultureCont">
        <ul class="list">
            <li v-for="(item,index) in navList" :key="index">
                <router-link :to="item.src">{{item.title}}</router-link>
            </li>
        </ul>
        <router-view></router-view>
    </div>
 </div>
</template>

<script>
import SmallBanner from '../../component/smallBanner'
export default {
 data() {
    return {
        navList:[
            {
                src:"/culture/culturecont",
                title:"隧文化"
            },
            {
                src:"/culture/dutycont",
                title:"社会责任"
            },
            {
                src:"/culture/windowcont",
                title:"视窗"
            }
        ],
        imgUrl:""
    }
 },
 components: {
    SmallBanner
 },
 mounted(){
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        FieldNames:['ImagePath'],
        DataJSONString: JSON.stringify({CommonInfoType:16}),
        Resource: "CommonInfo",
        PageControl: { PageSize:0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        let img = JSON.parse(res.data).Rows[0];
        this.imgUrl = img.ImagePath;
    }).catch((err)=>{
        throw err;
    });
 }
}
</script>

<style scoped lang="less">
.cultureCont{
    padding: .20rem .20rem 0 .20rem;
    .list{
        display: flex;
        li{
            flex: 1;
            border: solid .01rem #004387;
            font-size: .16rem;
            color: #666;
            cursor: pointer;
            &:nth-child(2){
                border-right: none;
                border-left: none;
            }
            a{
                display: block;
                height: .40rem;
                line-height: .40rem;
                text-align: center;
            }
            .router-link-active{
                background: #004387;
                color: #fff;
            }
        }
    }
}

</style>
