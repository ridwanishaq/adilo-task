<template>
  <!-- Top Header -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">

      <div class="logo-bar">
        <img :src="adiloLogoSrc" alt="Adilo Logo">
      </div>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarScroll">
        <!-- Left side navigation links -->
        <ul class="left-nav-menus navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Projects</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Tools &amp; App
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><a class="dropdown-item" href="#">Snapbyte Recorder</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Audio Bounce</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Sugar Voice</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Channels</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Contacts</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Analytics</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Settings</a>
          </li>
        </ul>

        <!-- Right side navigation links and user profile -->
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link text-bold" href="">Help</a>
          </li>
          <div class="vertical-breaker"></div>
          <li class="nav-item dropdown">
            <div class="profile-box">
              <div class="profile-photo">
                <img src="../assets/profile.jpeg" alt="Profile Photo">
              </div>
              <div class="profile-info">
                <p>Rilwanu Isyaku</p>
                <small>rilwanu@engineer.com</small>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import AdiloLogo from "@/assets/adilo-logo.png";

export default {
  name: "Header",

  data() {
    return {
      adiloLogoSrc: AdiloLogo,
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
/* Top Header Styles */
.text-bold {
  font-weight: bold;
}
.vertical-breaker {
  border-right: 1px solid #ccc;
  height: 40px;
}
.navbar {
  background-color: #fff !important;
  border-radius: 0px;
  border-bottom: 1px solid #ccc;

  .left-nav-menus > li{
    margin-right:20px;
  }
}

.logo-bar {
  min-width: 278px;
  max-width: 278px;
  height: 60px;
  line-height: 60px;

  img {
    height: 55px;
  }
}

.profile-box {
  display: flex;
  align-items: center;
  margin-left: 15px;
  margin-right: 30px;

  .profile-photo {
    margin-right: 10px;

    img {
      width: 40px;
      height: 40px;
      border-radius: 8px;
    }
  }

  .profile-info {
    text-align: left;

    p {
      margin: 0;
      font-weight: bold;
      font-size: 14px;
    }

    small {
      display: block;
      font-size: 11px;
      color: #777;
    }
  }
}

.navbar-light .navbar-nav .nav-link {
  color: #495057;
}

.navbar-light .navbar-nav .nav-link:hover {
  color: #007bff;
}

.no-border {
  border-radius: 0px;
}

.m-gap {
  margin: 0px 4px 0px 15px;
}

.w-space {
  width: 220px;
  border-radius: 0px;
}
</style>
