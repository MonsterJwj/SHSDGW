<template>
 <div class="sma_banner">
     <div class="topNav">
        <slot></slot>
     </div>
     <slot name="banner"></slot>
     <div class="titleSel">
        <slot name="title"></slot>
        <slot name="rightCont"></slot>
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

 },
 components: {

 }
}
</script>

<style scoped lang="less">
.sma_banner{
    width: 11.9rem;
    color: #fff;
    .topNav{
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
            background: url("../assets/img/triangle.png") no-repeat;
            background-size: 100% 100%;
        }
    }
    img{
        width: 11.9rem;
        height: 2rem;
    }
    .titleSel{
        display: flex;
        align-items: center;
        h4{
            font-size: 24px;
            font-weight: normal;
            height: .36rem;
            line-height: .36rem;
            letter-spacing: 0rem;
            color: #004387;
            margin: .23rem 0 .22rem .20rem;
            flex: 1;
        }
        .sbanner{
            margin: .23rem 0 0 .2rem;
        }
        // select{
        //     width: 1.57rem;
        //     height: .26rem;
        //     text-indent: .14rem;
        //     color: #666;
        //     border: .01rem solid #e5e6e7;
        //     margin-right: .2rem;
        //     appearance: menulist;
        //     -moz-appearance: menulist;
        //     -webkit-appearance: menulist;
        // }
        .rightSea{
            display: flex;
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
        .return{
            text-align: right;
            margin-right: .2rem;
            a{
                display: block;
                font-size: 13px;
                cursor: pointer;
                color: #004387;
                background: url("../assets/img/return.png") no-repeat left center;
                background-size: .05rem .08rem;
                text-indent: .08rem; 
            }
        }
    }
}
</style>
