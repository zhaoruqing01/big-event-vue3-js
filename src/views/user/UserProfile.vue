<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/'
import { userUpdateInfoService } from '../../api/user'

// 将存入pinia中的值存入对象中,渲染到表单
const {
  user: { username, nickname, email, id },
  getUser
} = useUserStore()
const formRef = ref()
const form = ref({
  username,
  nickname,
  email,
  id
})

const rules = {
  nickname: [
    { required: true, message: '昵称不能为空', trigger: 'blur' },
    {
      pattern: /^.{2,10}$/,
      message: '昵称长度需在2到10个字符之间',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱格式',
      trigger: ['blur', 'change']
    }
  ]
}

// 进行提交验证
const onSubmit = async () => {
  // 等待校验结果
  await formRef.value.validate()
  // 提交修改
  await userUpdateInfoService(form.value)
  // 通知user进行数据更新---该方法可以重新获取用户数据,并存入pinia,实现页面修改
  getUser()
  // 提示用户
  ElMessage.success('更改成功')
}
</script>
<template>
  <div>
    <PageContainer title="基本资料">
      <!-- 表单部分 -->
      <el-form
        :model="form"
        :rules="rules"
        label-width="120px"
        ref="formRef"
        style="width: 400px; margin-left: 20px"
      >
        <!-- 登录名称 -->
        <el-form-item label="登录名称">
          <el-input v-model="form.username" disabled />
        </el-form-item>

        <!-- 用户昵称 -->
        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model="form.nickname" />
        </el-form-item>

        <!-- 用户邮箱 -->
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>

        <!-- 提交按钮 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交修改</el-button>
        </el-form-item>
      </el-form>
    </PageContainer>
  </div>
</template>
