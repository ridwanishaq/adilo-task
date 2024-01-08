<template>
  <!-- Page Content -->
  <div id="content">
    <div class="col-md-12 d-flex w-arrow">
      <p class="label-text">Snapbyte &rsaquo; My Recordings</p>
    </div>
  
    <div class="main-header">
      <div class="main-title">
        <h5>My Recordings <span>{{ recordedCount }}</span></h5>
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
                    <input type="checkbox" id="toggleSwitch1" v-model="recordScreen">
                    <label for="toggleSwitch1" class="switch"></label>
                  </div>
                </div>
                <div class="record-config">
                  <p>Record Camera</p>
                  <div class="">
                    <input type="checkbox" id="toggleSwitch2" v-model="recordCamera">
                    <label for="toggleSwitch2" class="switch"></label>
                  </div>
                </div>
                <div class="record-config">
                  <p>Record Mic</p>
                  <div class="">
                    <input type="checkbox" id="toggleSwitch3" v-model="recordMic">
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
    <div v-if="recordedCount == 0" class="empty-recorded-card">
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

    <!-- Recent Recordings -->
    <div v-if="recordedCount > 0" class="recent-recordings-card">
      <div class="recent-records-table">
       <table class="table table-borderless">
        <thead>
          <tr>
            <th>Recordings</th>
            <th>Title</th>
            <th>Views</th>
            <th>Size</th>
            <th>Last Modified</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in recordings" :key="index">
            <td>
              <img :src="recordingImgSampleSrc" alt="" class="recording-img-frame">
            </td>
            <td>
              <p>{{ item.title }}</p>
              <small>{{ item.description }}</small>
            </td>
            <td>{{ item.views }}</td>
            <td>{{ item.size }}</td>
            <td>{{ item.lastModified }}</td>
            <td>
              <div class="dropdown">
                <button type="button" class="btn" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="fa fa-ellipsis-h"></i>
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item text-danger" @click="removeRecording(index)" href="#">Remove</a></li>
                  <li><a class="dropdown-item" href="#">Options</a></li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
       </table>
      </div>
    </div>
      <!-- ./Recent Recordings -->
  
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import EmptyRecordingImage from "@/assets/empty-recording.png";
import RecordingImageSample from "@/assets/recordings/recording5.png";

export default {
  name: "Main",

  data() {
    return {
      emptyRecordSrc: EmptyRecordingImage,
      recordingImgSampleSrc: RecordingImageSample,
      recordedCount: 0,
      recordings: [],

      recordCamera: true,
      recordMic: false,
      recordScreen: true,
    };
  },
  methods: {

    newRecordingModal() {
      $(this.$refs.myModal).modal('show');
    },
    ...mapActions(['updatePreferredSettings']),
    startRecording() {

      // Validate Options
      if (!this.recordScreen && !this.recordCamera && !this.recordMic) {
        alert('Please select at least one option.');
      } else {
        
        const preferredSettings = { 
          rCamera: this.recordCamera,
          rMic: this.recordMic,
          rScreen: this.recordScreen,
        };
        this.updatePreferredSettings(preferredSettings);
        
        // Create a new recording object
        const newRecording = {
          imageSrc: '',
          title: 'Getting it right the first time',
          description: 'Video desc will be displayed here',
          views: 245,
          size: '982 KB',
          lastModified: '2 weeks ago',
        };

        const existingRecordings = JSON.parse(localStorage.getItem('recordings')) || [];

        existingRecordings.push(newRecording);
        
        localStorage.setItem('recordings', JSON.stringify(existingRecordings));

        this.recordings = existingRecordings;
        
        this.recordedCount = this.recordings.length;

        $(this.$refs.myModal).modal('hide');
        
        // move to live-preview
        this.$router.push({name:'livepreview'});
      }
    },

    // Remove recorded from localStorage
    removeRecording(index) {

      this.recordings.splice(index, 1);

      localStorage.setItem('recordings', JSON.stringify(this.recordings));

      this.recordedCount = this.recordings.length;
    },
  },

  mounted() {
    // Retrieve data from localStorage
    const storedRecordings = JSON.parse(localStorage.getItem('recordings')) || [];
    this.recordings = storedRecordings;

    // Initialize recordedCount based on the initial state of recordings
    this.recordedCount = storedRecordings.length;
  },
};
</script>

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

  // Recent Recordings
  .recent-recordings-card {
    margin-top: 30px;

    .recent-records-table {
      // border: 1px solid red;
      text-align: left;

      thead {
        tr > th {
          padding-bottom: 20px;
        }
      }

      tbody {
        tr {
          td:nth-child(1) {
            width: 100px;
          }

          td {
            padding-bottom: 20px;
            .recording-img-frame {
              height: 70px;
              width: 110px;
              border-radius: 7px;
              border: 1px solid grey;
            }
            .fa-ellipsis-h {
              font-size: 22px;
            }
          }
        }
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

</style>
