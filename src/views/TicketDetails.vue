<template>
  <div id="ticketDetails">
    <NavBar />
    <div class="projects">
      <h1 class="subtitle-1 grey--text">Ticket Details</h1>

      <v-container class="my-5">
        <v-expansion-panels>
          <v-expansion-panel v-for="ticket in userTickets" :key="ticket.id">
            <v-expansion-panel-header>{{ ticket.title }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-card flat>
                <v-card-text class="px-4 py-0 grey--text">
                  <div class="font-weight-bold">Due by {{ ticket.due }}</div>
                  <div>{{ ticket.content }}</div>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>
    </div>
  </div>
</template>

<script>
import db from "@/fb.js"
import NavBar from "@/components/NavBar"
export default {
  components: {
    NavBar
  },
  data() {
    return {
      userTickets: []
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
