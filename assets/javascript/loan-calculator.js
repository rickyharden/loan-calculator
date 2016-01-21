$(function() {

  var $calculator = $('#calculator');
  var $amount = $('#amount');
  var $monthlyPayment = $('#monthlyPayment');
  var $interest = $('#interest');
  var $results = $('#results');

  $calculator.submit(function(e) {
    e.preventDefault(); // stop the form submitting

    var interest = parseInt($interest.val());
    var amount = parseInt($amount.val());
    var monthlyPayment = parseInt($monthlyPayment.val());

    var result = calculate(interest, amount, monthlyPayment);

    $('.price', $results).text(result.price);
    $('.interest', $results).text(result.interest);
    $('.time', $results).text(result.time);

    $results.removeClass('hidden');
  });

});

function calculate(interest, amount, monthlyPayment) {
  // found & modified from here http://www.sitepoint.com/javascript-interest-loan-calculator-algorithm/

  // FORMULA FOR CALUCLATING INTEREST RATE
  // p = x*(1 - (1+r)^-n)/r
  var rate = interest / 100
  var monthsInYear = 12;

  // when testing this I've noticed that a loan amount over 60000 with a low monthly payment (200)
  // causes this value to be -Infinity or -, meaning the calculation does not work :(
  var nper1 = Math.log((1-((amount/monthlyPayment) * (rate/monthsInYear))));

  var nper2 = Math.log((1+(rate/monthsInYear)));

  var numberOfMonths = -(nper1 / nper2);
  var interestpaid = monthlyPayment * numberOfMonths - amount;
  numberOfMonths = -Math.round((nper1 / nper2));

  var numberOfYears = Math.floor(numberOfMonths / 12);
  var monthsRemaining = numberOfMonths % 12;

  if (numberOfMonths > 0) {
    if (monthsRemaining == 0) {
      period = numberOfYears + " Year(s)";
    } else {
      period = numberOfYears + " Year(s) and " + monthsRemaining + " Month(s)";
    }
  } else {
    period = "Invalid Values";
    interestpaid = 0;
  }

  debugger;

  var priceData = {
    price: '£' + (interestpaid + amount).toFixed(2),
    interest: '£' + interestpaid.toFixed(2),
    time: period
  };

  return priceData;
}
