<script setup>
import { Plus, Upload } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores'

// 基于store的数据,初始化imgUrl的初始值
const userStore = useUserStore()
const imgUrl = ref(userStore.user.user_pic)
// 获取图片上传的DOM
const uploadRef = ref()

// 图片的回显
const onSelectFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
}
</script>
<template>
  <page-container title="更换头像">
    <el-upload
      :auto-upload="false"
      class="avatar-uploader"
      :show-file-list="false"
      style="margin-bottom: 20px"
      ref="uploadRef"
      :on-change="onSelectFile"
    >
      <img v-if="imgUrl" :src="imgUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <div style="padding-left: 15px">
      <!-- @click="uploadRef.$el.querySelector('input').click()"给按钮添加点击事件,相当于点一下就触发获取的DOM原数中的input type=file事件的点击事件 -->
      <el-button
        type="primary"
        :icon="Plus"
        size="large"
        @click="uploadRef.$el.querySelector('input').click()"
        >选择图片</el-button
      >
      <el-button type="success" :icon="Upload" size="large">上传头像</el-button>
    </div>
  </page-container>
</template>
<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
</style>
