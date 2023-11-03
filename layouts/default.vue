<template>
  <v-app style="height: 100vh; width: 100vw">
    <v-navigation-drawer app temporary v-model="drawer" width="200">
      <v-list>
        <v-list-item link to="/top">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>top</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="resetName">
          <v-list-item-icon>
            <v-icon>mdi-pen</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>edit name</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>
    <Nuxt/>
  </v-app>
</template>

<script>
import Cookies from 'js-cookie';

export default {
  name: 'DefaultLayout',
  data() {
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
  },
  methods: {
    resetName() {
      Cookies.remove('userInfo');
      this.$route.params.roomId ? this.$router.push(`/?redirectRoomId=${this.$route.params.roomId}`) : this.$router.push('/top');
    }
  }
}
</script>
