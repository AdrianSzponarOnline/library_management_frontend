<template>
  <div class="register-container">
    <h2>Rejestracja</h2>
    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="email">Email:</label>
        <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Wpisz email"
            required
        />
      </div>

      <div class="form-group">
        <label for="username">Nazwa użytkownika:</label>
        <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Wpisz nazwę użytkownika"
            required
        />
      </div>

      <div class="form-group">
        <label for="password">Hasło:</label>
        <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Wpisz hasło"
            required
        />
      </div>

      <div class="error-message" v-if="errorMessage">
        {{ errorMessage }}
      </div>

      <button type="submit">Zarejestruj</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      email: "",
      username: "",
      password: "",
      errorMessage: ""
    };
  },
  methods: {
    async registerUser() {
      try {
        // Przykład wywołania backendu:
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.email,
            username: this.username,
            password: this.password
          })
        });

        if (!response.ok) {
          throw new Error('Nie udało się zarejestrować użytkownika.');
        }

        const data = await response.json();
        console.log('Zarejestrowano pomyślnie:', data);

        // Po udanej rejestracji możesz np. przekierować do logowania:
        this.$router.push({ name: 'login' });

        alert(`Rejestracja użytkownika: ${this.username}, email: ${this.email}`);
      } catch (error) {
        this.errorMessage = error.message || 'Wystąpił błąd podczas rejestracji.';
      }
    }
  }
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 2em auto;
  padding: 1.5em;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fafafa;
}

.register-container h2 {
  text-align: center;
  margin-bottom: 1em;
}

.form-group {
  margin-bottom: 1em;
}

.form-group label {
  display: block;
  margin-bottom: 0.5em;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 0.5em;
  box-sizing: border-box;
}

.error-message {
  color: red;
  margin-bottom: 1em;
  font-weight: bold;
}

button {
  width: 100%;
  padding: 0.8em;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: #218838;
}
</style>
