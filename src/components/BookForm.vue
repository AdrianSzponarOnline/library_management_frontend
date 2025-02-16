<template>
  <div class="book-form-wrapper">

    <!-- Przyciski zwijania/rozwijania formularza -->
    <div class="toggle-button">
      <button @click="toggleForm">
        {{ isFormVisible ? 'Zwiń formularz' : 'Dodaj nową książkę' }}
      </button>
    </div>

    <!-- Formularz widoczny tylko, gdy isFormVisible === true -->
    <div v-if="isFormVisible">
      <h2>Dodaj nową książkę</h2>

      <div class="book-form-row">
        <!-- LEWA KOLUMNA -->
        <div class="left-column">
          <!-- FORMULARZ KSIĄŻKI -->
          <form @submit.prevent="onSubmitBook" class="book-form">
            <h3>Dane książki</h3>
            <div class="form-group">
              <label for="title">Tytuł:</label>
              <input
                  id="title"
                  v-model="book.title"
                  placeholder="Wprowadź tytuł"
                  required
              />
            </div>

            <div class="form-group">
              <label for="isbn">ISBN:</label>
              <input
                  id="isbn"
                  v-model="book.isbn"
                  placeholder="XXX-XX-XXXXXX-X-X"
                  required
              />
            </div>

            <div class="form-group">
              <label for="year">Rok wydania:</label>
              <input
                  id="year"
                  type="number"
                  v-model="book.year"
                  placeholder="Rok wydania"
                  required
              />
            </div>

            <!-- Inne pola (opcjonalnie) -->

            <button type="submit">Dodaj książkę</button>
          </form>

          <!-- LISTA autorów i kategorii POD FORMULARZEM -->
          <div class="lists-section">
            <div class="authors-list">
              <h3>Lista autorów</h3>
              <ul>
                <li v-for="(author, index) in book.authors" :key="index">
                  <strong>{{ author.firstName }} {{ author.lastName }}</strong>,
                  {{ author.nationality }} (ur. {{ author.dateOfBirth }})
                  <button @click="removeAuthor(index)">Usuń</button>
                </li>
              </ul>
            </div>

            <div class="categories-list">
              <h3>Lista kategorii</h3>
              <ul>
                <li v-for="(cat, cIndex) in book.categories" :key="cIndex">
                  <strong>{{ cat.categoryName }}</strong>
                  <template v-if="cat.description">
                    – {{ cat.description }}
                  </template>
                  <button @click="removeCategory(cIndex)">Usuń</button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- PRAWA KOLUMNA: Formularze dodawania autorów i kategorii -->
        <div class="side-forms">
          <div class="authors-section">
            <h3>Dodaj autora</h3>
            <author-form @add-author="handleAddAuthor" />
          </div>
          <div class="categories-section">
            <h3>Dodaj kategorię</h3>
            <category-form @add-category="handleAddCategory" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthorForm from './AuthorForm.vue';
import CategoryForm from './CategoryForm.vue';

export default {
  name: 'BookForm',
  components: {
    AuthorForm,
    CategoryForm
  },
  props: {
    bookToEdit: {
      type: Object,
      default: null
    },
    isEditing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isFormVisible: false, // Kontroluje widoczność formularza
      isEditingLocal: this.isEditing,
      book: {
        title: '',
        isbn: '',
        year: '',
        authors: [],
        categories: []
      }
    };
  },
  watch: {
    // jeśli zmieni sie bookToEdit, zaktualizuj local this.book
    isEditing(newVal) {
      this.isEditingLocal = newVal
    },
    bookToEdit: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.book = JSON.parse(JSON.stringify(newVal));
          this.isFormVisible = true;
        }else{
          this.resetBook();
        }
      }
    }
  },
  methods: {
    toggleForm() {
      this.isFormVisible = !this.isFormVisible;
      this.isEditingLocal = !this.isEditingLocal;
      this.resetBook();
    },
    resetBook() {
      this.book = {
        title: '',
        isbn: '',
        year: '',
        authors: [],
        categories: []
      };
    },
    handleAddAuthor(newAuthor) {
      this.book.authors.push(newAuthor);
    },
    removeAuthor(index) {
      this.book.authors.splice(index, 1);
    },
    handleAddCategory(newCategory) {
      this.book.categories.push(newCategory);
    },
    removeCategory(index) {
      this.book.categories.splice(index, 1);
    },
      onSubmitBook() {
        console.log('Dane książki do wysłania:', this.book);
        if (this.isEditingLocal) {
          this.$emit('submit-updated-book', { ...this.book });
        } else {
          this.$emit('add-book', { ...this.book });
        }
        this.isFormVisible = false;
        this.resetBook();
      }


    }
};
</script>

<style scoped>
.book-form-wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 1.5em;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Przycisk rozwijania/zwijania */
.toggle-button {
  text-align: center;
  margin-bottom: 1.5em;
}

.toggle-button button {
  padding: 1em 2em;
  font-size: 1.2rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.toggle-button button:hover {
  background-color: #0056b3;
}

/* Główna sekcja formularza */
.book-form-row {
  display: flex;
  gap: 2em;
  align-items: flex-start;
}

.left-column {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 2em;
}

.side-forms {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
}

/* Formularz książki */
.book-form-wrapper .book-form .form-group {
  margin-bottom: 1em;
}

.book-form-wrapper .book-form .form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5em;
  color: #495057;
}

.book-form-wrapper .book-form .form-group input {
  width: 100%;
  padding: 0.75em;
  font-size: 1rem;
  border: 1px solid #ced4da;
  border-radius: 6px;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
}

.book-form-wrapper .book-form .form-group input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
}
.book-form-wrapper .book-form button {
  padding: 0.75em 1.5em;
  font-size: 1rem;
  background-color: #28a745;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.book-form-wrapper .book-form button:hover {
  background-color: #218838;
}



/* Listy autorów i kategorii */
.lists-section {
  display: flex;
  flex-direction: column;
  gap: 1.5em;
}

.authors-list,
.categories-list {
  padding: 1.5em;
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 8px;
}
</style>
