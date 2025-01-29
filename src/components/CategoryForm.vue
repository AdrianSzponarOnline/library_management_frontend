<!-- CategoryForm.vue -->
<template>
  <form @submit.prevent="submitCategory" class="category-form">
    <div>
      <label for="name">Nazwa kategorii:</label>
      <input id="name" v-model="category.categoryName" required />
    </div>
    <button type="submit">Dodaj kategorię</button>
  </form>
</template>

<script>
export default {
  name: 'CategoryForm',
  data() {
    return {
      category: {
        categoryName: ''
      }
    };
  },
  methods: {
    submitCategory() {
      if (!this.category.categoryName) {
        console.error('Brak nazwy kategorii!');
        return;
      }
      this.$emit('add-category', { ...this.category });
      // Reset
      this.category = { categoryName: ''};
    }
  }
};
</script>

<style scoped>
/* Przykładowe style */
.category-form {
  margin-top: 1em;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fcfcfc;
}
.category-form div {
  margin-bottom: 10px;
}
.category-form label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}
.category-form input {
  width: 100%;
  padding: 0.5em;
  border: 1px solid #bbb;
  border-radius: 4px;
}
.category-form button {
  width: 100%;
  padding: 0.5em;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}
.category-form button:hover {
  background-color: #218838;
}
</style>
