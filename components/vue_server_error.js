const vue_server_error = {
  props: ['server_ok'],
  template:`
    <p v-if="!server_ok">Пропала связь с сервером! Небходимо принять меры!</p>
  `
}

export default {
  vue_server_error: vue_server_error
};

