
let books = [];


function displayBooks() {
    const incompleteBookList = document.getElementById('incompleteBookList');
    const completeBookList = document.getElementById('completeBookList');


    incompleteBookList.innerHTML = '';
    completeBookList.innerHTML = '';

    books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.setAttribute('data-bookid', book.id);
        bookItem.setAttribute('data-testid', 'bookItem');

        bookItem.innerHTML = `
            <h3 data-testid="bookItemTitle">${book.title}</h3>
            <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
            <p data-testid="bookItemYear">Tahun: ${book.year}</p>
            <div>
                <button data-testid="bookItemIsCompleteButton" onclick="toggleComplete('${book.id}')">${book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'}</button>
                <button data-testid="bookItemDeleteButton" onclick="deleteBook('${book.id}')">Hapus Buku</button>
                <button data-testid="bookItemEditButton" onclick="editBook('${book.id}')">Edit Buku</button>
            </div>
        `;

        if (book.isComplete) {
            completeBookList.appendChild(bookItem);
        } else {
            incompleteBookList.appendChild(bookItem);
        }
    });
}


function addBook(event) {
    event.preventDefault();

    const title = document.getElementById('bookFormTitle').value;
    const author = document.getElementById('bookFormAuthor').value;
    const year = document.getElementById('bookFormYear').value;
    const isComplete = document.getElementById('bookFormIsComplete').checked;

    const book = {
        id: Date.now().toString(),
        title,
        author,
        year: Number(year),
        isComplete: isComplete,
    };

    books.push(book);
    saveBooks()
    displayBooks();
    document.getElementById('bookForm').reset();
}


function deleteBook(id) {
    books = books.filter(book => book.id !== id);
    saveBooks()
    displayBooks();
}


function toggleComplete(id) {
    const book = books.find(book => book.id === id);
    if (book) {
        book.isComplete = !book.isComplete;
        saveBooks()
        displayBooks();
    }
}


function editBook(id) {
    const book = books.find(book => book.id === id);
    if (book) {
        document.getElementById('bookFormTitle').value = book.title;
        document.getElementById('bookFormAuthor').value = book.author;
        document.getElementById('bookFormYear').value = book.year;
        document.getElementById('bookFormIsComplete').checked = book.isComplete;


        deleteBook(id);
    }
}


function searchBook(event) {
    event.preventDefault();
    const searchTitle = document.getElementById('searchBookTitle').value.toLowerCase();
    const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchTitle));

    const incompleteBookList = document.getElementById('incompleteBookList');
    const completeBookList = document.getElementById('completeBookList');


    incompleteBookList.innerHTML = '';
    completeBookList.innerHTML = '';

    filteredBooks.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.setAttribute('data-bookid', book.id);
        bookItem.setAttribute('data-testid', 'bookItem');

        bookItem.innerHTML = `
            <h3 data-testid="bookItemTitle">${book.title}</h3>
            <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
            <p data-testid="bookItemYear">Tahun: ${book.year}</p>
            <div>
                <button data-testid="bookItemIsCompleteButton" onclick="toggleComplete('${book.id}')">${book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'}</button>
                <button data-testid="bookItemDeleteButton" onclick="deleteBook('${book.id}')">Hapus Buku</button>
                <button data-testid="bookItemEditButton" onclick="editBook('${book.id}')">Edit Buku</button>
            </div>
        `;

        if (book.isComplete) {
            completeBookList.appendChild(bookItem);
        } else {
            incompleteBookList.appendChild(bookItem);
        }
    });
}

// Event listeners
document.getElementById('bookForm').addEventListener('submit', addBook);
document.getElementById('searchBook').addEventListener('submit', searchBook);

// local
function loadBooks() {
    const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
    books = storedBooks;
    displayBooks();
}

function saveBooks() {
    localStorage.setItem('books', JSON.stringify(books));
}

loadBooks()