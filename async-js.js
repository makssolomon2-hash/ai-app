let stocks = {
  Fruits : ["strawberry", "grapes", "banana", "apple"],
  Liquid : ["water", "ice"],
  Holder : ["cone", "cup", "stick"],
  Toppings : ["chocolate", "peanuts"],
};



let order = (Fruit_name, call_production)=>{

  setTimeout(() => { // setTimeout is asynchrones function

    console.log(`(3)  --> ${stocks.Fruits[Fruit_name]} ${stocks.Fruits[Fruit_name] === 1 ? "were" : "was"} selected`);

    call_production();

  },2000);

  console.log("(2) Order placed, please call production");

  
};

console.log("(1)Start (executes frist)");

let production = () => {
  console.log("(4)   Order recived, starting production")

  setTimeout(() => { // setTimeout is asynchrones function
    console.log("(5)    Production has started")
    showInProcessMessge();
  }, 0);

  setTimeout(() => {
    console.log('(7)      The fruit has been chopped')
  },2000)

}
order(2, production); //select fruit(0,1,2,3)

let showInProcessMessge = () => {
  console.log('(6)     We are making your order, please wait! :)')
}
