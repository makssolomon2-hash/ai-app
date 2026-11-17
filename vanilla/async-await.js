import { stocks } from "./stocks.js";
let is_shop_open = true;

console.log('hi');


let toppings_choice = ()=>{
  return new Promise((resolve,reject) =>{

    
    setTimeout(() =>{
      resolve(
        console.log('which toping would you like?')
      )  
    },3000)
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
async function order_2 (){
  try{
    await kitchen()
  }
  catch(error){
    console.log('error',error)
  }
  finally{
    console.log('async finally: run code any way')
  }
};


setInterval(() =>{
  console.log('new order!')
  order_2()
  .then(()=>{
    console.log('order 1 is done')
  })
  .then(()=>{
    setTimeout(()=>{
      console.log('ready to take new order!')
    },2000)
  })
},6000)





async function kitchen() {
  
  console.log('A');
  console.log('B');
  console.log('C');

  await toppings_choice();

  console.log('D');
  console.log('E');
}


/* kitchen(); */
console.log('cleaning dishes');
console.log('cleaning tables');
console.log('taking orders');






