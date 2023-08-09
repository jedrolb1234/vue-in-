
export default {
  login(state, data) {
    sessionStorage.setItem('token', JSON.stringify(data.accessToken));
    sessionStorage.setItem('refresh_token', JSON.stringify(data.refreshToken));
    state.lastLogin = Date.now();
  },
  logout(state) {
    sessionStorage.setItem('token', null);
    // localStorage.setItem('theme', null);
    sessionStorage.setItem('refresh_token', null);
    state.lastLogin = null;
  },
  changeUserAvatar(state, avatar) {
    state.settings.avatar = avatar;
    state.userAvatar = state.avatars[avatar];
    console.log(state.settings.avatar, state.userAvatar)
  },
  changeTheme(state, theme) {
    console.log(theme)
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
    state.settings.surName = surname;
  },
  changeBirthDate(state, birthDate) {
    console.log(birthDate)
    state.settings.dateOfBirth = birthDate;
  },
  changeEmail(state, email) {
    state.settings.email = email;
  },
  setSettings(state, value){
    let inputDate = new Date(value.dateOfBirth);
    let day = inputDate.getDate().toString().padStart(2, '0');
    let month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    let year = inputDate.getFullYear().toString();
    let formattedDate = `${year}-${month}-${day}`;
    state.settings = value;
    state.settings.dateOfBirth = formattedDate;
    console.log(state.settings.dateOfBirth)
  
    console.log(state.settings)
  },
  setUserAvatar(state, avatar){
    state.userAvatar = state.avatars[avatar];
 },
  setTheme(state, theme){
    document.body.classList.remove(state.settings.theme)
    document.body.classList.add(theme);
    document.documentElement.style.colorScheme=theme;
    state.settings.theme = theme;
    state.theme = theme;
    // localStorage.setItem('theme', theme);
    console.log(document.body.classList, document.documentElement.style.colorScheme)
  },
  popupPassword(state, value) {
    console.log('password')
    state.visibleMessageP = value;
    },
  popupDelete(state, value){
    console.log('delete')
    state.visibleMessage = value;
    }
}