// 将pinia独立出来进行统一维护
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate' //持久化插件

const pinia = createPinia()
pinia.use(persist) //将持久化的插件挂载到pinia上

export default pinia

// export * from './modules/user'可以将modules中定义的store进行统一的导入和导出
// 这样在组件中使用时就可以直接只导入@/store/index就可以使用modules中的store
export * from './modules/user'
