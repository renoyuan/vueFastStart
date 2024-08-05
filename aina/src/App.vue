<script setup >
import UploadAndTextInput from './components/UploadAndTextInput.vue'
import Chat from './components/Chat.vue'
</script>

<template>

  <header>
<!--    <h1>h1</h1>-->
  </header>
  <main>
    <div id="left" >
      <UploadAndTextInput/>
    </div>
    <div id="right">
      <Chat/>
    </div>
  </main>




</template>

<style scoped>

main {
  display: flex;
  place-items: center;
  flex-direction: row;
}



</style>
