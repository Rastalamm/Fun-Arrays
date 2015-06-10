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
    case 'IL' :
    case 'WY':
    case 'OH':
    case 'GA':
    case 'DE':
      return Math.round((parseFloat(element.amount) * (18.9/100)) * 100) / 100;
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


var stateSums = dataset.bankBalances

.reduce(function(previous, current) {

  //If state key does not exist, create it & set the first amount to 0
  if( !previous.hasOwnProperty(current.state) ){
    previous[current.state] = 0;
  }

  //
  previous[ current.state ] += parseFloat(current.amount);
  //round down to cents
  previous[ current.state ] = Math.round( previous[ current.state ] *100) /100;

  return previous;

},{});


var sumOfHighInterests = Object.keys(stateSums)

  .filter(function (state) {
    return ['WI','IL','WY','OH','GA','DE'].indexOf( state ) === -1;
  })
  //convert amounts to only the interest
  .map(function (stateKey) {
    return {
      state : stateKey,
      interest : Math.round( stateSums[stateKey] * 0.189 *100) /100
    };
  })
  //Return array of objects
  //only use interest amounts greate than 50,000
  .filter(function (account){
    return account.interest > 50000;
  })

  //add all the state interests, return rounded to cent
  .reduce(function (previous, current) {
    return Math.round((previous + current.interest) * 100 ) / 100;
  },0);

//console.log(sumOfHighInterests);

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table
    where the key is the two letter state abbreviation
    and the value is the sum of all amounts from that state
      the value must be rounded to the nearest cent

 */


var stateSums = dataset.bankBalances

.reduce(function(previous, current) {

  //If state key does not exist, create it & set the first amount to 0
  if( !previous.hasOwnProperty(current.state) ){
    previous[current.state] = 0;
  }

  //
  previous[ current.state ] += parseFloat(current.amount);
  //round down to cents
  previous[ current.state ] = Math.round( previous[ current.state ] *100) /100;

  return previous;

},{});


/*
  set lowerSumStates to an array containing
  only the two letter state abbreviation of each state
  where the sum of amounts in the state is
    less than 1,000,000
 */
var lowerSumStates = Object.keys(stateSums)

.filter( function (state){
  return stateSums[state] < 1000000;
});

/*
  set higherStateSums to be the sum of
    all amounts of every state
    where the sum of amounts in the state is
      greater than 1,000,000
 */
var higherStateSums = Object.keys(stateSums)

.filter( function (state){
  return stateSums[state] > 1000000;
});

console.log(higherStateSums);




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