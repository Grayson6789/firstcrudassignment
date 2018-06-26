let express = require('express');
let app = express();
let fs = require('fs');
let bodyParser = require('body-parser');
const port = process.env.PORT || 8000;

app.use(bodyParser.json())

app.post('/users', function(req, res) {
  let data = fs.readFileSync('./storage.json', "utf8");
  let parsedData = JSON.parse(data);
  parsedData.push(req.body);
  fs.writeFileSync('./storage.json', JSON.stringify(parsedData));
  res.send("All done tyler")
});

app.get('/users', function(req, res) {
  let data = fs.readFileSync('./storage.json', "utf8");
  let parsedData = JSON.parse(data);
  res.json(parsedData);
});

app.get('/users/:name', function(req, res) {
  let data = fs.readFileSync('./storage.json', "utf8");
  let parsedData = JSON.parse(data);
  let foundUser = parsedData.filter(item=>item.name === req.params.name)
  res.json(foundUser[0])
});

app.patch('/users/:name', function(req, res) {
  let data = fs.readFileSync('./storage.json', "utf8");
  let parsedData = JSON.parse(data);
  let updatedData = parsedData.map((item)=>{
    if(item.name === req.params.name){
      return req.body;
    }else{
      return item;
    }
  });
  fs.writeFileSync('./storage.json', JSON.stringify(updatedData));
  res.send("tyler its dilly dilly")
});

app.delete('/users/:name', function(req, res) {
  let data = fs.readFileSync('./storage.json', "utf8");
  let parsedData = JSON.parse(data);
  let filteredData = parsedData.filter((item)=>{
    return item.name !== req.params.name;
  });
  fs.writeFileSync('./storage.json', JSON.stringify(filteredData));
  res.send("tyler, u just deleted sumthing")
});


app.listen(port, function(){
  console.log("listening on port "+port);
})
