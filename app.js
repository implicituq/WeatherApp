const express = require("express");
const https = require ("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


//When user connects with the home page, the following html is sent to him/her
app.get("/", function(req, res){

  res.sendFile(__dirname+"/index.html");

});

//In this scenario we are taking an input from the user which here is the city Name
//THe name is then captured from the html page using body-parser and then sent to the required api server
//Using https connections we get back the response data from the external server and display it to our cilent on our website
app.post("/", function(req, res){

  const query = req.body.cityName;
  const appid = "2c5badc56254aaf62dcc1bc2fa70c88c";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ appid +"&units="+ units;
  https.get(url, function(response){
    console.log(response.statusCode);

    // In order to interact with the data being sent we create another .on event
    // where we directly interact with the data the moment it is received and triggered using .on()
    response.on("data", function(data){

      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDesc = weatherData.weather[0].description;
      const icon = "http://openweathermap.org/img/wn/"+ weatherData.weather[0].icon +"@2x.png";

      res.write("<h1>The temperature in "+ query +" is " + temp + " degrees</h1>");
      res.write("<h1> The weather is currently having "+weatherDesc+ " .</h1>");
      res.write("<img src="+ icon +">");
      res.send();
      console.log(temp);
      console.log(weatherDesc);
    });
  });
});


//

app.get("/data", (req, res)=>{
  res.json(["Sunny", "Dhyey", "Uma"]);
});



app.listen(3000, function(){
  console.log("Server on running on port 3000");
});
