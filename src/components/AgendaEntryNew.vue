<template>
  <v-row
    class="pa-2 ma-1 rounded-lg d-flex flex-nowrap bg-newentry"
    align="center"
  >
  <v-text-field
      v-if="store.showStartTime"
      density="compact"
      variant="outlined"
      hide-details="auto"
      class="w80px pr-1"
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
      @keyup.enter="checkEnter"
      ref="titleRef"
    />
    <v-text-field
      label="min"
      density="compact"
      variant="outlined"
      hide-details="auto"
      v-model="time"
      type="number"
      class="w80px"
      @keyup.enter="checkEnter"
    />
    <v-btn
      @focus="titleRef.focus()"
      @click="addAgenda"
      icon="mdi-plus"
      density="compact"
      variant="text"
    />
    <v-btn
      tabindex="-1"
      icon="mdi-blank"
      density="compact"
      variant="text"
    />
  </v-row>
</template>

<script setup>
import { ref } from 'vue'
import { useMeetingStore } from '@/stores/MeetingStore.js'

const store = useMeetingStore()

const title = ref('')
const time = ref(0)
const titleRef = ref(null)

const emit = defineEmits(['add'])

const addAgenda = () => {
  emit('add', {title: title.value, time: parseInt(time.value)})
  title.value = ''
  time.value = 0
  titleRef.value.focus()
}

const checkEnter = () => {
  addAgenda()
}
</script>
<style>
.h-align {
  text-align: center;
}
.w80px {
  max-width: 80px;
}
</style>