const express=require("express");
const app=express();
const path=require("path");
const hbs=require("hbs");
const User=require("./models/dbschema");

const port=process.env.PORT || 8000;

// connection with database
require("./db/conn");

//settings for static files--css,js files
const staticpath=path.join(__dirname,"../public");
app.use(express.static(staticpath));

// to get post data 
app.use(express.urlencoded({extended:false}));

//setting view engine
app.set("view engine","hbs");

//setting path for views and partials
app.set("views",path.join(__dirname,"../templates/views"));
hbs.registerPartials(path.join(__dirname,"../templates/partials"));


app.get("",(req,res)=>{
    res.render("index");
});

app.post("/contact",async (req,res)=>{
    try{
        const userData=new User(req.body);
        await userData.save();
        res.status(201).render("index");
    }
    catch(e){
        res.status(500).send(e);
        console.log(e);
    }
})


app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
})