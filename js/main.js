const searchField = document.getElementById('search-field');
const searchBtn = document.getElementById('search-btn');
const searchResult = document.getElementById('search-result');
const spinner = document.getElementById("spinner");
const totalSearch = document.getElementById('total-search');
const errorDiv = document.getElementById('error');
const notFound = document.getElementById('not-found');

// spinner 
const toggleSearch = displayStyle => {
    searchResult.style.display = displayStyle;
}
const toggleSpinner = displayStyle => {
    spinner.style.display = displayStyle;
}
toggleSpinner('none')

// search input 
const searchBook = () => {
    const searchText = searchField.value;
    if (searchText === "") {
        errorDiv.innerText = "Search field can not be empty.";
        searchResult.textContent = '';
        totalSearch.innerText = '';
        return;
      }
      else{

        // fetch data 
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data.docs))
        toggleSpinner('block')
        toggleSearch('none')
        searchField.value = '';
        totalSearch.innerText = '';
        errorDiv.innerText = '';
        notFound.innerText = '';
      }  
}

// display book list 
const displayBooks = bookList => {
    searchResult.textContent = '';
    errorDiv.innerText = '';

    const books = bookList.slice(0, 12);
    totalSearch.innerText = `Total Search Books Founds ${books.length}`;
    if(books.length === 0){
        notFound.innerText = 'Search Books Not Found';
    }
    books.forEach(book => {
        
        const div = document.createElement('div');
        div.classList.add('col');
        const imgUrl = ` https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
      
        div.innerHTML = `   
        
        <div class="card h-100  shadow-lg">
        <img src="${imgUrl}" class="card-img-top img-fluid" style = "height:400px; width=200px" alt="">
        <div class="card-body rounded-2 ">  
            <h3 class="card-title">${book.title ? book.title : 'Book Name Not Available'}</h3>
            <h6 class="card-title">Author: ${book.author_name ? book.author_name : 'Name Not Available'}</h6>
            <p class="card-text">Publisher: ${book.publisher ? book.publisher : 'Publisher Not Available'}</p>
            <p class="card-text">First Published: ${book.first_publish_year ? book.first_publish_year : 'Year Not Available'}</p>
    
        </div>
        </div>
     
        `;
        searchResult.appendChild(div);
        toggleSpinner('none');
        toggleSearch('flex');
    })
        toggleSpinner('none');
        toggleSearch('flex');
    
}