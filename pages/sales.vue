<template>
  <div>
    <highchart :options="chartOptions" />
  </div>
</template>

<script setup>
  import { useStore } from '~/store/store'

  definePageMeta({
    middleware: 'auth'
  });

  const store = useStore()

  const monthlySales = computed(() => {
    const salesPerMonth = Array(12).fill(0)

    store.orders.forEach(order => {
      const date = new Date(order.timestamp)
      const month = date.getMonth()
      const total = parseFloat(order.total)
      salesPerMonth[month] += total
    })

    return salesPerMonth
  })

  const chartOptions = computed(() => ({
    chart: {
      type: 'column'
    },
    title: {
      text: 'Monthly Sales'
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Sales in Euro'
      }
    },
    series: [
      {
        name: 'Sales',
        color: '#3c8067',
        data: monthlySales.value
      }
    ]
  }))
</script>