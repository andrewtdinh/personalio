/* global Firebase: true */

'use strict';

$(document).ready(init);

var root, user, cash, folios, position;

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

  $('#create-folio').click(addFolio);
  folios.on('child_added', newPortfolio);

  $('#buyStocks').click(getQuote);
  // $('#get-quote').click(getQuote);
}

// NEED TO CREATE FUNCTION TO GET STOCK NUMBER AND VALUE
// 1. get all folios
// 2. for in loop through them
// 3. at eat folio, get the stocks
// 4.
function updateDisplay(){

}

function addStock() {
  var key = $('#portfolio-list').val();
  var folio = folios.child(key);

  var stock = {
    name: $('#stockID').val(),
    numberOfStocks: $('#shareNum').val(),
    position: position
  };

  console.log(stock);
  folio.push(stock);
  $('#stockID').val('');
  $('#shareNum').val('');
}




function newPortfolio(snapshot){
  var portfolioName = snapshot.val();
  var key = snapshot.key();
  $('#portfolio-list').append('<option value='+key+'>'+portfolioName.name+'</option>');
  $('#portfolioType').val('');
}

function addFolio(){
  var folioName = $('#portfolioType').val();
  var thisFolio = {
    name: folioName,
    balance: 0
  };
  folios.push(thisFolio);
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
  var symbol = $('#stockID').val().toUpperCase();
  // var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' +symbol+ '$callback=?';
  var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' +symbol+ '&callback=?';
  console.log(url);
  var thisPosition;
  $.getJSON(url,
    function(response){
      thisPosition = response.LastPrice * 1;
      setGlobalVariable(thisPosition);
      console.log('tests');
    }
  );
  // $.getJASON(url, function(response){
  //   $('#quote').text(JSON.stringify(response));
  // });
}

function setGlobalVariable(pos) {
  console.log(pos);
  position = pos;
  addStock();
}
