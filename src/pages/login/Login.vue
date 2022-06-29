<template>
  <div class="login">
    <n-form
      ref="formRef"
      :label-width="80"
      label-placement="left"
      :model="formValue"
      :rules="rules"
      :size="size"
    >
      <n-form-item label="用户名" path="username">
        <n-row>
          <n-col :span="24">
            <n-input v-model:value="formValue.username" placeholder="输入用户名" />
          </n-col>
        </n-row>
      </n-form-item>
      <n-form-item label="密码" path="password">
        <n-row>
          <n-col :span="24">
            <n-input type="password" v-model:value="formValue.password" placeholder="输入年龄" />
          </n-col>
        </n-row>
      </n-form-item>
      <n-row>
        <n-col :span="15">
          <div style="display: flex; justify-content: flex-end">
            <n-button attr-type="button" @click="handleLoginClick"> 登录 </n-button>
          </div>
        </n-col>
      </n-row>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { FormInst, FormItemRule, useMessage, FormRules } from 'naive-ui'
import { login } from '@/apis/login'
import { useUserStore } from '@/store/user'
const router = useRouter()
const userStore = useUserStore()
const size = 'large'
const formRef = ref<FormInst | null>(null)
const message = useMessage()
const formValue = ref({
  username: '',
  password: ''
})
const validatePassword = (rule: FormItemRule, value: string): boolean => {
  console.log(1111, value)
  return !!value && value.length > 3
}
const rules: FormRules = {
  username: [
    {
      required: true,
      message: '请输入用户名'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码'
    },
    {
      validator: validatePassword,
      message: '密码应该大于3位'
    }
  ]
}
const loginHandler = () => {
  login(formValue.value).then((res) => {
    if (!res.res) {
      message.error('验证失败')
      return
    }
    if (res.authorization) {
      localStorage.setItem('authorization', res.authorization)
    }
    userStore.updateUser({
      username: formValue.value.username,
      password: formValue.value.password
    })
    router.replace({
      name: 'Todo'
    })
  })
}
const handleLoginClick = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      loginHandler()
    } else {
      console.log(errors)
      message.error('请填写完整信息')
    }
  })
}
</script>

<style scoped lang="scss">
.login {
  width: 500px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 200px;
}
</style>
