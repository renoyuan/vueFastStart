<script setup >
import {defineComponent, ref} from 'vue';
import axios from 'axios';
// import  {UploadFile} from 'element-plus';

defineComponent({

  text: ref(''),
  fileList: ref([]),
  resultVisible: ref(false),
  resultStatus: ref(''),
  resultTitle: ref(''),
  resultSubtitle: ref(''),
  submitText()  {
    if (this.text.value.trim()) {
      axios.post('/api/text', { text: text.value })
          .then(response => {
            showResult('success', '成功', '文本已提交')
          })
          .catch(error => {
            showResult('error', '失败', '提交文本失败')
          })
    }
  }

})

</script>

<template>
  <div>
    <el-input v-model="text" placeholder="请输入文本"></el-input>
    <el-button @click="submitText">提交文本</el-button>
    <br/>
    <el-upload
        class="upload-demo"
        action=""
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
        :auto-upload="false"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <el-button @click="submitFiles">上传文件</el-button>
    <el-result v-if="resultVisible" :status="resultStatus" :title="resultTitle" :sub-title="resultSubtitle">
      <template #extra>
        <el-button type="primary" @click="resultVisible = false">关闭</el-button>
      </template>
    </el-result>
  </div>
</template>

<style scoped>

</style>