let list = document.querySelector('.list')
let resultNumber = document.querySelector('.res-num')
let menuBar = document.querySelector('.hero1')
let newest = document.querySelector('.ordernews')
let modalinfo = document.querySelector('.offcanvas-body')
let modalhead = document.querySelector('#offcanvasRightLabel')
let searchInput = document.querySelector('.search-input')
let searchForm = document.querySelector('.search-form')
let bookmarkFound = document.querySelector('.box1-text')

let token = localStorage.getItem('token')

if(!token){
    location.href = 'http://127.0.0.1:5500/index.html'
}

function logOut(){
    localStorage.removeItem('token')
    location.href = 'http://127.0.0.1:5500/index.html'
}

let url = 'https://www.googleapis.com/books/v1/volumes?q=search+terms'

fetch(url, {
    method: "GET",
    headers: {
        'Content-type': 'application/json'
    }
})
.then( ( response ) => response.json() )
.then( ( data ) => {
    getData(data)
})

function getData(data){
    resultNumber.innerHTML = data.items.length

    let dates = []

for( let i of data.items ){
    let item = document.createElement('li')
    item.className = 'item'
    item.id = i.id
    item.innerHTML = `
        <img class="books-img" src="${i.volumeInfo.imageLinks.thumbnail}">
        <h4 class="books-head">${i.volumeInfo.title}</h4>
        <p class="books-author">${i.volumeInfo.publisher ? i.volumeInfo.publisher : ''}</p>
        <p class="books-author">${i.volumeInfo.publishedDate ? i.volumeInfo.publishedDate : ''}</p>
        <div>
            <button class="bookmark">Bookmarks</button>
            <button class="moreinfo" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">More Info</button><br>
        </div>
        <div><button class="read">Read</button></div>
    `
    

    item.addEventListener('click',(e)=>{
        if(item.id == e.target.parentElement.parentElement.id && e.target.className == 'bookmark'){
            let box = document.createElement('div')
            bookmarkFound.innerHTML = ''
            box.innerHTML = `
                <div class="box1-item">
                    <div>
                        <h2 class="box1-head">${i.volumeInfo.title}</h2>
                        <p class="box1-autor">${i.volumeInfo.authors}</p>
                    </div>
                    <img class="box1-svgs open" src="../imgs/book-open 1.svg">
                    <img class="box1-svgs del" src="../imgs/delete 1.svg">
                </div>
            `
            menuBar.append(box)

            let del = document.querySelector('.del')
            let open = document.querySelector('.open')

            del.addEventListener('click',(e)=>{
                e.target.parentElement.id = i.id
                if(i.id == e.target.parentElement.id){
                    e.target.parentElement.remove()
                }
            })
            open.addEventListener('click',()=>{
                location.href = i.volumeInfo.previewLink
            })
        }
        if(item.id == e.target.parentElement.parentElement.id && e.target.className == 'moreinfo'){
            modalhead.innerHTML = i.volumeInfo.title
            modalinfo.innerHTML = `
                <img class="center" src="${i.volumeInfo.imageLinks.thumbnail}">
                <p>${i.volumeInfo.description ? i.volumeInfo.description : 'None'}</p>
                <p>Author: <span class="value">${i.volumeInfo.authors ? i.volumeInfo.authors : 'None'}</span></p>
                <p>Published: <span class="value">${i.volumeInfo.publishedDate ? i.volumeInfo.publishedDate : 'None'}</span></p>
                <p>Publishers: <span class="value">${i.volumeInfo.publisher ? i.volumeInfo.publisher : 'None'}</span></p>
                <p>Categories: <span class="value">${i.volumeInfo.categories ? i.volumeInfo.categories : 'None'}</span></p>
                <p>Page Count: <span class="value">${i.volumeInfo.pageCount ? i.volumeInfo.pageCount : 'None'}</span></p>
                
            `
        }
        if(item.id == e.target.parentElement.parentElement.id && e.target.className == 'read'){
            location.replace(i.volumeInfo.previewLink)
        }
    })
    
    searchForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        if(i.volumeInfo.title == searchInput.value){
            list.innerHTML = ''
            list.innerHTML = `
                <img class="books-img" src="${i.volumeInfo.imageLinks.thumbnail}">
                <h4 class="books-head">${i.volumeInfo.title}</h4>
                <p class="books-author">${i.volumeInfo.publisher ? i.volumeInfo.publisher : ''}</p>
                <p class="books-author">${i.volumeInfo.publishedDate ? i.volumeInfo.publishedDate : ''}</p>
                <div>
                    <button class="bookmark">Bookmarks</button>
                    <button class="moreinfo" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">More Info</button><br>
                </div>
                <div><button class="read">Read</button></div>
                `
            }
        else {
            list.innerHTML = 'The book is not a found'
        }
    })
    let date = i.volumeInfo.publishedDate
    if(date){
        let nums = date.slice(0,4)
        dates.push(nums)
    }
    
    list.append(item)
}
let maxDates = dates.sort().reverse()
}
