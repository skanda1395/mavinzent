<template>
  <nav>
    <v-snackbar v-model="snackbar" :timeout="4000" top>
      <span>Awesome! You raised a new ticket.</span>
      <v-btn text color="red" @click="snackbar = false">close</v-btn>
    </v-snackbar>

    <v-app-bar flat>
      <v-app-bar-nav-icon class="grey--text" @click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Mavinzent</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- dropdown menu -->
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
         <v-btn text v-on="on" color="grey">
           <v-icon left>mdi-menu-open</v-icon>
           <span>Menu</span>
         </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="link in links"
            :key="link.text"
            router :to="link.route"
          >
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>


      <v-btn text color="grey">
        <v-icon left>mdi-exit-to-app</v-icon>
        <span>Sign Out</span>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" class="primary">
      <v-row class="px-2" justify="center" align="center">
        <v-col cols="3">
         <v-avatar size="50">
            <img src="/avatar-1.png"> 
          </v-avatar> 
        </v-col>
        <v-col class="white--text subheading">
          {{ name }}
        </v-col>
        <v-col class="mb-2 text-center">
          <Popup @projectAdded="snackbar = true" />
        </v-col>
      </v-row>
      <v-list>
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Popup from "./Popup";
export default {
  components: {
    Popup
  },
  data() {
    return {
      drawer: true,
      links: [
        { icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/dashboard' },
        { icon: 'mdi-folder', text: 'Ticket List', route: '/ticket_list' },
        { icon: 'mdi-account', text: 'Ticket Details', route: '/ticket_details' },
      ],
      snackbar: false,
      name: localStorage.name,
    }
  },
  computed: {
    addTicket() {
      return this.type == "Customer"? true: false
    }
  },
}
</script>

<style>
  .mdi-menu-open {
    transform: rotate(180deg);
  }
</style>