<template>
  <div class="loading">
    <svg class="loading__indicator" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <title>Loading</title>
      <path
        d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="1000ms"
          values="0 12 12;360 12 12"
          repeatCount="indefinite"
        />
      </path>
    </svg>
    <p class="loading__message">Loading Dictionary</p>
  </div>
</template>

<style scoped lang="scss">
.loading {
  display: grid;
  grid-template-rows: repeat(2, max-content);
  row-gap: var(--sz-md);
  position: fixed;
  inset: 0;
  padding: var(--sz-xl);
  background-color: var(--cl-modal-backdrop);
  backdrop-filter: blur(var(--sz-xs));

  &__indicator {
    max-width: var(--sz-2xl);
    margin-inline: auto;
    fill: var(--cl-icon);
  }

  &__message {
    font-size: var(--sz-text-lg);
    text-align: center;
  }
}
</style>

<script setup lang="ts"></script>
