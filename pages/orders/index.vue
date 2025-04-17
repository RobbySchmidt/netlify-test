<template>
  <div class="p-4 mx-auto md:w-10/12 space-y-4">
    <h2 class="text-2xl text-prime font-bold">List of Orders</h2>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[200px]">
            Payment ID
          </TableHead>
          <TableHead>Payment Status</TableHead>
          <TableHead>Date of Order</TableHead>
          <TableHead class="text-right">
            Amount
          </TableHead>
          <TableHead class="text-right">
            Processed
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="order in orders" :key="order.id">
          <TableCell class="font-medium">
            <NuxtLink :to="`/orders/${order.id}`" class="hover:underline text-prime">
              {{ order.payment_id }}
            </NuxtLink>
          </TableCell>
          <TableCell>{{ order.status }}</TableCell>
          <TableCell>{{ formatTimestamp(order.timestamp) }}</TableCell>
          <TableCell class="text-right">
            {{ order.total }}€
          </TableCell>
          <TableCell class="text-right">
            <span 
              v-if="order.processed"
              class="text-prime inline-block">
              <Check />
            </span>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<script setup>
  import { Check } from 'lucide-vue-next';
  import { useStore } from '/store/store.ts'
  const { orders } = useStore()
  definePageMeta({
    middleware: 'auth'
  });
</script>

<style scoped>

</style>