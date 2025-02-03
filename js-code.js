const myLibrary = [];

function Book(title, author, pages, isRead) {
    // constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.image = image;
    
}

function addBookToLibrary(title, author, pages, isRead, image) {
    const newBook = new Book(title, author, pages, isRead, image)
    myLibrary.push(newBook);
    
}

