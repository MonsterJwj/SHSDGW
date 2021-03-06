import Vue from 'vue'
import Router from 'vue-router'
// 首页
import Home from '../page/home.vue'
// 关于我们
import About from '../page/aboutUs/about.vue'
import CompanyProfile from '../page/aboutUs/CompanyProfile.vue'
import Framework from '../page/aboutUs/framework .vue'
import DevelopmentHistroy from '../page/aboutUs/developmentHistory.vue'
import Honor from '../page/aboutUs/honor.vue'
// 公司动态
import State from '../page/companyState/state.vue'
import CompanyNews from '../page/companyState/companyNews.vue'
import TradeNews from '../page/companyState/tradeNews.vue'
import CompanyDetial from '../page/companyState/companyDetial.vue'
import TradeDetial from '../page/companyState/tradeDetial.vue'
// 业务范围
import Scode from '../page/scode/scode.vue'
import Invest from '../page/scode/invest.vue'
import Project from '../page/scode/project.vue'
import ProjectDetial from '../page/scode/projectDetial.vue'
import Product from '../page/scode/product.vue'
// 加入我们
import JoinUs from '../page/joinUs/joinUs.vue'
import ColumnIntroduced from '../page/joinUs/columnIntroduced.vue'
import SocialTalents from '../page/joinUs/SocialTalents.vue'
import CurrentStudents from '../page/joinUs/CurrentStudents.vue'
import Internship from '../page/joinUs/Internship.vue'
import StudentInfo from '../page/joinUs/studentInfo.vue'
import CareerDetial from '../page/joinUs/careerDetial.vue'
import HonorDetial from '../page/joinUs/honorDetial.vue'
import InternshipInfo from '../page/joinUs/internshipInfo.vue'
import SocialInfo from '../page/joinUs/SocialInfo'
// 企业文化
import Culture from '../page/corporateCulture/culture.vue'
import CultureCont from '../page/corporateCulture/cultureCont.vue'
import DutyCont from '../page/corporateCulture/dutyCont.vue'
import WindowCont from '../page/corporateCulture/windowCont.vue'
// 科技创新
import CnTech from '../page/CnTech/CnTech.vue'
import Aptitude from '../page/CnTech/aptitude.vue'
import AptitudeDetail from '../page/CnTech/aptitudeDetail.vue'
import Research from '../page/CnTech/research.vue'
import CoreTechnology from '../page/CnTech/coretechnology.vue'
// import CoreDetia from '../page/CnTech/coreDetial.vue'
// 站内搜索
import Search from '../page/search.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect:"/home",
      meta: { title: '首页'}
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: { title: '首页',keywords:"首页"}
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      children:[
        {
          path: 'companyProfile',
          name: 'CompanyProfile',
          component: CompanyProfile,
          meta: { title: '公司概况_关于我们'}
        },
        {
          path: 'framework',
          name: 'Framework',
          component: Framework,
          meta: { title: '企业架构_关于我们'}
        },
        {
          path: 'developmentHistroy',
          name: 'DevelopmentHistroy',
          component: DevelopmentHistroy,
          meta: { title: '发展历程_关于我们'}
        },
        {
          path: 'honor',
          name: 'Honor',
          component: Honor,
          meta: { title: '荣誉资质_关于我们'}
        },
      ]
    },
    {
      path: '/state',
      name: 'State',
      component: State,
      children:[
        {
          path: 'companyNews',
          name: 'CompanyNews',
          component: CompanyNews,
          meta: { title: '公司新闻_公司动态'},
          children:[
            {
              path: 'companydetial/:id',
              name: 'CompanyDetial',
              component: CompanyDetial
            }
          ]
        },
        {
          path: 'tradeNews',
          name: 'TradeNews',
          component: TradeNews,
          meta: { title: '行业新闻_公司动态'},
          children:[
            {
              path: 'tradedetial/:id',
              name: 'TradeDetial',
              component: TradeDetial
            }
          ]
        }
      ]
    },
    {
      path: '/scode',
      name: 'Scode',
      component: Scode,
      children:[
        {
          path: 'invest',
          name: 'Invest',
          component: Invest,
          meta: { title: '投资_业务范围'}
        },
        {
          path: 'project',
          name: 'Project',
          component: Project,
          meta: { title: '工程建设_业务范围'},
          children:[
            {
              path: 'projectdetial/:id',
              name: 'ProjectDetial',
              component: ProjectDetial
            }
          ]
        },
        {
          path: 'product',
          name: 'Product',
          component: Product,
          meta: { title: '产品制造_业务范围'}
        }
      ]    
    },
    {
      path: '/joinUs',
      name: 'JoinUs',
      component: JoinUs,
      children:[
        {
          path: 'columnintroduced',
          name: 'ColumnIntroduced',
          component: ColumnIntroduced,
          meta: { title: '加入我们'},
          children:[
            {
              path: 'careerdetial',
              name: 'CareerDetial',
              component: CareerDetial
            },
            {
              path: 'honordetial',
              name: 'HonorDetial',
              component: HonorDetial
            }
          ]
        },
        {
          path: 'socialTalents',
          name: 'SocialTalents',
          component: SocialTalents,
          meta: { title: '社会人才_加入我们'},
        },
        {
          path: 'currentstudents',
          name: 'CurrentStudents',
          component: CurrentStudents,
          meta: { title: '应届学生_加入我们'},
        },
        {
          path: 'internship',
          name: 'Internship',
          component: Internship,
          meta: { title: '实习见习_加入我们'}
        },
        {
          path: 'studentinfo/:id',
          name: 'StudentInfo',
          component: StudentInfo
        },
        {
          path: 'internshipinfo/:id',
          name: 'InternshipInfo',
          component: InternshipInfo
        },
        {
          path: 'socialinfo/:id',
          name: 'SocialInfo',
          component: SocialInfo
        }
      ],
      redirect: '/joinUs/columnintroduced'
    },
    {
      path: '/culture',
      name: 'Culture',
      component: Culture,
      children:[
        {
          path: 'culturecont',
          name: 'CultureCont',
          component: CultureCont,
          meta: { title: '隧文化_企业文化'}
        },
        {
          path: 'dutycont',
          name: 'DutyCont',
          component: DutyCont,
          meta: { title: '社会责任_企业文化'}
        },
        {
          path: 'windowcont',
          name: 'WindowCont',
          component: WindowCont,
          meta: { title: '视窗_企业文化'}
        }
      ],
      redirect: '/culture/culturecont'
    },
    {
      path: '/cntech',
      name: 'CnTech',
      component: CnTech,
      children:[
        {
          path: 'aptitude',
          name: 'Aptitude',
          component: Aptitude,
          meta: { title: '科技资质与获奖_科技创新'}
        },
        {
          path: 'research',
          name: 'Research',
          component: Research,
          meta: { title: '研发体系_科技创新'}
        },
        {
          path: 'coretechnology',
          name: 'CoreTechnology',
          component: CoreTechnology,
          meta: { title: '核心科技_科技创新'}
        },
        {
          path: 'aptitudedetail/:id',
          name: 'AptitudeDetail',
          component: AptitudeDetail
        }
        // {
        //   path: 'coredetia/:id',
        //   name: 'CoreDetia',
        //   component: CoreDetia
        // }
      ],
      redirect: '/cntech/research'
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta: { title: '站内搜索'}
    },
  ]
})

router.beforeEach((to,from,next) => {
  if(to.meta.title){
    document.title = to.meta.title + '_上海隧道工程有限公司';
    document.keywords = to.meta.keywords + '-上海隧道工程有限公司';
  }
  next()
});

export default router
