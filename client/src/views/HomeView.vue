<template>
  <div class="home">
    <div class="card">
      <div class="card-header">
        Mensagens
      </div>
      <div>
        <ul>
          <li
            v-for="(item, indice) in messages"
            :key="indice"
          >
            {{item}}
          </li>
        </ul>
      </div>
      <div class="input">
        <form @submit.prevent="sendMessage">
          <input
            v-model="message"
            type="text"
            placeholder="Escreva uma mensagem"
          >
          <button
            style="background: blue"
            type="submit"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const ws = new WebSocket('ws://localhost:8085/');

const sendMessage = () =>{
  ws.send(message.value)
}

ws.onopen = function open() {
  // ws.send('something');
};

ws.onmessage = function message({ data }) {
  messages.value.push(data)
};

const message = ref('')
const messages = ref([])

</script>
<style scoped>
.card {
  width: 500px;
}
.home {
  display: flex;
  justify-content: center;
  margin-top: 200px;
}
.input {
  display: flex;
  justify-content: center;
}
</style>