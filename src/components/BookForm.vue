<template>
  <form @submit.prevent="submitForm" class="book-form">
    <div>
      <label for="title">Tytuł:</label>
      <input id="title" v-model="book.title" placeholder="Wprowadź tytuł" required />
    </div>
    <div>
      <label for="author">Autor:</label>
      <input id="author" v-model="book.author" placeholder="Wprowadź autora" required />
    </div>
    <div>
      <label for="year">Rok wydania:</label>
      <input id="year" type="number" v-model="book.year" placeholder="Wprowadź rok wydania" required />
    </div>
    <div>
      <label for="genre">Gatunek:</label>
      <input id="genre" v-model="book.genre" placeholder="Wprowadź gatunek" />
    </div>
    <button type="submit">Dodaj książkę</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      book: {
        title: '',
        author: '',
        year: '',
        genre: '',
      },
    };
  },
  methods: {
    submitForm() {
      this.$emit('add-book', { ...this.book });
      this.book = { title: '', author: '', year: '', genre: '' }; // Reset formularza
    },
  },
};
</script>

<style scoped>
.book-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 1em;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.book-form div {
  margin-bottom: 1em;
}

.book-form label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5em;
}

.book-form input {
  width: 100%;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.book-form button {
  padding: 0.5em 1em;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
}

.book-form button:hover {
  background: #0056b3;
}
</style>
