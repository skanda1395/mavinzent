<template>
<v-row justify="center" class="mt-5">
  <v-col xs="12" sm="6" lg="4">
    <v-card>
      <v-card-title class="justify-center">
        <h3>Support Desk</h3>
      </v-card-title>

      <v-card-text class="text-center">
        <v-form ref="loginForm">
          <v-text-field label="Name" v-model="name" prepend-icon="mdi-account" :rules="loginRules"></v-text-field>
          <v-radio-group row v-model="currentUserType" :rules="loginRules">
            <template v-slot:label>
              <div>You are a: </div>
            </template>
            <v-radio
              v-for="userType in userTypes"
              :key="userType"
              :label="`${userType}`"
              :value="userType"
            ></v-radio>
          </v-radio-group>
          <v-btn color="primary" @click="login">Login</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-col>
</v-row>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      userTypes: ["Customer", "Manager", "Employee"],
      currentUserType: "",
      loginRules: [
         v => !!v || 'Required.',      
      ]
    }
  },
  methods: {
    login() {
      if(this.$refs.loginForm.validate()) {
        localStorage.name = this.name;
        localStorage.type = this.currentUserType;

        this.$router.push({
          name: "Dashboard",
        });
      }
    }
  }
}
</script>

<style>

</style>