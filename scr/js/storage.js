// ...existing code...
/*
  Serviço simples de armazenamento usando localStorage.
  API: BookStorage.getAll(), .add(book), .update(id, patch), .remove(id)
*/
(function (global) {
  const KEY = 'gerenciador_livros_v1';

  function read() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '[]');
    } catch {
      return [];
    }
  }

  function write(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
  }

  const BookStorage = {
    getAll() {
      return read();
    },
    add(book) {
      const books = read();
      const newBook = Object.assign({ id: uid(), createdAt: Date.now() }, book);
      books.push(newBook);
      write(books);
      return newBook;
    },
    update(id, patch) {
      const books = read();
      const i = books.findIndex(b => b.id === id);
      if (i === -1) return null;
      books[i] = Object.assign({}, books[i], patch);
      write(books);
      return books[i];
    },
    remove(id) {
      let books = read();
      books = books.filter(b => b.id !== id);
      write(books);
    },
    clear() {
      write([]);
    }
  };

  global.BookStorage = BookStorage;
})(window);
// ...existing code...