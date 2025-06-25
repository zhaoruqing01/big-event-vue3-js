<script setup>
// 导入组件
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { userRegisterService, userLoginService } from '@/api/user.js'
import { useUserStore } from '@/stores'
import router from '../../router'
const userStore = useUserStore()
const isRegister = ref(false)
const form = ref()
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})
// 对表单进行校验,要和上面定义的表单属性进行对应
// 1. 非空校验:required:true  message消息提示  trigger触发校验的时机,可以是blur/change
// 2. 长度校验 min:xx.max:xx
// 3. 正则校验 pattern:正则规则,判断输入的时候合规
// 4. 自定义校验 => 自己写逻辑校验(校验函数)
//  validator:(rule,value,callback)
//   (1) rule 当前校验规则相关的信息
//   (2) value 所校验的表单元素目前的表单值
//   (3) callback 无论成功还是失败,都需要callback回调
//      - callback(),校验成功是
//      - callback(new Error(错误信息)) 校验失败

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名必须是5-10位的字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    }
  ],
  //   自定义校验规则判断两次输入的密码是否一致
  repassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        // 判断value和当前form中收集的password是否一致
        if (value != formModel.value.password) {
          callback(new Error('两次输入的密码不一致'))
        }
        callback() //校验成功之后也要callback
      },
      trigger: 'blur'
    }
  ]
}

// 在点击注册按钮后先进行对表单的预校验,校验成功会自动执行后面的请求,若失败则会进行提示   利用Element Plus中的validate()方法进行校验
const register = async () => {
  await form.value.validate()
  await userRegisterService(formModel.value)
  ElMessage.success('注册成功!')
  isRegister.value = false
}

// 登录功能,先预校验,在发送请求,存入token,弹出提示框,router跳转页面
const login = async () => {
  await form.value.validate()
  const { data } = await userLoginService(formModel.value)
  userStore.setToken(data.token)
  ElMessage.success(data.message)
  router.push('/')
}
</script>

<template>
  <!--
  1. 结构相关 
   row表示一行,一行分为24份
    col表示一列
    (1) :span="12" 代表在一行中,占12份(50%)
    (2) :span="6"表示占整体侧的6分 :offset="3" 表示左侧占整体的三份
    el-form表示表单区域,el-form-item表示表单里的每一块区域,里面可以写内容或标签
     -->
  <!-- 
    2. 校验相关
        (1) el-form => :model='formModel'  绑定的整个form的数据对象,需要先根据接口文档定义存储变量--添加到整个form标签上
        (2) el-form => :rules="rules"      绑定的是整个rules规则对象,js配置规则表单的数据规则,用于校验--添加到整个form标签上
        (3) 表单元素 => v-model = "formModel.xxx" 给表单元素绑定form的子属性--添加到需要绑定的表单元素上如input
        (4) el-form-item => prop配置生效的是哪个校验规则,要和rules中配置的规则一一对应 --添加到需要绑定的表单元素对应的el-form-item上
    -->
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- v-if,v-else来控制显示的注册还是登录表单 -->
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <!-- el-input表示输入框 :prefix-icon表示图标, -->
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formModel.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="register"
            class="button"
            type="primary"
            auto-insert-space
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="never" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-else
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="login"
            class="button"
            type="primary"
            auto-insert-space
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
