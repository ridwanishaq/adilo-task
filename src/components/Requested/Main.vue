<template>
  <!-- Page Content -->
  <div id="content">
    <div class="col-md-12 d-flex mb-3 w-arrow">
      <p class="label-text">Snapbyte &rsaquo; Requested</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@base-font-size: 14px;
@base-color: grey;

.label-text {
  font-size: @base-font-size;
  color: @base-color;
}

#content {
  width: 100%;
  transition: all 0.3s;
  border-radius: 5px;
  padding: 1rem; /* Adjust as needed */
  box-sizing: border-box;
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
