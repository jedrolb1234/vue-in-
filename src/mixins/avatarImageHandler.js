export default {
  methods: {
    getImgPath(id) {
      return process.env.BASE_URL + 'images/avatars/' + id + '.png';
    }
  }
}