import appHeader from './1_header.js';
import appMenu from './2_menu.js';
import appProducts from './3_products.js';
import appSlider from './4_slider.js';
import appBanner from './5_banner.js';
import appFeature from './6_feature.js';
import appSubscribe from './7_subscribe.js';
import appFooter from './8_footer.js';
import appBreadcrumb from './9_breadcrumb.js';
import appCheckout from './10_checkout.js';
import appSingle from './11_single.js';
import appShopcart from './12_shopcart.js';
import appCatalog from './13_catalog.js';

const pageIndex = {
    components: {
        appHeader,
        appMenu,
        appProducts,
        appSlider,
        appBanner,
        appFeature,
        appSubscribe,
        appFooter,
    },
    template:  `<div>
                    <app-header ref="header"></app-header>
                    <app-menu></app-menu>
                    <app-products ref="products"></app-products>
                    <app-slider></app-slider>
                    <app-banner></app-banner>
                    <app-feature></app-feature>
                    <app-subscribe></app-subscribe>
                    <app-footer></app-footer>
                </div>`
};

const pageCheckout = {
    components: {
        appHeader,
        appMenu,
        appBreadcrumb,
        appCheckout,
        appSubscribe,
        appFooter,
    },
    template:  `<div>
                    <app-header ref="header"></app-header>
                    <app-menu></app-menu>
                    <app-breadcrumb></app-breadcrumb>
                    <app-checkout></app-checkout>
                    <app-subscribe></app-subscribe>
                    <app-footer></app-footer>
                </div>`
};

const pageSingle = {
    components: {
        appHeader,
        appMenu,
        appBreadcrumb,
        appSingle,
        appSubscribe,
        appFooter,
    },
    template:  `<div>
                    <app-header ref="header"></app-header>
                    <app-menu></app-menu>
                    <app-breadcrumb></app-breadcrumb>
                    <app-single></app-single>
                    <app-subscribe></app-subscribe>
                    <app-footer></app-footer>
                </div>`
};

const pageCart = {
    components: {
        appHeader,
        appMenu,
        appBreadcrumb,
        appShopcart,
        appSubscribe,
        appFooter,
    },
    template:  `<div>
                    <app-header ref="header"></app-header>
                    <app-menu></app-menu>
                    <app-breadcrumb></app-breadcrumb>
                    <app-shopcart></app-shopcart>
                    <app-subscribe></app-subscribe>
                    <app-footer></app-footer>
                </div>`
};

const pageCatalog = {
    components: {
        appHeader,
        appMenu,
        appBreadcrumb,
        appCatalog,
        appFeature,
        appSubscribe,
        appFooter,
    },
    template:  `<div>
                    <app-header ref="header"></app-header>
                    <app-menu></app-menu>
                    <app-breadcrumb></app-breadcrumb>
                    <app-catalog></app-catalog>
                    <app-feature></app-feature>
                    <app-subscribe></app-subscribe>
                    <app-footer></app-footer>
                </div>`
};

export { pageIndex, pageCheckout, pageSingle, pageCart, pageCatalog };