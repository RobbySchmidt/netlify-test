<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
  body {
    overflow-x: hidden;
  }
  .page-enter-active,
  .page-leave-active {
    transition: all 0.2s;
  }
  .page-enter-from,
  .page-leave-to {
    opacity: 0;
  }
</style>