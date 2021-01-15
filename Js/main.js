const addNewBookButton = document.querySelector('button.newBook');

let content = '';

const bookCard = (book, index) => `
<div id="book-${index}" class="col-md-4 mt-2">
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title" id="itemName">${book.title}</h5>
            <p class="card-text" id="itemDesc">${book.author}</p>
            <p class="card-text">${book.pages}</p>
            <button class="card-text status">${book.read}</button>
            <button class="delete" id=${index} data-id=${index}>Delete</button>
        </div>
    </div>
  </div>
`;

class Library {
  constructor() {
    this.books = [];
  }

  addBook(title, author, pages, id) {
    const newBook = new Book(title, author, pages, id);
    this.books.push(newBook);
  }

  allBooks() {
    return this.books;
  }

  displayAllBooks() {
    this.books.forEach((book, index) => {
      content += bookCard(book, index);
    });
  }
}

const myLibrary = new Library();

const formSubmission = (event) => {
  event.preventDefault();
  content = '';
  const form = event.target;
  const values = $(form).serializeArray();
  const index = myLibrary.books.length;
  myLibrary.addBook(values[0].value, values[1].value, values[2].value, index);
  myLibrary.displayAllBooks();
  document.querySelector('.books-grid').innerHTML = content;
  form.reset();

  myLibrary.books.forEach((book, index) => {
    const deleteButton = document.querySelector(`#book-${index} button.delete`);
    const statusButton = document.querySelector(`#book-${index} button.status`);

    deleteButton.addEventListener('click', () => {
      myLibrary.books = myLibrary.books.filter((book) => book.id !== index);
      const card = document.getElementById(`book-${index}`);
      if (card) {
        card.remove();
      }
    });

    const readStatus = () => ($(statusButton).html() === 'Read'
      ? $(statusButton).html('Not Read')
      : $(statusButton).html('Read'));

    statusButton.addEventListener('click', readStatus);
  });

  if ($('.form').hasClass('show')) {
    $('.form').addClass('hide');
    $('.form').removeClass('show');
  }
};

$('form').on('submit', formSubmission);

addNewBookButton.addEventListener('click', () => {
  $('.form').toggleClass('hide show');
});
