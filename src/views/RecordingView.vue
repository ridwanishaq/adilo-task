<template>
  <div>
    <!-- Header -->
    <Header />
    <div class="wrapper">
      <!-- Sidebar -->
      <SideNav />

      <div id="right-side">
        <!-- Main -->
        <Main />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import SideNav from '@/components/SideNav.vue'
import Main from '@/components/Recordings/Main.vue'

export default {
  name: "ProjectView",
  components: {
    Header,
    SideNav,
    Main,
  }
};
</script>

<style lang="less">

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
  background-color: #fff;
}

#right-side{
  width: 100%;
  padding: 25px;
}

</style>
