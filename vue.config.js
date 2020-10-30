module.exports = {
    lintOnSave: false,//eslint关闭
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://mall-pre.springboot.cn',
                changeOrigin: true,
                pathRewrite: {
                    '/api': ''
                }
            }
        }
    },
    productionSourceMap:false,//sourcema关闭
    //兼容其他浏览器，prefetech的JS文件是wepback打包时懒加载生成的一个地址，浏览器会在空闲时间解析，
    //下面是彻底不要prefetch文件,真正的按需加载
    chainWebpack:(config)=>{
        config.plugins.delete('prefetch')
    }
}