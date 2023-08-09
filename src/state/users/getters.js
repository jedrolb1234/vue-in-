export default {
  isAuthenticated(state, getters) {
    const token = getters.getToken;
    const refresh_token = getters.getRefreshToken;
    const user_id = getters.getUserId;
    const last_login = getters.getLastLogin;
    if (token == null || refresh_token == null || user_id == null || last_login == null)
      return false;
    return true;
  },
  getUserAvatar(state) {
    return state.userAvatar;
  },
  getAvatars(state) {
    return state.avatars;
  },
  getTheme(state) {
    return state.theme;
  },
  getUsername(state) {
    return state.username;
  },
  getDescription(state) {
    return state.description;
  },
  getName(state) {
    return state.name;
  },
  getSurname(state) {
    return state.surname;
  },
  getBirthDate(state) {
    return state.birthDate;
  },
  getEmail(state) {
    return state.email;
  },
  getUserId() {
    return JSON.parse(localStorage.getItem('user_id'));
  },
  getToken() {
    return JSON.parse(localStorage.getItem('token'));
  },
  getRefreshToken() {
    return JSON.parse(localStorage.getItem('refresh_token'));
  },
  getLastLogin() {
    return JSON.parse(localStorage.getItem('last_login'));
  }
}