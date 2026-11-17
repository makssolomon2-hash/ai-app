/* import { link } from './promises.js'; */
import { stocks } from "./stocks.js";

//CALLBACKS | CALLBACK HELL

// #1 place order
let order = (fruit_name, call_production)=>{

  setTimeout(() => { // setTimeout is an asynchronous function
    console.log(`(3)--> ${stocks.fruits[fruit_name]} ${stocks.fruits[fruit_name] === "Grapes" ? "were" : "was"} selected`);

    call_production();
  },2000);

  console.log("(2) Order placed, please call production");
};

console.log("(1) Start (executes first)");

let production = () => {
  console.log("(4) Order received, starting production")
  setTimeout(() => { // setTimeout is an asynchronous function
    console.log("(5) Production has started")
    showMessage(0);
  }, 0);

// #2 Cut the fruit 
  setTimeout(() => {
    console.log('(7) The fruit has been chopped');

// #3 Add water and ice
    setTimeout(() => {
        console.log(`(8) ${stocks.liquid[0]} and ${stocks.liquid[1]} have been added`);

        setTimeout(() => {
          console.log('(9) The machine has been started');

          setTimeout(() => {
            console.log(`(10) The ice cream has been placed on ${stocks.holder[0]}`);
              setTimeout(()=>{
                console.log(`(11) ${stocks.toppings[1]} has been added as topping`);
                setTimeout(()=>{
                    console.log('(12) Serve Ice Cream!')
                    showMessage(1);
                    showMessage(2);
                },1000)
              },3000)
          },2000)
        },1000)
    }, 1000)
  },2000)
};
order(1, production); //select fruit(0,1,2,3)

const messages = [
  '(6) We are making your order, please wait! :)','Enjoy! :)','Finish',
];

const showMessage = (mesage) => {
  console.log(messages[mesage]);
  //console.log('(6) We are making your order, please wait! :)')
};



//PROMISES(better aprouch)
// check /promises.js click 'link' below




