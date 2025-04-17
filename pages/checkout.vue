<template>
  <div class="p-4 mx-auto max-w-3xl">
    <button 
      @click="$router.back()"
      class="bg-prime rounded-md py-1.5 px-3 text-white md:hover:cursor-pointer md:hover:bg-prime-600 duration-200 ease-in-out flex items-center gap-2 group"
    >
      <MoveLeft
        class="size-5 flex-none group-hover:-translate-x-1 duration-200 ease-in-out" />
      <span>Back to Previous Page</span>
    </button>

    <h1 class="text-2xl font-bold my-4">Checkout</h1>
    
    <div v-if="cart.length">
      <ul class="mb-4">
        <li v-for="item in cart" :key="item.id">
          {{ item.title }} x{{ item.quantity }} — €{{ (item.price * item.quantity).toFixed(2) }}
        </li>
      </ul>

      <p class="font-semibold text-lg mb-4">Total: €{{ totalPrice }}</p>

      <div class="relative z-0" id="paypal-button-container"></div>
    </div>

    <div v-else>
      <p>Your cart is empty.</p>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '@/store/store'
import { MoveLeft } from 'lucide-vue-next'
import { onMounted, computed } from 'vue'

const store = useStore()
const cart = computed(() => store.shoppingcart)
const totalPrice = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
)


// Function to save order to Directus
const saveOrder = async (paypalDetails) => {
  const order = {
    user_name: paypalDetails.payer.name.given_name + ' ' + paypalDetails.payer.name.surname,
    user_email: paypalDetails.payer.email_address,
    user_address: paypalDetails.purchase_units[0].shipping?.address?.address_line_1 || '',
    user_city: paypalDetails.purchase_units[0].shipping?.address?.admin_area_2 || '',
    user_postal_code: paypalDetails.purchase_units[0].shipping?.address?.postal_code || '',
    items: JSON.stringify(cart.value), // Convert Proxy to a plain array
    total: totalPrice.value,
    status: 'paid',
    payment_id: paypalDetails.id,
    timestamp: new Date().toISOString()
  }

  console.log('✅ Order:', order)

  try {
    const response = await fetch('https://directuscon.axtlust.de/items/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }

    const responseData = await response.json()
    console.log('✅ Order saved:', responseData)

  } catch (err) {
    console.error('❌ Error saving order to Directus:', err)
  }
}

// PayPal Buttons integration
onMounted(() => {
  if (window.paypal && cart.value.length) {
    window.paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: totalPrice.value
            }
          }]
        })
      },
      onApprove: async (data, actions) => {
        const details = await actions.order.capture()
        await saveOrder(details)
        store.emptyCart()
        navigateTo('/success')
      },
      onError: (err) => {
        console.error('PayPal Checkout Error:', err)
      }
    }).render('#paypal-button-container')
  }
})
</script>
