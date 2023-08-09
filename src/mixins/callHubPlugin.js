import CallHub from '@/mixins/callHub.js'

export default {
  install(Vue) {
    CallHub.start();
    Vue.config.globalProperties.$callHub = CallHub;
  }
}