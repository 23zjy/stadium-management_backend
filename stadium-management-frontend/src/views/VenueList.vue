<template>
  <div class="venue-view">
    <h2>场地查看与预订</h2>

    <!-- 选择球馆 -->
    <el-form :inline="true" :model="filterForm" label-width="80px" class="venue-form">
      <el-form-item label="选择球馆">
        <el-select v-model="filterForm.selectedVenue" placeholder="请选择球馆" @change="fetchVenueDetails">
          <el-option v-for="venue in venues" :key="venue.id" :label="venue.name" :value="venue.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <!-- 场馆分布与预订信息 -->
    <div v-if="selectedVenueDetails" class="venue-details">
      <h3>{{ selectedVenueDetails.name }} 场馆分布</h3>
      <el-table :data="selectedVenueDetails.courts" border class="venue-table">
        <el-table-column prop="name" label="场地名称"></el-table-column>
        <el-table-column prop="bookings" label="预订信息">
          <template #default="scope">
            <el-tag v-for="booking in scope.row.bookings" :key="booking.id" type="success">
              {{ booking.startTime }} - {{ booking.endTime }} ({{ booking.status }})
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 场地预订表单 -->
    <div v-if="filterForm.selectedVenue" class="booking-form">
      <h3>预订场地</h3>
      <el-form :model="bookingForm" label-width="100px">
        <el-form-item label="选择场地">
          <el-select v-model="bookingForm.courtId" placeholder="请选择场地">
            <el-option v-for="court in selectedVenueDetails.courts" :key="court.id" :label="court.name" :value="court.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预订时间">
          <el-date-picker v-model="bookingForm.bookingTime" type="datetime" placeholder="选择预订时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="bookCourt">预订</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>


<script setup>
import { ref, reactive } from 'vue';
import axios from 'axios';

const venues = ref([]);
const selectedVenueDetails = ref(null);

const filterForm = reactive({
  selectedVenue: '',
});

const bookingForm = reactive({
  courtId: '',
  bookingTime: '',
});

// 获取所有球馆列表
axios.get('/api/venues')
    .then(response => {
      venues.value = response.data;
    })
    .catch(error => {
      console.error('获取球馆列表失败:', error);
    });

// 获取选定球馆的详细信息
const fetchVenueDetails = () => {
  axios.get(`/api/venues/${filterForm.selectedVenue}`)
      .then(response => {
        selectedVenueDetails.value = response.data;
      })
      .catch(error => {
        console.error('获取球馆详情失败:', error);
      });
};

// 预订场地
const bookCourt = () => {
  axios.post('/api/bookings', bookingForm)
      .then(response => {
        alert('预订成功');
        // 刷新场馆详情以显示最新预订信息
        fetchVenueDetails();
      })
      .catch(error => {
        console.error('预订场地失败:', error);
      });
};
</script>

<style scoped>
.venue-view {
  margin: 20px;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.venue-form {
  margin-bottom: 20px;
}

.venue-details, .booking-form {
  margin-top: 20px;
}

.venue-table {
  width: 100%;
  margin-top: 20px;
}

.el-table el-tag {
  margin-right: 5px;
  margin-bottom: 5px;
}

el-form-item {
  margin-bottom: 15px;
}

el-button {
  margin-top: 10px;
}
</style>
