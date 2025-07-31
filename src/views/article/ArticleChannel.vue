<script setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { artGetChannelsService, artDelChannelService } from '../../api/article'
import ChannelEdit from './components/ChannelEdit.vue'
import { ElMessage } from 'element-plus'
// 获取列表信息
const channelList = ref()
// 加载动画
const loading = ref(false)
// 定义属性表示ChannelEdit组件里的属性和方法,获取组件里的属性和方法
const dialog = ref()
const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  loading.value = false
}
// 一进页面就调用
getChannelList()
// 新增按钮
const onAddChannel = () => {
  dialog.value.open({})
}
// 编辑按钮
const onEditChannel = (row) => {
  dialog.value.open(row)
}
// 删除按钮
const onDelChannel = async (row) => {
  // 弹出确认框
  await ElMessageBox.confirm('确认要删除吗?', '温馨提示', {
    confirmButtonText: '删除',
    cancelButtonText: '再想想',
    type: 'warning'
  })
    .then(async () => {
      await artDelChannelService(row.id)
      ElMessage.success('删除成功!')
      getChannelList()
    })
    .catch(() => {})
}

// 当添加/编辑成功后重新渲染页面
const onSuccess = () => {
  getChannelList()
}
</script>
<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel()">添加分类</el-button>
    </template>
    <!--   :data=表示表格中的数据
            v-loading表示加载装填
            <el-table-column>表示每一列
            type=index表示索引列表  
            label表示表头列名
            width表示每一列的宽度 
            prop=表示每一列的数据,值为channelList中的属性名-->
    <el-table :data="channelList" style="width: 100%" v-loading="loading">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column label="操作" width="150">
        <!-- row是channelList里的每一项,$index是下标 -->
        <template #default="{ row, $index }">
          <el-button
            type="primary"
            :icon="Edit"
            circle
            plain
            @click="onEditChannel(row, $index)"
          />
          <el-button
            type="danger"
            :icon="Delete"
            circle
            plain
            @click="onDelChannel(row, $index)"
          />
        </template>
      </el-table-column>
      <!-- 若表格为空则显示以下,非空判断 -->
      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>
    <!-- 弹窗组件  ref=表示获取组件实例,可以获取组件的内容-->
    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
  </page-container>
</template>
<style lang="scss" scoped></style>
