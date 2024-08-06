<script setup >
import UploadAndTextInput from './components/UploadAndTextInput.vue'
import Chat from './components/Chat.vue'
import ModelInfo from './components/ModelInfo.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header></el-header>
      <el-container>
        <el-aside width="100px"> <ModelInfo/> </el-aside>
        <el-container>
          <el-main><div id="right">
            <Chat/>
          </div></el-main>
          <el-footer height="50px" ></el-footer>
        </el-container>
      </el-container>
    </el-container>


  </div>
</template>

<style >
el-header{
  color: #409EFF;
}
.common-layout{
  width: 1144px;
  height: 100%;
}
el-container{
  width: 100%;
  height: 100%;
}

#left{
  left:10px;

  flex-direction: row;
}

</style>