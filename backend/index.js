import express from "express"
import mysql from "mysql"
import cors from 'cors'


const app =express()
app.use(express.json());
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"password",
    database: "test"

})

app.get("/", (req,res)=>{
    res.json("hello this is the backend")
})

app.get("/books", (req, res)=>{
    const q= "select * from books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)    
    })
})


app.post("/books", (req,res)=>{
    const q ="insert into books(`title`,`desc`,`price`,`cover`) values (?)";
    const values =[
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ];

    db.query(q,[values],(err,data) =>{
    if(err) return res.json(err);
    return res.json("book has been created successfully" );
});

});

app.delete("/books/:id", (req,res)=>{
    const bookId =req.params.id;
    const q= "delete from books where id=?"
    db.query(q,[bookId], (err,data)=>{
        if(err) return res.json(err);
    return res.json("book has been deleted successfully" );
    })
})


app.put("/books/:id", (req,res)=>{
    const bookId =req.params.id;
    const q= "update books set `title`=?,`desc`=?,`price`=?,`cover`=? where id=?";

    const values=[
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]
    db.query(q,[...values,bookId], (err,data)=>{
        if(err) return res.json(err);
    return res.json("book has been updates successfully" );
    })
})


app.listen(8800, ()=>{
    console.log("connected to backend!")
});



