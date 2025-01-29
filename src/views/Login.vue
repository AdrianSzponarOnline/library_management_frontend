<template>
  <div class="login-container">
    <h2>Logowanie</h2>
    <form @submit.prevent="loginUser">
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

      <button type="submit">Zaloguj</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
      successMessage: ""
    };
  },
  methods: {
    async loginUser() {
      this.errorMessage = "";
      this.successMessage = "";

      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include", // klucz do sesji w cookies
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(errText || "Login failed.");
        }

        // Sukces -> odczytujemy wiadomość
        const successMsg = await response.text();
        this.successMessage = successMsg || "Zalogowano pomyślnie!";

        localStorage.setItem('isLoggedIn', true)
        // Przekierowanie do 'home'
        this.$router.push({name: "home"});

      } catch (error) {
        this.errorMessage = error.message || "Wystąpił błąd przy logowaniu.";
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 2em auto;
  padding: 1.5em;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fafafa;
}

.login-container h2 {
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
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: #0056b3;
}
</style>
