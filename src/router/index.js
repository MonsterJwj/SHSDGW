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
import TalentDetial from '../page/joinUs/talentDetial.vue'
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
// 站内搜索
import Search from '../page/search.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:"/home"
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      children:[
        {
          path: 'companyProfile',
          name: 'CompanyProfile',
          component: CompanyProfile
        },
        {
          path: 'framework',
          name: 'Framework',
          component: Framework
        },
        {
          path: 'developmentHistroy',
          name: 'DevelopmentHistroy',
          component: DevelopmentHistroy
        },
        {
          path: 'honor',
          name: 'Honor',
          component: Honor
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
          component: Invest
        },
        {
          path: 'project',
          name: 'Project',
          component: Project,
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
          component: Product
        }
      ],
      // redirect: '/scode/invest'     
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
          children:[
            {
              path: 'careerdetial',
              name: 'CareerDetial',
              component: CareerDetial
            },
            {
              path: 'talentdetial',
              name: 'TalentDetial',
              component: TalentDetial
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
          component: SocialTalents
        },
        {
          path: 'currentstudents',
          name: 'CurrentStudents',
          component: CurrentStudents
        },
        {
          path: 'internship',
          name: 'Internship',
          component: Internship
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
        },
        {
          path: 'dutycont',
          name: 'DutyCont',
          component: DutyCont,
        },
        {
          path: 'windowcont',
          name: 'WindowCont',
          component: WindowCont,
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
        },
        {
          path: 'research',
          name: 'Research',
          component: Research,
        },
        {
          path: 'coretechnology',
          name: 'CoreTechnology',
          component: CoreTechnology,
        },
        {
          path: 'aptitudedetail/:id',
          name: 'AptitudeDetail',
          component: AptitudeDetail
        }
      ],
      redirect: '/cntech/research'
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
  ]
})
