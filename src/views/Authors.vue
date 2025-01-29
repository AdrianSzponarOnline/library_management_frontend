<template>
  <div class="authors-page">
    <h2>Autorzy</h2>
    <author-form @add-author="addAuthor"></author-form>

    <!-- Kontrolki paginacji -->
    <div class="page-size-select">
      <label for="pageSizeSelect">Ilość autorów na stronie</label>
      <select id="pageSizeSelect" v-model="pageSize" @change="onPageSizeChange">
        <option :value="5">5</option>
        <option :value="10">10</option>
        <option :value="20">20</option>
      </select>
    </div>

    <!-- Sekcja ładowania -->
    <div v-if="loading">Ładowanie autorów...</div>

    <!-- Sekcja listy autorów / paginacji -->
    <div v-else>
      <div v-if="authors.length === 0">Brak autorów</div>
      <div v-else class="authors-list">
        <author-card
            v-for="author in authors"
            :key="author.id"
            :author="author"
            @update-author="updateAuthor"
            @delete-author="deleteAuthor"
        ></author-card>
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
  </div>
</template>

<script>
import AuthorForm from '../components/AuthorForm.vue';
import AuthorCard from '../components/AuthorCard.vue';

export default {
  name: 'Authors',
  components: {
    AuthorForm,
    AuthorCard
  },
  data() {
    return {
      authors: [],
      loading: true,
      // Paginacja
      currentPage: 0,  // numer aktualnej strony
      pageSize: 5,     // liczba autorów na stronie
      totalPages: 0    // łączna liczba stron (zainicjalizowana na 0!)
    };
  },
  mounted() {
    this.fetchAuthors();
  },
  methods: {
    fetchAuthors() {
      // Używamy zmiennej `url`, żeby przekazać parametry page i size
      const url = `/api/authors?page=${this.currentPage}&size=${this.pageSize}`;

      fetch(url)
          .then(response => response.json())
          .then(data => {
            this.authors = data.content;
            this.totalPages = data.totalPages;

            this.loading = false;
          })
          .catch(error => {
            console.error('Błąd podczas pobierania autorów:', error);
            this.loading = false;
          });
    },

    onPageSizeChange() {
      // Zmiana rozmiaru strony => resetujemy do strony 0
      this.currentPage = 0;
      this.fetchAuthors();
    },

    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.fetchAuthors();
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++;
        this.fetchAuthors();
      }
    },

    addAuthor(authorData) {
      fetch('/api/authors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(authorData)
      })
          .then(response => response.json())
          .then(newAuthor => {
            // Dodajemy nowo utworzonego autora do listy
            this.authors.push(newAuthor);
          })
          .catch(error => console.error('Błąd podczas dodawania autora:', error));
    },

    updateAuthor(updatedAuthor) {
      fetch(`/api/authors/${updatedAuthor.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updatedAuthor)
      })
          .then(response => {
            if (response.ok) {
              // Znajdź autora na liście i podmień go na zaktualizowany
              const index = this.authors.findIndex(a => a.id === updatedAuthor.id);
              if (index !== -1) {
                this.authors.splice(index, 1, updatedAuthor);
              }
            } else {
              throw new Error('Nie udało się zaktualizować autora');
            }
          })
          .catch(error => console.error('Błąd podczas aktualizowania autora:', error));
    },

    deleteAuthor(authorId) {
      fetch(`/api/authors/${authorId}`, { method: 'DELETE', credentials: 'include', })
          .then(response => {
            if (response.ok) {
              // Usuń autora z listy
              this.authors = this.authors.filter(author => author.id !== authorId);
            } else {
              throw new Error('Nie udało się usunąć autora');
            }
          })
          .catch(error => console.error('Błąd podczas usuwania autora:', error));
    }
  }
};
</script>

<style scoped>
.authors-page {
  padding: 1em;
  font-family: Arial, sans-serif;
}
.authors-list {
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
