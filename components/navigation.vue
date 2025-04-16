<template>
  <div>
    <nav>
      <ul class="flex">
        <li v-for="link in navigationItems">
          <NuxtLink 
            class="bg-prime block py-4 px-6 text-white border-r"
            :to="link.href">
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
  const navigationItems = [
    {href: '/shop', label: 'Shop'},
    {href: '/orders', label: 'Orders'}
  ]
</script>

<style scoped>

</style>