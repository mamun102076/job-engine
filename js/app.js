
const categoryLoad = async () => {
    url = `https://openapi.programming-hero.com/api/news/categories`
    res = await fetch(url)
    json = await res.json()
    displayCategory(json.data.news_category)
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
    url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    res = await fetch(url)
    json = await res.json()
    categoryShow(json.data)
}
const categoryShow = (categoryItem) => {
    console.log(categoryItem)

    noData = document.getElementById('no-data')
    if (categoryItem.length === 0) {
        noData.classList.remove('d-none')
    }else{
        noData.classList.add('d-none')
    }
    
    categoryItem.forEach((categoryItem) => {
        displayNewsItem = document.getElementById('display-news-item')
        cardDiv = document.createElement('div')
        cardDiv.classList.add('col')
        cardDiv.innerHTML = `
            <div class="card">
                <img src="${categoryItem.image_url}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">'${categoryItem.title ? categoryItem.title : 'no title found'}'</h5>
                    <p class="card-text">${categoryItem.details.slice(0,100)}</p>
                    <div class="d-flex justify-content-around align-items-center">
                        <div>
                            <img src="${categoryItem.author.img}" style="height: 40px;width:40px;border-radius: 50px">
                            <span>${categoryItem.author.name}<span>
                        </div>
                        <div>
                            <span><i class="fa-solid fa-eye"></i></span>
                            <span>${categoryItem.total_view}</span>
                        </div>
                    </div>
                </div>
            </div>
        `
        displayNewsItem.appendChild(cardDiv)
    })
}

categoryLoad()