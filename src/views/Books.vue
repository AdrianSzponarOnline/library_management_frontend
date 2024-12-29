<template>
  <div class="books-page">
    <header>
      <h1>Książki</h1>
    </header>

    <main>
      <!-- Formularz dodawania książki -->
      <section class="add-book">
        <book-form @add-book="addBook"></book-form>
      </section>

      <!-- Lista książek -->
      <section class="books-list">
        <book-card
            v-for="book in books"
            :key="book.id"
            :book="book"
            @edit-book="editBook"
            @delete-book="deleteBook"
        ></book-card>
      </section>
    </main>
  </div>
</template>

<script>
import BookForm from '../components/BookForm.vue';
import BookCard from '../components/BookCard.vue';

export default {
  name: 'Books',
  components: {
    BookForm,
    BookCard,
  },
  data() {
    return {
      books: [], // Lista książek
      loading: true,
    };
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    fetchBooks() {
      fetch("/api/books")
          .then(response => response.json())
          .then(data => {
            console.log(data);
            this.books = data.content;
            this.loading = false;
          })
          .catch(error => {
            console.log("Błąd podczas pobierania książek:", error);
            this.loading = false;
          });
    },
    addBook(newBook) {
      // Przykładowe dodawanie książki do listy
      this.books.push({
        id: Date.now(), // Tymczasowy ID (w realnej aplikacji ID będzie nadawane przez backend)
        ...newBook,
      });
    },
    editBook(updatedBook) {
      // Aktualizacja książki w liście
      const index = this.books.findIndex((book) => book.id === updatedBook.id);
      if (index !== -1) {
        this.books.splice(index, 1, updatedBook);
      }
    },
    deleteBook(bookId) {
      // Usuwanie książki z listy
      this.books = this.books.filter((book) => book.id !== bookId);
    },
  },
};
</script>

<style scoped>
.books-page {
  padding: 1em;
  font-family: Arial, sans-serif;
}

.add-book {
  margin-bottom: 2em;
}

.books-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5em;
}
</style>
