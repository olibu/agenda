<template>
  <v-card
    class="mx-auto mt-10 bg-cardbg"
    max-width="344"
    tonal
  >
    <v-card-title align="center">About</v-card-title>
    <v-card-text>
      Agenda is a browser based standalone tool to track the time table of meetings.
    </v-card-text>
    <v-card-text>Version {{ version }}</v-card-text>
    <v-card-text>
      Further details can be found on <a href="https://github.com/olibu/agenda" target="_blank">Github</a>
    </v-card-text>
    <v-card-text>
      The user guide can be found on <a href="https://github.com/olibu/agenda/blob/main/doc/UserGuide.md" target="_blank">Github</a>, too.
    </v-card-text>
  </v-card>
</template>

<script setup>
const version = __APP_VERSION__
</script>