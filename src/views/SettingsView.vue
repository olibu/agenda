<template>
  <v-card
    class="ma-2 pa-3 rounded-lg bg-cardbg"
    tonal
  >
    <v-card-title align="center">Settings</v-card-title>
    <v-row class="mt-3">
      <v-col class="align-self-center">
        Darkmode
      </v-col>
      <v-col cols="4">
        <v-select
          :items="['os', 'dark', 'light']"
          v-model="store.theme"
          density="compact"
          hide-details
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col class="align-self-center">
        Sound on
      </v-col>
      <v-col cols="4">
        <v-checkbox
            class="ma-0 pa-0"
            v-model="store.soundOn"
            hide-details
          />
      </v-col>
    </v-row>

    <v-row>
      <v-col class="align-self-center">  
        Automatic move to next agenda entry
      </v-col>
      <v-col cols="4">
        <v-checkbox
            class="ma-0 pa-0 pr-2"
            v-model="store.autoOn"
            hide-details
          />
      </v-col>
    </v-row>

    <v-row>
      <v-col class="align-self-center">  
        Adjust start time
      </v-col>
      <v-col cols="4">
        <v-checkbox
            class="ma-0 pa-0 pr-2"
            v-model="store.adjustStartTime"
            hide-details
          />
      </v-col>
    </v-row>

    <v-row>
      <v-col class="align-self-center">  
      </v-col>
      <v-col cols="4">
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