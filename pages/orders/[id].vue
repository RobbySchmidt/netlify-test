<template>
  <div class="p-4 mx-auto md:w-8/12 space-y-6">
    <NuxtLink 
      to="/orders"
      class="bg-prime rounded-md py-1.5 px-3 text-white md:hover:cursor-pointer md:hover:bg-prime-600 duration-200 ease-in-out flex items-center gap-2 group w-fit"
    >
      <MoveLeft
        class="size-5 flex-none group-hover:-translate-x-1 duration-200 ease-in-out" />
      <span>Back to Orders</span>
    </NuxtLink>

    <div class="bg-white shadow-lg rounded-lg p-4 space-y-6">
      <h2 class="text-2xl text-prime font-bold">Customer Details</h2>
      <ul class="space-y-2 text-gray-700">
        <li><strong>Name:</strong> {{ order.user_name }}</li>
        <li><strong>Payment ID:</strong> {{ order.payment_id }}</li>
        <li><strong>Address:</strong> {{ order.user_address }}</li>
        <li><strong>Postal Code & City:</strong> {{ order.user_postal_code }} {{ order.user_city }}</li>
        <li><strong>Total Price:</strong> {{ order.total }}€</li>
        <li><strong>Payment Status:</strong> {{ order.status }}</li>
        <li :class="order.processed ? 'text-prime' : 'text-destructive'">
          <strong>Process Status:</strong> 
          {{ order.processed ? 'Order has been processed' : 'Order has not been processed yet' }}
        </li>
      </ul>
    </div>

    <div class="bg-white shadow-lg rounded-lg p-4 space-y-6">
      <h3 class="text-xl text-prime font-semibold">Products in Order</h3>
      <ul class="space-y-4">
        <li v-for="(item, index) in parsedItems" :key="index" class="flex items-center space-x-4">
          <img :src="item.image" alt="item image" class="w-24 h-24 object-contain flex-none" />
          <div class="space-y-1">
            <span class="text-lg font-semibold">{{ item.title }}</span>
            <div class="text-sm text-gray-600">
              <span>Price: {{ formatPrice(item.price) }}€</span><br />
              <span>Quantity: {{ item.quantity }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <Button
      @click="toggleProcessed"
      :variant="order.processed ? 'destructive' : 'default'">
      {{ order.processed ? 'Unmark as Processed' : 'Mark as Processed' }}
    </Button>
  </div>
</template>

<script setup>
  import { MoveLeft } from 'lucide-vue-next';
  import { useStore } from '/store/store.ts'

  definePageMeta({
    middleware: 'auth'
  });

  const store = useStore()

  const { params } = useRoute()

  // Get the order by ID from the store
  const order = computed(() => store.getOrderById(params.id))

  // Parse the items JSON string into an actual JavaScript array
  const parsedItems = computed(() => {
    try {
      return JSON.parse(order.value.items);
    } catch (e) {
      console.error('Error parsing items:', e);
      return [];
    }
  })

  const toggleProcessed = async () => {
    const newValue = !order.value.processed;
    await store.updateOrderProcessed(params.id, newValue);
  };
</script>
