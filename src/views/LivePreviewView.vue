<template>
  <div>
    <!-- Header -->
    <Header />
    <div class="wrapper">
      <!-- Sidebar -->
      <!-- <SideNav /> -->

      <div id="right-side">
        <!-- Main -->
        <LivePreview />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import SideNav from '@/components/SideNav.vue'
import LivePreview from '@/components/Recordings/LivePreview.vue'

export default {
  name: "ProjectView",
  components: {
    Header,
    SideNav,
    LivePreview,
  }
};
</script>

<style scoped lang="less">

/** Scrollbar styling */ 
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

.wrapper {
  display: flex;
  background-color: #F5FDFF;
  min-height: 100vh;
  height: auto;
}

#right-side{
  width: 100%;
  padding: 25px;
}

</style>
