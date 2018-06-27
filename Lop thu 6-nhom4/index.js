var express = require('express');
const pg = require('pg');

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

//Multer
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/upload')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
});
var upload = multer({storage:storage}).single('img');

var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(3000);

var config = {
    user: 'postgres',
    database:'vi',
    password:'123',
    host:'localhost',
    port:5432,
    max:10,
    idleTimeoutMillis: 30000,
};

var pool = new pg.Pool(config);


app.get("/", function(req, res){
    pool.connect(function(err, client, done){
        if(err) {
            return console.error('error fitching client from pool', err);
        }
        client.query('select * from sanpham', function(err, result){
            done();

            if(err){
                res.end;
                return console.error('error running query', err);
            }
            res.render("home", {data:result});
        });
    });
    
});



app.get("/sanpham/list", function(req, res){
    pool.connect(function(err, client, done){
        if(err) {
            return console.error('error fitching client from pool', err);
        }
        client.query('select * from sanpham order by id asc', function(err, result){
            done();

            if(err){
                res.end;
                return console.error('error running query', err);
            }
            res.render("list", {data:result});
        });
    });
    
});

app.get("/sanpham/delete/:id", function(req, res){
    pool.connect(function(err, client, done){
        if(err) {
            return console.error('error fitching client from pool', err);
        }
        client.query('delete from sanpham where id=' +req.params.id, function(err, result){
            done();

            if(err){
                res.end;
                return console.error('error running query', err);
            }
            res.redirect("../list");
        });
    });
   
});

app.get("/sanpham/add", function(req,res){
    res.render("add");
}); 

app.post("/sanpham/add",urlencodedParser, function(req, res){
    upload(req, res, function(err){
        if(err){
            res.send("Loi");
        }
        else{
            if(req.file == undefined){
                res.send("ban chua chon file");
            }
            else{
                
                pool.connect(function(err, client, done){
                    if(err) {
                        return console.error('error fitching client from pool', err);
                    }
                    
                    var sql = "insert into sanpham(id,description,img) values('"+parseInt(req.body.ID)+"','"+req.body.description+"','"+req.file.originalname+"')";
                    client.query(sql, function(err, result){
                        done();
                        if(err){
                            res.end;
                            return console.error('error running query', err);
                        }
                        res.redirect("./list");
                    });
                });          
            }
            
        }
    })

})


app.get("/sanpham/edit/:id", function(req, res){
    pool.connect(function(err, client, done){
        if(err) {
            return console.error('error fitching client from pool', err);
        }
        var id = req.params.id;
        client.query("select * from sanpham where id='"+id+"'", function(err, result){
            done();

            if(err){
                res.end;
                return console.error('error running query', err);
            }
            
         res.render("edit",{sanpham:result.rows[0]});
        });
    });
})

app.post("/sanpham/edit",urlencodedParser, function(req, res){
    // pool.connect(function(err, client, done){
    //     if(err) {
    //         return console.error('error fitching client from pool', err);
    //     }
    //     var id = parseInt(req.body.ID);
    //     var sql = "update sanpham set description='"+req.body.description+"',img='"+req.body.img+"' where id='"+id+"'";
    //     client.query(sql, function(err, result){
    //         done();

    //         if(err){
    //             res.end;
    //             return console.error('error running query', err);
    //         }
    //         res.redirect("./list");
    //     });
    // });
    var id = req.body.ID;
    console.log(id);
    
});
app.get(function(req,res){
    res.render('list');
    pool.connect(function(err, client, done){
        if(err) {
            return console.error('error fitching client from pool', err);
        }
        var sql = "update sanpham set(id,description,img) values('"+req.body.id+"','"+req.body.description+"','"+req.body.img+"')";
        client.query(sql, function(err, result){
            done();

            if(err){
                res.end;
                return console.error('error running query', err);
            }
            res.redirect("./list");
        });
    });
})