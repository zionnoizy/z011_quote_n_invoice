
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

const ClientCard = () => import('@/components/ClientCard.vue');

const OneInvoice = () => import('@/views/OneInvoice.vue');
const Empty = () => import('@/views/Empty.vue');


const router = createRouter({
    history: createWebHistory(),
  routes:[
    //, meta: {requiresGuest: true} meta: {requiresVisitor: true},
      {path: "/", name: "Login", component: Login },
      {path: "/register", name: "Register", component: Register },
      {
        path: "/dashboard", 
        name: "Dashboard",
        component: Dashboard,
        auth: true,
        //meta: { requiredAuth: true},
        children: [ {path: 'client',name: 'ClientCard',component: ClientCard},
                    {path: 'quote',name: 'QuoteAll',component: QuoteAll},
                    {path: 'invoice',name: 'InvoiceAll',component: InvoiceAll}
                  ]
      },
      {path: '/dashboard/quote/:id', name: 'OneQuote', component: OneQuote, props: true},
      {path: '/dashboard/all_client', name: 'ClientAll',component: ClientAll},

      {path: '/dashboard/all_product', name: 'ProductAll',component: ProductAll},
      {path: '/dashboard/all_product/category',name: 'CategoyAddAll',component: CategoyAddAll},

      {path: '/dashboard/add_quote', name: 'QuoteAdd', component: QuoteAdd},

      {path: '/dashboard/invoice/:id', name: 'OneInvoice', component: OneInvoice, props: true},
      {path: "/quicker-quote-in", name: "QuickerQuoteIn", component: QuickerQuoteIn},

  ]

})
/*
router.beforeEach((to, from, next) => {
  
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  console.log("user need to signin" + currentUser + "    " + requiresAuth);
  
  
  if (requiresAuth && !currentUser) {
    console.log("user need to signin")
    next({
      path: '/',
      replace: true
    })
  } else if (requiresAuth && currentUser) {
    console.log("signin already, no need to do anything")
   next();
  } else {
    console.log("signin already2, no need to do anything")
   next();
  }
  
});
*/
export default router