
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
    "./photos/pride-and-prejudice.jpg"
);

addBookToLibrary(
    "To Kill a Mockingbird",
    "Harper Lee",
    323,
    false,
    "./photos/to-kill-a-mockingbird.jpg"
);

addBookToLibrary(
    "Harry Potter and the Order of the Phoenix",
    "J. K. Rowling",
    912,
    false,
    "./photos/harry-potter-and-the-order-of-the-phoenix.jpg"
);


// Displaying the books on the page

function displayBooks(books) {
    books.forEach((book) => {
        const bookList = document.querySelector(".books");

        const bookElement = document.createElement("div");
        bookElement.classList.add("book");

        const bookImage = document.createElement("div");
        bookImage.classList.add("book-image");
        bookImage.style.backgroundImage = `url('${book.image}')`;

        const bookPages = document.createElement("div");
        bookPages.classList.add("display-book-pages");
        bookPages.textContent = `${book.pages} Pages`;

        bookImage.appendChild(bookPages);
        bookElement.appendChild(bookImage);

        const bookDetails = document.createElement("div");
        bookDetails.classList.add("book-details");

        const bookTitle = document.createElement("h3");
        bookTitle.textContent = book.title;
        bookDetails.appendChild(bookTitle);

        const bookAuthor = document.createElement("h4");
        bookAuthor.textContent = book.author;
        bookDetails.appendChild(bookAuthor);

        const bookButtons = document.createElement("div");
        bookButtons.classList.add("book-buttons");
        const readButton = document.createElement("button");
        readButton.classList.add("read-button");

        if (book.read === true) {
            readButton.innerHTML = `<img src="./icons/book-finished.svg" alt="Book Finished Icon">Finished`;
        } else {
            readButton.innerHTML = `<img src="./icons/book-in-progress.svg" alt="Book in Progress Icon">Mark as Read`;
        }

        readButton.addEventListener("click", () => {
            if (readButton.textContent === "Mark as Read") {
                book.read = true;
                readButton.innerHTML = `<img src="./icons/book-finished.svg" alt="Book Finished Icon">Finished`;
            } else {
                book.read = false;
                readButton.innerHTML = `<img src="./icons/book-in-progress.svg" alt="Book in Progress Icon">Mark as Read`;
            }
        });

        bookButtons.appendChild(readButton);

        const deleteButton = document.createElement("img");
        deleteButton.classList.add("delete");
        deleteButton.src = "./icons/delete.svg";
        deleteButton.alt = "Delete book button";

        deleteButton.addEventListener("click", () => {
            deleteButton.closest(".book").remove();
        });

        bookButtons.appendChild(deleteButton);
        bookDetails.appendChild(bookButtons);
        bookElement.appendChild(bookDetails);
        bookList.appendChild(bookElement);

    });
}

displayBooks(myLibrary);