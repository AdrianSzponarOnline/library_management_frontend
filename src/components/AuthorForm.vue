<template>
  <form @submit.prevent="submitForm" class="author-form">
    <div>
      <label for="firstName">Imię autora:</label>
      <input id="firstName" v-model="author.firstName" required/>
    </div>
    <div>
      <label for="lastName">Nazwisko autora:</label>
      <input id="lastName" v-model="author.lastName" required/>
    </div>
    <div>
      <label for="nationality">Narodowość:</label>
      <input id="nationality" v-model="author.nationality" required/>
    </div>
    <div>
      <label for="dateOfBirth">Data urodzenia:</label>
      <input id="dateOfBirth" type="date" v-model="author.dateOfBirth" required/>
    </div>
    <button type="submit">Dodaj autora</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      author: {
        id: '',
        firstName: '',
        lastName: '',
        nationality: '',
        dateOfBirth: ''
      }
    };
  },
  methods: {
    submitForm() {
      if (!this.author.firstName || !this.author.lastName || !this.author.nationality || !this.author.dateOfBirth) {
        console.error('Brak wymaganych danych autora!');
        return;
      }
      console.log('Emitowanie autora:', this.author);
      this.$emit('add-author', { ...this.author });
      this.author = { firstName: '', lastName: '', nationality: '', dateOfBirth: '' };
    }
  }
};
</script>
<style scoped>
  .author-form {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .author-form div {
    margin-bottom: 15px;
  }

  .author-form label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #333;
  }

  .author-form input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 14px;
  }

  .author-form input:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 3px rgba(0, 123, 255, 0.5);
  }

  .author-form button {
    width: 100%;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .author-form button:hover {
    background-color: #0056b3;
  }

  .author-form button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
</style>