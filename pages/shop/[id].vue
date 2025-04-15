<template>
  <div>
    <div v-if="product" class="p-4 max-w-3xl mx-auto space-y-6">
      <div class="md:flex items-center justify-between space-y-4 md:space-y-0">
        <button 
          @click="$router.back()"
          class="bg-prime rounded-md py-1.5 px-3 text-white hover:cursor-pointer hover:bg-prime-600 duration-200 ease-in-out flex items-center gap-2 group"
        >
          <MoveLeft
            class="size-5 flex-none group-hover:-translate-x-1 duration-200 ease-in-out" />
          <span>Back to Sortiment</span>
        </button>
        <div class="space-x-3 md:space-x-4">
          <span class="bg-prime text-white rounded-md px-3 py-1.5 inline-block">
            {{ formatRating(product.rating.rate) }} rating
          </span>
          <span class="bg-prime text-white rounded-md px-3 py-1.5 inline-block">
            {{ product.rating.count }} left
          </span>
        </div>
      </div>
      <div class="relative rounded-md shadow-md overflow-hidden grid md:grid-cols-2 container items-center bg-[#ffffff]">
        <div>
          <img 
            class="block w-full p-4 object-contain" 
            :src="product.image" alt=""
          />
        </div>
        <div class="p-4 space-y-8">
          <h2 class="text-xl">{{ product.title }}</h2>
          <p class="text-sm text-[#6c7289]">{{ product.description }}</p>
          <div class="flex items-center gap-4">
            <span class="font-bold text-prime text-4xl md:text-3xl">
              {{ formatPrice(product.price) }}€
            </span>
          </div>
          <button @click="addToCart" class="bg-prime w-full flex items-center justify-center gap-4 text-[#ffffff] py-2 rounded-md hover:cursor-pointer hover:bg-prime-600 duration-200 ease-in-out">
            <img class="block" src="/images/icon-cart.svg" alt=""/>
            <span>Add to Cart</span>
          </button>

          <div v-if="isItemAdded" class="mt-4 text-prime text-sm font-semibold">
            Item has been added to your cart
            <span v-if="addedQuantity > 1">{{ addedQuantity }} times</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { MoveLeft } from 'lucide-vue-next';
  import { useStore } from '/store/store.ts'
  const store = useStore()

  const { params } = useRoute()

  const product = computed(() => store.getProductById(params.id))

  // Track if an item has been added
  const isItemAdded = ref(false)
  // Track the quantity of the item in the cart
  const addedQuantity = computed(() => {
    const itemInCart = store.shoppingcart.find(item => item.id === product.value?.id)
    return itemInCart ? itemInCart.quantity : 0
  })

  // Function to add item to the cart
  const addToCart = () => {
    if (product.value) {
      store.addToCart(product.value)
      isItemAdded.value = true

      // Hide the success message after 3 seconds
      setTimeout(() => {
        isItemAdded.value = false
      }, 3000)
    }
  }

  onMounted(() => {
    store.fetchProducts()
  })
</script>

<style scoped>
  
</style>
