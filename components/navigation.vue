<template>
  <div>
    <header class="fixed w-full z-50">
      <nav class="flex justify-between items-center shadow shadow-prime bg-white relative">
        <NuxtLink 
          to="/shop" 
          class="text-white bg-prime md:hover:bg-prime-600 duration-200 ease-in-out py-4 px-6">
          <Earth />
        </NuxtLink>
        <span 
          @click="store.openMenu = !store.openMenu" 
          class="text-gray-500 md:hidden py-4 px-6 cursor-pointer">
          <Menu v-if="!store.openMenu" />
          <X v-else/>
        </span>
        <ul 
          class="absolute top-[56px] right-0 h-screen bg-white w-full md:w-fit transition-transform duration-200 ease-in-out transform md:static md:translate-x-0 md:flex md:h-auto text-center border-t md:border-none"
          :class="{ 'translate-x-0': store.openMenu, 'translate-x-full': !store.openMenu }">
          <li v-for="link in navigationItems">
            <NuxtLink 
              class="bg-prime md:hover:bg-prime-600 duration-200 ease-in-out block py-4 px-6 text-white md:border-r border-b md:border-b-0"
              :to="link.href">
              {{ link.label }}
            </NuxtLink>
          </li>
          <admin />
        </ul>
      </nav>
    </header>
  </div>
</template>

<script setup>
  import { Earth, Menu, X } from 'lucide-vue-next';
  import { useStore } from '/store/store';

  const store = useStore()
  const route = useRoute();

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

  watch(() => route.fullPath, () => {
    store.openMenu = false;
  });

  useHead({
    bodyAttrs: {
      class: computed(() => {
      if (store.openMenu == true) return 'overflow-hidden';
      
      return '';
      }),
    },
  });
</script>


<style scoped>

</style>