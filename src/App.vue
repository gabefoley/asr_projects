<template>
	<div :class="containerClass" @click="onWrapperClick">
        <AppTopBar @menu-toggle="onMenuToggle" />
        <div class="layout-sidebar" @click="onSidebarClick">
            <AppMenu :model="menu" @menuitem-click="onMenuItemClick" />
        </div>

        <div class="layout-main-container">
            <div class="layout-main">
                <router-view />


    <div>

    </div>


            </div>
            <AppFooter />
        </div>

		<AppConfig :layoutMode="layoutMode" @layout-change="onLayoutChange" />
        <transition name="layout-mask">
            <div class="layout-mask p-component-overlay" v-if="mobileMenuActive"></div>
        </transition>
	</div>
</template>

<script>

import {markRaw } from 'vue';


// import axios from 'axios';

import AppTopBar from './AppTopbar.vue';
import AppMenu from './AppMenu.vue';
import AppConfig from './AppConfig.vue';
import AppFooter from './AppFooter.vue';

// Import all of the tourbillon components

// import TheCharts from "./components/TheCharts.vue"
// import Jquerytable from "./components/Jquerytable.vue"
// import PhyloTree from "./components/PhyloTree.vue"


// import PublicPrivate from './components/tourbillon_steps/PublicPrivate.vue';
// import CommercialSocial from './components/tourbillon_steps/CommercialSocial.vue';
// import IPType from './components/tourbillon_steps/IPType.vue';
// import IPRSProtection from './components/tourbillon_steps/IPRSProtection.vue';
// import IPOwnership from './components/tourbillon_steps/IPOwnership.vue';
// import DevelopmentCycle from './components/tourbillon_steps/DevelopmentCycle.vue';
// import AdviceSupport from './components/tourbillon_steps/AdviceSupport.vue';
// import MarketAudience from './components/tourbillon_steps/MarketAudience.vue';
// import CompetitorsCollaborators from './components/tourbillon_steps/CompetitorsCollaborators.vue';
// import PathwayAnalysis from './components/tourbillon_steps/PathwayAnalysis.vue';
// import ThreeHorizons from './components/tourbillon_steps/ThreeHorizons.vue';
// import FinancialAnalysis from './components/tourbillon_steps/FinancialAnalysis.vue';

var component_dict = {
//   "Jquerytable": Jquerytable,
//   "TheCharts" : TheCharts,
//   "PhyloTree" : PhyloTree,
//   "Public / Private Goods" : PublicPrivate,
//   "Commercial / Social Viability": CommercialSocial,
//   "Type of IP": IPType,
//   "IPRS & Protection" : IPRSProtection,
//   "IP Ownership" : IPOwnership,
//   "Development Cycle" : DevelopmentCycle,
//   "Advice & Support" : AdviceSupport,
//   "Market / Audience" : MarketAudience,
//   "Competitors / Collaborators" : CompetitorsCollaborators,
//   "Pathways" : PathwayAnalysis,
//   "Horizons" : ThreeHorizons,
//   "Financials" : FinancialAnalysis
};


export default {
    emits: ['change-theme'],
    data() {
        return {
            layoutMode: 'static',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false,
            menu : [
                {
                    label: 'Create',
                    items: [

                        {label: 'Projects', icon: 'pi pi-fw pi-home', to: '/projects'},

                        {label: 'Papers', icon: 'pi pi-fw pi-home', to: '/papers'},
                        {label: 'Reconstructions', icon: 'pi pi-fw pi-home', to: '/recons'},
                        // {label: 'People', icon: 'pi pi-fw pi-home', to: '/gantt'},


                        ]
                },
				// {
				// 	label: 'Tourbillon Steps', icon: 'pi pi-fw pi-sitemap',
				// 	items: [
                //             {label: 'Flow', icon: 'pi pi-fw pi-home', to: '/flow'},
                //         {label: 'Create Good', icon: 'pi pi-fw pi-home', to: '/creategood'},
                //         {label: 'Drag', icon: 'pi pi-fw pi-home', to: '/drag'},

				// 		]
				// }

            ]
        }
    },
    watch: {
        $route() {
            this.menuActive = false;
            this.$toast.removeAllGroups();
        }
    },
    methods: {

        onWrapperClick() {
            if (!this.menuClick) {
                this.overlayMenuActive = false;
                this.mobileMenuActive = false;
            }

            this.menuClick = false;
        },
        onMenuToggle() {
            this.menuClick = true;

            if (this.isDesktop()) {
                if (this.layoutMode === 'overlay') {
					if(this.mobileMenuActive === true) {
						this.overlayMenuActive = true;
					}

                    this.overlayMenuActive = !this.overlayMenuActive;
					this.mobileMenuActive = false;
                }
                else if (this.layoutMode === 'static') {
                    this.staticMenuInactive = !this.staticMenuInactive;
                }
            }
            else {
                this.mobileMenuActive = !this.mobileMenuActive;
            }

            event.preventDefault();
        },
        onSidebarClick() {
            this.menuClick = true;
        },
        onMenuItemClick(event) {
            console.log("Clicked item in menu")
            console.log(event.item.label)

            if (event.item.label in component_dict){
            this.$store.commit('newStep', { x: 0, y: 0, w: 2, h: 4, i: event.item.label, static: false, "c" : markRaw(component_dict[event.item.label]) } )

            }

            else {
                console.log('actual path')

            }





            console.log(this.$store)

            if (event.item && !event.item.items) {
                this.overlayMenuActive = false;
                this.mobileMenuActive = false;
            }
        },
		onLayoutChange(layoutMode) {
			this.layoutMode = layoutMode;
		},
        addClass(element, className) {
            if (element.classList)
                element.classList.add(className);
            else
                element.className += ' ' + className;
        },
        removeClass(element, className) {
            if (element.classList)
                element.classList.remove(className);
            else
                element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        },
        isDesktop() {
            return window.innerWidth >= 992;
        },
        isSidebarVisible() {
            if (this.isDesktop()) {
                if (this.layoutMode === 'static')
                    return !this.staticMenuInactive;
                else if (this.layoutMode === 'overlay')
                    return this.overlayMenuActive;
            }

            return true;
        }
    },
    computed: {
        containerClass() {
            return ['layout-wrapper', {
                'layout-overlay': this.layoutMode === 'overlay',
                'layout-static': this.layoutMode === 'static',
                'layout-static-sidebar-inactive': this.staticMenuInactive && this.layoutMode === 'static',
                'layout-overlay-sidebar-active': this.overlayMenuActive && this.layoutMode === 'overlay',
                'layout-mobile-sidebar-active': this.mobileMenuActive,
				'p-input-filled': this.$primevue.config.inputStyle === 'filled',
				'p-ripple-disabled': this.$primevue.config.ripple === false
            }];
        },

        logo() {
            return (this.$appState.darkTheme) ? "images/logo-white.svg" : "images/logo.svg";
        }
    },
    beforeUpdate() {
        if (this.mobileMenuActive)
            this.addClass(document.body, 'body-overflow-hidden');
        else
            this.removeClass(document.body, 'body-overflow-hidden');
    },
    components: {
        'AppTopBar': AppTopBar,
        'AppMenu': AppMenu,
        'AppConfig': AppConfig,
        'AppFooter': AppFooter,
    },

    async mounted() {

        console.log('mounted')
        console.log('bout to fail')
    // const config = {
    //   method: "get",
    //   url: "http://localhost:5000/get",
    // };

    // try {
    //     console.log('gonna get goods')

    //     const res = await axios.get("http://localhost:5000/get")
    //     .then(
    //         console.log('hello'))
    //         .then(console.log(res))
    //         .then(console.log('goodbye'))

    //     // console.log(res)

    // //   let res = await axios(config);


    //   console.log(res.data);
    //   this.goods = res.data;
    //   //-----------------------------
    //   //We add the following line
    //   this.$store.commit("setGoods", this.goods);

    //   console.log('new state')
    //   console.log(this.$store.getters['goods'])
    //   //-----------------------------
    // } catch (err) {
    //   console.log(err);
    // }
  },
}
</script>

<style lang="scss">
@import './App.scss';
/* these are necessary styles for vue flow */
@import "../node_modules/@braks/vue-flow/dist/style.css";
@import "../node_modules/@braks/vue-flow/dist/theme-default.css";
</style>
