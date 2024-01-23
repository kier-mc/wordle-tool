<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { StatefulWordData } from "~/types/api.dataset";
import type { UseFetchOptions } from "nuxt/app";
import type { AsyncDataRequestStatus } from "nuxt/dist/app/composables/asyncData";

const options: UseFetchOptions<StatefulWordData> = { deep: false };

onBeforeMount(async () => {
  const { data, status } = await useFetch("/api/dataset", options);
  useState<StatefulWordData>("dataset", () => shallowRef(data));
  useState<AsyncDataRequestStatus>("dataset-status", () => status);
});
</script>
