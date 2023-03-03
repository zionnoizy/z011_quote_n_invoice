
import {createRouter, createWebHistory} from 'vue-router'
import { auth } from "@/firebase.js";
const Login = () => import('@/views/Login.vue');
const Register = () => import('@/views/Register.vue');
const Dashboard = () => import('@/views/Dashboard.vue');

const QuoteAll = () => import('@/views/QuoteAll.vue');
const OneQuote = () => import('@/views/OneQuote.vue');
const InvoiceAll = () => import('@/views/InvoiceAll.vue');
const QIAll = () => import('@/views/QIAll.vue');

const ClientAll = () => import('@/views/ClientAll.vue');
const ProductAll = () => import('@/views/ProductAll.vue');
const CategoyAddAll = () => import('@/views/CategoyAddAll.vue');

const QuoteAdd = () => import('@/views/QuoteAdd.vue');

const QuickerQuoteIn = () => import('@/views/QuickerQuoteIn.vue');
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
        meta: { requiredAuth: true},
        children: [ {path: 'quoteinvoice',name: 'QIAll',component: QIAll},
                    {path: 'quote',name: 'QuoteAll',component: QuoteAll},
                    {path: 'invoice',name: 'InvoiceAll',component: InvoiceAll}
                  ]
      },
      {path: '/dashboard/quote/:id', name: 'OneQuote', component: OneQuote, props: true},
      {path: '/dashboard/all_client', name: 'ClientAll',component: ClientAll},
      {path: '/dashboard/all_product', name: 'ProductAll',component: ProductAll},
      {path: '/dashboard/all_category', name: 'CategoryAll',component: CategoyAddAll},

      {path: '/dashboard/add_quote', name: 'QuoteAdd', component: QuoteAdd},
    //   {path: '/dashboard/add_client',name: 'ClientAdd',component: ClientAdd},
    //   {path: 'invoice/:id', name: 'InvoiceDetail', component: InvoiceDetail},
      {path: "/quicker-quote-in", name: "QuickerQuoteIn", component: QuickerQuoteIn},
    //   {path: '', component: LoggedInLayout,children: [{path: '/login',name: 'Login',component: Login},{title: 'Dashboard',path: '/',name: 'dashboard',component: Dashboard, auth: true},]}
  ]

})

router.beforeEach(( to, from, next) => {
    const curr_usr = firebase.auth().currentUser;
    const requires_auth = to.matched.some(record => record.meta.requires_auth);


    //console.log("[router.js]   " + requires_auth + "    " + curr_usr);

   

    
    if (requires_auth && !curr_usr){
        const loginpath = window.location.pathname;
        //console.log("[router.js]   false cur_usr" );
        next("/")
    }
    else if(requires_auth && curr_usr){
        //console.log("[router.js] true cur_usr" );
        next()
    }
    else{
        next()
    }


    
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