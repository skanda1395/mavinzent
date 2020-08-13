import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import TicketList from '../views/TicketList.vue'
import TicketDetails from '../views/TicketDetails.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    props: true,
  },
  {
    path: '/ticket_list',
    name: 'Ticket List',
    component: TicketList,
  },
  {
    path: '/ticket_details',
    name: 'Ticket Details',
    component: TicketDetails,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
