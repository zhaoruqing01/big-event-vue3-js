<script setup>
import { ref } from 'vue'
import { artEditChannelService, artAddChannelService } from '@/api/article.js'
import { ElMessage } from 'element-plus'
const dialogVisible = ref(false)
// 获取表单DOM元素,即获取表单里的所有元素
const formRef = ref()

// 组件对外暴露一个方法open,基于open传来的参数,区分添加还是编辑
// open({}) => 没有传递数据,则为添加
// open({row..}) => 传递了数据,则为修改,需要回显数据
const open = (row) => {
  dialogVisible.value = true
  // ...row展开运算符,将row里的全部数据在formModel中展开,若为空则是空,若row有值则会通过v-model回显数据到表单
  formModel.value = { ...row }
}
// 通过 defineExpose({方法名}),来 对外暴露方法
defineExpose({
  open
})

// 表单
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '请输入1-10位字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[A-Za-z0-9]{1,15}$/,
      message: '请输入1-15位的字母或者数字',
      trigger: 'blur'
    }
  ]
}

// 新增和编辑分类
const emit = defineEmits(['success']) //子传父一个监听事件
const onSubmit = async () => {
  await formRef.value.validate()
  const isEdit = formModel.value.id
  if (isEdit) {
    await artEditChannelService(formModel.value)
    ElMessage.success('编辑成功')
  } else {
    await artAddChannelService(formModel.value)
    ElMessage.success('新增成功')
  }
  dialogVisible.value = false
  emit('success') //若以上流程执行成功则将success事件传递给父组件,父组件触发其他事件,如刷新列表
}
</script>
<template>
  <!-- formModel.id 是row展开在formModel数组中的属性 -->
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑分类' : '添加分类'"
    width="500"
  >
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="formModel.cate_name"> </el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="formModel.cate_alias"> </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
