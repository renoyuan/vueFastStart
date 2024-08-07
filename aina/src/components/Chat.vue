<template>
  <div class="chat-container">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <div class="chat-content">
        <div v-for="message in this.messages" :key="message.id" class="message">

          <span>
            <el-text size="small"
                     :class="{ 'mx-1':true, 'user':true, 'me':  message.from === 'me','robot':  message.from === 'robot' }"
                     type="primary">{{ message.from }}</el-text>
            <el-text
                :class="{ 'mx-1':true,'user':true,'me':  message.from === 'me','robot':  message.from === 'robot' }">{{
                message.text
              }}</el-text></span>
        </div>
      </div>

    </el-scrollbar>
    <el-icon :size="size" :color="color">
      <Document/>
    </el-icon>
    <el-input v-model="this.newMessage" placeholder="Type your message" @keyup.enter="this.sendMessage"></el-input>
  </div>
</template>

<script>
import {BACKEND, CALL_LLM_URL} from '../config';
import {postBackendData} from './CallBackend.js';
import {ElMessage} from 'element-plus';

export default {
  data() {

    return {
      messages: [
        // 初始化一些消息
        {id: 1, text: 'Hello there!', from: 'robot'},
        {id: 2, text: 'Hi, how are you?', from: 'me'}
      ],
      newMessage: "",
      session_id: "",
      model_key: ""
    };

  },


  methods: {

    async fetchNewMessages(newMessage_value) {

      // 这里应该调用你的后端API获取新消息
      console.info("newMessage_value", newMessage_value)

      const data = {
        query: newMessage_value,
        session_id: this.session_id, // 动态生成
        model_key: "qwen", // api 获取
      };

      if (newMessage_value) {
        try {
          const res = await postBackendData(data, "POST", CALL_LLM_URL)
          const res_data = res.data
          this.session_id = res_data.session_id
          this.messages.push({id: this.messages.length + 1, text: res_data.answer, from: 'robot'});
        } catch (error) {
          console.error("error", error)
          ElMessage.error('Failed to fetch messages');
        }


      }
    },

    generateUUIDv4() {
      return crypto.randomUUID();
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

.user {
  height: auto;
  display: flex;
  flex-direction: column;
}

.chat-content {
  width: 100%;
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