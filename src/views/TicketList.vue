<template>
  <div id="ticketDetails">
    <NavBar />
    <div class="team">
      <h1 class="subtitle-1 grey--text">Team</h1>

      <v-container class="my-5">
        <v-card flat v-for="ticket in userTickets" :key="ticket.id" class="px-3 mb-2">
          <v-row wrap :class="`pa-2 ticket ${ticket.status}`">
            <v-col cols="12" md="6">
              <div class="caption grey--text">Ticket Title</div>
              <div>{{ ticket.title }}</div>
            </v-col>
            <v-col cols="6" sm="4" md="2">
              <div class="caption grey--text">Assigned to</div>
              <div>unassigned</div>
            </v-col>
            <v-col cols="6" sm="4" md="2">
              <div class="caption grey--text">Due by</div>
              <div>{{ ticket.due }}</div>
            </v-col>
            <v-col xs="2" sm="4" md="2">
              <div align="right">
                <v-chip small :class="`${ticket.status} white--text caption my-2`">{{ ticket.status }}</v-chip>
              </div>
            </v-col>
          </v-row>
        </v-card>

        <!-- <v-row>
          <v-col xs="12" sm="6" md="3" lg="3" v-for="person in team" :key="person.name">
            <v-card flat class="text-center">
              <v-responsive class="pt-4">
                <v-avatar size="100" class="grey lighten-2">
                  <img :src="person.avatar">
                </v-avatar>
              </v-responsive>
              <v-card-text>
                <div class="subheading">{{ person.name }}</div>
                <div class="grey--text">{{ person.role }}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="grey">
                  <v-icon small left>mdi-message</v-icon>
                  <span>Message</span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row> -->

      </v-container>
    </div>

  </div>
</template>

<script>
import db from "@/fb.js";
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

<style>
  .ticket.open {
    border-left: 4px solid orange;
  }
  .ticket.pending {
    border-left: 4px solid tomato;
  }
  .ticket.resolved {
    border-left: 4px solid green;
  }
  .ticket.waiting {
    border-left: 4px solid grey;
  }
  .ticket.closed {
    border-left: 4px solid red;
  }

  .v-chip.v-chip--no-color.theme--light.open{
    background: orange;
  }
  .v-chip.v-chip--no-color.theme--light.pending~ {
    background: tomato;
  }
  .v-chip.v-chip--no-color.theme--light.resolved {
    background: green;
  }
  .v-chip.v-chip--no-color.theme--light.waiting {
    background: grey;
  }
  .v-chip.v-chip--no-color.theme--light.closed {
    background: red;
  }

</style>
