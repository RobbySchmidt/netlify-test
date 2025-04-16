<template>
  <div class="p-4 mx-auto md:w-10/12 space-y-4">
    <h2 class="text-xl text-prime">List of Orders</h2>
    <ul>
      <li v-for="order in orders">
        <NuxtLink 
          class="flex gap-4 w-fit"
          :to="`/orders/${order.id}`">
          <span>{{ order.payment_id }}</span>
          <span>{{ formatTimestamp(order.timestamp) }}</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { useStore } from '/store/store.ts'
  const { orders } = useStore()
  definePageMeta({
    middleware: 'auth',
  });
</script>

<style scoped>

</style>