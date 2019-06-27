<template>
  <div>
    <el-upload
      class="upload-demo"
      action="http://localhost:3000/upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="successUpload"
      :file-list="fileList"
      :before-upload="beforeUpload"
      list-type="picture">
      <!-- <img :src="'http://localhost:3000/images/'+this.imgName" alt="" class="thumbnail"> -->
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
      return {
        imgName:'',
        fileList:[],
        imgQuality: 0.5
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      successUpload(res, file, fileList){
        this.imgName = res.imgName;
      },
      dataURItoBlob(dataurl, filename){
            let arr = dataurl.split(',')
            let mime = arr[0].match(/:(.*?);/)[1]
            let suffix = mime.split('/')[1]
            let bstr = atob(arr[1])
            let n = bstr.length
            let u8arr = new Uint8Array(n)
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n)
            }
            return new File([u8arr], `${filename}.${suffix}`, {
                type: mime
            })
        },
      
 
      beforeUpload(param) {
      //对图片进行压缩
        const _this = this
        return new Promise(resolve => {
        const reader = new FileReader()
        const image = new Image()
        image.onload = (imageEvent) => {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          const width = image.width * _this.imgQuality
          const height = image.height * _this.imgQuality
          canvas.width = width;
          canvas.height = height;
          context.clearRect(0, 0, width, height);
          context.drawImage(image, 0, 0, width, height);
          const dataUrl = canvas.toDataURL(param.type);
          const blobData = _this.dataURItoBlob(dataUrl, param.type);
          resolve(blobData)
        }
        reader.onload = (e => { image.src = e.target.result; });
        reader.readAsDataURL(param);
        })
      }
    }
}
</script>

<style>
  .thumbnail{
    width:250px;
    height: 200px;
  }
</style>
