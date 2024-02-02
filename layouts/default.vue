<template>
  <div class="grid">
    <main class="main">
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
.main {
  margin-top: var(--sz-xl);
}
</style>

<script setup lang="ts"></script>
