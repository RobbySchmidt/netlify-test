<template>
  <div class="p-4 mx-auto md:w-10/12 space-y-4">
    <NuxtLink 
      to="/orders"
      class="bg-prime rounded-md py-1.5 px-3 text-white md:hover:cursor-pointer md:hover:bg-prime-600 duration-200 ease-in-out flex items-center gap-2 group w-fit"
    >
      <MoveLeft
        class="size-5 flex-none group-hover:-translate-x-1 duration-200 ease-in-out" />
      <span>Back to Orders</span>
    </NuxtLink>
    
    <h2 class="text-xl text-prime">Customer Details</h2>

    <ul>
      <li>Name: {{ order.user_name }}</li>
      <li>Payment ID: {{ order.payment_id }}</li>
      <li>Address: {{ order.user_address }}</li>
      <li>Postal Code & City: {{ order.user_postal_code }} {{ order.user_city }}</li>
      <li>Total Price: {{ order.total }}€</li>
      <li>Payment Status: {{ order.status }}</li>
    </ul>
    
    <h3 class="text-xl text-prime">Products in Order</h3>
    
    <ul class="space-y-4">
      <li v-for="(item, index) in parsedItems" :key="index">
        <div>
          <img :src="item.image" alt="item image" class="w-24 h-24 object-contain"/>
        </div>
        <div>
          <span>{{ item.title }}</span><br>
          <span>Price: {{ item.price }}€</span><br>
          <span>Quantity: {{ item.quantity }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { MoveLeft } from 'lucide-vue-next';
  import { useStore } from '/store/store.ts'
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
</script>

<style scoped>
/* Add your custom styles here */
</style>
