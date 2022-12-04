let form = document.querySelector('.form')
let login = document.querySelector('.login')
let password = document.querySelector('.password')
let elError = document.querySelector('.error')

let url = 'https://reqres.in/api/login'

form.addEventListener('submit', (evnt)=>{
    evnt.preventDefault()
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            "email": login.value,
            "password": password.value
        })
    })
    .then((response)=>response.json())
    .then((data)=>{
        if(data.token){
            login.style.border = '3px solid green'
            password.style.border = '3px solid green'
            localStorage.setItem('token', data.token)
            window.location.href = 'http://127.0.0.1:5500/html/main.html'
        }
        else {
            login.style.border = '3px solid red'
            password.style.border = '3px solid red'
            elError.innerHTML = data.error
            elError.style.color = 'red'
        }
    })
})