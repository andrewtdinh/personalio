/* global Firebase: true */

'use strict';

$(document).ready(init);

var root, user, cash, folios;

function init(){
  root = new Firebase('https://personalio.firebaseio.com/');
  user = root.child('user');
  cash = root.child('cash');
  folios = root.child('folios');

  // CLICK HANDLERS
  $('#update-account').click(updateAccount);
  cash.on('value', balanceChanged);

  $('#get-quote').click(getQuote);
}


function balanceChanged(snapshot){
  var name = snapshot.val();
  $('#header').text('Todo : ' + name);
}

function updateAccount(){
  var name = $('#user').val();
  var balance = $('#balance').val();
  // $('#user').val('');
  user.set(name);
  cash.set(balance);
}



function getQuote(){
  var symbol = $('#symbol').val().toUpperCase();
  var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' +symbol+ '$callback=?';
  $.getJASON(url, function(response){
    $('#quote').text(JSON.stringify(response));
  });
}
