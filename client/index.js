/* global Firebase: true */

'use strict';

$(document).ready(init);

function init(){
  $('#update-account').click(updateAccount);
  $('#get-quote').click(getQuote);
}

function updateAccount(){
  
}

function getQuote(){
  var symbol = $('#symbol').val().toUpperCase();
  var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' +symbol+ '$callback=?';
  $.getJASON(url, function(response){
    $('#quote').text(JSON.stringify(response));
  });
}
