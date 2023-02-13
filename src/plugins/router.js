
import {createRouter, createWebHistory} from 'vue-router'
const Login = () => import('@/views/Login.vue');
const Register = () => import('@/views/Register.vue');
const Dashboard = () => import('@/views/Dashboard.vue');

const QuoteAll = () => import('@/views/QuoteAll.vue');
const QuoteDetails = () => import('@/views/QuoteDetails.vue');
const InvoiceAll = () => import('@/views/InvoiceAll.vue');
const QIAll = () => import('@/views/QIAll.vue');

const ClientAll = () => import('@/views/ClientAll.vue');
const ProductAll = () => import('@/views/ProductAll.vue');
const CategoyAddAll = () => import('@/views/CategoyAddAll.vue');

const QuoteAdd = () => import('@/views/QuoteAdd.vue');

const Empty = () => import('@/views/Empty.vue');


const router = createRouter({
    history: createWebHistory(),
  routes:[
    //, meta: {requiresGuest: true} meta: {requiresVisitor: true},
      {path: "/", component: Login },
      {path: "/register", name: "Register", component: Register },
      {
        path: "/dashboard", 
        name: "Dashboard",
        component: Dashboard,
        auth: true,
        alians: "/home",
        children: [ {path: 'quoteinvoice',name: 'QIAll',component: QIAll},
                    {path: 'quote',name: 'QuoteAll',component: QuoteAll},
                    {path: 'invoice',name: 'InvoiceAll',component: InvoiceAll}
                  ]
      },
      {path: '/dashboard/quote/:id', name: 'QuoteDetails', component: QuoteDetails, props: true},
      {path: '/dashboard/all_client', name: 'ClientAll',component: ClientAll},
      {path: '/dashboard/all_product', name: 'ProductAll',component: ProductAll},
      {path: '/dashboard/all_category', name: 'CategoryAll',component: CategoyAddAll},

      {path: '/dashboard/add_quote', name: 'QuoteAdd', component: QuoteAdd},
    //   {path: '/dashboard/add_client',name: 'ClientAdd',component: ClientAdd},
    //   {path: 'invoice/:id', name: 'InvoiceDetail', component: InvoiceDetail},
    //   {path: "/empty", name: "Empty", component: Empty},
    //   {path: '', component: LoggedInLayout,children: [{path: '/login',name: 'Login',component: Login},{title: 'Dashboard',path: '/',name: 'dashboard',component: Dashboard, auth: true},]}
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