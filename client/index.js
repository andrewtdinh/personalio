/* global Firebase: true */

'use strict';

$(document).ready(init);

var root, user, cash, folios;

function init(){
  root = new Firebase('https://your-personalio.firebaseio.com/');
  // These root.children are ONLY pointers to their respective locations in Firebase
  user = root.child('user');
  cash = root.child('cash');
  folios = root.child('folios');

  // EVENT HANDLERS FOR FIREBASE
  // the user.on event is called whenever user is changed, e.g from updateAccount which is only called once at the start
  user.on('value', userChanged);
  $('#update-account').click(updateAccount);
  // whenever balance is changed locally the cash.on event changes Firebase. Same for folios.on
  cash.on('value', balanceChanged);
  folios.on('child_added', newPortfolio);

  // LOCAL EVENT HANDLERS
  $('#create-folio').click(addFolio);
  $('#get-quote').click(getQuote);
  $('#buyStocks').click(addStock);
}

// NEED TO CREATE FUNCTION TO GET STOCK NUMBER AND VALUE


function addStock() {
  var key = $('#portfolio-list').val();
  var folio = folios.child(key);

  var stock = {
    stockSymbol: $('#stockID').val(),
    numberOfStocks: $('#shareNum').val()
  };
  folio.push(stock);
}

function newPortfolio(snapshot){
  var portfolioName = snapshot.val();
  $('#portfolio-list').append('<option value='+snapshot.key()+'>'+portfolioName+'</option>');
  $('#portfolioType').val('');
  // console.log(snapshot.key());
}

function addFolio(){
  var folioName = $('#portfolioType').val();
  folios.push(folioName);
}

function balanceChanged(snapshot){
  var balance = snapshot.val();
  cash.set(balance);
  $('#total-balance').text('Total Account Balance: ' + balance);
}

function updateAccount(){
  var name = $('#user').val();
  var balance = $('#balance').val();
  user.set(name);
  cash.set(balance);

  $('#name-div').remove();
  $('#balance-div').remove();
  $('#update-account').remove();
}

function userChanged(snapshot){
  var name = snapshot.val();
  $('#owner').text('Account Owner: ' + name);
}




function getQuote(){
  var symbol = $('#symbol').val().toUpperCase();
  var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' +symbol+ '$callback=?';
  $.getJASON(url, function(response){
    $('#quote').text(JSON.stringify(response));
  });
}
