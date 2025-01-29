<template>
  <div :class="['author-card', { 'editing-mode': isEditing }]">
    <div class="image-placeholder">
      <img
          v-if="author.imageMetadata && author.imageMetadata.imageUrl"
          :src="author.imageMetadata.imageUrl"
          alt="Author image"
      />
      <div v-else class="default-placeholder">
        <span>No Image</span>
      </div>
    </div>

    <!-- Tryb edycji -->
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
      <form @submit.prevent="uploadProfileImage" enctype="multipart/form-data">
        <label>
          Wybierz zdjęcie:
          <input type="file" @change="handleImageChange" />
        </label>
        <label>
          Opis zdjęcia:
          <input type="text" v-model="caption" placeholder="Dodaj opis (opcjonalnie)" />
        </label>
        <button type="submit" class="upload-btn">Dodaj zdjęcie</button>
      </form>
      <!-- Pole do edycji URL-a zdjęcia w obiekcie imageMetadata -->
      <label>
        Image URL:
        <input v-model="editableAuthor.imageMetadata.imageUrl" />
      </label>

      <div class="button-group">
        <button class="save-btn" @click="saveEdit">Zapisz</button>
        <button class="cancel-btn" @click="cancelEdit">Anuluj</button>
      </div>
    </div>

    <!-- Tryb podglądu -->
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
      isEditing: false,
      editableAuthor: JSON.parse(JSON.stringify(this.author))
    };
  },
  methods: {
    editAuthor() {
      this.isEditing = true;
      // Również tutaj możesz zrobić głęboką kopię
      this.editableAuthor = JSON.parse(JSON.stringify(this.author));
      if (!this.editableAuthor.imageMetadata) {
        this.editableAuthor.imageMetadata = {};
      }
    },
    saveEdit() {
      // Emituj zaktualizowane dane autora
      this.$emit('update-author', this.editableAuthor);
      this.isEditing = false;
    },
    cancelEdit() {
      this.isEditing = false;
    },
    deleteAuthor() {
      this.$emit('delete-author', this.author.id);
    },
    handleImageChange(event) {
      this.selectedImage = event.target.files[0];
    },
    async uploadProfileImage() {
      if (!this.selectedImage) {
        alert('Wybierz zdjęcie przed przesłaniem.');
        return;
      }

      const formData = new FormData();
      formData.append('image', this.selectedImage);
      if (this.caption) {
        formData.append('caption', this.caption);
      }

      try {
        const response = await fetch(`/api/authors/${this.author.id}/profile-image`, {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'Błąd przesyłania obrazu.');
        }

        alert('Zdjęcie zostało pomyślnie przesłane!');
        this.$emit('refresh-author'); // Opcjonalnie: odśwież autora, aby pokazać nowe zdjęcie
      } catch (error) {
        console.error('Błąd podczas przesyłania obrazu:', error);
        alert('Nie udało się przesłać zdjęcia.');
      }
    }
  }
};
</script>

<style scoped>
.author-card {
  flex: 1 1 300px; /* Każda karta zajmuje min. 300px, ale może się dopasować */
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s, height 0.3s ease;
}

.author-card.editing-mode {
  min-height: auto;
  height: auto;
}

.image-placeholder {
  /* Rozciąga placeholder do stałej wysokości 200px */
  width: 100%;
  height: 200px;

  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #e9ecef;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 16px;
  overflow: hidden; /* Zapobiega „wychodzeniu” obrazu poza placeholder */
}

.image-placeholder img {
  /* Klucz do pokazywania całego obrazka w wyznaczonym obszarze */
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;

  display: block; /* Usuwa ewentualne białe odstępy wokół elementu inline */
}

.default-placeholder {
  color: #888;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  /* Dla pewności, że placeholder wypełni całą wysokość: */
  width: 100%;
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
