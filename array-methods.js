var dataset = require('./dataset.json');

/*
  create an array with accounts from bankBalances that are
  greater than 100000.00
  assign the resulting array to `hundredThousandairs`
*/

// function isGreater(element){
//   return element.amount > 10000;
// };

function step1(element){
  return element.amount > 100000.00;
}

var hundredThousandairs = dataset.bankBalances.filter(step1);

/*
  set a new key for each object in bankBalances named `rounded`
  the value of this key will be the `amount` rounded to the nearest dollar
  example
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting array to `roundedDollar`
*/

function step2(element){
  return {amount : element.amount,
          state: element.state,
          rounded : Math.round(element.amount)};
}

var roundedDollar = dataset.bankBalances.map(step2);

/*
  set a the `amount` value for each object in bankBalances
  to the value of `amount` rounded to the nearest 10 cents
  example
    {
      "amount": 134758.4,
      "state": "HI"
    }
  assign the resulting array to `roundedDime`
*/


function step3(element){

  return {
    amount : Math.round(element.amount * 10)/ 10,
    state : element.state
  };

}

var roundedDime = dataset.bankBalances.map(step3);

// set sumOfBankBalances to the sum of all amounts in bankBalances

function step4(previous, current){
  var result = parseFloat(previous) + parseFloat(current.amount);
  return Math.round(result * 100) / 100;
}

var sumOfBankBalances = dataset.bankBalances.reduce(step4,0);


/*
  set sumOfInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
 for only the states below
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */

function filterStep5(element){
  switch(element.state){
    case 'WI':
      return Math.round((parseFloat(element.amount) * (18.9/100)) * 100) / 100;
      break;
    case 'IL' :
      return Math.round((parseFloat(element.amount) * (18.9/100)) * 100) / 100;
      break;
    case 'WY':
      return Math.round((parseFloat(element.amount) * (18.9/100)) * 100) / 100;
      break;
    case 'OH':
      return Math.round((parseFloat(element.amount) * (18.9/100)) * 100) / 100;
      break;
    case 'GA':
      return Math.round((parseFloat(element.amount) * (18.9/100)) * 100) / 100;
      break;
    case 'DE':
      return Math.round((parseFloat(element.amount) * (18.9/100)) * 100) / 100;
      break;
    default:
      return false;
  }
}

function filterOutFalse(element){
  return !!element;
}

function reduceStep5(previous, current){
   return Math.round((previous + current) * 100) / 100;
}

var sumOfInterests = dataset.bankBalances.map(filterStep5)
                                          .filter(filterOutFalse)
                                          .reduce(reduceStep5,0);


/*
  set sumOfHighInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  where the amount of the sum of interests in that state is
    greater than 50,000
  NOT IN BELOW STATES
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */

//Filter out the states first

function filterStep5(element){
  switch(element.state){
    case 'WI':
      return false;
      break;
    case 'IL' :
      return false;
      break;
    case 'WY':
      return false;
      break;
    case 'OH':
      return false;
      break;
    case 'GA':
      return false;
      break;
    case 'DE':
      return false;
      break;
    default:
      return Math.round((parseFloat(element.amount) * (18.9/100)) * 100) / 100;
  }
}






// give all amounts interests

//add up the amounts of the states
if(prev[prev.next]){
  prev[next.state] += parseFloat(next.amount);
} else{
    prev[next.state] = parseFloat(next.amount);
  }
  return prev; },

}, {})
//



var sumOfHighInterests = null;

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table
    where the key is the two letter state abbreviation
    and the value is the sum of all amounts from that state
      the value must be rounded to the nearest cent
 */




var stateSums = null;

/*
  set lowerSumStates to an array containing
  only the two letter state abbreviation of each state
  where the sum of amounts in the state is
    less than 1,000,000
 */
var lowerSumStates = null;

/*
  set higherStateSums to be the sum of
    all amounts of every state
    where the sum of amounts in the state is
      greater than 1,000,000
 */
var higherStateSums = null;

/*
  set areStatesInHigherStateSum to be true if
    all of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var areStatesInHigherStateSum = null;

/*
  set anyStatesInHigherStateSum to be true if
    any of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var anyStatesInHigherStateSum = null;


module.exports = {
  hundredThousandairs : hundredThousandairs,
  roundedDollar : roundedDollar,
  roundedDime : roundedDime,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};