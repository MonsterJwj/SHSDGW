<template>
 <div class="head">
    <img src="../assets/img/logo.png" alt="上海隧道">
    <div class="sea">
        <div class="input">
            <input type="text" placeholder="站内搜索" @keyup.enter="search" v-model="inputVal">
            <span @click="search()"></span>
        </div>
    </div>
 </div>
</template>

<script>
export default {
 data() {
    return {
        inputVal:""
    }
 },
 methods: {
    search(){
        // 跳转传参
        if(this.inputVal == ""){
            alert("请输入关键字！");
        }else{
            this.$router.push({path:'/search',query:{seaValue:this.inputVal}});
        }
    }
 },
 watch:{
    //  路由跳转后，使input值变为空，并失去焦点 
     $route(to,from){
        let inp = document.getElementsByTagName("input")[0];
        this.inputVal = "";
        inp.blur();
     }
 }
}
</script>

<style scoped lang="less">
.head{
    display: flex;
    width: 100%;
    border-bottom: .02rem solid #08498b;
    padding: .28rem 0 .12rem 0;
    .sea{
        flex: 1;
        vertical-align: middle;

        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        .input{
            width: 2.80rem;
            display: flex;
            justify-content: center;
            background: url("../assets/img/search.png") no-repeat;
            background-size: 100%;

            position: relative;
            input{
                flex: 1;
                height: .35rem;
                text-indent: .17rem;
                font-weight: normal;
                background: #f1f1f1;
                border: none;
                font-size: 14px;
            }
            span{
                display: inline-block;
                width: .40rem;
                height: .35rem;
                cursor: pointer;
            }
        }
    }
}
</style>
