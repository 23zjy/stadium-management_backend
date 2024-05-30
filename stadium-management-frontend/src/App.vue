<template>
  <div id="app">
    <!-- 导航栏 -->
    <el-header>
      <!-- 导航菜单 -->
      <el-menu mode="horizontal">
        <el-menu-item>
          <router-link to="/dashboard" class="router-link">数据看板</router-link>
        </el-menu-item>
        <el-menu-item>
          <router-link to="/members" class="router-link">会员列表</router-link>
        </el-menu-item>
        <el-menu-item>
          <router-link to="/products" class="router-link">销售产品</router-link>
        </el-menu-item>
        <el-menu-item>
          <router-link to="/venues" class="router-link">场地查看</router-link>
        </el-menu-item>
        <el-menu-item>
          <router-link to="/finance" class="router-link">财务总结</router-link>
        </el-menu-item>
        <!-- 其他导航链接 -->
      </el-menu>
    </el-header>
    <!-- 页面内容 -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style scoped>
el-menu {
  background-color: transparent;
  border-bottom: none;
}

el-menu-item {
  padding: 0 20px;
}


.router-link {
  text-decoration: none;
  color: inherit;
}


main {
  padding: 20px;
  background-color: #f2f2f2;
  min-height: calc(100vh - 64px); /* Adjust based on header height */
}
</style>






