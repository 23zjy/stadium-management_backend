<template>
  <div class="member-list">
    <h2>会员列表</h2>

    <!-- 搜索框 -->
    <el-form :inline="true" class="search-form">
      <el-form-item label="搜索：">
        <el-input v-model="searchKeyword" placeholder="请输入搜索关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 会员列表表格 -->
    <el-table :data="filteredMembers" border>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="joinDate" label="成为会员时间"></el-table-column>
      <el-table-column prop="gym" label="办理球馆"></el-table-column>
      <el-table-column prop="balance" label="卡内余额"></el-table-column>
      <el-table-column prop="coupon" label="优惠券情况"></el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

// 搜索关键字
const searchKeyword = ref('');

// 会员列表数据
const members = ref([]);


// 获取会员列表数据
axios.get('/api/members')
    .then(response => {
      members.value = response.data;
    })
    .catch(error => {
      console.error('获取会员列表失败:', error);
    });

// 过滤后的会员列表数据
const filteredMembers = ref([]);

// 搜索会员
const search = () => {
  if (!searchKeyword.value.trim()) {
    filteredMembers.value = members.value;
    return;
  }

  const keyword = searchKeyword.value.trim().toLowerCase();
  filteredMembers.value = members.value.filter(member =>
      member.name.toLowerCase().includes(keyword) ||
      member.phone.toLowerCase().includes(keyword) ||
      member.venue.toLowerCase().includes(keyword)
  );
};

// 重置搜索
const reset = () => {
  searchKeyword.value = '';
  filteredMembers.value = members.value;
};

</script>

<style scoped>
.member-list {
  margin: 20px;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.search-form {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}


.el-table th, .el-table td {
  text-align: center;
}


</style>
