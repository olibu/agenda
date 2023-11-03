<template>
  <v-card
    class="ma-2 pa-3 rounded-lg bg-cardbg"
    tonal
  >
    <v-card-title align="center">Settings</v-card-title>
    <v-row class="mt-3">
      <v-col class="align-self-center">
        Theme
      </v-col>
      <v-col cols="5" class="d-flex flex-nowrap">
        <v-select
          :items="['os', 'dark', 'light', 'customDark', 'customLight']"
          v-model="store.theme"
          density="compact"
          hide-details
        />
        <v-btn 
          icon="mdi-pencil"
          variant="text"
          density="compact"
          class="ml-1 align-self-center"
          :disabled="(store.theme==='customLight' || store.theme==='customDark')?false:true"
          @click="openThemeEditor"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col class="align-self-center">
        Sound on
      </v-col>
      <v-col cols="5">
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
      <v-col cols="5">
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
      <v-col cols="5">
        <v-checkbox
            class="ma-0 pa-0 pr-2"
            v-model="store.adjustStartTime"
            hide-details
          />
      </v-col>
    </v-row>

    <v-row>
      <v-col class="align-self-center">  
        Show start time of agenda entry
      </v-col>
      <v-col cols="5">
        <v-checkbox
            class="ma-0 pa-0 pr-2"
            v-model="store.showStartTime"
            hide-details
          />
      </v-col>
    </v-row>

    <v-row>
      <v-col class="align-self-center">  
      </v-col>
      <v-col cols="5">
      </v-col>
    </v-row>

    <v-row class="ma-2"></v-row>

    <v-dialog
      v-model="editorDlg"
      persistent
    >
      <v-card
      >
        <v-card-title class="text-h5">
          Theme editor
        </v-card-title>
        <v-textarea
          v-model="customTheme"
          variant="outlined"
          class="ma-2"
          rows="8"
          hide-details
          hint="sd"
          density="compact"
        />
        <div
          class="pa-2 d-flex justify-center"
        >
          <v-color-picker
            dot-size="13"
            mode="hex"
            model-value="hex"
          />
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="gray"
            variant="text"
            @click="editorDlg = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="secondary"
            variant="text"
            @click="editorDlg = false; saveColors()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
  import { useMeetingStore } from '@/stores/MeetingStore.js'
  import { useTheme } from 'vuetify'
  import { ref, watch } from 'vue'

  const store = useMeetingStore()

  const vTheme = useTheme()

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
  
    vTheme.global.name.value = themeSetting
  })

  /**
   * Theme editor
   */

  const editorDlg = ref(false)
  const customTheme = ref('')
  const hex = ref('#000000')

  const openThemeEditor = () => {
    if (store.theme === 'customDark') {
      customTheme.value = JSON.stringify(store.customThemeD, ' ', 2)
    }
    else {
      customTheme.value = JSON.stringify(store.customThemeL, ' ', 2)
    }
    editorDlg.value = true
  }

  const saveColors = () => {
    if (store.theme === 'customDark') {
      store.customThemeD = JSON.parse(customTheme.value)
    }
    else {
      store.customThemeL = JSON.parse(customTheme.value)
    }
    store.refreshTheme(vTheme)
  }

</script>

<style local>
.bred {
  border: 1px solid red
}
</style>