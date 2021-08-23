// var express = require("express");//goi thu vien
// var app = express();//tao 1 ung dung tu express module
// var port = process.env.PORT || 5000;
//
// app.listen(port,function (){
//     console.log("Server is running...");
// });
// // cap quyen truy cap cac  file static (css,img,jquery)
// app.use(express.static("public"));
// app.set("view engine","ejs");//bao rang se su dung ejs lam view engine
// var count = 0;// dem so nguoi vao trang web
//
// var products = [
//     {
//         id:1,
//         name:"Product 1",
//         image:"Buoi3/img/ao.jpg"
//     },
//     {
//         id:2,
//         name:"Product 2",
//         image:"Buoi3/img/ao.jpg"
//     },
//     {
//         id:3,
//         name:"Product 3",
//         image:"Buoi3/img/ao.jpg"
//     },
//     {
//         id:4,
//         name:"Product 4",
//         image:"Buoi3/img/ao.jpg"
//     }
// ];
// //routing - bo dinh tuyen (nhan vien  cua van phong)
// app.get("/",function (req,res){ // trang chu
//     // res.send("<html><head><title</head></html>"); // html- chỉ là 1 chuỗi đối với máy chủ
//     // res.sendFile(__dirname+"/public/demobootstrap.html");  //__dirname -> xuất cho chúng ta 1 chuỗi đường dẫn chính xác trên máy tính đến thư mục này
//     count++;
//     res.render("ketoan",{
//         products:products
//         //count: count
//     });// tu dong hieu de lay file home.ejs trong thu muc views
// });
//
// app.get("/ke-toan",function (req,res){
//     // res.send("Xin chao, vui long nop tien..");
//     // res.sendFile(__dirname+"/public/assignment3.html");
//     count++;
//     res.render("ketoan",{
//         products:products
//     });
// });
//
// //Buoi2 node js
// app.get("/chi-tiet", function (reg,res){
//     var masp = req.query.id;
//     //khi co id,  tim kiem theo id trong array
//     var p = {};
//     for(var i=0;i<products.length;i++){
//         if(products[i].id == masp){
//             p = products[i];
//             break;
//         }
//     }
//
//     res.render("chi-tiet",{
//         masp:masp,
//         p: p
//     });
// });
//
// //su dung tham so tinh
// app.get("/chi-tiet2/:id", function (reg,res){
//     var masp = req.params.id;
//     var p = {};
//     for(var i=0;i<products.length;i++){
//         if(products[i].id == masp){
//             p = products[i];
//             break;
//         }
//     }
//
//     res.render("chi-tiet",{
//         masp:masp,
//         p: p
//     });
// });


//------------------------------------------------------
var express = require("express");
var app = express(); // tao 1 ung dung tu express module
var port = process.env.PORT || 5000;
app.listen(port,function (){
    console.log("Server is running....");
});
// cap quyen truy cap cac file static (css, img, jquery...)
app.use(express.static("public"));
app.set("view engine","ejs");// Báo rằng sẽ sử dụng ejs làm view engine
//----------------------------------------------
var sql = require('mssql');
// khai bao de ket noi database
var mssql = require("mssql");
var config = { // thong tin may chu
    server: "localhost",
    user:"sa",
    password:"sa123",
    database:"Ass5",
    stream: false,
    port:1433,
    options: {
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,
    },
};
var ConnectionConfig = {
    server: 'localhost',
    authentication: { type: 'default', options: { userName: 'sa', password: 'sa123' } },
    options: { encrypt:false }}

mssql.connect(ConnectionConfig,function (err){
    if(err) console.log(err)
    else console.log("Connected")
})
// var config = { // thong tin may chu
//     server: "t2004e-waddbserver.database.windows.net",
//     user:"demosql",
//     password:"Abcd@123",
//     database:"WebApplication3_db",
//     stream: false,
//     port:1433,
//     options: {
//         trustedConnection: true,
//         encrypt: true,
//         enableArithAbort: true,
//         trustServerCertificate: true,
//     },
// }
// ket noi voi database
// mssql.connect(config,function (err){
//     if(err) console.log(err);
//     else console.log("connected database!");
// });
// // tao doi tuong truy van du lieu
var sql = new mssql.Request();
//routing - bo dinh tuyen (nhan vien cua van phong)
app.get("/",function (req,res){ // trang chu
    res.send("Trang chu");
});
app.get("/khach-hang",function (req,res){
    // can lay danh sach khach hang
    var txt_sql = "select * from KhachHang;";
    sql.query(txt_sql,function (err,rs){ // callback
        if(err) res.send(err);
        else res.send(rs.recordset);// rows.recordset : 1 array, mỗi element là 1 object từ table
    })
});
// them khach hang
// 1. Tao giao dien form de nap thong tin khach hang
// app.get("/them-khach-hang",function (req,res){
//     res.render("themkhachhang");
// })
// // // 2. Tao routing nhận dữ liệu từ form gửi lên
// var bodyParser = require("body-parser");
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
//
// app.post("/luu-khach-hang",function (req, res) {
//     var ten = req.body.tenKH;
//     var dt = req.body.DienThoai;
//     var dc = req.body.DiaChi;
//     var txt_sql = "insert into KhachHang(TenKH,DienThoai,DiaChi) values(N'"+ten+"','"+dt+"',N'"+dc+"')";
//     sql.query(txt_sql,function (err, rs) {
//         if(err) res.status(403).send('Errors');
//         else res.redirect("/khach-hang");
//     })
// })
// // // liet ke danh sachs hang hoa
// app.get("/hang-hoa",function (req,res){
//     // lay thong tin tu form tim kiem
//     var kw = req.query.keyword||"";
//     // can lay danh sach khach hang
//     var txt_sql = "select * from HangHoa where TenSP like '%"+kw+"%';";
//     sql.query(txt_sql,function (err,rs){
//         if(err) res.send(err);
//         else res.render("home",{
//             hanghoa:rs.recordset // array
//         })
//     })
// });
// app.get("/chi-tiet-sp",function (req,res){
//     var id = req.query.id;
//     var txt_sql = "select * from HangHoa where MaSP = "+id+";";
//     sql.query(txt_sql,function (err,rs){
//         if(err) res.send(err);
//         else if(rs.recordset.length > 0){
//             res.render("chitiet",{
//                 p:rs.recordset[0]
//             })
//         }else res.status(404).send('Not found?');
//     })
// })
// // // liet ke danh sach don hang
// app.get("/don-hang",function (req,res){
//     // can lay danh sach khach hang
//     var txt_sql = "select * from DonHang inner join KhachHang on DonHang.KhachHangID = KhachHang.ID;";
//     sql.query(txt_sql,function (err,rs){
//         if(err) res.send(err);
//         else res.send(rs.recordset);// rows.recordset : 1 array, mỗi element là 1 object từ table
//     })
// });
// app.get("/tao-don-hang",function (req, res) {
//     var txt_sql = "select * from KhachHang;select * from HangHoa;";
//     sql.query(txt_sql,function (err,rs){ // callback
//         if(err) res.send(err);
//         else res.render("taodonhang",{
//             khachhangs: rs.recordsets[0],
//             hanghoas: rs.recordsets[1]
//         });
//     })
//
// })
// app.post("/luu-don-hang",function (req, res) {
//     var khID = req.body.KhachHangID;
//     var spIDs = req.body.spIDs;// array
//     var spIDs_array = "("+spIDs.toString()+")";
//     var txt_sql = "insert into DonHang(NgayDat,KhachHangID,TongTien) values(GETDATE(),"+khID+",(select sum(Gia) from HangHoa where MaSP in "+spIDs_array+"));";
//     txt_sql += "select top 1 MaSoDH from Ass5_DonHang order by MaSoDH desc";
//     sql.query(txt_sql,function (err, rs) {
//         if(err) res.send("Error");
//         else{
//             var MaSoDH = rs.recordset[0].MaSoDH;
//             var txt_sql2 = "";
//             for(var i=0;i<spIDs.length;i++){
//                 txt_sql2+= "insert into DonHangSanPham(MaSoDH,MaSp,SoLuong,ThanhTien) values("+MaSoDH+","+spIDs[i]+",1,(select Gia from HangHoa where MaSP = "+spIDs[i]+"));";
//             }
//             sql.query(txt_sql2,function (err2, rs2) {
//                 if(err2) res.send(err2);
//                 else res.send("Success");
//             })
//         }
//     })
// })
