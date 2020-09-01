const router = require('express').Router();
const db = require("./sqlHelper");
const { head } = require('./userRouter');

router.get("/",(req,res)=>{
     res.redirect("/index.html");
})

router.get("/index.html",async (req,res)=>{
    let bannerList = await getBanner();
    let newList = await getNewList(); 
    if(req.session.user){
        res.render("index",{user:req.session.user,HeadImage:req.session.info.HeadImage,lunbo:bannerList,newList:newList})
    }else{
        res.render("index",{user:req.session.user,lunbo:bannerList,newList:newList})
    }
}) 

   
    // res.render("index")
//     let sql = "select * from banner where keyName='lun'"
//         db.query(sql,[],function(err,data){
//             let sql2 = `SELECT product.*,productrule.Id AS rid FROM product JOIN productrule ON product.Id = productrule.productId WHERE isDefault=1 AND isNew=1`;
//             db.query(sql2,[],function(err2,data2){
               
//             })

           
//         })
    
// });

function getBanner(){
    return new Promise((resolve,reject)=>{
        let sql = "select * from banner where keyName='lun'"
        db.query(sql,[],(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    }) 
};


function getNewList(){
    return new Promise((resolve,reject)=>{
        let sql2 = `SELECT product.*,productrule.Id AS rid FROM product JOIN productrule ON product.Id = productrule.productId WHERE isDefault=1 AND isNew=1`;
        db.query(sql2,[],(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data); 
            }
        })
    })
}


router.get("/product.html",(req,res)=>{
    res.render("product")
})

router.get("/productDetail.html",(req,res)=>{
    let rid = req.query.id;
    let sql = `select * from product p join productrule as r on p.Id = r.productId where r.Id=?`;
    db.query(sql,[rid],function(err,data){
        if(err)
        {
            console.log(err)
        }
        res.render("productDetail",{info:data[0],user:req.session.user,user:req.session.user,headImage:req.session.headImage});

    })
})
router.get("/cart.html",(req,res)=>{
    if(req.session.user){
        let userId = req.session.info.id;
        let sql = `SELECT p.feng,p.title,r.price,s.sum,r.Id AS rid FROM shopcart s JOIN productrule r
        ON s.RuleId = r.Id JOIN product p
        ON r.ProductId = p.Id where s.userid=?`;
        db.query(sql,[userId],(err,data)=>{
            res.render("cart",{user:req.session.user,headImage:req.session.headImage,productList:data});

        })
    }else{
        res.redirect("/index.html");
    }
})
module.exports = router; 