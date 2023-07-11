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
  getProfileAvatar(state) {
    return state.userAvatar;
  },
  getAvatars(state) {
    return state.avatars;
  },
  getUserAvatar:(state) => (nr) =>{
    console.log(nr,'avatarNR')
    return state.avatars[nr];
  },
  getTheme(state) {
    if(state.settings.theme === 0)
      return 'light';
    else if(state.settings.theme !== 0)return 'dark';
  },
  getUsername(state) {
    return state.settings.userName;
  },
  getDescription(state) {
    return state.settings.description;
  },
  getName(state) {
    return state.settings.firstName;
  },
  getSurname(state) {
    return state.settings.surName;
  },
  getBirthDate(state) {
    return state.settings.dateOfBirth;
  },
  getEmail(state) {
    return state.settings.email;
  },
  getId(state){
    return state.settings.id
  }
}