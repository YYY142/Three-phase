const router = require("express").Router();
const db = require("./sqlHelper");
const e = require("express");
router.post("/shopcart",(req,res)=>{
    var rid = req.body.rid;
    if(req.session.user){
        let userId = req.session.info.id;
        //进行判断
        let sql2 = "select * from ShopCart where UserId=? and ruleId=?"; 
        db.query(sql2,[userId],(err2,data2)=>{
            if(err){
                console.log(err);
            }else{
                if(data2.length>0){
                    let sql = "updata ShopCart set num=num+1 where UserId=? and RuleId=?";
                    db.query(sql,[userId,rid],(err,data)=>{
                        if(err){
                            res.send({code:500,message:"数据库出错，联系管理人员"});
                        }else{
                            if(data.affectedRows>0){
                                res.send({code:200,message:"加入成功"})
                            }else{
                                res.send({code:202,message:"加入失败"})
                            }
                        }
                    })
                }else{
                    let sql = "INSERT INTO ShopCart(UserId,RuleId) VALUES(?,?)"
                    db.query(sql,[userId,rid],(err,data)=>{
                    if(err){
                        res.send({code:500,massae:"数据库出错，联系管理员"})
                    }else{
                        if(data.affectedRows>0){
                            res.send({code:200,message:"加入成功"})
                        }else{
                            res.send({code:202,message:"加入失败"})
                        }
                    }
                    })          
                }
            }
        })


    }else{
        res.send({code:201,message:"请先登录"})
    }
})

module.exports = router;