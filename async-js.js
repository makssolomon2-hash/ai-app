let stocks = {
  Fruits : ["strawberry", "grapes", "banana", "apple"],
  Liquid : ["water", "ice"],
  Holder : ["cone", "cup", "stick"],
  Toppings : ["chocolate", "peanuts"],
};






let order = (call_production)=>{
  console.log("order placed, please call production 2");
  call_production();
}

console.log("order placed, please call production 1");

let production = () => {
  console.log("order recived, starting production 3")
}
order(production);
