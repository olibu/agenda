<template>
  <v-row
    class="pa-0 ma-1 rounded-lg pr-2 pt-1 pb-1 d-flex flex-nowrap"
    align="center"
    v-bind:class="interactiveBgColor()"
  >
  <v-col
    cols="9"
    class="pl-1 pt-1 pb-1 pr-0"
  >
    <v-text-field
      label="title"
      density="compact"
      variant="outlined"
      hide-details="auto"
      v-model="agenda.title"
    />
  </v-col>
  <v-col
    cols="2"
    class="pl-1 pt-1 pb-1 pr-0"
  >
    <v-text-field
      label="min"
      density="compact"
      variant="outlined"
      hide-details="auto"
      v-model="agenda.time"
      type="number"
    />
  </v-col>
  <v-col
    cols="1"
    class="pt-1 pb-1 d-flex flex-nowrap"
  >
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
      class="pl-1 pr-2 handle move"
    />
  </v-col>
  </v-row>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps(['agenda'])

const emit = defineEmits(['create', 'delete', 'timechange'])

watch(() => props.agenda.title, (newValue, oldValue) => {
  inactive.value = true
  if (!oldValue && newValue) {
    emit('create')
  }
  else if (oldValue && !newValue) {
    emit('delete', props.agenda)
  }
  if (!newValue) {
    inactive.value = false
  }
})

const inactive = ref(false)

if (props.agenda.title) {
  inactive.value = true
}

watch(() => props.agenda.time, (newValue, oldValue) => {
  let oldTime = parseInt(oldValue)
  if (isNaN(oldTime)) { oldTime = 0}
  let newTime = parseInt(newValue)
  if (isNaN(newTime)) { newTime = 0}

  emit('timechange', {newTime, oldTime})
})

const interactiveBgColor = () => {
  let bgColor = inactive.value ? 'bg-purple-darken-2' : 'bg-grey-darken-3'
  if (inactive.value && props.agenda.isActive) {
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
</style>