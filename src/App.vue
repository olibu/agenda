<template>
  <v-app>
    <v-bottom-navigation 
      permanent
      rail
    >
        <v-btn
          to="/"
        >
          <v-icon>mdi-calendar</v-icon>
          <span>Meetings</span>
        </v-btn>
        <v-btn
          to="/meeting/-1"
        >
          <v-icon>mdi-plus</v-icon>
          <span>New</span>
        </v-btn>
        <v-btn
          to="/about"
        >
          <v-icon>mdi-information</v-icon>
          <span>New</span>
        </v-btn>
    </v-bottom-navigation>

    <v-main>
      <RouterView />
      <ReloadPrompt />
    </v-main>
  </v-app>
</template>

<script setup>
  import ReloadPrompt from './components/ReloadPrompt.vue';
</script>