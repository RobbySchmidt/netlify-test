<template>
  <div class="p-4">
    <NuxtLink class="underline" to="/shop">Zum Shop</NuxtLink>
    <pre>{{ orders }}</pre>
  </div>
</template>

<script setup lang="ts">
  const { $directus, $readItems } = useNuxtApp()

  const { data: orders } = await useAsyncData('orders', () => {
    return $directus.request(
    $readItems('orders', {
      fields: ['*'],
    })
    )
  })

</script>

<style scoped>

</style>