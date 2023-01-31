
import {createRouter, createWebHistory} from 'vue-router'
const Login = () => import('@/views/Login.vue');
const Register = () => import('@/views/Register.vue');




const router = createRouter({
    history: createWebHistory(),
  routes:[
    //, meta: {requiresGuest: true},
      {path: "/", name: "Login", component: Login },
      {path: "/register", name: "Register", component: Register },
    //   {path: "/dashboard", name: "Dashboard", component: Dashboard,  auth: true },
      //{path: '', component: LoggedInLayout,children: [{path: '/login',name: 'Login',component: Login},{title: 'Dashboard',path: '/',name: 'dashboard',component: Dashboard, auth: true},]}
  ]

})
        /*
        {
            path: "/register",
            component: () => import ("../Register.vue"),
        },
        
        {
            path: "/home",
            component: () => import ("../Home.vue"),
        },
        
        {
            path: "/home/create-client",
            component: () => import ("../CreateClient.vue"),
        },
        {
            path: "/home/view-product",
            component: () => import ("../ViewProduct.vue"),
        },
        {
            path: "/home/create-product",
            component: () => import ("../CreateProduct.vue"),
        },
        {
            path: "/home/create-catagory",
            component: () => import ("../CreateCatagory.vue"),
        },
        {
            path: "/home/create-quote",
            component: () => import ("../CreateQuote.vue"),
        },
        {
            path: "/home/create-quote/preview",
            component: () => import ("../CreateQuotePreview.vue"),
        },
        {
            path: "/home/view-quote",
            component: () => import ("../ViewQuote.vue"),
        },
        {
            path: "/home/edit-quote",
            component: () => import ("../EditQuote.vue"),
        },
        {
            path: "/home/view-quote-2-invoice",
            component: () => import ("../ViewQuote2Invoice.vue"),
        },
        {
            path: "/home/view-quote-2-invoice/preview",
            component: () => import ("../CreateInvoicePreview.vue"),
        },
        */

export default router