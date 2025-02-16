// store/index.js
import { createStore } from 'vuex';

export default createStore({
    // 1. Initialize isLoggedIn from localStorage at store creation
    state: {
        isLoggedIn: localStorage.getItem('isLoggedIn') === 'true'
    },
    mutations: {
        SET_LOGGED_IN(state, status) {
            state.isLoggedIn = status;
            // Keep localStorage in sync
            localStorage.setItem('isLoggedIn', status ? 'true' : 'false');
        }
    },
    actions: {
        async login({ commit }, { username, password }) {
            try {
                // Call your backend endpoint
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include', // needed if using session cookies
                    body: JSON.stringify({ username, password })
                });

                if (!response.ok) {
                    const errText = await response.text();
                    throw new Error(errText || 'Login failed.');
                }

                // On success, update store + localStorage
                commit('SET_LOGGED_IN', true);

                // Optionally parse server response or messages
                const message = await response.text();
                return message || 'Zalogowano pomyślnie!';
            } catch (error) {
                throw error;
            }
        },

        async logout({ commit }) {
            try {
                const response = await fetch('/api/logout', {
                    method: 'POST',
                    credentials: 'include'
                });

                if (!response.ok) {
                    const errText = await response.text();
                    throw new Error(errText || 'Logout failed.');
                }

                // On success, update store + localStorage
                commit('SET_LOGGED_IN', false);

                const message = await response.text();
                return message || 'Wylogowano pomyślnie!';
            } catch (error) {
                throw error;
            }
        }
    },
    getters: {
        isLoggedIn: (state) => state.isLoggedIn
    }
});
