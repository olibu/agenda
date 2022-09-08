<template>
  <v-row
    class="pa-0 ma-1 rounded-lg"
    v-bind:class="interactiveBgColor()"
  >
  <v-col
    cols="8"
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
    class="pl-1 pt-1 pb-1 pr-0 text-caption"
  >
  <v-progress-circular
      :rotate="360"
      :size="40"
      :width="5"
      :model-value="agenda.ctime / agenda.time * 100"
      color="teal"
      v-if="inactive"
    >
      {{ (agenda.time - agenda.ctime) }}
    </v-progress-circular>
  </v-col>
  <v-col
    cols="1"
    class="pl-3 pt-3 pb-1 pr-1"
  >
  <v-menu
      open-on-hover
    >
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          icon="mdi-dots-vertical"
          density="compact"
          variant="text"
        />
      </template>

      <v-list>
        <v-list-item
          class="ma-0 pa-0"
        >
        <v-btn
          width="100%"
          @click="$emit('delete')"
        >delete</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
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
</script>