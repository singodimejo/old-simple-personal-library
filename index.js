let myLibrary = [];

function Book(title, author, page, readStat) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.readStat = readStat;
};

const wrapper = document.querySelectorAll('.container');
const form = wrapper[0].querySelector('.form');
const submitBtn = form.querySelector('input[type="submit"]'); 
const tableBody = wrapper[1].querySelector('tbody');
const storage = window.sessionStorage;

//function to create new book and push to library
let addToLibrary = (e) => {
    e.preventDefault();
    
    let formData = new FormData(form);
    let t = formData.get('title');
    let a = formData.get('author');
    let p = parseInt(formData.get('page'));
    let r = formData.get('read');

    let book = new Book(t, a, p, r);
    myLibrary.push(book);
    storageUpdate();
    render();
    form.reset();
};

document.addEventListener('DOMContentLoaded', function() {
    submitBtn.addEventListener('click', addToLibrary);
});

//function to update the storage
let storageUpdate = () => {
    storage.setItem('data', JSON.stringify(myLibrary));
};

//funtion to find the index of the book that needs an update
let bookIndex = (arr, name) => {
    for (book of arr) {
        if (book.title === name) {
            return arr.indexOf(book)
        };
    };
};

//funtion for readStat and delete
let readStatUpdate = (bookIndex) => {
    let states = ['Not Yet Started', 'Started', 'Finished'];
    myLibrary[bookIndex].readStat === states[0] ? myLibrary[bookIndex].readStat = states[1] 
    : myLibrary[bookIndex].readStat === states[1] ? myLibrary[bookIndex].readStat = states[2]
    : myLibrary[bookIndex].readStat = states[0];
    storageUpdate();
    render();
};

let deleteBook = (bookIndex) => {
    myLibrary.splice(bookIndex, bookIndex + 1);
    storageUpdate();
    render();
};

//check storage
let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'Started');
let checkStorage = () => {
    if (storage.getItem("data")) {
        myLibrary = JSON.parse(storage.getItem("data"));
      } else {
        myLibrary.push(theHobbit);
      };
};

//render data to tableBody
let render = () => {
    checkStorage();
    tableBody.innerHTML = '';
    myLibrary.forEach((book) => {
        const bookId = bookIndex(myLibrary, book.title);
        const bookHtml = `
        <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.page}</td>
            <td onclick="readStatUpdate(${bookId})" class='read'>${book.readStat}</td>
            <td><button onclick="deleteBook(${bookId})" class='btn-del uk-button uk-button-default uk-button-small'>delete</button></td>
        </tr>
        `;
        tableBody.insertAdjacentHTML('afterbegin', bookHtml);
    });
};

render();