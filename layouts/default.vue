<template>
  <div class="grid">
    <main class="main">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped lang="scss">
@use "../assets/styles/var/size";
.grid {
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 100svh;
}
.main {
  display: grid;
  row-gap: var(--sz-xl);
  width: 100%;
  max-width: 80ch;
  height: max-content;
  margin-inline: auto;
  padding: var(--sz-xl);
  @media (max-width: size.breakpoint("md")) {
    padding: var(--sz-md);
  }
}
</style>

<script setup lang="ts"></script>
