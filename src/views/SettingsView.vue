<template>
  <v-card
    class="ma-2 pa-3"
    tonal
  >
    <v-card-title align="center">Settings</v-card-title>
    <v-row class="mt-3">
      <v-col class="align-self-center">
        Darkmode
      </v-col>
      <v-col>
        <v-select
          :items="['os', 'dark', 'light']"
          v-model="store.theme"
          density="compact"
          hide-details
        />
      </v-col>
    </v-row>
    <v-row class="ma-2"></v-row>
  </v-card>
</template>

<script setup>
  import { useMeetingStore } from '@/stores/MeetingStore.js'
  import { useTheme } from 'vuetify'
  import { watch } from 'vue'

  const store = useMeetingStore()

  const theme = useTheme()

  watch(() => store.theme, (newValue, oldValue) => {
    let themeSetting = newValue
    if (themeSetting === 'os') {
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
      if (prefersDarkScheme.matches) {
        themeSetting = 'dark';
      } else {
        themeSetting = 'light';
      }
    }
  
    theme.global.name.value = themeSetting
  })

  // let themeSetting = store.theme

</script>

<style local>
.bred {
  border: 1px solid red
}
</style>