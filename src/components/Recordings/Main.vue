<template>
  <!-- Page Content -->
  <div id="content">
    <div class="col-md-12 d-flex w-arrow">
      <p class="label-text">Snapbyte &rsaquo; My Recordings</p>
    </div>
  
    <div class="main-header">
      <div class="main-title">
        <h5>My Recordings <span>19</span></h5>
      </div>
      <div class="main-items">
        <button class="adilo-btn adilo-btn-white"><i class="fa fa-unsorted"></i>&nbsp;By Date</button>
        <button class="adilo-btn adilo-btn-white"><i class="fa fa-filter"></i>&nbsp;Add Filter</button>
        <button class="adilo-btn adilo-btn-blue"><i class="fa fa-video"></i>&nbsp;New Request</button>
        <button class="adilo-btn adilo-btn-red" @click="newRecordingModal"><i class="fa fa-play-circle"></i>&nbsp;Start Recording</button>
      </div>
    </div>

    <!-- New Recording -->
    <div class="recording-modal-box">
      <div class="modal fade" ref="myModal" tabindex="-1" role="dialog" aria-labelledby="newRecordingModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="newRecordingModalLabel">New Recording</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              
              <div class="form-group">
                <label for="">Save the recording in</label>
                <select name="" id="" class="form-control">
                  <option value="">Select a project</option>
                </select>
              </div>

              <div class="form-group recording-settings">
                <div class="record-config">
                  <p>Record Screen</p>
                  <div class="">
                    <input type="checkbox" id="toggleSwitch1" checked>
                    <label for="toggleSwitch1" class="switch"></label>
                  </div>
                </div>
                <div class="record-config">
                  <p>Record Camera</p>
                  <div class="">
                    <input type="checkbox" id="toggleSwitch2" checked>
                    <label for="toggleSwitch2" class="switch"></label>
                  </div>
                </div>
                <div class="record-config">
                  <p>Record Mic</p>
                  <div class="">
                    <input type="checkbox" id="toggleSwitch3">
                    <label for="toggleSwitch3" class="switch"></label>
                  </div>
                </div>
              </div>
              
              <div class="record-btn">
                <button type="button" class="btn btn-primary" @click="startRecording">Start Recording</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
      <!-- ./New Recording -->

    <!-- Empty Recorded -->
    <div class="empty-recorded-card">
      <div class="empty-card-body">
        <img :src="emptyRecordSrc" alt="Empty Recording Picture">
        <p>Say hello to the world!</p>
        <small>Record your first video/audio and share it with your team, friends,<br> followers and customers.</small>
        <div class="start-record-btn-card">
        <button class="adilo-btn adilo-btn-red" @click="newRecordingModal"><i class="fa fa-play-circle"></i>&nbsp;Start Recording</button>
          <button class="adilo-btn adilo-btn-blue"><i class="fa fa-video"></i>&nbsp;New Request</button>
        </div>
      </div>
    </div>
      <!-- ./Empty Recorded -->

    <div class="app-container">
      <h1>Media Recorder</h1>

      <div class="action-buttons">
        <button @click="mediaStartRecording('video')">Start Video Recording</button>
        <button @click="stopRecording('video')">Stop Video Recording</button>
      </div>

      <div class="action-buttons">
        <button @click="mediaStartRecording('audio')">Start Audio Recording</button>
        <button @click="stopRecording('audio')">Stop Audio Recording</button>
      </div>

      <div class="action-buttons">
        <button @click="startScreenRecording">Start Screen Recording</button>
        <button @click="stopScreenRecording">Stop Screen Recording</button>
      </div>

      <div class="media-player">
        <video ref="videoPlayer" controls></video>
        <audio ref="audioPlayer" controls></audio>
        <video ref="screenPlayer" controls></video>
      </div>
    </div>
    
  </div>
</template>

<script>
import EmptyRecordingImage from "@/assets/empty-recording.png";

export default {
  name: "Main",

  data() {
    return {
      emptyRecordSrc: EmptyRecordingImage,
      videoStream: null,
      audioStream: null,
      screenStream: null,
      videoRecorder: null,
      audioRecorder: null,
      screenRecorder: null,
    };
  },
  methods: {

    newRecordingModal() {
      // Use Bootstrap's modal method to show the modal
      $(this.$refs.myModal).modal('show');
    },
    startRecording() {
      // Add logic to save changes if needed
      // For example, emit an event to notify the parent component
      this.$emit('save-changes');
      
      // Close the modal after saving changes
      $(this.$refs.myModal).modal('hide');
    },

    handleSaveChanges() {
      // Handle the save changes logic here
      console.log('Changes saved!');
    },
    
    
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
    stopRecording(type) {
      if (type === 'video') {
        this.videoRecorder.stop();
        this.videoStream.getTracks().forEach((track) => track.stop());
      } else if (type === 'audio') {
        this.audioRecorder.stop();
        this.audioStream.getTracks().forEach((track) => track.stop());
      }
    },
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
    stopScreenRecording() {
      if (this.screenRecorder) {
        this.screenRecorder.stop();
        this.screenStream.getTracks().forEach((track) => track.stop());
      }
    },
  },
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

// Variables
@base-font-size: 14px;
@base-color: grey;
@switch-width: 40px;
@switch-height: 20px;
@switch-padding: 2px;
@switch-border-radius: 10px;
@switch-bg-color-off: #ddd;
@switch-bg-color-on: #0AD688;
@switch-thumb-color: #ffffff;

// reuse styles (mixins)
.adilo-button-styles {
  button {
    margin-left: 15px;
  }

  .adilo-btn {
    border: 1px solid #eee;
    border-radius: 30px;
    padding: 7px 20px;
  }

  .adilo-btn-white {
    background-color: #fff;
    color: grey;
  }
  .adilo-btn-blue {
    background-color: #0DABD8;
    color: #fff;
  }
  .adilo-btn-red {
    background-color: #EF5350;
    color: #fff;
  }
}

.label-text {
  font-size: @base-font-size;
  color: @base-color;
}

#content {
  width: 100%;
  transition: all 0.3s;
  border-radius: 5px;
  padding: 1rem;
  box-sizing: border-box;

  .main-header {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .main-title {
      margin: 0;
      text-align: left;

      span {
        margin-left:15px;
        font-weight: bold;
      }
    }
    .main-items {

      .adilo-button-styles();

    }    
  }

  // Modal:
  .recording-modal-box {
    text-align: left;
    .modal-header {
      padding: 15px 35px;

      h5{
        font-weight: bold;
      }
    }
    .modal-body {
      padding: 20px 35px;
    }

    .recording-settings {
      margin-top:35px;
      .record-config {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;

        p {
          font-weight: bold;
        }

      }
    }

    .record-btn {
      margin-top: 35px;
      margin-bottom: 15px;
      text-align:center;

      button {
        width: 250px;
        border-radius: 30px;
      }
    }
  }
  
  // Empty Recorded Card
  .empty-recorded-card {
    margin-top: 30px;
    
    .empty-card-body {
      width: 100%; 
      height: 60vh; 
      display: flex; 
      flex-direction: column; 
      align-items: center; 
      justify-content: center; 
      text-align: center; 
      color: #bbb; 
      border: 2px dashed #ccc;
      border-radius: 30px;

      p {
        font-weight: bold;
        color: #000;
      }

      .start-record-btn-card {
        margin-top: 20px;
        .adilo-button-styles();
      }
    }
  }
}

/* Toggle Switch styles */
.switch {
  display: inline-block;
  width: @switch-width;
  height: @switch-height;
  background-color: @switch-bg-color-off; /* Default color for unchecked state */
  border-radius: @switch-border-radius;
  cursor: pointer;
  position: relative;
  padding-top: 2px;

  &::before {
    content: "";
    position: absolute;
    width: calc(@switch-height - @switch-padding * 2);
    height: calc(@switch-height - @switch-padding * 2);
    background-color: @switch-thumb-color;
    border-radius: 50%;
    transition: transform 0.3s ease;
    transform: translateX(@switch-padding);
  }
}

/* Checkbox styles (hidden) */
input[type="checkbox"] {
  display: none;

  &:checked + .switch {
    background-color: @switch-bg-color-on;
  }

  &:checked + .switch::before {
    transform: translateX(calc(@switch-width - @switch-height + @switch-padding));
  }
}

@media (min-width: 576px) {
  #content {
    padding-left: 2rem;
    padding-right: 1rem;
  }
}

@media (min-width: 768px) {
  #content {
    padding-left: 3rem;
    padding-right: 1rem;
  }
}

@media (min-width: 992px) {
  #content {
    padding-left: 4rem;
    padding-right: 1rem;
  }
}

@media (min-width: 1200px) {
  #content {
    padding-left: 5rem;
    padding-right: 1rem;
  }
}


// Media Styles:
.app-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

button {
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
}

.media-player {
  display: flex;
  flex-direction: column;
  align-items: center;

  video,
  audio {
    margin-top: 15px;
    max-width: 400px;
  }
}

</style>
