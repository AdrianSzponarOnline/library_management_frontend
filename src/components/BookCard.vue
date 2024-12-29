<template>
  <!-- Główna karta z analogicznym stylem jak "author-card" -->
  <div class="book-card">
    <!-- Sekcja obrazu (placeholder, gdy brak okładki) -->
    <div class="image-placeholder">
      <img
          v-if="book.coverUrl"
          :src="book.coverUrl"
          alt="Book Cover"
          class="book-cover"
      />
      <div v-else class="default-placeholder">
        <span>No Cover</span>
      </div>
    </div>

    <!-- Pozostałe dane książki -->
    <h3>{{ book.title }}</h3>
    <p>
      <strong>Autorzy:</strong>
      {{ authorsList }}
    </p>
    <p>
      <strong>Rok wydania:</strong>
      {{ book.year }}
    </p>
    <p>
      <strong>Kategorie:</strong>
      {{ categoriesList }}
    </p>

    <!-- Przyciski akcji: identyczne style jak w AuthorCard -->
    <div class="button-group">
      <button class="edit-btn" @click="$emit('edit-book', book)">Edytuj</button>
      <button class="delete-btn" @click="$emit('delete-book', book.id)">Usuń</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookCard',
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  computed: {
    authorsList() {
      if (!this.book.authors || !this.book.authors.length) {
        return 'Nie podano';
      }
      return this.book.authors
          .map(author => `${author.firstName} ${author.lastName}`)
          .join(', ');
    },
    categoriesList() {
      if (!this.book.categories || !this.book.categories.length) {
        return 'Nie podano';
      }
      return this.book.categories
          .map(cat => cat.categoryName)
          .join(', ');
    },
  },
};
</script>

<style scoped>
/* Identyczny styl jak w AuthorCard, zmieniamy tylko nazwę klasy na .book-card */

/* Podstawowy wygląd karty */
.book-card {
  flex: 1 1 300px; /* Każda karta ma szerokość ok. 300px, ale może się dostosować */
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s, height 0.3s ease;
}

/* Placeholder obrazu (np. okładki) */
.image-placeholder {
  width: 100%;
  height: 150px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e9ecef;
  margin-bottom: 16px;
}

.image-placeholder img.book-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.default-placeholder {
  color: #888;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
}

/* Tytuł książki */
.book-card h3 {
  margin-bottom: 8px;
  font-size: 1.2em;
  color: #333;
}

/* Dane (Autorzy, Rok, Kategorie) */
.book-card p {
  margin: 4px 0;
  font-size: 0.9em;
  color: #555;
}

/* Sekcja przycisków na dole karty */
.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

/* Identyczny styl przycisków jak w AuthorCard */
button {
  padding: 8px 12px;
  font-size: 0.9em;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  transform: scale(1.05);
}

/* Przycisk "Edytuj" */
.edit-btn {
  background-color: #007bff;
  color: white;
}
.edit-btn:hover {
  background-color: #0056b3;
}

/* Przycisk "Usuń" */
.delete-btn {
  background-color: #dc3545;
  color: white;
}
.delete-btn:hover {
  background-color: #c82333;
}
</style>
