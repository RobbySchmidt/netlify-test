<template>
  <div>
    <Sheet>
      <SheetTrigger as-child>
        <Button
          variant="primary"
          class="bg-prime cursor-pointer rounded-full p-3 text-white md:hover:bg-prime-600 duration-200 ease-in-out flex items-center justify-center gap-2">
          <img class="w-6 h-6" src="/images/icon-cart.svg" alt="Cart Icon">
          <span>{{ totalItemsInCart }}</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Items in Shopping Cart</SheetTitle>
        </SheetHeader>
          <ul class="space-y-2">
            <li v-for="cartItem in store.shoppingcart" :key="cartItem.id" class="flex justify-between gap-8 items-start">
              <span class="text-sm">{{ cartItem.title }} x{{ cartItem.quantity }}</span>
              <div class="flex items-center gap-2">
                <span class="text-sm">{{ (cartItem.price * cartItem.quantity).toFixed(2) }}€</span>

                <Plus 
                  @click="store.increaseQuantity(cartItem.id)"
                  class="w-3 h-3 cursor-pointer"
                />
                <Minus  
                  @click="store.decreaseQuantity(cartItem.id)"
                  class="w-3 h-3 cursor-pointer"
                />

                <CircleX
                  @click="store.removeFromCart(cartItem.id)"
                  class="w-5 h-5 text-red-500 cursor-pointer"
                />
              </div>
            </li>
          </ul>

          <div v-if="store.shoppingcart.length === 0" class="text-gray-500 text-sm">
            Your cart is empty.
          </div>

          <div v-if="store.shoppingcart.length > 0" class="flex justify-between items-center text-lg font-semibold">
            <span>Total:</span>
            <span>{{ totalPrice }}€</span>
          </div>

          <div v-if="store.shoppingcart.length > 0" class="space-x-4">
            <SheetClose as-child>
              <Button as-child>
                <NuxtLink
                  to="/checkout"
                >
                  Buy now
                </NuxtLink>
              </Button>
            </SheetClose>
            <SheetClose as-child>
              <Button 
                variant="destructive"
                @click="store.emptyCart">
                Empty Cart
              </Button>
            </SheetClose>
          </div>
      </SheetContent>
    </Sheet>
   
  </div>
</template>

<script setup>
  import { CircleX, Minus, Plus } from 'lucide-vue-next';
  import { useStore } from '/store/store.ts'
  const store = useStore()

  const isCartOpen = ref(false)

  const totalItemsInCart = computed(() => {
    return store.shoppingcart.reduce((total, item) => total + item.quantity, 0)
  })

  const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value
  }

  const totalPrice = computed(() => {
    return store.shoppingcart.reduce((total, item) => {
      return total + (parseFloat(item.price) * item.quantity)
    }, 0).toFixed(2)
  })

  onMounted(() => {
    store.fetchProducts()
  })
</script>
