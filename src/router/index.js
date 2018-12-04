import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../components/login/login.vue'
// @ -> src

// const Foo = () => import('')

const Login = () =>
    import ('@/components/login/login.vue')

const Home = () =>
    import ('@/components/home/home.vue')

const Users = () =>
    import ('@/components/users/users.vue')

const Right = () =>
    import ('@/components/rights/right.vue')

const Role = () =>
    import ('@/components/rights/role.vue')

const Goodslist = () =>
    import ('@/components/goods/goodslist.vue')

const GoodsAdd = () =>
    import ('@/components/goods/goodsadd.vue')

const Cateparams = () =>
    import ('@/components/goods/cateparams.vue')

const Goodscate = () =>
    import ('@/components/goods/goodscate.vue')

const Orders = () =>
    import ('@/components/order/order.vue')

const Reports = () =>
    import ('@/components/reports/reports.vue')



import {
    Message
} from 'element-ui'


Vue.use(VueRouter)

const router = new VueRouter({
    routes: [{
            name: 'login',
            path: '/login',
            component: Login
        },
        {
            name: 'home',
            path: '/',
            component: Home,
            children: [{
                    name: 'users',
                    path: 'users',
                    component: Users
                },
                {
                    name: 'right',
                    path: '/rights',
                    component: Right
                },
                {
                    name: 'roles',
                    path: '/roles',
                    component: Role
                },
                {
                    name: 'goods',
                    path: '/goods',
                    component: Goodslist
                },
                {
                    name: 'goodsadd',
                    path: '/goodsadd',
                    component: GoodsAdd
                },
                {
                    name: 'params',
                    path: '/params',
                    component: Cateparams
                },
                {
                    name: 'categories',
                    path: '/categories',
                    component: Goodscate
                },
                {
                    name: 'orders',
                    path: '/orders',
                    component: Orders
                },
                {
                    name: 'reports',
                    path: '/reports',
                    component: Reports
                }
            ]
        }
    ]
})

// 在路由配置生效之前 统一判断token
// 路由守卫 在路由配置生效之前
// 路由/导航 守卫
// to -> 要去的路由配置
// from -> 当前的路由配置
// / -> /login home->login to就是login from就是home路由配置

router.beforeEach((to, from, next) => {
    // to  from next
    // console.log(to, from)
    // 如果要去的是登录 -> next()
    if (to.path === '/login') {
        next()
    } else {
        // 如果要去的不是登录
        //  判断token
        const token = localStorage.getItem('token')
        if (!token) {
            //      如果token没有 -> login
            // this.$router.push({name:'login'})
            // 提示
            // this.$message.warning('回到登录')
            Message.warning('请先登录')

            router.push({
                name: 'login'
            })
            return
        }

        //      如果有  -> next()
        next()


    }

})
export default router





// // node 中间件
// app.use((req,res,next)=>{
//   // req.body
//   // res.render()
//   // next() 会自动调用下一个中间件
//   next()
// })

// app.use((req, res, next) => {

//   // req.body
//   // res.render()
//   // next() 会自动调用下一个中间件
//   res.send()
//   next()
// })