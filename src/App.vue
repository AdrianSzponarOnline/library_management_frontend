<template>
  <div id="app">
    <header>
      <h1>{{ title }}</h1>
    </header>

    <nav>
      <div class="auth-buttons" v-if="!isLoggedIn">
        <router-link :to="{ name: 'login' }" :class="{ active: activePage === 'login'}">Zaloguj</router-link>
        <router-link :to="{ name: 'register' }" :class="{ active: activePage === 'register'}">Zarejestruj</router-link>
      </div>


      <div class="auth-buttons" v-else>
        <button @click="logout">Wyloguj</button>
      </div>

      <router-link :to="{ name: 'home' }" :class="{ active: activePage === 'home' }">Strona Główna</router-link>
      <router-link :to="{ name: 'authors' }" :class="{ active: activePage === 'authors' }">Autorzy</router-link>
      <router-link :to="{ name: 'books' }" :class="{ active: activePage === 'books' }">Książki</router-link>
      <router-link :to="{ name: 'users' }" :class="{ active: activePage === 'users' }">Użytkownicy</router-link>
      <router-link :to="{ name: 'loans' }" :class="{ active: activePage === 'loans' }">Wypożyczenia</router-link>
      <router-link :to="{ name: 'contact' }" :class="{ active: activePage === 'contact' }">Kontakt</router-link>
    </nav>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <p>© {{ year }} Zarządzanie Biblioteką. Wszelkie prawa zastrzeżone.</p>
    </footer>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";

export default {
  name: 'App',
  data() {
    return {
      title: "Zarządzanie Biblioteką",
      activePage: 'home',
      year: new Date().getFullYear(),
    }
  },
  watch: {
    '$route.name'(newVal) {
      this.activePage = newVal;
    }
  },
  computed: {
    ...mapState(['isLoggedIn'])
  },
  methods: {
    ...mapActions({
      logoutAction: 'logout',
    }),
    async logout() {
      try {
        await this.logoutAction();
      }catch(err) {
        console.log('Logout error', err);
      }
    }
  }
}
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  color: #333;
  margin: 0;
}

/* Nagłówek */
header {
  background: linear-gradient(90deg, #007bff, #0056b3);
  color: #fff;
  padding: 1.5em 1em;
  text-align: center;
  /* Jeżeli chcesz, żeby również header podążał za scrollem,
     dodaj position: sticky i top: 0 */
  /* position: sticky;
  top: 0; */
  z-index: 1000;
}

header h1 {
  margin: 0;
  font-size: 2.4em;
  font-weight: bold;
  letter-spacing: 1px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

/* Nawigacja – KLUCZOWA ZMIANA: position: sticky i top: 0 */
nav {
  background: linear-gradient(90deg, #007bff, #0056b3);
  display: flex;
  /* Dzięki temu nav „przyklei się” do górnej krawędzi
     okna, o ile nie ma wyższego elementu ustawionego sticky/fixed powyżej */
  position: sticky;
  top: 0;
  z-index: 999;
  justify-content: center;
  align-items: center;
  gap: 1em;
  padding: 0.8em 1.5em;
  box-shadow: 0 10px 8px rgba(0, 0, 0, 0.1);
}

nav a {
  color: #fff;
  text-decoration: none;
  padding: 0.6em 1.2em;
  border-radius: 20px;
  font-size: 1em;
  font-weight: 500;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
}

nav a:hover {
  background: rgba(255, 255, 255, 0.3);
  color: #fff;
  transform: scale(1.1);
}

nav a.active {
  background: rgba(255, 255, 255, 0.5);
  font-weight: bold;
  color: #222;
  transform: scale(1.2);
}

/* Główny obszar */
main {
  flex: 1;
  padding: 1.5em;
  background: #f9f9f9;
}

/* Stopka */
footer {
  background: #eee;
  text-align: center;
  padding: 1em;
  font-size: 0.9em;
  color: #666;
  margin-top: auto;
}

/* Responsywność */
@media (max-width: 768px) {
  nav {
    flex-direction: column;
    gap: 0.5em;
    padding: 1em;
  }

  nav a {
    width: 100%;
    text-align: center;
  }
}
</style>
