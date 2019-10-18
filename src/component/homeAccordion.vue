<template>
    <div id="box">
        <div class="picbox" v-for="(item,index) in ImgList" :key="index">
            <router-link :to="item.URLLink" v-if="ImgList[index].URLLink.substr(0,4) != 'http'"><img :src="item.ImagePath"></router-link>
            <a :href="item.URLLink" target="_blank" v-else><img :src="item.ImagePath"></a>
        </div>
    </div>
</template>

<script>
import {accordion} from '../assets/js/home.js'
export default {
 data() {
    return {
        //设置用户设置信息
        option:{
            col:4,
            row:1
        },
        
        // 业务范围
        ImgList:[]
    }
 },
 mounted(){
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        FieldNames:["URLLink","ImagePath"],
        DataJSONString: JSON.stringify({CommonInfoType:101}),
        Resource: "CommonInfo",
        PageControl: { PageSize: 0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        this.ImgList = JSON.parse(res.data).Rows;
        for(let i=0;i<this.ImgList.length;i++){
            let pathUrl = this.ImgList[i].URLLink.substr(0,4);
        }
    }).catch((err)=>{
      throw err;
    });

 },
 updated(){
    accordion("box",this.option);
 }
}
</script>

<style scoped lang="less">
    #box {
        width: 100%;
        overflow: hidden;

        display: flex;
        .picbox {
            height: 1.72rem;
            overflow: hidden;
            a{
                display: block;
                img{
                    height: 1.72rem;
                    max-width: 4.68rem;
                }
            }
        }
    }
</style>
