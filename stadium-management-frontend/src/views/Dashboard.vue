<template>
  <div class="dashboard">
    <!-- 标题 -->
    <h2 class="title">数据看板</h2>

    <!-- 客流量 -->
    <div class="card">
      <div class="card-header">今日客流量</div>
      <div class="card-body">
        <el-statistic :value="todayVisitors" precision="0"></el-statistic>
        <div class="comparison">
          <el-tag type="success">+{{ todayVisitors - yesterdayVisitors }}</el-tag>
          <span>较昨日</span>
        </div>
      </div>
    </div>

    <!-- 收益 -->
    <div class="card">
      <div class="card-header">今日收益</div>
      <div class="card-body">
        <el-statistic :value="todayRevenue" precision="2" suffix="元"></el-statistic>
        <div class="comparison">
          <el-tag type="warning">+{{ todayRevenue - avgRevenue }}</el-tag>
          <span>较周平均值</span>
        </div>
      </div>
    </div>

    <!-- 最近七天客流量走势图 -->
    <div class="chart">
      <div ref="visitorChart" style="width: 100%; height: 400px;"></div>
    </div>

    <!-- 最近七天收益走势图 -->
    <div class="chart">
      <div ref="revenueChart" style="width: 100%; height: 400px;"></div>
    </div>

    <!-- 热门时段分析 -->
    <div class="chart">
      <div ref="hotTimeChart" style="width: 100%; height: 400px;"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElTag } from 'element-plus';
// import * as echarts from 'echarts';

const todayVisitors = ref(0);
const yesterdayVisitors = ref(0);
const todayRevenue = ref(0);
const avgRevenue = ref(0);

// 请求后端数据
const fetchData = async () => {
  try {
    const [visitorData, revenueData, hotTimeData] = await Promise.all([
      fetchVisitorData(),
      fetchRevenueData(),
      fetchHotTimeData()
    ]);

    todayVisitors.value = visitorData.todayVisitors;
    yesterdayVisitors.value = visitorData.yesterdayVisitors;
    todayRevenue.value = revenueData.todayRevenue;
    avgRevenue.value = revenueData.avgRevenue;

    // initVisitorChart(visitorData.visitorTrend);
    // initRevenueChart(revenueData.revenueTrend);
    // initHotTimeChart(hotTimeData.hotTimeAnalysis);
  } catch (error) {
    console.error('获取数据失败', error);
  }
};

// 请求最近七天客流量走势图数据
const fetchVisitorData = async () => {
  // 发送请求获取数据
  return {
    todayVisitors: 0, // 填充实际数据
    yesterdayVisitors: 0, // 填充实际数据
    visitorTrend: [], // 填充实际数据
  };
};

// 请求最近七天收益走势图数据
const fetchRevenueData = async () => {
  // 发送请求获取数据
  return {
    todayRevenue: 0, // 填充实际数据
    avgRevenue: 0, // 填充实际数据
    revenueTrend: [], // 填充实际数据
  };
};

// 请求热门时段分析数据
const fetchHotTimeData = async () => {
  // 发送请求获取数据
  return {
    hotTimeAnalysis: {}, // 填充实际数据
  };
};

// // 使用 echarts 绘制最近七天客流量走势图
// const initVisitorChart = (data) => {
//   const visitorChart = echarts.init($refs.visitorChart);
//   const visitorOption = {
//     // 填入客流量走势图的 echarts 配置
//   };
//   visitorChart.setOption(visitorOption);
// };
//
// // 使用 echarts 绘制最近七天收益走势图
// const initRevenueChart = (data) => {
//   const revenueChart = echarts.init($refs.revenueChart);
//   const revenueOption = {
//     // 填入收益走势图的 echarts 配置
//   };
//   revenueChart.setOption(revenueOption);
// };
//
// // 使用 echarts 绘制热门时段分析图
// const initHotTimeChart = (data) => {
//   const hotTimeChart = echarts.init($refs.hotTimeChart);
//   const hotTimeOption = {
//     // 填入热门时段分析图的 echarts 配置
//   };
//   hotTimeChart.setOption(hotTimeOption);
// };

// 组件加载时执行
onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  background-color: #f5f7fa;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.title {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.card {
  flex: 1 1 300px; /* 设置卡片宽度 */
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #f5f7fa;
  padding: 10px;
  font-size: 18px;
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid #ebeef5;
}

.card-body {
  padding: 20px;
  text-align: center;
}

.comparison {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.comparison el-tag {
  margin-right: 5px;
}

.chart {
  flex: 2 1 500px; /* 设置图表宽度 */
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 20px;
}
</style>


