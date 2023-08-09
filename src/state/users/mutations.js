export default {
  login(state, data) {
    localStorage.setItem('token', JSON.stringify(data.accessToken));
    localStorage.setItem('refresh_token', JSON.stringify(data.refreshToken));
    localStorage.setItem('user_id', JSON.stringify(data.id));
    localStorage.setItem('last_login', JSON.stringify(Date.now()));
  },
  logout() {
    localStorage.setItem('token', null);
    localStorage.setItem('refresh_token', null);
    localStorage.setItem('user_id', null);
    localStorage.setItem('last_login', null);
  },
  changeUserAvatar(state, avatar) {
    state.userAvatar = avatar;
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
  },
  changeId(state, id) {
    state.id=id;
  }
}