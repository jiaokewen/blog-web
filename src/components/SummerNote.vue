<template>
<div>
  <div id="summernote" class="summernote"></div>
</div>
</template>
<script>
import $ from "jquery"
import 'summernote/dist/summernote.css'
import 'summernote/dist/summernote.js'
import 'summernote/dist/lang/summernote-zh-CN.js'
import 'bootstrap/js/modal.js'
import 'bootstrap/js/dropdown.js'
import 'bootstrap/js/tooltip.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import FileApi from '@/api/File'

export default {
  mounted() {
    var self = this
    $("#summernote").summernote({
      height: 500,
      width: 1000,
      minHeight: 300,
      maxHeight: 500,
      focus: false,
      lang: "zh-CN",
      // 重写图片上传
      callbacks: {  
        onImageUpload: function(files) { //the onImageUpload API  
          self.sendFile(files)
        }
      }
    });
  },
  methods: {
    click () {
      var sHTML = $('#summernote').summernote('code')
      this.$emit('getCode', sHTML)
    },
    sendFile (files) {
    var size = files[0].size;
    if((size / 1024 / 1024) > 2) {
        alert("图片大小不能超过2M...");
        return false;
    }
    console.log("size="+size);
    var formData = new FormData();
    formData.append("file", files[0]);
    $.ajax({
        data : formData,
        type : "POST",
        url : "/api/system/upload",    // 图片上传出来的url，返回的是图片上传后的路径，http格式
        cache : false,
        contentType : false,
        processData : false,
        dataType : "json",
        success: function(data) {//data是返回的hash,key之类的值，key是定义的文件名
            $('#summernote').summernote('insertImage',data.message)
        },
        error:function(){
            alert("上传失败");
        }
      });
    },
    initConent (conent) {
      $('#summernote').summernote('code', conent)
    }
  }
};
</script>
