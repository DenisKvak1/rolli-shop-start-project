
const containerRoll=document.getElementById('container')
const containerCart=document.getElementById('cart-wrapper')

import {htmlRoll, htmlCart, checkArray,CheckIdCart,upDateSum} from './util.js'
let cart=[]
checkArray(cart)
fetch('http://213.227.241.132:3000/sushi')
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

document.getElementById('dostBtn').addEventListener('click',()=>{
    const inputValue = document.getElementById('inputDost').value;
    const regex = /^\+38\d{10}$|^\+38\(\d{3}\)\d{7}$|^\+38\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
    if (regex.test(inputValue)) {
        console.log('Отправка данных на сервер')
        document.getElementById('inputDost').classList.remove('invalid-input');
        location.reload()
    } else {
        document.getElementById('inputDost').classList.add('invalid-input');
    }
})

function Delete(){
    document.querySelectorAll('.delete').forEach(item => {
        item.addEventListener('click', () => {
            let PrefixId=item.classList[item.classList.length-1]
            let id=+PrefixId.split("_")[1];
            let cont = item.closest('.cart-item')
            cont.remove()
            cart = cart.filter(item => item.id !== id);
            checkArray(cart)
            
        });
    });
}
function count(){
    window.addEventListener('click', (event)=>{
        if(event.target.dataset.action==='plus' || event.target.dataset.action==='minus'){
            let item=event.target;
            let count=item.closest('.counter-wrapper').querySelector('[data-counter]')
            let id=item.closest('.idSet').dataset.id
            if(event.target.dataset.action==='plus'){
                count.textContent=+count.textContent+1
            }
            if(event.target.dataset.action==='minus'){
                if(+count.textContent>1){
                    count.textContent-=1
                }
            }
            if(cart.some(item => item.id == id)){
                let index=cart.findIndex(item => item.id == id);
                cart[index].quantity=+count.textContent;
            }
            upDateSum(cart)
        }
    })
}