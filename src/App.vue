<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
  <n-dialog-provider>
    <n-message-provider placement="top" >
      <n-notification-provider placement="top" >
        <router-view v-slot="{ Component, route }">
          <!-- Use any custom transition and fallback to `fade` -->
          <transition :name="route.meta.transition || ''">
            <component :is="Component" />
          </transition>
        </router-view>
      </n-notification-provider>
    </n-message-provider>
  </n-dialog-provider>
</template>
<script>
export default {
  mounted(){
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 0.8rem;
}
</style>
