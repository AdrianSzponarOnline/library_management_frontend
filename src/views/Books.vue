<template>
  <div class="books-page">
    <h2>Książki</h2>

    <!-- Komponent formularza: BookForm -->
    <book-form
        :book-to-edit="bookToEdit"
        is-editing="isEditing"
        @add-book="addBook"
        @submit-updated-book="updateBook"
    ></book-form>

    <!-- Kontrolki paginacji (zmiana rozmiaru strony) -->
    <div class="page-size-select">
      <label for="pageSizeSelect">Ilość książek na stronie:</label>
      <select id="pageSizeSelect" v-model="pageSize" @change="onPageSizeChange">
        <option :value="5">5</option>
        <option :value="10">10</option>
        <option :value="20">20</option>
      </select>
    </div>

    <!-- Sekcja ładowania / listy -->
    <div v-if="loading">Ładowanie książek...</div>
    <div v-else>
      <div v-if="books.length === 0">Brak książek</div>
      <div v-else class="books-list">
        <book-card
            v-for="book in books"
            :key="book.id"
            :book="book"
            @update-book="updateBook"
            @edit-book="editBook"
            @delete-book="deleteBook"
        ></book-card>
      </div>
    </div>

    <!-- Nawigacja po stronach -->
    <div v-if="!loading && totalPages > 1" class="pagination">
      <button
          :disabled="currentPage === 0"
          @click="prevPage"
      >
        Poprzednia
      </button>

      <span>Strona {{ currentPage + 1 }} z {{ totalPages }}</span>

      <button
          :disabled="currentPage + 1 === totalPages"
          @click="nextPage"
      >
        Następna
      </button>
    </div>
  </div>
</template>

<script>
import BookForm from '../components/BookForm.vue';
import BookCard from '../components/BookCard.vue';

export default {
  name: 'Books',
  components: {
    BookForm,
    BookCard
  },
  data() {
    return {
      books: [],
      loading: true,
      // PAGINACJA
      currentPage: 0,
      pageSize: 5,
      totalPages: 0,

      bookToEdit: null,
      isEditing: false,
    };
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    // 1. Pobranie listy książek (z parametrami page i size)
    fetchBooks() {
      const url = `/api/books?page=${this.currentPage}&size=${this.pageSize}`;
      fetch(url)
          .then(response => response.json())
          .then(data => {
            this.books = data.content;
            this.totalPages = data.totalPages;
            this.currentPage = data.number;
            this.loading = false;
          })
          .catch(error => {
            console.error('Błąd podczas pobierania książek:', error);
            this.loading = false;
          });
    },
    // 2. Obsługa zmiany rozmiaru strony
    onPageSizeChange() {
      this.currentPage = 0;
      this.fetchBooks();
    },
    // 3. Nawigacja stronicowania
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.fetchBooks();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++;
        this.fetchBooks();
      }
    },

    // Operacje CRUD (bez zmian):
    addBook(bookData) {
      fetch('/api/books', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData)
      })
          .then(response => response.json())
          .then(newBook => {
            this.books.push(newBook);
          })
          .catch(error => console.error('Błąd podczas dodawania książki:', error));
    },
    updateBook(updatedBook) {
      fetch(`/api/books/${updatedBook.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBook)
      })
          .then(response => {
            if (response.ok) {
              const index = this.books.findIndex(b => b.id === updatedBook.id);
              if (index !== -1) {
                this.books.splice(index, 1, updatedBook);
              }
            } else {
              throw new Error('Nie udało się zaktualizować książki');
            }
          })
          .catch(error => console.error('Błąd podczas aktualizowania książki:', error))
          // Po udanej (lub nie) próbie aktualizacji można wyczyścić stan edycji:
          .finally(() => {
            this.bookToEdit = null;
            this.isEditing = false;
          });
    },
    editBook(book) {
      this.isEditing = true;
      this.bookToEdit = book;
    },
    deleteBook(bookId) {
      fetch(`/api/books/${bookId}`, { method: 'DELETE',credentials: 'include', })
          .then(response => {
            if (response.ok) {
              this.books = this.books.filter(book => book.id !== bookId);
            } else {
              throw new Error('Nie udało się usunąć książki');
            }
          })
          .catch(error => console.error('Błąd podczas usuwania książki:', error));
    }
  }
};
</script>

<style scoped>
.books-page {
  padding: 1em;
  font-family: Arial, sans-serif;
}

.books-list {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 16px;
}

.pagination {
  margin-top: 1em;
}

.page-size-select {
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>
