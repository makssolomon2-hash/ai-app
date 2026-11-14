// npm run dev2  -to start

//PROMISES(better aprouch)
// check /promises.js 

import { stocks } from "./stocks.js";

let is_shop_open = true;


//what exacly the Promise resolve reject thing does??
let order = (time, work) =>{
  return new Promise( (resolve, reject) => {
    if (is_shop_open){

      setTimeout(()=>{
        resolve(work());
      }, time)
    } else{
        reject( console.log('We are closed :('))
      }
  })
}


/* console.log('Hello from promisses.js and npm run dev2!');
console.log(stocks.fruits[3]); */

order(2000, ()=> console.log(`${stocks.fruits[0]} was selected`))

.then(()=>{ //key point. no call back hell

  return order(2000, ()=> console.log("Production has started"))
})


.then(()=>{

  return  order(3000, ()=> console.log("Mashines are spining and mixing all over the place"))
})



// not gonna work without the call back hell
let order_2 = (time, work)=>{
   if (is_shop_open){
  setTimeout(() => {
    work();
  },time)
  } else{
      console.log('We are closed :(')
  } 
}


//not in the Promise scope so goes on 3 second after the start,not after the Promise cycle ends.
order_2(3000, ()=> console.log(`${stocks.fruits[2]} was selected`))

