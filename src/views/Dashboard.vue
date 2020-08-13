<template>
  <div id="main">
    <NavBar />
    <div class="dashboard">
      <h1 class="subtitle-1 grey--text">Dashboard</h1>

      <v-container class="my-5">
        <v-row>
          <v-col>
            <v-card class="pa-2 text-center" id="total">
              <v-card-title class="justify-center">
                Total Tickets
              </v-card-title>
              <v-card-text>
                <h3>{{ userTickets.length }}</h3>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col>
            <v-card class="pa-2 text-center" id="open">
              <v-card-title class="justify-center">
                Open Tickets
              </v-card-title>
              <v-card-text>
                <h3>{{ openTickets }}</h3>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col>
            <v-card class="pa-2 text-center" id="closed">
              <v-card-title class="justify-center">
                Closed Tickets
              </v-card-title>
              <v-card-text>
                <h3>{{ closedTickets }}</h3>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar"
import db from "@/fb.js";
export default {
  props: ["name", "type"],
  components: {
    NavBar
  },
  data() {
    return {
      userTickets: [],
    }
  },
  computed: {
    closedTickets() {
      return this.userTickets.reduce((acc, curr) => curr.status == "closed"? acc + 1: acc, 0)
    },
    openTickets() {
      return this.userTickets.length - this.closedTickets;
    }
  },
  created() {
    db.collection("tickets").onSnapshot((res) => {
      const changes = res.docChanges();

      changes.forEach(change =>  {
        let currentUser = change.doc.data().name == localStorage.name;
        if(change.type  === "added" && currentUser) {
          this.userTickets.push({
            ...change.doc.data(),
            id: change.doc.id
          })
        }
      })
    })
  }
}
</script>

<style>
  #total {
    border-top: 4px solid grey;
  }
  #open {
    border-top: 4px solid orange;
  } 
  #closed {
    border-top: 4px solid green;
  }
</style>