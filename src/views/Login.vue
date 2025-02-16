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
import { mapActions } from "vuex";

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
    // Make the store's 'login' action directly available as this.login()
    ...mapActions(["login"]),

    async loginUser() {
      this.errorMessage = "";
      this.successMessage = "";

      try {
        // 1. Call the Vuex action (which does the fetch inside the store)
        const successMsg = await this.login({
          username: this.username,
          password: this.password
        });

        // 2. successMsg is what the store action returned (the server text)
        this.successMessage = successMsg || "Zalogowano pomyślnie!";

        // 3. Go to home (or wherever you want)
        this.$router.push({name: "home"});
      } catch (error) {
        // 4. If fetch or login failed, set the error message
        this.errorMessage = error.message || "Wystąpił błąd przy logowaniu.";
      }
    }
  }
};
</script>

<style scoped>
/* your styles here */
.login-container {
  max-width: 400px;
  margin: 2em auto;
  padding: 1.5em;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fafafa;
}

/* ... rest of your styles ... */
</style>
