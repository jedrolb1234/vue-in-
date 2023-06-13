export default {
  login(state, data) {
    sessionStorage.setItem('token', JSON.stringify(data.accessToken));
    sessionStorage.setItem('refresh_token', JSON.stringify(data.refreshToken));
    state.lastLogin = Date.now();
  },
  logout(state) {
    sessionStorage.setItem('token', null);
    sessionStorage.setItem('refresh_token', null);
    state.lastLogin = null;
  },
  changeAvatar(state, id) {
    state.avatarId = id;
  },
  changeTheme(state, theme) {
    state.theme = theme;
  },
  changeUsername(state, username) {
    state.username = username;
  },
  changeDescription(state, description) {
    state.description = description;
  },
  changeName(state, name) {
    state.name = name;
  },
  changeSurname(state, surname) {
    state.surname = surname;
  },
  changeBirthDate(state, birthDate) {
    state.birthDate = birthDate;
  },
  changeEmail(state, email) {
    state.email = email;
  }
}