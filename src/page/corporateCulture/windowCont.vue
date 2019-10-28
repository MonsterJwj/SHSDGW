<template>
 <div class="window">
    <div class="vedioContainer" v-for="(item,index) in windowList" :key="index">
        <h5>{{item.Name}}</h5>  
        <div :id="'playerVideo'+index" @click="playVideo(index,$event)"></div>
    </div>
 </div>
</template>

<script>
export default {
 data() {
    return {
        windowList:[],
        player : [],
        oldIndex : -1
    }
 },
 mounted(){
     // 视窗
    this.$axios.post('/api/Table/TableAction',{
        Action: "SearchBlurEnabled",
        FiledNames:['Name'],
        DataJSONString: JSON.stringify({ CultureType: 3 }),
        Resource: "Culture",
        PageControl: { PageSize: 0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
    }).then((res)=>{
        this.windowList = JSON.parse(res.data).Rows;
    }).then(()=>{
        this.playVid();
    })
    .catch((err)=>{
        throw err;
    });
 },
 methods:{
    playVid(){
        this.$axios.post('/api/Table/TableAction',{
            Action: "SearchBlurEnabled",
            FiledNames:['VideoURL','Memo'],
            DataJSONString: JSON.stringify({ CultureType: 3 }),
            Resource: "Culture",
            PageControl: { PageSize: 0, PageIndex: 1, OrderBy: "DisplayIndex DESC,ID DESC"}
        }).then((res)=>{
            let initializeVideo = JSON.parse(res.data).Rows;
            
            // 初始化视频
            for(let i=0;i< initializeVideo.length;i++){
                // 截取图片
                let img = initializeVideo[i].Memo;
                let regex = /<img.*?src="(.*?)"/;
                let coverSrc = regex.exec(img)[1];

                this.player.push(new Aliplayer({
                    id: "playerVideo"+i,
                    source:  initializeVideo[i].VideoURL,
                    width: "8.5rem",
                    height: "4.1rem",
                    autoplay: false,
                    isLive: false,
                
                    cover: coverSrc
                    }, function(player) {
		                console.log("The player is created");
                    })
                )
            }
        }).catch((err)=>{
            throw err;
        });
    },
    // 使本页面只播放一个视频
    playVideo(index, e){
        if(e.target.className.indexOf('outter') > -1 || (e.target.className.indexOf('prism-play-btn') > -1 && e.target.className.indexOf('playing') > -1)){
            this.player[index].play();
            if(this.oldIndex > -1){
                this.player[this.oldIndex].pause();
            }
            this.oldIndex = index    
                
        }
    }

 }
}
</script>

<style scoped lang="less">
.window{
    letter-spacing: 0;
    color: #004387;

    display: flex;
    flex-direction: column;
    align-items: center;
    h5{
        font-size: 24px;
        font-weight: normal;
        margin: .50rem 0 .30rem 0;
        text-align: center;
    }
}
</style>
