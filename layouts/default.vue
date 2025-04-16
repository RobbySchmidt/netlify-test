<template>
    <div>
      <div class="flex justify-between items-center border-b border-prime">
        <navigation />
        <shoppingCart />
      </div>
        
      <div class="py-12 md:py-20">
        <slot />
      </div> 
    </div>
  </template>