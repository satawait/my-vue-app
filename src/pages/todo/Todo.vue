<template>
  <div class="todo">
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
      <n-form-item label="头像" path="file">
        <n-row>
          <n-col :span="24">
            <n-upload v-model:file-list="formValue.file">
              <n-button>上传头像</n-button>
            </n-upload>
          </n-col>
        </n-row>
      </n-form-item>
      <n-row>
        <n-col :span="24">
          <div style="display: flex; justify-content: space-between">
            <n-button attr-type="button" @click="handleClick('registerUser')"> 注册 </n-button>
            <n-button attr-type="button" @click="handleClick('updateUser')"> 更新 </n-button>
            <n-button attr-type="button" @click="handleClick('deleteUser')"> 删除 </n-button>
            <n-button attr-type="button" @click="handleClick('getUser')"> 获取用户 </n-button>
            <n-button attr-type="button" @click="handleClick('logout')"> 登出 </n-button>
          </div>
        </n-col>
      </n-row>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FormInst, FormItemRule, useMessage, FormRules } from 'naive-ui'
import type { UploadFileInfo } from 'naive-ui'
import * as user from '@/apis/user'
import router from '@/routes'
const size = ref<'small' | 'medium' | 'large'>('large')
const formRef = ref<FormInst | null>(null)
const message = useMessage()
interface IformValue {
  username: string
  password: string
  file: UploadFileInfo[]
}
const formValue = ref<IformValue>({
  username: '',
  password: '',
  file: []
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
    },
    {
      validator: validatePassword,
      message: '用户名应该大于3位'
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
const handlerObj = {
  registerUser: () => {
    if (formValue.value.file[0]?.file) {
      return user.registerUser({
        username: formValue.value.username,
        password: formValue.value.password,
        file: formValue.value.file[0].file
      })
    } else {
      return user.registerUser({
        username: formValue.value.username,
        password: formValue.value.password
      })
    }
  },
  deleteUser: () => {
    return user.registerUser({
      username: formValue.value.username,
      password: formValue.value.password
    })
  },
  updateUser: () => {
    return user.updateUser({
      username: formValue.value.username,
      password: formValue.value.password
    })
  },
  getUser: () => {
    return user.getUser({
      username: formValue.value.username,
      password: formValue.value.password
    })
  }
}
const prop = <T extends object, K extends keyof T>(obj: T, key: K) => {
  return obj[key]
}
type handlerTypes = 'registerUser' | 'deleteUser' | 'updateUser' | 'getUser' | 'logout'
const handleClick = (type: handlerTypes) => {
  if (type === 'logout') {
    localStorage.removeItem('authorization')
    router.push({
      name: 'Login'
    })
    return
  }
  formRef.value?.validate((errors) => {
    if (!errors) {
      const func = prop(handlerObj, type)
      func().then((res) => {
        console.log(res)
      })
      // message.error('验证成功')
    } else {
      console.log(errors)
      message.error('请填写完整信息')
    }
  })
}
</script>

<style scoped lang="scss">
.todo {
  width: 500px;
  margin-top: 60px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>
