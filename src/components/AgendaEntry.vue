<template>
  <v-row
    class="pa-2 ma-1 rounded-lg d-flex flex-nowrap"
    align="center"
    v-bind:class="interactiveBgColor()"
  >
    <v-text-field
      label="title"
      density="compact"
      variant="outlined"
      hide-details="auto"
      v-model="agenda.title"
      class="pr-1"
    />
    <v-text-field
      label="min"
      density="compact"
      variant="outlined"
      hide-details="auto"
      v-model="agenda.time"
      type="number"
      class="w80px"
    />
    <v-btn
      @click="deleteAgendaEntry"
      tabindex="-1"
      icon="mdi-delete"
      density="compact"
      variant="text"
    />
    <v-btn
      tabindex="-1"
      icon="mdi-drag"
      density="compact"
      variant="text"
      class="handle move"
    />
  </v-row>
</template>

<script setup>
import { watch } from 'vue'

const props = defineProps(['agenda'])

const emit = defineEmits(['delete', 'timechange'])

watch(() => props.agenda.time, (newValue, oldValue) => {
  let oldTime = parseInt(oldValue)
  if (isNaN(oldTime)) { oldTime = 0}
  let newTime = parseInt(newValue)
  if (isNaN(newTime)) { newTime = 0}

  emit('timechange', {newTime, oldTime})
})

const interactiveBgColor = () => {
  let bgColor = 'bg-purple-darken-2'
  if (props.agenda && props.agenda.isActive) {
    bgColor = 'bg-pink-darken-3'
  }
  return bgColor
}

const deleteAgendaEntry = () => {
  emit('delete', props.agenda)
}
</script>
<style>
  .h-align {
    text-align: center;
  }
  .move {
    cursor: move;
  }
  .w80px {
    max-width: 80px;
  }
</style>