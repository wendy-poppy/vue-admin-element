import Home from './views/Home.vue'
import Certificate from './views/nav1/certificate.vue'
import SklPrice from './views/nav2/sklPrice.vue'
import ShowData from './views/nav3/showData.vue'
import Finance from './views/nav4/finance.vue'
import ExpendData from './views/nav5/expendData.vue'
import CardDemand from './views/nav6/cardDemand.vue'
import ChConfig from './views/nav7/chConfig.vue'
import ChManage from './views/nav7/chManage.vue'

let routes = [
    {
        path: '/nav1',
        component: Home,
        name: '实名认证审核',
        iconCls: 'fa fa-eye',//图标样式class
         // leaf:true,//只有一个节点
        children: [
            { path: '/certificate', component: Certificate, name: '实名认证审核' }
        ]
    },
    {
        path: '/nav2',
        component: Home,
        name: '收卡价管理',
        iconCls: 'fa fa-cogs',
        // leaf:true,
        children: [
            { path: '/sklPrice', component: SklPrice, name: '收卡价管理' }
        ]
    },
    {
        path: '/nav3',
        component: Home,
        name: '数据统计',
        iconCls: 'fa fa-bar-chart-o',
        // leaf: true,
        children: [
            { path: '/showData', component: ShowData, name: '数据统计' }
        ]
    },
    {
        path: '/nav4',
        component: Home,
        name: '财务打款',
        iconCls: 'fa fa-cny',
        // leaf: true,
        children: [
            { path: '/finance', component: Finance, name: '财务打款' }
        ]
    },
    {
        path: '/nav5',
        component: Home,
        name: '消耗卡查询',
        iconCls: 'fa fa-search',
        // leaf: true,
        children: [
            { path: '/expendData', component: ExpendData, name: '消耗卡查询' }
        ]
    },
    {
        path: '/nav6',
        component: Home,
        name: '卡单查询',
        iconCls: 'fa fa-search',
        // leaf: true,
        children: [
            { path: '/cardDemand', component: CardDemand, name: '卡单查询' }
        ]
    },
    {
        path: '/nav7',
        component: Home,
        name: '出货管理',
        iconCls: 'fa fa-cogs',
        children: [
            { path: '/chConfig', component: ChConfig, name: '出货配置' },
            { path: '/chManage', component: ChManage, name: '出货源管理' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/certificate' }
    }
];

export default routes;