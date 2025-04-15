<template>
  <Select v-model="store.selectedCategory">
    <SelectTrigger class="w-[180px]">
      <span>
        {{ store.selectedCategory === null ? 'All Categories' : store.selectedCategory }}
      </span>
    </SelectTrigger>
    <SelectContent>
      <SelectItem :value="null">All Categories</SelectItem>
      <SelectItem
        v-for="category in store.getCategories"
        :key="category"
        :value="category"
      >
        {{ category }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>

<script setup>
  import { useStore } from "/store/store";
  const store = useStore();
</script>
