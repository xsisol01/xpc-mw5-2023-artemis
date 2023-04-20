import { createProxyMiddleware } from "http-proxy-middleware"

module.exports = (app: any) => {
  app.use('/api/Commodity',
    createProxyMiddleware( {
      target: 'https://localhost:7242',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api'
    },
    })
  )
  app.use('/api/Manufacturer',
    createProxyMiddleware( {
      target: 'https://localhost:7242',
      changeOrigin: true
    })
  ),
  app.use('/api/Category',
    createProxyMiddleware( {
      target: 'https://localhost:7242',
      changeOrigin: true
    })
  )
}