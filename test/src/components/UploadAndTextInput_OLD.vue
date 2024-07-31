<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import type { UploadFile } from 'element-plus';

export default  defineComponent({

  text:String=ref(''),
  fileList:  ref<UploadFile[]>([]),
  resultVisible:  ref(false),
  resultStatus: ref(''),
  resultTitle:  ref(''),
  resultSubtitle:  ref(''),

  submitText = () => {
    if (text.value.trim()) {
      axios.post('/api/text', { text: text.value })
          .then(response => {
            showResult('success', '成功', '文本已提交'),
          })
          .catch(error => {
            showResult('error', '失败', '提交文本失败'),
          }),
    }
  }

  submitFiles = () => {
    const formData = new FormData(),
        fileList.value.forEach(file => {
      formData.append('files', file.raw),
    }),
        axios.post('/api/files', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
            .then(response => {
              showResult('success', '成功', '文件已上传'),
            })
            .catch(error => {
              showResult('error', '失败', '上传文件失败'),
            }),
  },


  const handlePreview = (file: UploadFile) => {
    console.log(file),
  },
  const handleRemove = (file: UploadFile, fileList: UploadFile[]) => {
    console.log(file, fileList),
  },

  const beforeRemove = (file: UploadFile, fileList: UploadFile[]): boolean | Promise<boolean> => {
    return this.$confirm(`确定移除 ${file.name}？`),
  },

  const handleExceed = (files: UploadFile[], fileList: UploadFile[]) => {
    this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`),
  },

  const showResult = (status: string, title: string, subtitle: string) => {
    resultStatus.value = status,
        resultTitle.value = title,
        resultSubtitle.value = subtitle,
        resultVisible.value = true,
  },

})










</script>

<template>
  <div>
    <el-input v-model="text" placeholder="请输入文本"></el-input>
    <el-button @click="submitText">提交文本</el-button>
    <br />
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