/* global Firebase: true */

'use strict';

$(document).ready(init);

var root, user, cash, folios;

function init(){
  root = new Firebase('https://personalio.firebaseio.com/');
  user = root.child('user');
  cash = root.child('cash');
  folios = root.child('folios');
  user.on('value', userChanged);
  cash.on('value', balanceChanged);


  $('#update-account').click(updateAccount);
  $('#get-quote').click(getQuote);
}

function balanceChanged(snapshot){
  var balance = snapshot.val();
  console.log(snapshot.val());
  $('#total-balance').text('Total Account Balance: ' + balance);
}

function userChanged(snapshot){
  var name = snapshot.val();
  console.log(snapshot.val());
  $('#owner').text('Account Owner: ' + name);
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

function getQuote(){
  var symbol = $('#symbol').val().toUpperCase();
  var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' +symbol+ '$callback=?';
  $.getJASON(url, function(response){
    $('#quote').text(JSON.stringify(response));
  });
}
