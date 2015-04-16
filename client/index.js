/* global Firebase: true */

'use strict';

$(document).ready(init);

var root, user, cash, folios;

function init(){
  root = new Firebase('https://personalio.firebaseio.com/');
  user = root.child('user');
  cash = root.child('cash');
  folios = root.child('folios');
<<<<<<< HEAD

  // CLICK HANDLERS
=======
  user.on('value', userChanged);
  cash.on('value', balanceChanged);


>>>>>>> 3ade6c3fcbd730861e4bbbc24271560fc94cac99
  $('#update-account').click(updateAccount);
  cash.on('value', balanceChanged);

  $('#get-quote').click(getQuote);
}

<<<<<<< HEAD

function balanceChanged(snapshot){
  var name = snapshot.val();
  $('#header').text('Todo : ' + name);
=======
function balanceChanged(snapshot){
  var balance = snapshot.val();
  console.log(snapshot.val());
  $('#total-balance').text('Total Account Balance: ' + balance);
}

function userChanged(snapshot){
  var name = snapshot.val();
  console.log(snapshot.val());
  $('#owner').text('Account Owner: ' + name);
>>>>>>> 3ade6c3fcbd730861e4bbbc24271560fc94cac99
}

function updateAccount(){
  var name = $('#user').val();
  var balance = $('#balance').val();
<<<<<<< HEAD
  // $('#user').val('');
  user.set(name);
  cash.set(balance);
=======
  user.set(name);
  cash.set(balance);
  $('#name-div').remove();
  $('#balance-div').remove();
  $('#update-account').remove();
>>>>>>> 3ade6c3fcbd730861e4bbbc24271560fc94cac99
}



function getQuote(){
  var symbol = $('#symbol').val().toUpperCase();
  var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' +symbol+ '$callback=?';
  $.getJASON(url, function(response){
    $('#quote').text(JSON.stringify(response));
  });
}
