// ...existing code...
/*
  Funções de UI para renderizar lista, formulários e reviews.
  Depende de BookStorage (global).
*/
(function (global) {
  const container = document.getElementById('books-container');
  const form = document.getElementById('book-form');
  let currentFilter = null;

  function createCard(book) {
    const el = document.createElement('div');
    el.className = 'book-card';
    el.dataset.id = book.id;
    // Definir cor do status
    let statusColor = '';
    if (book.status === 'read') statusColor = '#016630';
    else if (book.status === 'currently-reading') statusColor = '#894B00';
    else if (book.status === 'wish-to-read') statusColor = '#193CB8';

    el.innerHTML = `
      <h3>${escapeHtml(book.title)}</h3>
      <p><em>${escapeHtml(book.author || '')}</em></p>
      <p>Status: <strong style="color:${statusColor}">${statusLabel(book.status)}</strong></p>
      ${book.imageUrl ? `<img src='${escapeHtml(book.imageUrl)}' alt='Capa do livro' class='book-image' style='max-width:120px;max-height:160px;margin:8px 0;'>` : ''}
      <p>${book.rating ? `<span class='stars'>${'★'.repeat(book.rating)}${'☆'.repeat(5-book.rating)}</span>` : ''}</p>
      <p>${book.comment ? `<strong>Comentário:</strong> ${escapeHtml(book.comment)}` : ''}</p>
      <p>${book.review ? `<strong>Review:</strong> ${escapeHtml(book.review)}` : ''}</p>
      <div class="actions">
        <button class="edit">Editar</button>
        <button class="delete">Remover</button>
        ${book.status === 'read' ? '<button class="add-review">Escrever Review</button>' : ''}
      </div>
    `;
    // handlers
    el.querySelector('.delete').addEventListener('click', () => {
      BookStorage.remove(book.id);
      render();
    });
    el.querySelector('.edit').addEventListener('click', () => {
      document.getElementById('title').value = book.title;
      document.getElementById('author').value = book.author || '';
      document.getElementById('status').value = book.status || 'wish-to-read';
      document.getElementById('imageUrl').value = book.imageUrl || '';
      // Estrelas
      if (book.rating) {
        const starInput = document.getElementById('star' + book.rating);
        if (starInput) starInput.checked = true;
      } else {
        const stars = document.querySelectorAll('input[name="rating"]');
        stars.forEach(s => s.checked = false);
      }
      document.getElementById('comment').value = book.comment || '';
      // store editing id on form
      form.dataset.editing = book.id;
      // Abrir modal
      document.getElementById('add-book-modal').style.display = 'block';
    });
    const revBtn = el.querySelector('.add-review');
    if (revBtn) {
      revBtn.addEventListener('click', () => {
        const text = prompt('Escreva sua review:');
        if (text !== null) {
          BookStorage.update(book.id, { review: text });
          render();
        }
      });
    }
    return el;
  }

  function statusLabel(key) {
    return {
      'read': 'Lido',
      'currently-reading': 'Lendo',
      'wish-to-read': 'Desejo Ler'
    }[key] || key;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function render() {
    let books = BookStorage.getAll();
    if (currentFilter) {
      books = books.filter(b => b.status === currentFilter);
    }
    container.innerHTML = '';
    if (!books.length) {
      container.innerHTML = '<p>Nenhum livro adicionado ainda.</p>';
      return;
    }
    books.forEach(b => container.appendChild(createCard(b)));
  }

  function bindForm() {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const title = document.getElementById('title').value.trim();
      const author = document.getElementById('author').value.trim();
      const status = document.getElementById('status').value;
      const imageUrl = document.getElementById('imageUrl').value.trim();
      const rating = Number(document.querySelector('input[name="rating"]:checked')?.value || 0);
      const comment = document.getElementById('comment').value.trim();
      if (!title) return;
      const bookData = { title, author, status };
      if (imageUrl) bookData.imageUrl = imageUrl;
      if (rating) bookData.rating = rating;
      if (comment) bookData.comment = comment;
      if (form.dataset.editing) {
        BookStorage.update(form.dataset.editing, bookData);
        delete form.dataset.editing;
      } else {
        BookStorage.add(bookData);
      }
      form.reset();
      render();
    });
  }

  function init() {
        // Filtro por status nos links do cabeçalho
        document.querySelector('a[href="#all"]').addEventListener('click', function(e) {
          e.preventDefault();
          currentFilter = null;
          render();
        });
    bindForm();
    // Filtro por status nos links do cabeçalho
    document.querySelector('a[href="#all"]').addEventListener('click', function(e) {
      e.preventDefault();
      currentFilter = null;
      render();
    });
    document.querySelector('a[href="#read"]').addEventListener('click', function(e) {
      e.preventDefault();
      currentFilter = 'read';
      render();
    });
    document.querySelector('a[href="#currently-reading"]').addEventListener('click', function(e) {
      e.preventDefault();
      currentFilter = 'currently-reading';
      render();
    });
    document.querySelector('a[href="#wish-list"]').addEventListener('click', function(e) {
      e.preventDefault();
      currentFilter = 'wish-to-read';
      render();
    });
    // Abrir modal ao clicar em "Adicionar Livro"
    document.querySelector('a[href="#add-book"]').addEventListener('click', function(e) {
      e.preventDefault();
      document.getElementById('add-book-modal').style.display = 'block';
    });
    // Fechar modal ao clicar no X
    document.getElementById('close-add-book').addEventListener('click', function() {
      document.getElementById('add-book-modal').style.display = 'none';
    });
    // Fechar modal ao clicar fora do conteúdo
    document.getElementById('add-book-modal').addEventListener('click', function(e) {
      if (e.target === this) {
        this.style.display = 'none';
      }
    });
    // Exibir todos ao carregar
    currentFilter = null;
    render();
  }

  global.AppUI = { init, render };
})(window);
// ...existing code...