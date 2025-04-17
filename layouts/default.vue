<template>
  <div>
    <navigation /> 
      <div 
        v-if="route.path.startsWith('/shop')"
        class="fixed top-20 right-4 z-40">
        <shoppingCart />
      </div>

    <div class="pt-16">
      <slot />
    </div> 
  </div>
</template>

<script setup>
  const route = useRoute()
</script>