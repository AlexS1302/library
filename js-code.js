
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

        if (book.isRead === true) {
            readButton.innerHTML = `<img src="./icons/book-finished.svg" alt="Book Finished Icon">Finished`;
        } else {
            readButton.innerHTML = `<img src="./icons/book-in-progress.svg" alt="Book in Progress Icon">Mark as Read`;
        }

        readButton.addEventListener("click", () => {
            if (readButton.textContent === "Mark as Read") {
                book.isRead = true;
                readButton.innerHTML = `<img src="./icons/book-finished.svg" alt="Book Finished Icon">Finished`;
            } else {
                book.isRead = false;
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

// Add button modal creation

const addBookButton = document.querySelector("#add-book-btn");
const closeBookButton = document.querySelector("#close-book-modal");
const bookModal = document.querySelector("#book-modal");

addBookButton.addEventListener("click", () => {
    bookModal.showModal();
});

closeBookButton.addEventListener("click", () => {
    bookModal.close();
});

// Picture credits modal creation

const pictureCreditsHeading = document.querySelector("#credits-heading");
const closeCreditsButton = document.querySelector("#close-credits-modal");
const creditsModal = document.querySelector("#credits-modal");

pictureCreditsHeading.addEventListener("click", () => {
    creditsModal.showModal();
});

closeCreditsButton.addEventListener("click", () => {
    creditsModal.close();
});




// Enable users to upload and attach images to their books

const dragAndDropArea = document.querySelector("#upload-file");
const uploadImage = document.querySelector(".upload-image");
const dragBox = document.querySelector(".drag-box");
const imagePreview = document.querySelector("#image-preview");
const uploadImageButton = document.querySelector("#upload-button");
let bookImage = null;

function addImageModal(file) {
    bookImage = URL.createObjectURL(file);
    dragBox.style.display = "none";
    imagePreview.style.display = "block";
    imagePreview.src = bookImage;
    uploadImage.appendChild(imagePreview);
}

function handleFileSelect(event) {
    let file = event.target.files[0];
    if (file) {
        addImageModal(file);
    }
}

function dragImageModal(event) {
    event.preventDefault();
    dragBox.classList.add("dragging-image");
}

function dropImageModal(event) {
    event.preventDefault();
    dragBox.classList.remove("dragging-image");
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        addImageModal(files[0]);
    }
}

uploadImageButton.addEventListener("click", function(event) {
    event.preventDefault();
    dragAndDropArea.click();
});

function validateForm() {
    let bookTitle = document.querySelector("#modal-book-title");
    let bookAuthor = document.querySelector("#modal-book-author");
    let bookNumberOfPages = document.querySelector("#modal-book-pages");

    if (
        bookTitle.value === "" ||
        bookAuthor.value === "" ||
        bookNumberOfPages.value === ""
    ) {
        return false;
    } else {
        return true;
    }
}


// Confirm added books

const confirmButton = document.querySelector("#confirm-book");
const bookForm = document.querySelector(".book-form");
const validationMessage = document.querySelector(".validation");

confirmButton.addEventListener("click", function (event) {
    event.preventDefault();
    if (validateForm()) {
        let bookTitle = document.querySelector("#modal-book-title").value;
        let bookAuthor = document.querySelector("#modal-book-author").value;
        let bookNumberOfPages = document.querySelector("#modal-book-pages").value;

        const read = document.querySelector("#read-check");
        let isRead = read.checked;

        if (!bookImage) {
            bookImage = "./photos/placeholder-book-image.jpg";
        }

        addBookToLibrary(bookTitle, bookAuthor, bookNumberOfPages, isRead, bookImage);

        // Refresh book display
        document.querySelectorAll(".book").forEach((e) => e.remove());
        displayBooks(myLibrary);

        // Reset form and UI
        bookForm.reset();
        bookImage = null;
        validationMessage.textContent = "";
        dragBox.style.display = "flex";
        imagePreview.style.display = "none";

        bookModal.close();
    } else {
        validationMessage.textContent = "Please fill in the book title, author and number of pages fields!";
    }
});


displayBooks(myLibrary);
dragAndDropArea.addEventListener("change", handleFileSelect);
dragBox.addEventListener("dragover", dragImageModal);
dragBox.addEventListener("drop", dropImageModal);


