<template>
  <v-row
    class="pa-2 ma-1 rounded-lg d-flex flex-nowrap"
    align="center"
    v-bind:class="interactiveBgColor()"
  >
    <v-text-field
      v-if="store.showStartTime"
      density="compact"
      variant="outlined"
      hide-details="auto"
      class="w80px pr-1"
      :value="starttime"
      readonly
      tabindex="-1"
    />
    <v-text-field
      label="title"
      density="compact"
      variant="outlined"
      hide-details="auto"
      v-model="title"
      class="pr-1"
      :readonly="props.agenda && props.agenda.isActive"
      @blur="emitUpdate"
    />
    <v-text-field
      label="min"
      density="compact"
      variant="outlined"
      hide-details="auto"
      v-model.number="timeLocal"
      type="number"
      class="w80px"
      :readonly="props.agenda && props.agenda.isActive"
      @blur="onTimeChange"
    />
    <v-btn
      @click="deleteAgendaEntry"
      tabindex="-1"
      icon="mdi-delete"
      density="compact"
      variant="text"
      :disabled="props.agenda && props.agenda.isActive"
    />
    <v-btn
      tabindex="-1"
      icon="mdi-drag-vertical"
      density="compact"
      variant="text"
      class="handle move"
    />
  </v-row>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useMeetingStore } from '@/stores/MeetingStore.js'

const store = useMeetingStore()

const props = defineProps(['agenda'])

const emit = defineEmits(['delete', 'timechange', 'update'])

// Local copies of props to avoid mutating props directly
const title = ref(props.agenda?.title ?? '')
const timeLocal = ref(props.agenda?.time ?? 0)
const starttime = ref(props.agenda?.starttime ?? '')

// Sync local copies when parent updates the agenda prop
watch(() => props.agenda, (newVal) => {
  if (!newVal) return
  title.value = newVal.title
  timeLocal.value = newVal.time
  starttime.value = newVal.starttime
}, { deep: true })

const interactiveBgColor = () => {
  let bgColor = 'bg-agendaentry'
  if (props.agenda && props.agenda.isActive) {
    bgColor = 'bg-agendaentryactive'
  }
  return bgColor
}

const deleteAgendaEntry = () => {
  emit('delete', props.agenda.id)
}

const emitUpdate = () => {
  const updated = {
    ...props.agenda,
    title: title.value,
    time: parseInt(timeLocal.value) || 0,
    starttime: starttime.value,
  }
  // emit id so parent can find and update the correct item
  emit('update', { id: props.agenda.id, updated })
}

const onTimeChange = () => {
  const oldTime = parseInt(props.agenda.time) || 0
  const newTime = parseInt(timeLocal.value) || 0
  emit('timechange', { newTime, oldTime })
  emitUpdate()
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