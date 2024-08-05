<template>
  <div class="chat-container">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <div class="chat-content">
        <div v-for="message in this.messages" :key="message.id" class="message">
          <ChatSquare/>
          <el-icon :size="20">
            <ChatSquare/>
          </el-icon>
          <span :class="{ 'me':  message.from === 'me','other':  message.from === 'other' }">{{ message.from }}：</span>
          <span :class="{ 'me':  message.from === 'me','other':  message.from === 'other' }">{{ message.text }}</span>
        </div>
      </div>

    </el-scrollbar>
    <el-input v-model="this.newMessage" placeholder="Type your message" @keyup.enter="this.sendMessage"></el-input>
  </div>
</template>

<script>
import {defineComponent, ref, onMounted} from 'vue'
import {BACKEND, CALL_LLM_URL} from '../config'

import {ElMessage} from 'element-plus'

export default {
  name: 'Chat',
  data() {

    return {
      messages: [
        // 初始化一些消息
        {id: 1, text: 'Hello there!', from: 'other'},
        {id: 2, text: 'Hi, how are you?', from: 'me'}
      ],
      newMessage: ""
    };

  },


  methods: {

    async fetchNewMessages(newMessage_value) {

      // 这里应该调用你的后端API获取新消息
      console.info("newMessage_value", newMessage_value)

      const data = {
        query: newMessage_value,
        session_id: 'john.doe@example.com',
      };

      if (newMessage_value) {
        try {
          const response = await fetch(CALL_LLM_URL,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'no-cors': true,
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild',
                  'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS'

                },
                body: JSON.stringify(data),
              }
          )
          const res_data = await response.json()
          const res_data_ = res_data.data
          console.log(res_data.data)
          let res_message = res_data_.answer

          console.log(res_message, res_data_.session_id)
          this.messages.push({id: this.messages.length + 1, text: res_message, from: 'other'});
        } catch (error) {
          ElMessage.error('Failed to fetch messages');
        }
      }
    },

    sendMessage() {

      if (this.newMessage.trim()) {
        this.messages.push({id: Date.now(), text: this.newMessage, from: 'me'})
        this.fetchNewMessages(this.newMessage)
        this.newMessage = '';
      }

    },


  },


  mounted() {
    // 页面加载时获取初始消息
    this.fetchNewMessages()
  }


}
</script>

<style scoped>
.chat-container {
  height: 500px;
  display: flex;
  flex-direction: column;
}

.chat-content {
  flex: 1;
  overflow-y: auto;
}

.me {
  text-align: right;
}

.other {
  text-align: left;
}
</style>