let express=require("express");
let cors=require("cors");
let fetch=(...args)=>
import("node-fetch").then(({default:fetch})=>fetch(...args));
let bodyParser=require("body-parser");

let clientId="6c91e696fe923978ac3b";
let clientSecret="dad2d2c98128a65e90491f12484e522e0e25c644";


let app=express();
app.use(cors());
app.use(bodyParser.json());

app.get("/getAccessToken",async function(req,res){
    console.log("inside getaccess",req.query.code);
    let params="?client_id="+clientId+"&client_secret="+clientSecret+"&code="+req.query.code;

    // const response = await axios.post('https://github.com/login/oauth/access_token', {
    //     client_id: "Iv1.a7be9e84f434b945",
    //     client_secret: "c8b42dd3be030108b27f455aacf8b17d5d4af3b4",
    //     code: code
    // }, { headers: { accept: 'application/json' } });

    await fetch("https://github.com/login/oauth/access_token"+params,{
        method:"POST",
        headers:{
            "accept": "application/json"
        }
    }).then((response)=>{
        //console.log("response",response);
        return response.json();
    }).then((data)=>{
        console.log("data",data)
        res.json(data);
    })
})


app.get("/getuserdata", async function (req,res){
    console.log("inside get user data",req.get("Authorization"));
    await fetch("https://api.github.com/user",{
        method:"GET",
        headers:{
            "Authorization": req.get("Authorization")
        }
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        console.log("data",data);
        res.json(data);
    })


})

app.listen(4000,function(){
    console.log("server on 4000!")
})
