let myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  switchRead() {
    this.read = !this.read;
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks(array) {
  const book_depository = document.getElementById("book-depository");
  clearAllChildNodes(book_depository);

  myLibrary.forEach((item, index) => {
    displayCard(item, index);
  });
}

function clearAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function displayCard(book, index) {
  const book_depository = document.getElementById("book-depository");

  const card = document.createElement("div");
  card.classList.add("card");

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("book_delete");
  deleteButton.textContent = "X";
  deleteButton.addEventListener("click", deleteBook);
  deleteButton.setAttribute("num", index);

  const deleteDiv = document.createElement("div");
  deleteDiv.classList.add("delete-div");
  const fakeP = document.createElement("p");

  deleteDiv.appendChild(fakeP);
  deleteDiv.appendChild(deleteButton);

  const title = document.createElement("p");
  title.classList.add("book_title");
  title.textContent = book.title;
  const author = document.createElement("p");
  author.classList.add("book_author");
  author.textContent = book.author;
  const pages = document.createElement("p");
  pages.classList.add("book_pages");
  pages.textContent = `${book.pages} pages`;
  const read = document.createElement("button");
  read.classList.add("book_read");
  read.textContent = "read?";
  if (book.read == true) {
    read.style["background-color"] = "green";
  } else {
    read.style["background-color"] = "red";
  }
  read.addEventListener("click", () => {
    book.switchRead();
    displayBooks(myLibrary);
  });
  card.appendChild(deleteDiv);
  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(read);

  book_depository.appendChild(card);
}

function displayBookForm() {
  document.getElementById("form").style.display = "flex";
}

function closeBookForm() {
  document.getElementById("form").style.display = "none";
  document.getElementById("form-title").value = "";
  document.getElementById("form-author").value = "";
  document.getElementById("form-pages").value = "";
  document.getElementById("read-checked").checked = false;
  document.getElementById("submit_book_button").disabled = true;
}

function submitBookForm() {
  const form = document.getElementById("form");

  let book = new Book(
    form.title.value,
    form.author.value,
    form.pages.value,
    form.read.checked
  );

  addBookToLibrary(book);
  displayBooks(myLibrary);
  closeBookForm();
}

function deleteBook(event) {
  index = event.target.getAttribute("num");
  myLibrary.splice(index, 1);

  displayBooks(myLibrary);
}

const newBookButton = document.getElementById("new_book_button");
newBookButton.addEventListener("click", displayBookForm);

const closeBookButton = document.getElementById("close_book_button");
closeBookButton.addEventListener("click", closeBookForm);

const submitBookButton = document.getElementById("submit_book_button");
submitBookButton.addEventListener("click", submitBookForm);

function checkSubmit() {
  let title = document.getElementById("form-title");
  let author = document.getElementById("form-author");
  let pages = document.getElementById("form-pages");
  let submitButton = document.getElementById("submit_book_button");
  if (title.value == "" || author.value == "" || pages.value == "") {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
}
