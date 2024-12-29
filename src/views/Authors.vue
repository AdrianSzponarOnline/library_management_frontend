<template>
  <div class="authors-page">
    <h2>Autorzy</h2>
    <author-form @add-author="addAuthor"></author-form>

    <div v-if="loading">Ładowanie autorów...</div>
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
      loading: true
    };
  },
  mounted() {
    this.fetchAuthors();
  },
  methods: {
    fetchAuthors() {
      fetch('/api/authors')
          .then(response => response.json())
          .then(data => {
            this.authors = data;
            this.loading = false;
          })
          .catch(error => {
            console.error('Błąd podczas pobierania autorów:', error);
            this.loading = false;
          });
    },
    addAuthor(authorData) {
      fetch('/api/authors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authorData)
      })
          .then(response => response.json())
          .then(newAuthor => {
            this.authors.push(newAuthor);
          })
          .catch(error => console.error('Błąd podczas dodawania autora:', error));
    },
    updateAuthor(updatedAuthor) {
      fetch(`/api/authors/${updatedAuthor.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAuthor)
      })
          .then(response => {
            if (response.ok) {
              // Zaktualizuj autora na liście
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
      fetch(`/api/authors/${authorId}`, {
        method: 'DELETE'
      })
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
  align-items: flex-start; /* Każda karta zaczyna się od góry */
  gap: 16px; /* Przestrzeń między kartami */
}

</style>
