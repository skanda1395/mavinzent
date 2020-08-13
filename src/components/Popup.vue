<template>
  <v-dialog
      max-width="600px"
      v-model="dialog"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          text
          v-on="on"
          class="warning text-center my-2"
          v-show="isCustomer"
        >
          Add New Ticket
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <h2>Ticket Details</h2>
        </v-card-title>
        <v-card-text>
          <v-form class="px-3" ref="form">
            <v-text-field label="Title" v-model="title" prepend-icon="mdi-folder" :rules="inputRules"></v-text-field>
            <v-textarea label="Information" v-model="content" prepend-icon="mdi-pencil-outline" :rules="inputRules"></v-textarea>
            <v-menu>
              <template v-slot:activator="{ on }">
                <v-text-field v-on="on" label="Due Date" prepend-icon="mdi-calendar-range" :value="formattedDate" :rules="inputRules"></v-text-field>
              </template>
              <v-date-picker landscape show-current v-model="due"></v-date-picker>
            </v-menu>
            <v-btn class="success mx-0 mt-3" @click="submit" :loading="loading">Add Ticket</v-btn>
          </v-form>
        </v-card-text>
      </v-card>

    </v-dialog>
</template>

<script>
import format from "date-fns/format";
import db from "@/fb.js";

export default {
  data() {
    return {
      title: "",
      content: "",
      due: null,
      inputRules: [
        v => v.length >= 3 || "Minimum length is 3 characters"
      ],
      loading: false,
      dialog: false,
      type: null
    }
  },
  methods: {
    submit() {
      if(this.$refs.form.validate()) {
        this.loading = true;

        const project = {
          name: localStorage.name,
          title: this.title,
          content: this.content,
          due: format(new Date(this.due), "do MMMM yyyy"),
          status: "open"
        }

        db.collection("tickets").add(project).then(() => {
          this.loading = false;
          this.dialog = false;
          this.$emit("projectAdded")
        })
      }
    }
  },
  computed: {
    formattedDate() {
      return this.due ? format(new Date(this.due), "do MMMM yyyy"): "";
    },
    isCustomer() {
      return localStorage.type == "Customer"? true: false;
    }
  },
}
</script>

<style>

</style>