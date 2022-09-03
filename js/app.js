const categoryLoad = async () => {
    url = `https://openapi.programming-hero.com/api/news/categories`
    try {
        res = await fetch(url)
        json = await res.json()
        displayCategory(json.data.news_category)
    } catch (error) {
        console.log(error)
    }
}
const displayCategory = (categories) => {
    categories.forEach((categories) => {
        categoryDisplay = document.getElementById('category-display')
        li = document.createElement('li')
        li.classList.add('nav-item')
        li.innerHTML = `
            <button class="nav-link" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true" onclick="singleNewsItem('${categories.category_id}')">${categories.category_name}</button>
        `
        categoryDisplay.appendChild(li)
    })
}

const singleNewsItem = async (category_id) => {
    spinnerLoad(true)
    url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    res = await fetch(url)
    json = await res.json()
    categoryShow(json.data)
}
const categoryShow = (categoryItem) => {   
    displayNewsItem = document.getElementById('display-news-item')
    displayNewsItem.innerText = ''
    noData = document.getElementById('no-data')
    if (categoryItem.length === 0) {
        noData.classList.remove('d-none')
    }else{
        noData.classList.add('d-none') 
    }
    totalCategotyItem(categoryItem)
    categoryItem.sort(function (a,b) {
        if (a.total_view < b.total_view) {
            return 1
        } else if (a.total_view > b.total_view) {
            return -1
        }else {
            return 0
        }
    })
    categoryItem.forEach((categoryItem) => {  
        cardDiv = document.createElement('div')
        cardDiv.classList.add('col')
        cardDiv.innerHTML = `
            <div class="card">
                <img src="${categoryItem.image_url ? categoryItem.image_url : 'no image found'}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">'${categoryItem.title ? categoryItem.title : 'no title found'}'</h5>
                    <p class="card-text">${categoryItem.details ? categoryItem.details.slice(0,100) : 'no details found'}</p>
                    <div class="d-flex justify-content-around align-items-center">
                        <div>
                            <img src="${categoryItem.author ? categoryItem.author.img : 'author image not found'}" style="height: 40px;width:40px;border-radius: 50px">
                            <span>${categoryItem.author.name ? categoryItem.author.name : 'author name not found'}<span>
                        </div>
                        <div>
                            <span><i class="fa-solid fa-eye"></i></span>
                            <span>${categoryItem.total_view ? categoryItem.total_view : 'total view not found'}</span>
                        </div>
                    </div>
                    <button onclick="showDetails('${categoryItem._id}')" class="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Show details</button>
                </div>
            </div>
        `
        displayNewsItem.appendChild(cardDiv)
    })
    spinnerLoad(false)
    
}
const totalCategotyItem = (categoryItem) => {
    itemsFound = document.getElementById('items-found')
    itemsFound.innerHTML = `
        <h3>${categoryItem.length} items found</h3>
    `
}
const showDetails = async (news_id) => {
    url = `https://openapi.programming-hero.com/api/news/${news_id}`
    try {
        res = await fetch(url)
        json = await res.json()
        displayDetails(json.data[0])
    } catch (error) {
        console.log(error)
    }
}
const displayDetails = (modal) => {
    newsModal = document.getElementById('newsModal')
    newsModal.innerText = modal.title
    modalBody = document.getElementById('modalBody')
    modalBody.innerHTML = `
        <p>${modal.details ? modal.details.slice(0,100) : 'no details found'}</p>
        <p>Author name : ${modal.author.name ? modal.author.name : 'no name found'}</p>
        <p>Pblished Date : ${modal.author.published_date ? modal.author.published_date : 'no date found'}</p>
        <p>Total View : ${modal.total_view ? modal.total_view : 'no views found'}</p>
    `
}

const spinnerLoad = (isLoading) => {
    spinnerItem = document.getElementById('spinner-item')
    if (isLoading) {
        spinnerItem.classList.remove('d-none')
    } else {
        spinnerItem.classList.add('d-none')
    }
}

singleNewsItem('04')
categoryLoad()




