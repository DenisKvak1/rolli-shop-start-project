import {cart, updateCart,updateCartCount} from './app.js'
export function htmlRoll(data){
                return `
                    <div class="col-md-6" data-id="${data.id}" >
						<div class="card mb-4 idSet">
							<img class="product-img" src="${data.image}" alt="">
							<div class="rollWrap card-body text-center">
								<h4 class="item-title">${data.name}</h4>
								<p><small data-items-in-box class="text-muted">${data.count} шт.</small></p>
								<div class="details-wrapper">
									<div class="items counter-wrapper">
										<div class="items__control" data-action="minus">-</div>
										<div class="items__current" data-counter>1</div>
										<div class="items__control" data-action="plus">+</div>
									</div>
									<div class="price">
										<div class="price__weight">${data.mass}г.</div>
										<div class="price__currency">${data.price} ₴</div>
									</div>
								</div>
								<button data-cart type="button" class="btn btn-block btn-outline-warning rollBtn rollBtn_${data.id}">+ в корзину</button>
							</div>
						</div>
					</div>
`}
export function htmlCart(data,counter){
    return `
        <div class="cart-item idSet" data-id="${data.id}">
        <div class="cart-item__top">
            <div class="cart-item__img">
                <img src="${data.image}" alt="">
            </div>
            <div class="cart-item__desc">
                <div class="cart-item__title">${data.name}</div>
                <div class="cart-item__weight">${data.count} шт. / ${data.mass}г.</div>

                <div class="cart-item__details">

                    <div class="items items--small counter-wrapper">
                        <div class="items__control" data-action="minus">-</div>
                        <div class="items__current" data-counter="">${counter}</div>
                        <div class="items__control" data-action="plus">+</div>
                    </div>

                    <div class="price">
                        <div class="price__currency">${data.price} ₴</div>
                    </div>
                    <div>
                        <button class="noneS delete deleteCart_${data.id}">
                            <i class="fa-regular fa-trash-can" style="color: #a3a3a3;"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
`}



    
export function checkArray(arr){
    if(arr.length > 0){
        document.querySelector('[data-cart-empty]').classList.add('d-none')
    }
    else{
        document.querySelector('[data-cart-empty]').classList.remove('d-none')
    }
}
export function CheckIdCart(array, targetId) {
    let found = false;
    array.forEach(item => {
      if (item.id === targetId) {
        found = true;
      }
    });
    return found;
}
export function upDateSum(cart){
    let totalPriceArray = cart.map(cartObj => cartObj.price * cartObj.quantity);
    let totalSum = totalPriceArray.reduce((acc, curr) => acc + curr, 0);
    document.querySelector('.total-price').textContent=totalSum
}
export function Delete(){
    document.querySelectorAll('.delete').forEach(item => {
        item.addEventListener('click', () => {
            let PrefixId=item.classList[item.classList.length-1]
            let id=+PrefixId.split("_")[1];
            let cont = item.closest('.cart-item')
            cont.remove()
            updateCart(cart.filter(item => item.id !== id))
            checkArray(cart)
            upDateSum(cart)
        });
    });
}

export function count(){
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
                updateCartCount(+count.textContent, index)
            }
            upDateSum(cart)
        }
    })
}