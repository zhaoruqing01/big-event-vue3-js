<script setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { ref } from 'vue'
import { artGetListService, artDelService } from '@/api/article.js'
import { formatTime } from '../../utils/format'
import ArticleEdit from './components/ArticleEdit.vue'
import { ElMessage } from 'element-plus'
import { ElMessageBox } from 'element-plus'
const articleList = ref([])
const total = ref()
const loading = ref(false)
const articleEditRef = ref()

// select列表
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})

// 获取文章列表信息
const getArticleList = async () => {
  loading.value = true
  const res = await artGetListService(params.value)
  articleList.value = res.data.data
  // console.log(res.data)
  total.value = res.data.total
  loading.value = false
}
getArticleList()

// 页码的显示和更新---通过el自带的监听事件,对应方法传入的值一定是选择和条数或者页码
// 每页的条数
const onSizeChange = (size) => {
  // 改变每页的条数,那页码也就没有意义,直接渲染到第一页即可
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}
// 列表的页数
const onCurrentChange = (page) => {
  params.value.pagenum = page
  getArticleList()
}

// 搜索和重置功能
// 搜索---搜索功能的实现是列表绑定了params中的cate_id,又通过接口传值重新渲染页面实现的
const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}
// 重置---重置params对象的数据
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}

// 新增文章
const onAddArticle = () => {
  articleEditRef.value.open()
}
// 新增文章后渲染到最后一页
const onSuccess = (type) => {
  // 监听子组件的添加文章成功事件,并渲染文章的最后一页方便查看
  if (type === 'add') {
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getArticleList()
}
// 编辑
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
}
// 删除
const onDelArticle = async (row) => {
  ElMessageBox.confirm('你确定要删除吗?', '温馨提示', {
    confirmButtonText: '删除',
    cancelButtonText: '再想想',
    type: 'warning'
  })
    // 点确认后则执行...
    .then(() => {
      artDelService(row.id)
      ElMessage.success('删除成功')
      getArticleList()
    })
    // 点取消后则执行,什么都不执行
    .catch(() => {})
}
</script>
<template>
  <page-container title="文章管理">
    <!-- 子组件的插槽必须通过template来配置,#extra表示具名插槽的所定义的名字 -->
    <template #extra>
      <el-button type="primary" @click="onAddArticle">发布管理</el-button>
    </template>
    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类:" style="width: 300px">
        <!-- vue2中v-model是 :value和@input的简写 -->
        <!-- vu3中v-model时 :modelValue=params.cate_id和@update:modelValue的简写 -->
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态:" style="width: 300px">
        <el-select v-model="params.state">
          <el-option label="已发布"></el-option>
          <el-option label="未发布"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表区域 -->
    <el-table :data="articleList" v-loading="loading">
      <el-table-column label="文章表头" prop="title">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发布时间" prop="pub_date">
        <template #default="{ row }">
          <!-- 当插槽数据和prop数据同时存在是,会优先使用插槽中的数据 -->
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            type="primary"
            circle
            plain
            :icon="Edit"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            type="danger"
            circle
            plain
            :icon="Delete"
            @click="onDelArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <!-- 第一条对应页码,2为每页的条数,3为分页展示的数组,4为背景色,5为分页的位置,6为总页数,7为样式,8,9为建议条数事件和监听页码事件 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="margin-top: 20px; justify-content: flex-end"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
    />

    <!-- 抽屉区域 -->
    <article-edit ref="articleEditRef" @success="onSuccess"></article-edit>
  </page-container>
</template>
<style lang="scss" scoped></style>
