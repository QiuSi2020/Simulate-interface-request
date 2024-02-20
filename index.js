// 
/**
 * 后端的框架 express.js
 * 模拟后端接口
 * 启动：npm run dev（修改后需重新启动）
 * 请求：axios({url:url, method: "get"}).then(res => { })
*/

// 引入
const express = require('express')

// 实例化
const app = express()

// 请求地址、本电脑IP（win+r -> cmd -> ipconfig -> IPv4地址）
// 请求时将地址进行拼接，例：'http://192.168.111.2' + '/dataOne'
const ipconfig = 'http://192.168.111.2'

// 设定请求地址端口
const port = 3000

// 这里的all的意思是：post请求、get请求、put请求等等的请求方式都进到这里
app.all('*', (req, res, next) => {
    // 设置允许跨域的域名（ * 代表允许任意域名跨域）
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8082")

    // 允许该跨域的域名发送 Content-Type 请求头
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")
    
    next()
})

// 监听端口
app.listen(
    port, "0.0.0.0", // "0.0.0.0"指本机所有的ip、也可指定端口如 ${ipconfig}
    () => {
        console.log(`服务启动成功, 监听的端口是${port}。`)
    }
)

// 定义接口 one
app.get('/dataOne', (req, res) => {
    // res.send('Hello World!')
    res.jsonp({
        name: "张三",
        age: 18
    })
})

// 定义接口 two
app.get('/dataTwo', (req, res) => {
    res.jsonp({
        name: "李四",
        age: 20
    })
})

/**
    解决跨域的三种方法

    1、设置响应头：由服务器告诉浏览器，允许某个域名访问

    2、代理服务器（目的是 使得域名同域）

    3、jsonp：利用script可以加载第三方js的功能，来调用函数返回数据

    例如后端返回：
    function abc() {
        return {
            name: "张三",
            age: 18
        }
    }

    <script src="http:localhost:3000?fnname=abc">// 此时引入了一个abc函数（fnname方便识别函数名）
    <script>
        const res = abc()// 由此获得数据
    </script>
*/
