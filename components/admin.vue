<template>
  <div>
    <NuxtLink
      class="duration-200 ease-in-out block py-4 px-6 text-white cursor-pointer"
      :class="isAuthenticated ? 'bg-red-500 md:hover:bg-red-600' : 'bg-prime-500 md:hover:bg-prime-600'"
      @click="handleAuthAction">
      {{ isAuthenticated ? 'Logout' : 'Login' }}
    </NuxtLink>
  </div>
</template>

<script setup>

const { logout, setUser } = useDirectusAuth();
const user = useDirectusUser();

const isAuthenticated = computed(() => !!user.value);

const handleAuthAction = async () => {
  if (user.value) {
    // If it's the hardcoded admin, clear manually
    if (user.value.email === 'admin@shop.com') {
      setUser(null); // manually clear user
    } else {
      await logout(); // Directus logout
    }

    await navigateTo('/login');
  } else {
    await navigateTo('/login');
  }
};

</script>
