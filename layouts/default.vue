<template>
  <v-app style="height: 100vh; width: 100vw">
    <Nuxt />
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'top',
          to: '/top'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'planning poker',
    }
  }
}
</script>
