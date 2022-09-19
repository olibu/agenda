<template>
  <v-row
    class="pa-0 ma-1 rounded-lg"
    align="center"
    v-bind:class="interactiveBgColor()"
  >
  <v-col
    cols="7"
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
    cols="2"
    class="pl-1 pt-1 pb-1 pr-1 text-body-1 h-align"
  >
  <v-progress-circular
      :rotate="360"
      :size="60"
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
    class="pt-1 pb-1"
  >
  <v-menu
      open-on-hover
      location="start"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          icon="mdi-dots-vertical"
          density="compact"
          variant="text"
        />
      </template>

      <v-list
      class="pt-0 pb-0"
      >
        <v-list-item-action
          class="pt-0 pb-0"
        >
        <v-btn
          @click="$emit('delete')"
        >delete</v-btn>
        </v-list-item-action>
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
<style>
  .h-align {
    text-align: center;
  }
</style>