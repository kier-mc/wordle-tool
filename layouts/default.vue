<template>
  <div class="grid">
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 100svh;
}
</style>

<script setup lang="ts"></script>
