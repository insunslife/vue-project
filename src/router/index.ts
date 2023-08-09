import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import SignIn from '@/views/SignIn.vue'
//404 error
// import Error404 from '../views/errorView.vue'
import { useStore } from '../stores/b2bStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'MainView', component: MainView, meta: { auth: true } },
    {
      path: '/:siteCode/sign-in',
      name: 'SignIn',
      component: SignIn,
      beforeEnter: (to, from, next) => {
        const store = useStore()
        store.siteCode = to.params.siteCode.toString()
        // store.dispatch('siteCode', to.params.siteCode)
        // store.siteCode = to.params.siteCode.toString()
        next()
      }
    },
    { path: '/myclass/EnrollListView', component: () => import('../views/myclass/EnrollListView.vue') },
    { path: '/myclass/HistoryListView', component: () => import('../views/myclass/HistoryListView.vue') },
    { path: '/myclass/InfoEditView', component: () => import('../views/myclass/InfoEditView.vue') },
    { path: '/myclass/InfoView', component: () => import('../views/myclass/InfoView.vue') },
    { path: '/myclass/MyClassDetailView', component: () => import('../views/myclass/MyClassDetailView.vue') },
    {
      path: '/myclass/MyClassListView',
      name: 'MyClassListView',
      component: () => import('../views/myclass/MyClassListView.vue')
    },

    // {
    //   path: '/myclass/MyClassListView',
    //   name: 'MyClassListView',
    //   component: () => import('../views/myclass/MyClassListView.vue')
    // },
    { path: '/myclass/MyClassMainView', component: () => import('../views/myclass/MyClassMainView.vue') },
    { path: '/myclass/QnaInquiryDetailView', component: () => import('../views/myclass/QnaInquiryDetailView.vue') },
    { path: '/myclass/QnaInquiryListView', component: () => import('../views/myclass/QnaInquiryListView.vue') },
    { path: '/myclass/QnaLearningDetailView', component: () => import('../views/myclass/QnaLearningDetailView.vue') },
    { path: '/myclass/QnaLearningListView', component: () => import('../views/myclass/QnaLearningListView.vue') },
    { path: '/service/FaqView', component: () => import('../views/service/FaqView.vue') },
    { path: '/service/HelpView', component: () => import('../views/service/HelpView.vue') },
    {
      path: '/service/NoticeDetailView/:serviceNoticeSeq',
      component: () => import('../views/service/NoticeDetailView.vue')
    },
    { path: '/service/NoticeView', component: () => import('../views/service/NoticeView.vue') },
    { path: '/service/PrivacyPolicyView', component: () => import('../views/service/PrivacyPolicyView.vue') },
    // { path: '/service/RefundView', component: () => import('../views/service/RefundView.vue') }
    { path: '/service/TermsView', component: () => import('../views/service/TermsView.vue') },
    { path: '/service/SearchView', name: 'SearchView', component: () => import('../views/service/SearchView.vue') },
    { path: '/store/ProductDetailView/:packageSeq', component: () => import('../views/store/ProductDetailView.vue') },
    { path: '/store/ProductListView/:categorySeq', component: () => import('../views/store/ProductListView.vue') }

    // { path: '/error', name: 'notFound', component: Error404 },
    // { path: '/:pathMatch(.*)*', redirect: '/error' }

    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // },
    // {
    //   path: '/option',
    //   name: 'option',
    //   component: TestOption
    // },
    // {
    //   path: '/composition',
    //   name: 'composition',
    //   component: TestComposition
    // },
    // {
    //   path: '/setup',
    //   name: 'setup',
    //   component: TestSetup
    // }
  ]
})

router.beforeEach(function (to, from, next) {
  const store = useStore()
  if (to.name !== 'InfoEditView' && from.name === 'InfoEditView') {
    store.certifiedIn = false
  }
  const publicPages = ['SignIn', 'SignUp', 'PrivacyPolicy', 'PrivacyPolicyModal', 'ServiceTerms']
  const isPublicPage = publicPages.includes(to.name as string)
  if (!store.isLogin && !isPublicPage) {
    next('/:siteCode/sign-in')
  } else if (store.certifiedIn === false && to.name === 'InfoEditView') {
    next('/myclass/InfoView')
  } else if (store.isLogin === true && to.name === 'SignIn') {
    next('/')
  } else {
    next()
  }
})

export default router
