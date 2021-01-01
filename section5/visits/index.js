const express = require("express");
const redis = require("redis");
const process = require("process");

const app = express();

const client = redis.createClient(
    {
        host:"redis-server",
        port: 6379
    });
client.set("visits",0);


app.get("/",(req, res)=>{
    process.exit(0);//crash the application to get the App Docker down.
    client.get("visits", (err, visits)=>{
        res.send("Number of visits is "+ visits);
        client.set("visits", parseInt(visits)+1);
    })
});


app.listen(8081, ()=>{
    console.log("Server is listning on port: 8081");
});