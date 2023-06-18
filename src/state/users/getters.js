export default {
  isAuthenticated() {
    const token = JSON.parse(sessionStorage.getItem('token'));
    const refresh_token = JSON.parse(sessionStorage.getItem('refresh_token'));
    if (token == null || refresh_token == null)
      return false;
    return true;
  },
  getLastLogin(state) {
    return state.lastLogin;
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
  }
}