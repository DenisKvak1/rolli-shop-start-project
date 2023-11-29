
const containerRoll=document.getElementById('container')
const containerCart=document.getElementById('cart-wrapper')

import {htmlRoll, htmlCart, checkArray,CheckIdCart,upDateSum, Delete, count} from './util.js'
export let cart=[]
checkArray(cart)
fetch('http://localhost:3000/sushi')
  .then(response => response.json())
  .then(data => {
    data.forEach(element => {
        containerRoll.insertAdjacentHTML('beforeend', htmlRoll(element));
    });
    let rollBtns= document.querySelectorAll('.rollBtn')
    rollBtns.forEach((btn,index) => {
        btn.addEventListener('click', (event) => {
            if(!CheckIdCart(cart,data[index].id)){
                let PrefixId=event.target.classList[event.target.classList.length-1]
                let id=+PrefixId.split("_")[1];
                const cartObj = data.find(obj => obj.id === id);
                let count=+event.target.closest('.rollWrap').querySelector('[data-counter]').textContent
                containerCart.insertAdjacentHTML('beforeend', htmlCart(cartObj,count));
                cart.push({
                    id: cartObj.id,
                    name: cartObj.name,
                    price: cartObj.price,
                    mass: cartObj.mass,
                    count: cartObj.count,
                    quantity: count,
                })
                checkArray(cart)
                Delete()
                upDateSum(cart)
            }
        });
    });
    count(cart)
    
  })
  .catch(error => console.error('Error:', error));
  
export let updateCart =(value)=>cart=value    
export let updateCartCount=(value, index)=>cart[index].quantity=value  


