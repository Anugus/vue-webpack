<!-- 模板 -->
<template>
  <div>
    <Navbar class="nav-container"/>
    <Sidebar class="sidebar-container"></Sidebar>
  </div>
</template>

<script>
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'
export default {
  data () {
    return {
    }
  },
  components: {
    Navbar,
    Sidebar
  }
}
</script>
<style lang='less' scoped>
.nav-container{
  height: 50px;
}
.sidebar-container{
  width: 180px;
}
</style>