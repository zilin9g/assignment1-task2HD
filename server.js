
var express = require('express');
var Bid=require('./Bid.class');
var app = express();
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');
// Mapping the EJS template engine to ".html" files
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//current bid
global.currentBid=new Bid();
//bid list
global.bidList=require('./LList.class');
global.timer=0;
global.currentPrice=2000;
app.get('/', function (req, res) {
  res.render("index.html");
})
//place bid
app.get('/placebid', function (req, res) {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    var bidderName=req.query.bidderName;
    var amount=+req.query.amount;
    
    var response;
    if(amount>global.currentPrice)
    {
      global.currentBid.name=bidderName;
      global.currentBid.amount=amount;
      if(global.timer==0)
      {
        setTimeout(setTimer, 1000);
      }else{
        global.timer=0;
      }
      global.currentPrice=amount;
      var bid=new Bid(bidderName,amount);
      var node = global.bidList.findLast();
      global.bidList.insert(bid,node.element);
      // response JSON 
      response = {
        success:true,
        result:("Place bid success"+bid.amount+bid.name)
      };
    }else{
      // response JSON 
      response = {
        success:false,
        result:("Bid should not less than starting bid!")
      };
    }
    
    
    res.end(JSON.stringify(response));
 })
 app.get('/getBidder', function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  var accounts = [];
  var node = global.bidList.findLast();
  while(node.element!='head')
  {
    accounts.push(node.element);
    node = node.previous;
  }
  // 输出 JSON 格式
  response = {
      currentBidder:global.currentBid,
      timer:global.timer,
      bidList:accounts
  };
  res.end(JSON.stringify(response));
})
 function setTimer() {
  if(global.timer<120)
  {
    global.timer++;
    setTimeout(setTimer, 1000);
  }
}



 


var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port
//print host
  console.log("App is listening on http://%s:%s", host, port)

})


