<template>
  <div :class="['author-card', { 'editing-mode': isEditing }]">
    <div class="image-placeholder">
      <img
          v-if="author.imageUrl"
          :src="author.imageUrl"
          alt="Author image"
          class="author-image"
      />
      <div v-else class="default-placeholder">
        <span>No Image</span>
      </div>
    </div>
    <div v-if="isEditing" class="editing-mode-content">
      <h3>Edytuj autora:</h3>
      <label>
        First name:
        <input v-model="editableAuthor.firstName" />
      </label>
      <label>
        Last name:
        <input v-model="editableAuthor.lastName" />
      </label>
      <label>
        Nationality:
        <input v-model="editableAuthor.nationality" />
      </label>
      <label>
        Date of birth:
        <input type="date" v-model="editableAuthor.dateOfBirth" />
      </label>
      <div class="button-group">
        <button class="save-btn" @click="saveEdit">Zapisz</button>
        <button class="cancel-btn" @click="cancelEdit">Anuluj</button>
      </div>
    </div>
    <div v-else>
      <h3>{{ author.firstName }} {{ author.lastName }}</h3>
      <p><strong>Nationality:</strong> {{ author.nationality }}</p>
      <p><strong>Date of birth:</strong> {{ author.dateOfBirth }}</p>
      <div class="button-group">
        <button class="edit-btn" @click="editAuthor">Edytuj</button>
        <button class="delete-btn" @click="deleteAuthor">Usuń</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthorCard',
  props: {
    author: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isEditing: false, // Flaga do przełączania trybu edycji
      editableAuthor: { ...this.author } // Kopia autora do edycji
    };
  },
  methods: {
    editAuthor() {
      this.isEditing = true; // Włącz tryb edycji
      this.editableAuthor = { ...this.author }; // Utwórz kopię autora do edycji
    },
    saveEdit() {
      this.$emit('update-author', this.editableAuthor); // Emituj zmodyfikowane dane autora
      this.isEditing = false; // Wyłącz tryb edycji
    },
    cancelEdit() {
      this.isEditing = false; // Wyłącz tryb edycji bez zapisywania zmian
    },
    deleteAuthor() {
      this.$emit('delete-author', this.author.id); // Emituj zdarzenie usunięcia autora
    }
  }
};
</script>

#### Styl `CSS`:

```css
<style scoped>
.author-card {
    flex: 1 1 300px; /* Każda karta zajmuje 300px, ale może się dostosować */
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s, height 0.3s ease;
}

.author-card.editing-mode {
  min-height: auto; /* Pozwala na dynamiczne dopasowanie wysokości */
  height: auto;
}

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

.image-placeholder img {
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

.editing-mode-content h3 {
  margin-bottom: 16px;
  font-size: 1.2em;
  color: #333;
}

.editing-mode-content label {
  display: block;
  margin-bottom: 8px;
  font-size: 0.9em;
  color: #333;
}

.editing-mode-content input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 0.9em;
  margin-top: 4px;
}

.editing-mode-content input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 4px rgba(0, 123, 255, 0.3);
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

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

.save-btn {
  background-color: #28a745;
  color: white;
}

.save-btn:hover {
  background-color: #218838;
}

.cancel-btn {
  background-color: #ffc107;
  color: #333;
}

.cancel-btn:hover {
  background-color: #e0a800;
}

.edit-btn {
  background-color: #007bff;
  color: white;
}

.edit-btn:hover {
  background-color: #0056b3;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.delete-btn:hover {
  background-color: #c82333;
}

</style>


