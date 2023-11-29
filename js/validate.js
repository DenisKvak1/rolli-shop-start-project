import {cart} from './app.js'

document.getElementById('dostBtn').addEventListener('click',()=>{
    const inputValue = document.getElementById('inputDost').value;
    const regex = /^\+38\d{10}$|^\+38\(\d{3}\)\d{7}$|^\+38\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
    if(cart.length > 0){
        if (regex.test(inputValue)) {
            console.log('Отправка данных на сервер')
            document.getElementById('inputDost').classList.remove('invalid-input');
            $('#dostavka').modal('show'); 
        } else {
            document.getElementById('inputDost').classList.add('invalid-input');
        }
    }
})
$('#dostavka').on('hidden.bs.modal', function (e) {
    location.reload()
});