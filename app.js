//引用模块
const myexpress = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const userRouter = require('./routes/userRouter');
const viewRouter = require('./routes/viewRouter');
const productRouter = require("./routes/productRouter")
const ejs = require('ejs');
var mysql = require('mysql');
const router = require('./routes/userRouter');
const app = myexpress();

//配置
 
app.use(logger('dev'));

//配置EJS
app.set("views",__dirname+"/view");
app.engine("html",ejs.__express);
app.set("view engine","html")

//bodyParser 的配置
app.use(bodyParser.json());
app.use(session({
    secret:'1234',
    name:'testapp', //这里的name值是cookie的name，默认cookie的name是：connect
    cookie:{maxAge:800000},//设置maxAge的时间，是毫秒
    rolling:true,//更新session-cookie失效时间
    resave:true,//重新保存
    saveUninitialized:true
}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(userRouter);
app.use(viewRouter);
// app.use("/index.html",(req,res)=>{
//     if(req.session.user){
//         res.render("index",{user:req.session.user,headImage:req.session.info.HeadImage})

//     }else{
//         res.render("index",{user:req.session.user})
//     }
// });
app.use(productRouter);
app.use(myexpress.static(__dirname+'/public'));
app.use(favicon(__dirname+'/public/favicon.ico'));


app.listen(9999);
console.log('服务已启动');