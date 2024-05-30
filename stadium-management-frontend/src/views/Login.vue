<template>
  <div class="login-container">
    <h2>登录</h2>
    <el-form :model="loginForm" label-width="80px" :rules="rules" class="login-form">
      <el-form-item label="账号" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item label="场馆" prop="venue">
        <el-select v-model="loginForm.venue" placeholder="请选择场馆" :loading="loading">
          <el-option v-for="item in venues" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="form-item">
        <el-button type="primary" @click="login">登录</el-button>
        <div class="spacer"></div>
        <el-link @click="signup">注册</el-link>
      </el-form-item>

    </el-form>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useStore} from 'vuex';
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";

const router = useRouter();
const store = useStore();

const loginForm = ref({
  username: '',
  password: '',
  venue: ''
});

const venues = ref([]);
const loading = ref(false);

const rules = {
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  venue: [{ required: true, message: '请选择场馆', trigger: 'change' }]
};

const login = async () => {
  try {
    loading.value = true; // 开始登录时显示加载状态
    const loginTime = new Date().toISOString();
    await store.dispatch('login', { ...loginForm.value, loginTime }); // 传递整个登录表单数据给登录操作
    await router.push('/dashboard');
  } catch (error) {
    console.error('登录失败', error);
    ElMessage.error('登录失败，请检查用户名、密码和所选场馆');
  } finally {
    loading.value = false; // 登录结束后隐藏加载状态
  }
};

const fetchVenues = async () => {
  try {
     // 获取场馆列表
    venues.value = await store.dispatch('fetchVenues'); // 更新场馆列表数据
  } catch (error) {
    console.error('获取场馆列表失败', error);
    ElMessage.error('获取场馆列表失败');
  }
};

const signup = () => {
  router.push('/signup');
};

// 在组件加载时调用 fetchVenues
onMounted(() => {
  fetchVenues();
});
</script>

<style scoped>
.login-container {
  align-items: center;
  text-align: center;
  margin: 100px 500px 0 500px;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.spacer {
  width: 40px; /* 设置间距大小 */
}
</style>


