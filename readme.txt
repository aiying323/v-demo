Written in 2016-12-09
Author by ying.li
===========================  sublime Text 3 nodejs环境集成 start  ===========================  

1、首选项--浏览插件目录--进入C:\Users\rundo\AppData\Roaming\Sublime Text 3\Packages
2、下载SublimeText-Nodejs插件：https://github.com/tanepiper/SublimeText-Nodejs
3、将SublimeText-Nodejs插件解压到packages目录下
4、修改文件Nodejs.sublime-setting:主要修改node_command属性
{
  // save before running commands
  "save_first": true,
  // if present, use this command instead of plain "node"
  // e.g. "/usr/bin/node" or "C:\bin\node.exe"
  "node_command": "C:\\Program Files\\nodejs\\node.exe",
  // Same for NPM command
  "npm_command": "C:\\Program Files\\nodejs\\npm.cmd",
  // as 'NODE_PATH' environment variable for node runtime
  "node_path": false,

  "expert_mode": false,

  "ouput_to_new_tab": false
}

5、修改文件Nodejs.sublime-build：windows下的cmd不能使用[]；
{
  "cmd": ["C:\\Program Files\\nodejs\\node.exe", "$file"],
  "file_regex": "^[ ]*File \"(...*?)\", line ([0-9]*)",
  "selector": "source.js",
  "shell":true,
  "encoding": "utf8",
  "windows":
    {
        "cmd": "taskkill /F /IM node.exe & node $file"
    }
}
6、工具--编译系统--Nodejs
7、首选项--快捷键设置--将ctrl+break 修改为 ctrl+d用于关闭nodejs服务
/*{ "keys": ["ctrl+d"], "command": "find_under_expand" },*/
{ "keys": ["ctrl+d"], "command": "cancel_build" },
	ctrl+b为启动服务；ctrl+d为关闭服务

===========================  sublime Text 3 nodejs环境集成 end  ===========================  
Written in 2016-12-09
Author by ying.li
===========================  Nodejs热部署 start  ===========================  
1、npm install -g supervisor
2、修改Nodejs.sublime-build:
 "cmd": "taskkill /F /IM node.exe & supervisor $file"
3、确保没有相关服务被开启，重启sublime text 3 ，运行ctrl+b

===========================  Nodejs热部署 end  ===========================  
Written in 2016-12-12
Author by ying.li
===========================  项目依赖的环境 start ===========================  
后端：
npm install express --save[--save-dev] 用于服务启动监听
npm install http --save[--save-dev]
npm install socket.io --save[--save-dev] 用于长连接
npm install ejs --save[--save-dev] 用于模板渲染
npm install fs --save[--save-dev] 用于文件读写
npm install domain --save[--save-dev] 用于异常处理
前端：
npm install gulp --save[--save-dev] 用于自动化构建
npm install gulp-webpack --save[--save-dev] 用于自动化构建
npm install vinyl-named --save[--save-dev] 该插件保证webpack生成的文件名能够和原文件对上

vue相关的插件
npm install vue --save[--save-dev]
npm install vue-loader --save[--save-dev] 用于识别.vue后缀的文件
npm install vue-router --save[--save-dev] 前端路由
vue-router dependency
npm install css-loader --save[--save-dev] 
npm install vue-template-compiler --save[--save-dev] vue动态模板加载编译器

===========================  项目依赖的环境 end ===========================  
Written in 2016-12-13
Author by ying.li
===========================  关于响应函数的介绍 start ===========================  
res.download() 提示下载文件
res.end() 终结响应处理流程
res.json() 发送一个json格式的响应
res.redirect() 重定向请求
res.render() 渲染视图模板
res.send() 发送各种类型的响应
res.sendFile() 以8位字节流的形式发送文件
res.sendStatus() 设置响应状态码，并将其以字符串形式作为响应体的一部分发送
===========================  关于响应函数的介绍 end =========================== 
Written in 2016-12-13
Author by ying.li
===========================  关于express.Router的介绍 start ===========================  
var router=express.Router();
router.use(function(req,res,next){
    //该方法用于拦截，或者添加一些头部信息之类的
})
router.get("/",function(req,res){
  //用于指定子路由
})
express().use("/router",router);第一个参数是指定前置路由，只有满足前置路由条件的请求才会进入router路由
===========================  关于express.Router的介绍 end ===========================  