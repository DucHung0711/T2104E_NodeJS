var express = require("express");//goi thu vien
var app = express();//tao 1 ung dung tu express module
var port = proces.env.PORT || 5000;

app.listen(port,function (){
    console.log("Server is running...")
});
// cap quyen truy cap cac  file static (css,img,jquery)
app.use(express.static("public"));
app.set("view engine","ejs");//bao rang se su dung ejs lam view engine
var count = 0;// dem so nguoi vao trang web

var products = [
    {
        id:1,
        name:"Product 1",
        image:"Buoi3/img/ao.jpg"
    },
    {
        id:2,
        name:"Product 2",
        image:"Buoi3/img/ao.jpg"
    },
    {
        id:3,
        name:"Product 3",
        image:"Buoi3/img/ao.jpg"
    },
    {
        id:4,
        name:"Product 4",
        image:"Buoi3/img/ao.jpg"
    }
];
//routing - bo dinh tuyen (nhan vien  cua van phong)
app.get("/",function (reg,res) {//trang chu
    //res.send(<html><head></head></html>);//html chi la mot chuoi doi voi may chu
    //res.sendFile(__dirname+"/public/demobootrap.html");//__dirname -> xuat cho chung ta mot chuoi duong dan chinh xac
    res.render("home");//tu dong hieu de lay file home.ejs trong thu muc views
});

app.get("/ke-toan",function (req,res){
    // res.send("Xin chao, vui long nop tien..");
    // res.sendFile(__dirname+"/public/assignment3.html");
    count++;
    res.render("ketoan",{
        products:products
    });
});

//Buoi2 node js
app.get("/chi-tiet", function (reg,res){
    var masp = req.query.id;
    //khi co id,  tim kiem theo id trong array
    var p = {};
    for(var i=0;i<products.length;i++){
        if(products[i].id == masp){
            p = products[i];
            break;
        }
    }

    res.render("chi-tiet",{
        masp:masp,
        p: p
    });
});

//su dung tham so tinh
app.get("/chi-tiet2/:id", function (reg,res){
    var masp = req.params.id;
    var p = {};
    for(var i=0;i<products.length;i++){
        if(products[i].id == masp){
            p = products[i];
            break;
        }
    }

    res.render("chi-tiet",{
        masp:masp,
        p: p
    });
});

