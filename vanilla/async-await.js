import { readFileSync, writeFileSync } from 'node:fs';
import { stocks } from "./stocks.js";


let is_shop_open = true;

const orderFile = new URL('./next-order-number.txt', import.meta.url);

function loadOrderNumber(){

  let contents;

  try{
    contents =readFileSync(orderFile, 'utf8').trim();
  } catch(error) {
    if (error.code === 'ENOENT') {
      return 1;
    }

    throw error;
  }

  const number = Number(contents);
  if (!/^[1-9]\d*$/.test(contents) || !Number.isSafeInteger(number)) {
    throw new Error('The saved order number is invalid.');
  }

  return number;
}

let order_number = loadOrderNumber();


console.log('hi');


let toppings_choice = ()=>{
  return new Promise((resolve,reject) =>{

    
    setTimeout(() =>{
      resolve(
        console.log('which toping would you like?')
      )  
    },5000)
  })
};

//Promise resolve reject .then .catch .finally structure
/*
 let order = ()=>{
    return new Promise((resolve, reject)=>{ 
      if(true){
        resolve()
      }else{
        reject()
      }
    })
}

order()
.then()
.then()
.then()
.catch()
.finally()

 */


//async await try catch finally structure
async function example (){
  try{
    await functionName()
  }
  catch(error){
    console.log('error',error)
  }
  finally{
    console.log('async finally: run code any way')
  }
};

async function  takeOrders() {
  while (true){
    await new Promise(resolve => setTimeout(resolve, 3000))

    const currentOrder =order_number;
    const nextOrder = currentOrder +1;

    if (!Number.isSafeInteger(nextOrder)) {
    throw new Error('Order number is too large.');
  }
  writeFileSync(orderFile, String(nextOrder), 'utf8');
    order_number = nextOrder;


    console.log(`New order! Order number:${currentOrder}`)

    try{
      await kitchen();
      console.log(`Order ${currentOrder} is done`);
      console.log('Thank you, enjoy and have a nice day!');
    } catch (error) {
      console.error(`Order ${currentOrder} failed:`, error);
      console.log('Please talk to our manager!');
    } finally {
      console.log('Ready to take a new order!');
    }
  }
}

takeOrders().catch(error => console.error('Order loop failed:', error));

async function kitchen() {
  console.log('A');
  console.log('B');
  console.log(' cook have to go ask customer wich toping he wants');

  await toppings_choice();

  console.log('cook back on kitchen');
  console.log('E');
}








