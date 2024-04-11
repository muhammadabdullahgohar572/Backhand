const express = require("express");
const test = require("./mongo/server");
const done = require("./data/post2");
const cors = require("cors");
const bcrtpt = require("bcrypt");
const app = express();
require('dotenv').config()
const jwt = require("jsonwebtoken");
app.use(express.json());

app.use(cors());
test();

app.get("", (req, res) => {
  res.json("server is start");
});

app.post("/post2", async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password ) {
      res.json("p/z fill feilds");
      return;
    }

    const hashpassword = await bcrtpt.hash(password, 10);
    const user = new done({ name,password: hashpassword });
    const save = await user.save();
    res.json(save);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.post("/post22", async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    const user = await done.findOne({ name });

    if (user) {
      const passwordMatch = await bcrtpt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign({ userId: user._id }, "token", {
          expiresIn: "1d",
        });

        console.log(token);
        res.json(token);
        return;
      }
    }
    res.status(404).json({ error: "usernotfound" });

    return;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "usernotfound"});
  }
});

app.get("/user/:token", async (req, res) => {
  try {
    const { token } = req.params;

    console.log(token);

    if (!token) {
      res.json({ message: "Access Fail" });
    }
    const decoded = jwt.verify(token, "token"); 

    const { userId } = decoded; 

    console.log({ userId });

    const userData = await done.findById(userId);
    res.json(userData);

    console.log(userData);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
});




app.get("/get", async (req, res) => {
  const data = await done.find();
  res.json(data);
});



// app.get('/getapi',async(req,res)=>{

//     const data=await done.find()

//     res.json(data)

// })

// app.delete('/getdel/:userId',async(req,res)=>{
//     const {userId} =req.params;
// console.log(userId);
//     const deleteapi=await done.findByIdAndDelete(userId);
//     res.json(deleteapi);
//  })

//  app.patch('/getpat/:userdata',async(req,res)=>{

//     const {name,password}=req.body;
//        const {userdata}=req.params;
//        console.log(userdata);
//        const  find=await done.findByIdAndUpdate(userdata,{

// name,
// password

//        })
//        res.json(find)
// })

app.listen(3000, () => {
  console.log("server start");
});
