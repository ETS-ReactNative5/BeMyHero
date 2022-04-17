require("dotenv").config();
require("./config/database").connect();
const bcrypt = require("bcryptjs/dist/bcrypt");


const express= require("express");
const app = express();


const User = require("./model/user");
const TOKEN_KEY = 'sadhfjasjghasgk';
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
app.use(express.json());



// server.listen(8000);

app.post("/register",async (req, res)=>{
    try{
        const { first_name, last_name, email, password}= req.body;
        if(!(email && password && first_name && last_name)){
            res.status(404).send("All input is required");
        }
        const oldUser = await User.findOne({email});

        if(oldUser){
            return res.status(400).send("User already exists. Please login instead");
        }


        encryptedPassword = await bcrypt.hash(password, 10);

        const user= await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });


        const token= jwt.sign(
            {
                user_id: user._id, email
            },
            TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        user.token=token;


        res.status(201).json(user);
    } catch(err){
        console.log(err);
    }


});

app.get("/auth",(req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.post("/login", async (req, res)=>{
    try{
        console.log("Body",req.body);
        const{email, password} = req.body;

        if(!(email && password)){
            res.status(400).send("All input is required");
        }
        const user = await User.findOne({email});
        
        if(user && (await bcrypt.compare(password, user.password))){
            const token= jwt.sign(
                {user_id: user._id, email},
                TOKEN_KEY,
                {
                    expiresIn: '2h',
                }
                );
                
                user.token= token;
                // console.log(user);
                res.status(200).json(user);
            }
            res.status(400).send("Inavlid Creds");
        }catch(err){
            console.log(err);
        }
        
});

app.get("/welcome", auth, (req, res)=>{
    
    res.status(200).send("Welcome ");
});

module.exports=app;