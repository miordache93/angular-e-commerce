export const MENU_ITEMS: MenuItems[] = [
    {
        name: 'menuItems.home',
        icon: 'home',
        hideOnMobile: true,
        children: [
            {
                name: 'menuItems.home',
                icon: 'home',
                path: '/',
                methods: ['test']
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
        name: '',
        icon: 'search',
        path: '',
        methods: ['search'],
        hideOnMobile: false,
        hideOnDesktop: true
    },
    {
        name: 'menuItems.products',
        icon: 'storefront',
        path: '/products',
        methods: [],
        hideOnMobile: true
    },
    {
        name: 'menuItems.contactUs',
        icon: 'contact_page',
        path: 'contact-us',
        hideOnMobile: true
    },
    {
        name: 'menuItems.cart',
        icon: 'shopping_cart',
        path: '/cart',
        methods: [],
        hideOnMobile: false
    },
    {
        name: 'menuItems.user',
        icon: 'person',
        hideOnMobile: false,
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
                path: '/logout',
                requireAuth: true
            },
            {
                name: 'menuItems.login',
                icon: 'login',
                path: '/authenticate',
                requireAuth: false,
                methods: ['login']
            },
        ]
    }
];

interface MenuItems {
    name: string;
    icon: string;
    path?: string;
    children?: any;
    hideOnMobile?: boolean;
    hideOnDesktop?: boolean;
    methods?: string[];
    onClick?: () => void;
}

