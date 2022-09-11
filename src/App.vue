<template>
  <v-app>
    <v-navigation-drawer 
      permanent
      rail
    >
      <v-list
        class="pa-0"
        nav
      >
        <v-list-item
          class="pl-4 ma-0"
          prepend-icon="mdi-calendar"
          title="Meetings"
          value="meetings"
          to="/"
        />
        <v-list-item
          class="pl-4 ma-0"
          prepend-icon="mdi-plus"
          title="Add meeting"
          value="new-meeting"
          to="/meeting/-1"
        />
        <v-list-item
          class="pl-4 ma-0"
          prepend-icon="mdi-information"
          title="About"
          value="about"
          to="/about"
        />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <RouterView />
      <ReloadPrompt />
    </v-main>
  </v-app>
</template>

<script setup>
  import ReloadPrompt from './components/ReloadPrompt.vue';
</script>