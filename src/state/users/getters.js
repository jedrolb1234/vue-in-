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
  getProfileAvatar(state) {
    return state.userAvatar;
  },
  getAvatars(state) {
    return state.avatars;
  },
  getUserAvatar:(state) => (nr) =>{
    // console.log(nr,'avatarNR')
    return state.avatars[nr];
  },
  getTheme(state) {
    if(state.settings.theme == 0)
      return 'light';
    if(state.settings.theme == 1)
      return 'dark';
    return null;
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
    return state.settings.lastName;
  },
  getBirthDate(state) {
    return state.settings.dateOfBirth;
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
  },
  getEmail(state) {
    return state.settings.email;
  },
  getId(state){
    return state.settings.id
  },
  getVisibleMessageP(state){
    return state.visibleMessageP;
  },
  getVisibleMessage(state){
    return state.visibleMessage;
  },
  getOwnId(state, value){
    return state.settings.id === value;
  }
}