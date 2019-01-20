<!-- 模板 -->
<template>
  <div class="container">
    <Navbar class="nav-container"/>
    <Sidebar class="sidebar-container"></Sidebar>
    <AppMain class="main-container"></AppMain>
  </div>
</template>

<script>
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'
import AppMain from './components/appMain'
export default {
  data () {
    return {
    }
  },
  components: {
    Navbar,
    Sidebar,
    AppMain
  }
}
</script>
<style lang='less' scoped>
.container{
  height: 100%;
  .nav-container{
    height: 50px;
    line-height: 50px;
    width: 100%;
    position: fixed;
  }
  .sidebar-container{
    width: 180px;
    position: fixed;
    margin-top: 50px;
  }
  .main-container {
    min-height: 100%;
    transition: margin-left .28s;
    margin-left: 180px;
    padding-top: 50px;
    position: relative;
    background-color: #000;
  }
}

</style>
