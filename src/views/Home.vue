<template>
  <div>
    <header>
      <h1>{{ title }}</h1>
    </header>

    <main>
      <section class="welcome">
        <h2>{{ welcomeMessage }}</h2>
        <p>
          Tutaj możesz zarządzać autorami, książkami, użytkownikami oraz wypożyczeniami
          w Twojej bibliotece.
        </p>
      </section>

      <section class="features">
        <div class="feature-card">
          <h3>Autorzy</h3>
          <p>Przeglądaj i zarządzaj listą autorów.</p>
          <router-link :to="{ name: 'authors' }" class="button">Przejdź</router-link>
        </div>
        <div class="feature-card">
          <h3>Książki</h3>
          <p>Dodawaj i edytuj informacje o książkach.</p>
          <router-link :to="{ name: 'books' }" class="button">Przejdź</router-link>
        </div>
        <div class="feature-card">
          <h3>Użytkownicy</h3>
          <p>Zarządzaj kontami użytkowników biblioteki.</p>
          <router-link :to="{ name: 'users' }" class="button">Przejdź</router-link>
        </div>
        <div class="feature-card">
          <h3>Wypożyczenia</h3>
          <p>Śledź i zarządzaj wypożyczeniami książek.</p>
          <router-link :to="{ name: 'loans' }" class="button">Przejdź</router-link>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      title: "Zarządzanie Biblioteką",
      welcomeMessage: "Witamy w systemie zarządzania biblioteką"
    }
  }
}
</script>

<style scoped>
.auth-buttons {
  display: flex;
  gap: 1em; /* odstęp między przyciskami */
}

.login-btn {
  background-color: #28a745; /* Zielony dla wyróżnienia */
}

.login-btn:hover {
  background-color: #218838;
}

.register-btn {
  background-color: #ffca28; /* Żółty odcień */
  color: #333; /* Ciemniejszy tekst */
}

.register-btn:hover {
  background-color: #ffc107;
  color: #333;
}
.welcome {
  margin-bottom: 2em;
  text-align: center;
  padding: 1.5em;
  background: linear-gradient(90deg, #007bff, #0056b3);
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.welcome h2 {
  font-size: 2em;
  margin-bottom: 0.5em;
}

.welcome p {
  font-size: 1.2em;
  margin: 0;
}

.features {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5em;
  justify-content: center;
  padding: 1em 0;
}

.feature-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5em;
  flex: 1 1 calc(25% - 2em); /* Dostosowanie do szerokości */
  box-sizing: border-box;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.feature-card h3 {
  font-size: 1.5em;
  margin-bottom: 0.5em;
  color: #007bff;
}

.feature-card p {
  font-size: 1em;
  color: #666;
  margin: 0.5em 0 1em;
}

.button {
  display: inline-block;
  padding: 0.6em 1.2em;
  background: #007bff;
  color: white;
  text-decoration: none;
  font-size: 1em;
  font-weight: bold;
  border-radius: 20px;
  transition: background-color 0.3s, transform 0.2s;
}

.button:hover {
  background: #0056b3;
  transform: scale(1.05); /* Subtelne powiększenie */
}

</style>
