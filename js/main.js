const searchField = document.getElementById('search-field');
const searchBtn = document.getElementById('search-btn');
const searchResult = document.getElementById('search-result');
const spinner = document.getElementById("spinner");
const totalSearch = document.getElementById('total-search');
const errorDiv = document.getElementById('error');

const toggleSearch = displayStyle => {
    searchResult.style.display = displayStyle;
}
const toggleSpinner = displayStyle => {
    spinner.style.display = displayStyle;
}
toggleSpinner('none')


const searchBook = () => {
    const searchText = searchField.value;
    if (searchText === "") {
        errorDiv.innerText = "Search field cannot be empty.";
        searchResult.textContent = '';
        totalSearch.innerText = '';
        return;
      }
      else{
        const url = `http://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data.docs))
        toggleSpinner('block')
        toggleSearch('none')
        searchField.value = '';
        totalSearch.innerText = '';
      }
  
   
    
}

const displayBooks = bookList => {
    searchResult.textContent = '';
    errorDiv.innerText = '';
    
    const books = bookList.slice(0, 15);
    totalSearch.innerHTML = `<h5>Total Search Founds ${books.length}</h5>`;
    books.forEach(book => {
        
        const div = document.createElement('div');
        div.classList.add('col');
        const imgUrl = ` https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      
        div.innerHTML = `
        <div class="">
        <div class="card-body">
            <img src="${imgUrl}" class="card-img-top img-fluid" style = "height:400px; width=200px" alt="">
            <h3 class="card-title">${book.title ? book.title : 'Not Available'}</h3>
            <h6 class="card-text">Author: ${book.author_name ? book.author_name : 'Not Available'}</h6>
            <p>First Published: ${book.first_publish_year ? book.first_publish_year : 'Not Available'}</p>
            <p>Publisher: ${book.publisher ? book.publisher : 'Not Available'}</p>
        </div>
        </div>
       
        `;
        searchResult.appendChild(div);
        toggleSpinner('none')
        toggleSearch('flex')
    })
    
        toggleSpinner('none')
        toggleSearch('flex')
    
}