<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<script setup>
useHead({
  script: [
    {
      defer: true,
      'data-domain': 'mufraggi.eu',
      src: 'http://plausible-d8skcoc8wowccsskk8g4wsgc.195.201.113.227.sslip.io/js/script.file-downloads.hash.outbound-links.pageview-props.revenue.tagged-events.js',
    },
    {
      children: `window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`
    }
  ]
})
</script>