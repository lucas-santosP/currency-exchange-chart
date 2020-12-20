<template>
  <transition name="loading-transition">
    <div
      v-if="state"
      class="container-loading"
      @click.stop
      @keydown.stop
      @keypress.stop
    >
      <div class="spinner"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "LoadingView",
  props: {
    state: { type: Boolean, default: false }
  }
};
</script>

<style scoped lang="scss">
.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2005;
  transform: translate(-50%, -50%);
  height: 60px;
  width: 60px;
  border: 8px solid #42b983;
  border-left-color: #338d64;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

// .loading-transition-enter-active {
//   animation: fadeIn 200ms ease;
// }
// .loading-transition-leave-active {
//   animation: fadeOut 200ms ease;
// }
</style>
