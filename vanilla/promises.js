// npm run dev2  -to start

//PROMISES(better aprouch)
// check /promises.js 

import { compile } from "tailwindcss";
import { stocks } from "./stocks.js";
let is_shop_open = false;

/* console.log('Hello from promisses.js and npm run dev2!');
console.log(stocks.fruits[3]); */

//what exacly the Promise resolve reject thing does??
let order = (time, work) =>{
  return new Promise( (resolve, reject) => {
    if (is_shop_open){
      setTimeout(()=>{
        resolve(work());
      }, time)
    } else{
        reject( console.log('We are closed :('));
      }
  })
}
//Call the Function :
order(2000, ()=> console.log(`${stocks.fruits[0]} was selected`))
.then(()=>{ //key point. no call back hell
  return order(2000, ()=> console.log("Production has started"))
})
.then(()=>{
  return  order(3000, ()=> console.log("Mashines are spining and mixing all over the place"))
})
.then(()=>{
  return order(1000, ()=>{
    console.log(`${stocks.liquid[0]} and ${stocks.liquid[1]} was added`)
  })
})
.then(()=>{
  return order(1000, ()=> {
    let holder_check = stocks.holder[2];
    holder_check === stocks.holder[1] ? 
      console.log(`ise cream is being placed in ${stocks.holder[1]}`) : console.log(`ise cream is being placed on ${holder_check}`);
  })
})
.then(() =>{
  return order(1000, ()=>console.log("Serve Ice Cream"))
})
.catch(() =>{
  setTimeout(()=>{
    console.log('Custemer goes to home sad. (catch)') // works if the condition is not true 
  },2000)
})

.finally(()=>{ //starts after .catch basicaly
  setTimeout(() => {
    console.log('FINISH - !!!')
  },3000)
})



// not gonna work without the call back hell
/* let order_2 = (time, work)=>{
   if (is_shop_open){
  setTimeout(() => {
    work();
  },time)
  } else{
      console.log('We are closed :(')
  } 
} */

//not in the Promise scope so goes on 3 second after the start,not after the Promise cycle ends.
/* order_2(0, ()=> console.log(`STARTS ON START ${stocks.fruits[2]} was selected`))
 */
