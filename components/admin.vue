<template>
  <div>
    <NuxtLink
      class="duration-200 ease-in-out block py-4 px-6 text-white cursor-pointer"
      :class="isAuthenticated ? 'bg-red-500 md:hover:bg-red-600' : 'bg-prime-500 md:hover:bg-prime-600'"
      @click="handleAuthAction">
      {{ isAuthenticated ? 'Ausloggen' : 'Einloggen' }}
    </NuxtLink>
  </div>
</template>

<script setup>

const { logout } = useDirectusAuth();

const user = useDirectusUser();

const isAuthenticated = computed(() => !!user.value);


const handleAuthAction = async () => {
  if (user.value) {
    await logout();
    await navigateTo('/login');
  } else {
    await navigateTo('/login');
  }
};
</script>
