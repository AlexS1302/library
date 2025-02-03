
const myLibrary = [];

// Book constructor

function Book(title, author, pages, isRead, image) {
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

// Placeholder Books displayed when the page has loaded

addBookToLibrary(
    "Pride and Prejudice",
    "Jane Austen",
    334,
    false,
    "./photos/pride-and-prejudice.jpg");

addBookToLibrary(
    "To Kill a Mockingbird",
    "Harper Lee",
    323,
    false,
    "./photos/to-kill-a-mockingbird.jpg");

addBookToLibrary(
    "Harry Potter and the Order of the Phoenix",
    "J. K. Rowling",
    912,
    false,
    "./photos/harry-potter-and-the-order-of-the-phoenix.jpg");

