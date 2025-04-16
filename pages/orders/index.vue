<template>
  <div class="p-4 mx-auto max-w-3xl space-y-4">
    <h2 class="text-xl text-prime">List of Orders</h2>
    <ul>
      <li v-for="order in orders">
        <NuxtLink 
          class="flex gap-4 w-fit"
          :to="`/orders/${order.id}`">
          <span>{{ order.payment_id }}</span>
          <span>{{ formatTimestamp(order.timestamp) }}</span>
          <span>{{ order.user_name }}</span>
          <span>{{ order.total }}€</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { useStore } from '/store/store.ts'
  const { orders } = useStore()
</script>

<style scoped>

</style>