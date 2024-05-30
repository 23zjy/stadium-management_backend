<template>
  <div class="product-list">
    <h2>商品销售</h2>
    <!-- 添加产品销售记录表单 -->
    <el-form :model="newProduct" label-width="100px">
      <el-form-item label="产品">
        <el-select v-model="newProduct.type" placeholder="请选择">
          <el-option label="水" value="水"></el-option>
          <el-option label="饮料" value="饮料"></el-option>
          <el-option label="门票" value="门票"></el-option>
          <el-option label="包场券" value="包场券"></el-option>
          <!-- 其他产品类型选项 -->
        </el-select>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="newProduct.price"></el-input>
      </el-form-item>
      <el-form-item label="数量">
        <el-input v-model="newProduct.quantity"></el-input>
      </el-form-item>
      <!-- 其他产品信息表单项 -->
      <el-form-item>
        <el-button type="primary" @click="addProduct">添加记录</el-button>
      </el-form-item>
    </el-form>

    <h2>销售产品记录</h2>

    <!-- 销售产品记录表格 -->
    <el-table :data="products" border>
      <el-table-column prop="name" label="产品名称"></el-table-column>
      <el-table-column prop="type" label="产品类型"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="quantity" label="数量"></el-table-column>
      <el-table-column prop="totalPrice" label="总价"></el-table-column>
      <el-table-column prop="saleDate" label="销售日期"></el-table-column>
      <el-table-column prop="soldBy" label="销售员"></el-table-column>
      <el-table-column prop="customer" label="客户"></el-table-column>
    </el-table>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

// 销售产品记录数据
const products = ref([]);

// 新增产品销售记录表单数据
const newProduct = ref({
  name: '',
  type: '',
  price: '',
  quantity: '',
  // 其他产品信息
});

// 获取销售产品记录数据
axios.get('/api/sales')
    .then(response => {
      products.value = response.data;
    })
    .catch(error => {
      console.error('获取销售产品记录失败:', error);
    });

// 添加产品销售记录
const addProduct = () => {
  axios.post('/api/sales', newProduct.value)
      .then(response => {
        // 添加成功后更新产品记录列表
        products.value.push(response.data);
        // 清空表单
        clearForm();
      })
      .catch(error => {
        console.error('添加产品销售记录失败:', error);
      });
};

// 清空表单
const clearForm = () => {
  newProduct.value = {
    name: '',
    type: '',
    price: '',
    quantity: '',
    // 其他产品信息
  };
};
</script>

<style scoped>
.product-list {
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

.el-table th, .el-table td {
  text-align: center;
}

</style>

