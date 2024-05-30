<template>
  <div class="finance-summary">
    <h2>财务总结</h2>

    <!-- 时间范围选择 -->
    <el-radio-group v-model="summaryType" @change="fetchFinanceSummary">
      <el-radio-button label="day">日总结</el-radio-button>
      <el-radio-button label="week">周总结</el-radio-button>
      <el-radio-button label="month">月总结</el-radio-button>
    </el-radio-group>

    <!-- 财务数据展示 -->
    <el-row :gutter="20" class="summary-cards">
      <el-col :span="8">
        <el-card>
          <h3>商品售卖</h3>
          <p>总销售额：¥{{ summaryData.productSales.total }}</p>
          <p>销售数量：{{ summaryData.productSales.quantity }}</p>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <h3>门票售卖</h3>
          <p>总销售额：¥{{ summaryData.ticketSales.total }}</p>
          <p>售出门票数量：{{ summaryData.ticketSales.quantity }}</p>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <h3>客流量</h3>
          <p>总客流量：{{ summaryData.visitorCount }}</p>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表展示 -->
    <el-row>
      <el-col :span="24">
        <el-card>
          <h3>商品售卖趋势</h3>
          <div id="product-sales-chart"></div>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card>
          <h3>门票售卖趋势</h3>
          <div id="ticket-sales-chart"></div>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card>
          <h3>客流量趋势</h3>
          <div id="visitor-count-chart"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import axios from 'axios';

const summaryType = ref('day');
const summaryData = ref({
  productSales: { total: 0, quantity: 0 },
  ticketSales: { total: 0, quantity: 0 },
  visitorCount: 0
});

const fetchFinanceSummary = () => {
  axios.get(`/api/finance-summary?type=${summaryType.value}`)
      .then(response => {
        summaryData.value = response.data;
        updateCharts();
      })
      .catch(error => {
        console.error('获取财务总结失败:', error);
      });
};

const updateCharts = () => {
  const productSalesChart = echarts.init(document.getElementById('product-sales-chart'));
  const ticketSalesChart = echarts.init(document.getElementById('ticket-sales-chart'));
  const visitorCountChart = echarts.init(document.getElementById('visitor-count-chart'));

  productSalesChart.setOption({
    xAxis: { type: 'category', data: summaryData.value.productSales.dates },
    yAxis: { type: 'value' },
    series: [{ data: summaryData.value.productSales.values, type: 'line' }]
  });

  ticketSalesChart.setOption({
    xAxis: { type: 'category', data: summaryData.value.ticketSales.dates },
    yAxis: { type: 'value' },
    series: [{ data: summaryData.value.ticketSales.values, type: 'line' }]
  });

  visitorCountChart.setOption({
    xAxis: { type: 'category', data: summaryData.value.visitorCount.dates },
    yAxis: { type: 'value' },
    series: [{ data: summaryData.value.visitorCount.values, type: 'line' }]
  });
};

onMounted(() => {
  fetchFinanceSummary();
});
</script>

<style scoped>
.finance-summary {
  margin: 20px;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.summary-cards {
  margin-bottom: 20px;
}

#product-sales-chart, #ticket-sales-chart, #visitor-count-chart {
  width: 100%;
  height: 400px;
}
</style>
