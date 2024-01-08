<template>
  <nav id="sidebar" class="sidebar">
    <ul class="list-unstyled components">
      <li :class="{ active: isRouteActive('/') }">
        <router-link to="/" class="alink"><i class="fas fa-film"></i> My Recordings</router-link>
      </li>
      <li :class="{ active: isRouteActive('/requested') }">
        <router-link to="/requested" class="alink"><i class="fas fa-share-alt"></i> Requested</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "SideNav",

  methods: {
    isRouteActive(route) {
      return this.$route.path === route;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#sidebar {
  min-width: 290px;
  max-width: 290px;
  background: #F9FBFC;
  color: #fff;
  transition: all 0.3s;
  min-height: 100vh;
  height: auto;
  padding-left: 15px;
  padding-right: 15px;
  border-right: 1px solid #ccc;
  overflow-x: hidden;

  @media (max-width: 767px) {
    width: 0;
    display: none;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #F9FBFC;
    overflow-x: hidden;
    transition: 0.5s;

    ul li {
      display: block;
      text-align: center;
      margin-bottom: 10px;
    }

    .components {
      margin-top: 15px;
    }

    .alink {
      padding: 10px;
      text-align: center;
      font-size: 17px;
      color: #818181;
      display: block;
      transition: color 0.3s;
      border-radius: 6px;

      i {
        padding-right: 8px;
      }
    }

    .alink:hover {
      color: #000;
      background: #ccc;
    }

    .active .alink {
      color: #000;
      background: #ccc;
    }
  }

  ul li {
    border: 1px solid #eee;
    margin-bottom: 15px;
    border-radius: 6px;
  }

  .components {
    margin-top: 35px;
  }

  .alink {
    padding: 10px;
    text-align: left;
    text-decoration: none;
    font-size: 17px;
    color: #818181;
    display: block;
    transition: color 0.3s;
    border-radius: 6px;
    padding-left: 35px;

    i {
      padding-right: 8px;
    }
  }

  .alink:hover {
    color: #000;
    background: #ccc;
  }

  .active .alink {
    color: #000;
    background: #ccc;
  }
}
</style>
