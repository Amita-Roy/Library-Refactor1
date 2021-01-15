class Book {
  constructor(title, author, pages, id) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = 'Not Read';
  }

  info() {
    return `${this.title}, by ${this.author}, ${this.pages} pages`;
  }
}
