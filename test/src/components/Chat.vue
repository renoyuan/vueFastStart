<template>
  <div class="chat-container">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <div class="chat-content">
        <div v-for="message in messages" :key="message.id" class="message">
          <ChatSquare />
          <el-icon :size="20"><ChatSquare /></el-icon>
          <span :class="{ 'me':  message.from === 'me','other':  message.from === 'other' }">{{ message.from }}：</span>
          <span :class="{ 'me':  message.from === 'me','other':  message.from === 'other' }">{{ message.text }}</span>
        </div>
      </div>

    </el-scrollbar>
    <el-input v-model="newMessage" placeholder="Type your message" @keyup.enter="sendMessage"></el-input>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { BACKEND,CALL_LLM_URL } from '../config'

import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'Chat',
  setup() {
    const messages = ref([
      // 初始化一些消息
      { id: 1, text: 'Hello there!', from: 'other' },
      { id: 2, text: 'Hi, how are you?', from: 'me' }
    ])
    const newMessage = ref('')

    const sendMessage = () => {

      if (newMessage.value.trim()) {
        messages.value.push({ id: Date.now(), text: newMessage.value, from: 'me' })
        fetchNewMessages(newMessage.value)
        newMessage.value = ''


      }
    }

    const fetchNewMessages = async (newMessage_value) => {
      // 这里应该调用你的后端API获取新消息
      console.info("newMessage_value",newMessage_value)
      const  data ={
        query: newMessage_value,
        session_id: 'john.doe@example.com',
      };

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

        console.log(res_message,res_data_.session_id)
        messages.value.push({ id:messages.length+1, text: res_message, from: 'other' })
      } catch (error) {
        ElMessage.error('Failed to fetch messages')
      }
    }

    onMounted(() => {
      // 页面加载时获取初始消息
      fetchNewMessages()
    })

    return {
      messages,
      newMessage,
      sendMessage,
      fetchNewMessages
    }
  }
})
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