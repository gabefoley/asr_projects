import { createRouter, createWebHistory } from 'vue-router';
// import { createRouter, createWebHashHistory } from 'vue-router';

import App from './App.vue';

const routes = [
    {
        path: '/',
        name: 'app',
        component: App,
        children: [

            
            {
                path: '',
                name: 'dashboard',
                component: () => import('./components/Dashboard.vue')
            },

            {
                path: '/curation',
                name: 'curation',
                component: () => import('./components/CurationPage.vue')
            },

            {
                path: '/vuegridlayout',
                name: 'vuegridlayout',
                component: () => import('./components/VueGridLayout.vue')
            },


            {

            path: '/frommenu',
            name: 'frommenu',
            component: () => import('./components/FromMenu.vue')
            },
            {
                path: '/creategood',
                name: 'creategood',
                component: () => import('./components/CreateGood.vue')
            },

            {
                path: '/publicprivate',
                name: 'publicprivate',
                component: () => import('./components/tourbillon_steps/PublicPrivate.vue')
            },

            {
                path: '/commercialsocial',
                name: 'commercialsocial',
                component: () => import('./components/tourbillon_steps/CommercialSocial.vue')
            },

            {
                path: '/iptype',
                name: 'iptype',
                component: () => import('./components/tourbillon_steps/IPType.vue')
            },

            {
                path: '/iprsprotection',
                name: 'iprsprotection',
                component: () => import('./components/tourbillon_steps/IPRSProtection.vue')
            },

            {
                path: '/ipownership',
                name: 'ipownership',
                component: () => import('./components/tourbillon_steps/IPOwnership.vue')
            },

            {
                path: '/developmentcycle',
                name: 'developmentcycle',
                component: () => import('./components/tourbillon_steps/DevelopmentCycle.vue')
            },

            {
                path: '/advicesupport',
                name: 'advicesupport',
                component: () => import('./components/tourbillon_steps/AdviceSupport.vue')
            },

            {
                path: '/marketaudience',
                name: 'marketaudience',
                component: () => import('./components/tourbillon_steps/MarketAudience.vue')
            },

            {
                path: '/iptype',
                name: 'iptype',
                component: () => import('./components/tourbillon_steps/IPType.vue')
            },

            {
                path: '/competitorscollaborators',
                name: 'competitorscollaborators',
                component: () => import('./components/tourbillon_steps/CompetitorsCollaborators.vue')
            },

            {
                path: '/ipownership',
                name: 'ipownership',
                component: () => import('./components/tourbillon_steps/IPOwnership.vue')
            },

            {
                path: '/pathwayanalysis',
                name: 'pathwayanalysis',
                component: () => import('./components/tourbillon_steps/PathwayAnalysis.vue')
            },

            {
                path: '/threehorizons',
                name: 'threehorizons',
                component: () => import('./components/tourbillon_steps/ThreeHorizons.vue')
            },

            {
                path: '/financialanalysis',
                name: 'financialanalysis',
                component: () => import('./components/tourbillon_steps/FinancialAnalysis.vue')
            },

            {
                path: '/drag',
                name: 'drag',
                component: () => import('./components/Draggable_TEST.vue')
            },

            {
                path: '/projects',
                name: 'projects',
                component: () => import('./components/ProjectsTable.vue')
            },

            {
                path: '/papers',
                name: 'papers',
                component: () => import('./components/PapersTable.vue')
            },
            {
                path: '/recons',
                name: 'recons',
                component: () => import('./components/ReconsTable.vue')
            },

            {
                path: '/project/:id',
                name: 'project',
                component: () => import('./components/SingleProject.vue')
            },

            {
                path: '/paper/:id',
                name: 'paper',
                component: () => import('./components/SinglePaper.vue')
            },

            {
                path: '/recon/:id',
                name: 'recon',
                component: () => import('./components/SingleRecon.vue')
            },

            {
                path: '/mdtest',
                name: 'mdtest',
                component: () => import('./components/MD_TEST.vue')
            },
            {
                path: '/gantt',
                name: 'gantt',
                component: () => import('./components/Gantt_TEST.vue')
            },

            {
                path: '/flow',
                name: 'flow',
                component: () => import('./components/Flow_TEST.vue')
            },

            {
                path: '/formlayout',
                name: 'formlayout',
                component: () => import('./components/FormLayoutDemo.vue')
            },
            {
                path: '/input',
                name: 'input',
                component: () => import('./components/InputDemo.vue')
            },
            {
                path: '/floatlabel',
                name: 'floatlabel',
                component: () => import('./components/FloatLabelDemo.vue')
            },
            {
                path: '/invalidstate',
                name: 'invalidstate',
                component: () => import('./components/InvalidStateDemo.vue')
            },
            {
                path: '/button',
                name: 'button',
                component: () => import('./components/ButtonDemo.vue')
            },
            {
                path: '/table',
                name: 'table',
                component: () => import('./components/TableDemo.vue')
            },
            {
                path: '/list',
                name: 'list',
                component: () => import('./components/ListDemo.vue')
            },
            {
                path: '/tree',
                name: 'tree',
                component: () => import('./components/TreeDemo.vue')
            },
            {
                path: '/panel',
                name: 'panel',
                component: () => import('./components/PanelsDemo.vue')
            },
            {
                path: '/overlay',
                name: 'overlay',
                component: () => import('./components/OverlayDemo.vue')
            },
            {
                path: '/media',
                name: 'media',
                component: () => import('./components/MediaDemo.vue')
            },
            {
                path: '/menu',
                component: () => import('./components/MenuDemo.vue'),
                children: [
                    {
                        path: '',
                        component: () => import('./components/menu/PersonalDemo.vue')
                    },
                    {
                        path: '/menu/seat',
                        component: () => import('./components/menu/SeatDemo.vue')
                    },
                    {
                        path: '/menu/payment',
                        component: () => import('./components/menu/PaymentDemo.vue')
                    },
                    {
                        path: '/menu/confirmation',
                        component: () => import('./components/menu/ConfirmationDemo.vue')
                    },
                ],
            },
            {
                path: '/messages',
                name: 'messages',
                component: () => import('./components/MessagesDemo.vue')
            },
            {
                path: '/file',
                name: 'file',
                component: () => import('./components/FileDemo.vue')
            },
            {
                path: '/chart',
                name: 'chart',
                component: () => import('./components/ChartDemo.vue')
            },
            {
                path: '/misc',
                name: 'misc',
                component: () => import('./components/MiscDemo.vue')
            },
            {
                path: '/crud',
                name: 'crud',
                component: () => import('./pages/CrudDemo.vue')
            },
            {
                path: '/timeline',
                name: 'timeline',
                component: () => import('./pages/TimelineDemo.vue')
            },
            {
                path: '/empty',
                name: 'empty',
                component: () => import('./components/EmptyPage.vue')
            },
            {
                path: '/documentation',
                name: 'documentation',
                component: () => import('./components/Documentation.vue')
            },
            {
                path: '/blocks',
                name: 'blocks',
                component: () => import('./components/BlocksDemo.vue')
            },
            {
                path: '/icons',
                name: 'icons',
                component: () => import('./components/IconsDemo.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./pages/Login.vue')
    },
    {
        path: '/landing',
        name: 'landing',
        component: () => import('./pages/LandingDemo.vue')
    },
    {
        path: '/error',
        name: 'error',
        component: () => import('./pages/Error.vue')
    },
    {
        path: '/notfound',
        name: 'notfound',
        component: () => import('./pages/NotFound.vue')
    },
    {
        path: '/access',
        name: 'access',
        component: () => import('./pages/Access.vue')
    }
];

const router = createRouter({
    // mode: 'history',

    history: createWebHistory(),
    routes,
});

export default router;
