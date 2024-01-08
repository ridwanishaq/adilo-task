<template>
    <!-- Page Content -->
    <div id="content">
      <!-- Live Preview -->
      <div class="live-preview-card">
        <p class="label-text "><i class="fa fa-dot-circle text-danger" aria-hidden="true"></i>&nbsp; Live Preview</p>
        <div class="preview-card-body">
            
        </div>
        <div class="preview-btn">
          <button type="button" class="btn btn-primary" @click="startRecording">Start recording</button>
        </div>
      </div>
    
    </div>
</template>
  
<script>
export default {
    name: "LivePreview",
  
    data() {
      return {
        
      };
    },
    
  };
</script>

<style scoped lang="less">

// Live Preview
#content {
  transition: all 0.3s;
  border-radius: 5px;
  padding: 1rem;
  box-sizing: border-box;
    .live-preview-card {
        margin-top: 20px;
        text-align:left;
        
        .preview-card-body {
            width: 100%; 
            height: 60vh; 
            background-color: #21455E;
            color: #bbb; 
            border-radius: 8px;
        }
        .preview-btn {
            text-align: center;
            margin-top: 40px;
            button {
                width: 200px;
                height: 50px;
                border-radius: 30px;
            }
        }
    }
}
@media (min-width: 576px) {
  #content {
    transform: translate(0px, 0px);
    width: 650px;
  }
}

@media (min-width: 768px) {
  #content {
    width: 700px;
    transform: translate(0px, 0px);
  }
}

@media (min-width: 992px) {
  #content {
    width: 1000px;
    transform: translate(280px, 20px);
  }
}

@media (min-width: 1200px) {
  #content {
    width: 900px;
    transform: translate(320px, 20px);
  }
}
</style>
