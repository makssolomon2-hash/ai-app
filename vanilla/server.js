console.log('Follow the white rabbit');
console.log('You are the one');
console.log('You are the one!!!');
console.log('Neo');

console.log("Order ");
setTimeout(() =>{
  console.log("Cooking")
}, 5000)
setTimeout(() =>{
  console.log("New Order")
}, 6000)
console.log("Next Order")

for (let step = 0; step < 5; step++) {
  // Runs 5 times, with values of step 0 through 4.
  
    console.log("New Message")
}

for (let step = 0; step < 5; step++) {
  setTimeout(() => {
    console.log("New Order");
  }, 2000 * step);         // 0s, 6s, 12s, 18s, 24s
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function createOrders() {
  for (let step = 0; step < 5; step++) {
    console.log("New Order2");
    await sleep(6000);     // wait 6 seconds before the next one
  }
}

createOrders();


