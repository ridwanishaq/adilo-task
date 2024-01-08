<template>
    <!-- Page Content -->
    <div id="content">
      <!-- Live Preview -->
        <div class="live-preview-card">
            <p class="label-text "><i class="fa fa-dot-circle text-danger" aria-hidden="true"></i>&nbsp; Live Preview</p>
            <div class="preview-card-body">
                
            </div>
            <div class="preview-btn">
                <button v-if="!isStreaming" type="button" class="btn btn-secondary" @click="goBack"><i class="fa fa-arrow-left">&nbsp;</i>Go Back</button>
                <button v-if="!isStreaming" type="button" class="btn btn-primary" @click="startRecording"><i class="fa fa-play-circle">&nbsp;</i>Start recording</button>
                <button v-if="isStreaming" type="button" class="btn btn-danger" @click="stopRecording"><i class="fa fa-pause-circle">&nbsp;</i>Stop recording</button>
            </div>
        </div>

        <div class="media-player">
            <div class="media-box" v-if="preferredSettings.rCamera">
                <label for="">Camera:</label>
                <video ref="videoPlayer" controls></video>
            </div>
            <div class="media-box" v-if="preferredSettings.rMic">
                <label for="">Mic:</label>
                <audio ref="audioPlayer" controls></audio>
            </div>
            <div class="media-box" v-if="preferredSettings.rScreen">
                <label for="">Screen:</label>
                <video ref="screenPlayer" controls></video>
            </div>
        </div>
    
    </div>
</template>
  
<script>
import { mapGetters } from 'vuex';
export default {
    name: "LivePreview",
  
    data() {
      return {
        isStreaming: false,
        
        videoStream: null,
        audioStream: null,
        screenStream: null,

        videoRecorder: null,
        audioRecorder: null,
        screenRecorder: null,
      };
    },
    methods: {

        startRecording() {

            const preferredSettings = this.getPreferredSettings;

            // Validate Options
            if (!preferredSettings.rCamera && !preferredSettings.rScreen && !preferredSettings.rMic) {
                alert('Please select at least one option.');
            } else {

                /** Media Streaming */
                if(preferredSettings.rCamera) {
                    this.mediaStartRecording('video');
                }
                if(preferredSettings.rScreen) {
                    this.startScreenRecording();
                }
                if(preferredSettings.rMic) {
                    this.mediaStartRecording('audio');
                }
    
                // start streaming:
                this.isStreaming = true;
            }
        },

        stopRecording() {

            const preferredSettings = this.getPreferredSettings;
            
            // camera:
            if(preferredSettings.rCamera) {
                this.videoRecorder.stop();
                this.videoStream.getTracks().forEach((track) => track.stop());
            }

            // screen:
            if(preferredSettings.rScreen) {
                this.screenRecorder.stop();
                this.screenStream.getTracks().forEach((track) => track.stop());
            }

            // mic:
            if(preferredSettings.rMic) {
                this.audioRecorder.stop();
                this.audioStream.getTracks().forEach((track) => track.stop());
            }
            
            // stop streaming:
            this.isStreaming = false;
        },
        
        // camera/mic stream:
        async mediaStartRecording(type) {
            const stream = await navigator.mediaDevices.getUserMedia({ [type]: true });

            if (type === 'video') {
                this.videoStream = stream;
                this.videoRecorder = new MediaRecorder(stream);
                this.videoRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        const videoBlob = new Blob([event.data], { type: 'video/webm' });
                        this.$refs.videoPlayer.src = URL.createObjectURL(videoBlob);
                    }
                };
                this.videoRecorder.start();
            } else if (type === 'audio') {
                this.audioStream = stream;
                this.audioRecorder = new MediaRecorder(stream);
                this.audioRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        const audioBlob = new Blob([event.data], { type: 'audio/wav' });
                        this.$refs.audioPlayer.src = URL.createObjectURL(audioBlob);
                    }
                };
                this.audioRecorder.start();
            }
        },

        // screen stream:
        async startScreenRecording() {
            try {
                this.screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
                this.screenRecorder = new MediaRecorder(this.screenStream);
                this.screenRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        const screenBlob = new Blob([event.data], { type: 'video/webm' });
                        this.$refs.screenPlayer.src = URL.createObjectURL(screenBlob);
                    }
                };
                this.screenRecorder.start();
            } catch (error) {
                console.error('Error starting screen recording:', error);
            }
        },

        goBack() {

            // clear option settings
            localStorage.removeItem('preferredSettings');

            this.$router.push({ name: 'recording' });
        },
    },
    computed: {
        ...mapGetters(['getPreferredSettings']),
        preferredSettings() {
            return this.getPreferredSettings;
        },
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
                margin-left: 20px;
            }
        }
    }
    .media-player {
        margin-top: 40px;
        padding-top: 30px;
        border-top: 2px dashed grey;
        text-align: left;
        font-weight: bold;
        font-size: 20px;

        .media-box {
            margin-bottom: 30px;
            
            video {
                width: 100%;
            }
            audio {
                width: 100%;
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
