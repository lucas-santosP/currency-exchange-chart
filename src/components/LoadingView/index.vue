<template>
  <transition name="fade">
    <div
      v-if="state"
      @click.stop
      @keydown.stop
      @keypress.stop
      class="loading-container"
    >
      <div class="spinner"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "LoadingView",
  props: { state: { type: Boolean, default: false } },
};
</script>

<style scoped lang="scss">
.loading-container {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: wait;
  background-color: rgba(255, 255, 255, 0.52);

  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1005;
    transform: translate(-50%, -50%);
    height: 60px;
    width: 60px;
    border: 8px solid #42b983;
    border-left-color: #338d64;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
