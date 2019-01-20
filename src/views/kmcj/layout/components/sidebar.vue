<!--  -->
<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">成绩单</span>
        </el-menu-item>
        <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">考试报告</span>
        </el-menu-item>
        </el-menu>
    </el-scrollbar>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style lang='less' scoped>
.el-menu-vertical-demo{
  height: calc(100vh - 50px);
  padding-top:10px;
}
.el-menu-item.is-active{
  background-color: #59a0de;
}
</style>
