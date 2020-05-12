var express = require('express')
var app = express()

var fs = require('fs')
var path = require('path')
var _ = require('lodash')
var engines = require('consolidate')
var bodyParser = require('body-parser')

var till = {
  pennies: 0,
  nickles: 0,
  dimes: 0,
  quarters: 0,
  total: 0,
};

var coins = [0, 0, 0, 0];

function generateCoinChange(cents) {
  coins = [0, 0, 0, cents];

  var denominations = [25, 10, 5, 1];

  for (var i = 0; i < 3; i++) {
    coins[i] = Math.floor(coins[3] / denominations[i])
    coins[3] -= coins[i] * denominations[i]
  }
}

app.engine('hbs', engines.handlebars)

app.set('views', './views')
app.set('view engine', 'hbs')

app.use('/scripts', express.static('scripts'))
app.use('/styles', express.static('styles'))

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/favicon.ico', function (req, res) {
  res.end()
})

app.get('/', function(req, res) {
  res.render('index', {till: till, coins: coins})
})

app.put('/addtill', function (req, res) {
  till = req.body;

  till.total = till.pennies * 0.01 +
                till.nickles * 0.05 +
                till.dimes * 0.10 +
                till.quarters * 0.25;

  till.total = till.total.toFixed(2);

  res.end()
})

app.delete('/emptytill', function (req, res) {
  till = {
    pennies: 0,
    nickles: 0,
    dimes: 0,
    quarters: 0,
    total: 0,
  };

  res.sendStatus(200)
})

app.put('/makechange', function (req, res) {
  var cents = parseInt(req.body.amount * 100.0, 10);
console.log(cents);
  generateCoinChange(cents);

  res.sendStatus(200)
})

var server = app.listen(3000, function () {
  console.log('Server running at http://localhost:' + server.address().port)
})
