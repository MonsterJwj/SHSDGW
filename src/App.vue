<template>
  <div id="app">
    <!-- 头部 -->
    <header>
      <Head></Head>
    </header>
    <!-- 内容主体 -->
    <section>
      <!-- 侧边栏 -->
      <LeftAside></LeftAside>
      <!-- 内容 -->
      <article>
        <router-view></router-view>
        <!-- 页脚 -->
        <Foot></Foot>
      </article>
    </section>
  </div>
</template>

<script>
import Head from './component/head'
import LeftAside from './component/leftAside'
import Foot from './component/foot'

export default {
  name: 'App',
  components:{
    Head,
    LeftAside,
    Foot
  }
}
</script>

<style>
/* 重置样式 */
@import url("./assets/css/common.css");

html,body{
  min-width: 1200px;
  background: #f9f9f9;
  height: 100%;
}
#app {
  font-family: 'MicrosoftYaHei','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #666;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  height: auto;
  box-sizing: content-box;
  background: #fff;
  padding: .2rem .4rem .4rem .4rem;
}
section{
  display: flex;
}
article{
  width: 11.90rem;
}
/* 表格的样式 */
.table{
    padding: 0 .2rem;
}
.table .el-table__expand-icon .el-icon-arrow-right::before{
    content: "";
}
.table .el-icon-arrow-right{
    display: block;
    width: .21rem;
    height: .12rem;
    background: url("./assets/img/join_bottArrows.png") no-repeat;
    background-size: .21rem .12rem;
}
.table .el-table__expand-icon--expanded{
    transform: rotateX(180deg);
}
.table .el-table td{
    padding: .16rem 0;
    margin-top: .2rem;
    border-bottom: .01rem dashed #d2d2d2;
}
.table .el-table .cell{
    padding: .15rem .24rem .14rem .2rem;
    background-color: #f7f7f7;
    line-height: .2rem;
    height: .49rem;
}
.table .el-table .el-table__row{
    padding: .16rem 0;
    background-color: #fff;
    margin-top: .16rem;
}
.table .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: transparent;
}
.table .el-table::before {
   height: 0;
}

/* 分页器 */
.el-pagination{
    display: inline-block;
    text-align: center;
    color: #919191;
    padding: 0;
  }
  .el-pager li{
    padding: 0 .07rem;
    font-size: .12rem;
    height: .32rem;
    line-height: .32rem;
    width: .34rem;
    border: 1px solid #dcdcdc;
    border-radius: .05rem!important;
  }
  .el-pagination.is-background .el-pager li{
    background: #f5f5f5 !important;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color: #004387 !important;
  }
  .el-pagination button{
    width: .34rem;
    height: .32rem;
  }
  .el-pagination.is-background .btn-prev{
    margin: 0 .07rem;
    border-radius: .05rem;
    border: 1px solid #dcdcdc;
  }
  .el-pagination.is-background .btn-next{
    margin: 0 .07rem;
    border-radius: .05rem;
    border: 1px solid #dcdcdc;
  }
  /* @media all and (max-width: 1200px) {
    #app{
      width: auto;
    }
  } */
</style>
