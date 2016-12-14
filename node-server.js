console.log("================================== this is nodejs starting ===========================================");

/*全局文件读写对象*/
global.fs = require("fs");
/*全局的配置文件数据*/
global.store = JSON.parse(fs.readFileSync('./lib/config/interface-config.json'));
/*服务配置文件*/
global.config = JSON.parse(fs.readFileSync('./lib/config/server-config.json'));
/*路由配置文件*/
global.router = JSON.parse(fs.readFileSync('./lib/config/router-config.json'));
/*errorCode文件*/
global.errorCode = JSON.parse(fs.readFileSync('./lib/config/error-code-config.json'));
/*用于解析参数*/
global.params_parse = require("./lib/util/params-parse.js");
/*封装的http请求：*/
global.$http = require("./lib/util/http-util.js");
/*封装的json获取对象值方法*/
global.$JSON = require("./lib/util/json-util.js");

let ejs = require('ejs');

let express = require("express");
let app=express();
app.all("/*",function(req,res,next){
	console.log('测试all/*;可以添加请求的头部信息之类的');
	next();
});
app.all("/rule*",rule_loading,rule_role);
function rule_loading(req,res,next){
	console.log('登陆拦截:'+req.url);
	next();
}
function rule_role(req,res,next){
	console.log('权限拦截'+req.url);
	next();
}
app.use("/rule_index",function(req,res){
	res.send("测试一下是否拦截成功");
});
app.use("/index",function(req,res){
	res.send("测试一下不需要拦截的");

});
/*用于提供外部接口*/
app.use("/json",function(req,res){
	res.json({name:"jacker",age:18})
});
/*发送状态码*/
app.use("/status",function(req,res){
	res.sendStatus(200);
});
/*发送状态码2*/
app.use("/status2",function(req,res){
	res.status(404).json({errorCode:404,msg:"page not found"})
});



app.use(express.static(__dirname + '/dist')); //指定静态HTML文件的位置
app.engine('.html', ejs.__express); //使用ejs引擎渲染html；直接发送：res.sendfile(__dirname+"/static/index.html");
app.set('view engine', 'html');

app.use("/app",function(req,res){
	res.render("../src/app.html");
});
let router=express.Router();
router.use(function(req,res,next){
	console.log('router层的拦截');
	next();
})
router.get("/",function(req,res){
	res.send("测试一下路由");
})
router.get("/index",function(req,res){
	res.send("测试一下路由index");
})
router.get("/rule_index",function(req,res){
	res.send("测试一下路由rule_index");
})
app.use("/router",router);
app.listen(config.port, config.host);




//404错误处理
function send404(response){
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Error 404: Resource not found');
    response.end();
}
//文件数据服务
function sendFile(response, filePath, fileContents){
    response.writeHead(200, {'Contet-Type': mime.lookup(path.basename(filePath))});
    response.end(fileContents);
}
//静态文件服务
function serveStatic(response, cache, absPath){
    if(cache[absPath] && cache_config){
    	sendFile(response, absPath, cache[absPath]);
    }else{
    	fs.exists(absPath, function(exists){
    		if(exists){
    			fs.readFile(absPath, function(err, data){
    				if(err){
    					send404(response);
    				}else{
    					cache[absPath] = data;
    					sendFile(response, absPath, data);
    				}
    			});
    		}else{
    			send404(response);
    		}
    	});
    }
}