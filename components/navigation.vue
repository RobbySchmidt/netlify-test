<template>
  <div>
    <nav class="flex justify-between items-center border-b border-prime shadow bg-white fixed w-full z-50">
      <ul class="flex">
        <li v-for="link in navigationItems">
          <NuxtLink 
            class="bg-prime hover:bg-prime-600 duration-200 ease-in-out block py-4 px-6 text-white border-r"
            :to="link.href">
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>
      <admin />
    </nav>
  </div>
</template>

<script setup>
  const user = useDirectusUser();

  const navigationItems = computed(() => {
    const items = [
      { href: '/shop', label: 'Shop' }
    ];

    if (user.value) {
      items.push({ href: '/orders', label: 'Orders' });
    }

    return items;
  });
</script>


<style scoped>

</style>