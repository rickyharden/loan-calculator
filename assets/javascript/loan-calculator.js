$(function() {

  var $calculator = $('#calculator');
  var $amount = $('#amount');
  var $payments = $('#payments');
  var $interest = $('#interest');
  var $results = $('#results');

  $calculator.submit(function(e) {
    e.preventDefault(); // stop the form submitting

    var amount = parseInt($amount.val());
    var payments = parseInt($payments.val());
    var interest = parseInt($interest.val());
    var monthlyInterest = interest/12;

  });

});
