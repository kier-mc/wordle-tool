<template>
  <footer class="footer">
    <a class="link" href="https://github.com/kier-mc" target="_blank">
      <AppIcon class="icon" icon="github" />
    </a>
  </footer>
</template>

<style scoped lang="scss">
@use "../assets/styles/var/colour";
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--sz-md);
  background-color: var(--cl-footer);
}
.link {
  all: unset;
  cursor: pointer;
}
.icon {
  fill: var(--cl-icon);
  transition: fill 500ms var(--ef-out-quart);
  &:hover {
    fill: var(--cl-icon-hover);
  }
}
</style>

<script setup lang="ts"></script>
