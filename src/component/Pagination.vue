<!-- 分页 -->
<template>
  <div class="page" v-if="total != 0">
        <el-pagination
        background
        layout="slot"
        :total="total"
        :page-size="pageSize">
        <div class="slot first-pager" @click="jumpPage('1')">首</div>
        </el-pagination>
        <el-pagination
        background
        layout="prev, pager, next, slot"
        :total="total"
        :page-size="pageSize"
        :current-page="page"
        @current-change="clickPage"
        >
        <div class="slot last-pager" @click="jumpPage('0')">尾</div>
        </el-pagination>
  </div>
</template>

<script>
export default {
    props:{
        total: {
            type: Number,
            default: 0
        },
        page: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number, 
            default: 4
        }
    },
  data () {
    return {
    }
  },
  watch:{
      page (newVal){
          return newVal
      }
  },
  methods:{
    jumpPage(val){
        switch(val){
            case "1"://跳转到首页
            this.$emit('currentPage', 1)
            break;
            case "0"://跳转到末页
            this.$emit('currentPage', Math.ceil(this.total/this.pageSize));
            break;
        }
    },
    clickPage(i){
        this.$emit('currentPage', i)
    },
    // prevPage(){
    //     this.$emit('currentPage', i)
    // },
    // nextPage(){
    //     this.$emit('currentPage', i)
    // }
  }
}

</script>
<style scoped>
.slot{
    vertical-align: top;
    display: inline-block;
    background: #f5f5f5;
    font-size: 12px;
    width: .4rem;
    height: .32rem;
    line-height: .32rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
    border-radius: .05rem;
    color: #919191;
    border: 1px solid #dcdcdc;
}
.slot:hover{
    background: #004387;
    color: #f5f5f5;
}
.last-pager{
    margin-left: .07rem;
}
/* 分页器 */
  .page{
    padding: 20px 0;
    text-align: center;
  }
  
</style>