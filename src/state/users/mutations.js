
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
    state.settings.avatar = avatar;
    state.userAvatar = state.avatars[avatar];
    console.log(state.settings.avatar, state.userAvatar)
  },
  changeTheme(state, theme) {
    // console.log(theme)
    if(theme === 'light')
      state.settings.theme = 0;
    else state.settings.theme = 1;
  },
  changeUsername(state, username) {
    state.settings.userName = username;
  },
  changeDescription(state, description) {
    state.settings.description = description;
  },
  changeName(state, name) {
    state.settings.firstName = name;
  },
  changeSurname(state, surname) {
    state.settings.lastName = surname;
  },
  changeBirthDate(state, birthDate) {
    console.log(birthDate)
    state.settings.dateOfBirth = birthDate;
  },
  changeEmail(state, email) {
    state.settings.email = email;
  },
  changeId(state, id) {
    state.id=id;
    
  },
  setSettings(state, value){
    let inputDate = new Date(value.dateOfBirth);
    let day = inputDate.getDate().toString().padStart(2, '0');
    let month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    let year = inputDate.getFullYear().toString();
    let formattedDate = `${year}-${month}-${day}`;
    state.settings = value;
    state.settings.dateOfBirth = formattedDate;
  },
  setUserAvatar(state, avatar){
    state.userAvatar = state.avatars[avatar];
 },
  setTheme(state, theme){
    state.settings.theme = theme;
  },
  popupPassword(state, value) {
    // console.log('password')
    state.visibleMessageP = value;
    },
  popupDelete(state, value){
    // console.log('delete')
    state.visibleMessage = value;
    }
}