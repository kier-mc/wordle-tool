<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Transition name="fade">
    <AppLoadingIndicator v-if="isLoading" />
  </Transition>
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 500ms var(--ef-out-quart);
  transition-delay: 500ms;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<script setup lang="ts">
import type { StatefulWordData } from "~/types/api.dataset";
import type { UseFetchOptions } from "nuxt/app";
import type { AsyncDataRequestStatus } from "~/node_modules/nuxt/dist/app/composables/asyncData";

const options: UseFetchOptions<StatefulWordData> = { deep: false };

useSeoMeta(seoMetadata);

const { isLoading } = useDataset();

onBeforeMount(async () => {
  const { data, status } = await useFetch("/api/dataset", options);
  useState<StatefulWordData>("dataset", () => shallowRef(data));
  useState<AsyncDataRequestStatus>("dataset-status", () => status);
});
</script>
