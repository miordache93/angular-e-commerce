export const MENU_ITEMS = [
    {
        name: 'menuItems.home',
        icon: 'home',
        children: [
            {
                name: 'menuItems.home',
                icon: 'home',
                path: '/'
            },
            {
                name: 'menuItems.home2',
                icon: 'home',

                path: '/second-dashboard'
            },
            {
                name: 'menuItems.home3',
                icon: 'home',

                path: '/third-dashboard'
            },
            {
                name: 'menuItems.home4',
                icon: 'home',

                path: '/fourth-dashboard'
            }
        ]
    },
    {
        name: 'menuItems.products',
        icon: 'storefront',
        path: '/products'
    },
    {
        name: 'menuItems.cart',
        icon: 'shopping_cart',
        path: '/cart'
    },
    {
        name: 'menuItems.user',
        icon: 'person',
        children: [
            {
                name: 'menuItems.profile',
                icon: 'manage_accounts',
                path: '/user-profile'
            },
            {
                name: 'menuItems.wishlist',
                icon: 'favorite',
                path: '/favourite'
            },
            {
                name: 'menuItems.settings',
                icon: 'settings',
                path: 'settings'
            },
            {
                name: 'menuItems.logout',
                icon: 'logout',
                path: '/logout'
            },
            {
                name: 'menuItems.login',
                icon: 'login',
                path: '/logout'
            },
        ]
    }
];
