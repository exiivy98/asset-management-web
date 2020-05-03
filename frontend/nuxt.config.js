module.exports = {
    head: {
        title: 'WDFO 자산관리서비스',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
            { hid: 'description', name: 'description', content: 'WDFO 자산관리툴' },
            { name: 'og:title', content: 'WDFO 자산관리툴' },
            { name: 'og:description', content: 'WDFO 직원들을 위한 자산관리툴' },
            { name: 'og:type', content: 'website' },
            { name: 'og:image', content: '' },
            { name: 'og:url', content: '' }

        ],
        link: [
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap' },
            { rel: 'shortcut icon', href: '/fabicon128.png' }
        ],
        script: [
            {src : 'https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js'}
        ]
        
    },

    buildModules: [
        '@nuxtjs/vuetify',
    ],

    build: {
        analyze: false,
        extend(config, {isClient, isServer, isDev}){
            if(isServer && !isDev){
                config.devtool = 'hidden-source-map';
            }
            console.log('webpack', config, isServer, isClient);
        }
    },

    axios: {
        browserBaseURL: 'http://localhost:3085',
        baseURL: 'http://localhost:3085',
        https: false,
    },

    server: {
        port: process.env.PORT || 3000,
    },

    modules: [
        '@nuxtjs/axios',
    ]

}