<template>
  <div class="register-container">
    <h2>注册</h2>
    <el-form :model="registerForm" label-width="90px" :rules="rules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="registerForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registerForm.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="confirmPassword"></el-input>
      </el-form-item>
      <el-form-item label="密钥" prop="secretKey">
        <el-input v-model="registerForm.secretKey"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register">注册</el-button>
        <div class="spacer"></div>
        <el-link @click="login">登录</el-link>
      </el-form-item>

    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter();

const registerForm = ref({
  username: '',
  password: '',
  confirmPassword: '',
  secretKey: '' // 固定密钥
});


const confirmPassword = ref('');

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  confirmPassword: [{ required: true, message: '请再次输入密码', trigger: 'blur' }],
  secretKey: [{ required: true, message: '请输入密钥', trigger: 'blur' }]
};

const login = () => {
  router.push('/');
};

const register = () => {
  // 校验密码是否一致
  if (registerForm.value.password !== confirmPassword.value) {
    ElMessage.error('两次输入的密码不一致');
    return;
  }

  // 检查密钥是否正确
  if (registerForm.value.secretKey !== '020810') {
    ElMessage.error('密钥不正确');
    return;
  }

  // 执行注册逻辑，这里假设注册成功
  ElMessage.success('注册成功');
  // 跳转到登录页面
  router.push('/login');
};
</script>

<style scoped>
.register-container {
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
