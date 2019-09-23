<template>
 <div class="tab">
    <ul>
		<li id="bg1" @click="chgtt(1)"><slot name="oneTit"></slot></li>
		<li id="bg2" @click="chgtt(2)"><slot name=twoTit></slot></li>
		<li id="bg3" @click="chgtt(3)"><slot name="threeTit"></slot></li>
	</ul>
	<div id="cont1">
        <slot name="oneCont"></slot>
	</div>
	<div id="cont2">
        <slot name="twoCont"></slot>
	</div>
	<div id="cont3">
        <slot name="threeCont"></slot>
	</div>

 </div>
</template>

<script>
export default {
 data() {
    return {
        
    }
 },
 methods: {
    chgtt(d1)	{
        //设当前显示层
        var NowFrame;
        if(Number(d1))	{
            NowFrame=d1;
        }
        else
        {
            NowFrame=1;
        }

        for(var i=1;i<=3;i++){
            if(i==NowFrame)	{
                document.getElementById("cont"+NowFrame).style.display ="block";   //当前层
                document.getElementById("bg"+NowFrame).className="bg";
            }
            else
            {
                document.getElementById("cont"+i).style.display ="none";    //隐藏其他层
                document.getElementById("bg"+i).className="nobg";
            }
        }
    }
 },
 mounted(){
    this.chgtt(this.$store.state.chgtt);
 }
}
</script>

<style scoped lang="less">
.tab{
    padding: .20rem .20rem 0 .20rem;
    ul{
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
            a,span{
                display: block;
                height: .40rem;
                line-height: .40rem;
                text-align: center;
            }
        }
    }
    #cont2,#cont1,#cont3{
        display: none;
    }
    .bg{
        background: #004387;
        color: #fff;
    }

    .nobg{
        background: #fff;
    }
}
</style>
