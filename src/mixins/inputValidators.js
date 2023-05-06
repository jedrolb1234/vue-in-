export default {
    methods: {
        validateEmail(email) {
            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
            if(email.match(emailRegex))
              return true;
            return false;
          },
          validateUsername(username) {
            if(this.validateFieldNotEmpty(username)) {
              return true
            }
            return false;
          },
          validatePassword(password, rpassword) {
            const passwordRegex = /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;
            if(password.match(passwordRegex) && password == rpassword)
              return true;
            return false;
          },
          validateFieldNotEmpty(field) {
            return field.length>0;
          },
          validateFormFields(fileds) {
            return fileds.every(f => f === true);
          }
    } 
}