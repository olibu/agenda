<template>
  <v-card
    class="ma-2 pb-3 rounded-shaped bg-cardbg"
  >
    <v-card-title align="center">Edit Meeting</v-card-title>

    <v-btn
      to="/"
      icon="mdi-arrow-left"
      density="compact"
      variant="text"
      style="position: absolute; top: 10px; left:10px"
    />

    <v-row
      class="pa-0 ma-1 d-flex flex-nowrap"
    >
      <v-text-field
        v-model="mRef.title"
        hide-details="auto"
        variant="outlined"
        label="Meetingtitle"
        density="compact"
        autofocus
      />
      <v-text-field
        v-if="store.showStartTime"
        hide-details="auto"
        variant="outlined"
        v-model="mRef.starttime"
        density="compact"
        label="start time"
        @change="updateStartTime"
        :rules="startTimeRules"
        class="w80px pl-1"
      />
      <v-text-field
        hide-details="auto"
        variant="outlined"
        v-model="mRef.time"
        density="compact"
        label="duration"
        type="number"
        class="w80px pl-1"
        disabled
      />
    </v-row>

    <v-list
      class="ma-0 pa-0 bg-cardbg"
    >
      <draggable
          v-model="mRef.agenda"
          handle=".handle"
          item-key="id"
        >
        <template #item="{ element }">
        <AgendaEntry
          :agenda="element"
          @delete="deleteAgenda"
          @timechange="timeChanged"
        />
        </template>
      </draggable>
      <AgendaEntryNew
          @add="addAgenda"
        />
    </v-list>

    <v-row
      class="ma-1"
    >
      <v-col align="right">
        <v-btn
          to="/"          
          color="grey"
        >Cancel</v-btn>&nbsp;
        <v-btn
          v-if="mRef.id==-1"
          @click="addMeeting"          
          color="secondary"
        >Add Meeting</v-btn>
        <v-btn
          v-if="mRef.id!=-1"
          @click="saveMeeting"          
          color="secondary"
        >Save Meeting</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import AgendaEntry from '@/components/AgendaEntry.vue'
import AgendaEntryNew from '@/components/AgendaEntryNew.vue'
import { useRoute, useRouter } from 'vue-router'
import { useMeetingStore } from '@/stores/MeetingStore.js'
import draggable from "vuedraggable"

const store = useMeetingStore()

const route = useRoute()

let id = (route.params && route.params.id) ? route.params.id : -1

const mRef = ref(store.getMeeting(id))

watch(() => route.params.id, (newValue) => {
  if (newValue) {
    id = newValue
    let meeting = store.getMeeting(id)
    mRef.value = meeting
  }
})

const addAgenda = (agenda) => {
  mRef.value.agenda.push({title: agenda.title, time: agenda.time, starttime: agenda.starttime})
  mRef.value.time = mRef.value.time + agenda.time
  updateStartTime()
}

const deleteAgenda = (agenda) => {
  // delete agenda if it is not the last one
  let pos = mRef.value.agenda.findIndex((a) => a === agenda)
  mRef.value.agenda.splice(pos, 1)
  updateStartTime()
}

const timeChanged = (time) => {
  mRef.value.time = mRef.value.time - time.oldTime
  mRef.value.time = mRef.value.time + time.newTime
  updateStartTime()
}

const router = useRouter()

const addMeeting = () => {
  store.addMeeting(mRef.value)
  router.push(`/`)
}

const saveMeeting = () => {
  store.saveMeeting(mRef.value)
  router.push(`/`)
}

/**
 * Updates the start time of every agenda entries starttime attribute.
 */
const updateStartTime = () => {
  let time = new Date()
  let hourMinute = parseTime(mRef.value.starttime)
  if (hourMinute) {
    time.setHours(hourMinute[0])
    time.setMinutes(hourMinute[1])
    for (let agenda of mRef.value.agenda) {
      agenda.starttime = formatTime(time)
      time = new Date(time.getTime() + (agenda.time * 60000))
    }
  }
}

onMounted(() => {
  updateStartTime()
})

const parseTime = (time) => {
  if (!time) {
    return
  }
  let pos = time.indexOf(':')
  if (pos==-1) {
    return
  }
  try {
    let hour = parseInt(time.substring(0, pos))
    let minute = parseInt(time.substring(pos+1))
    return [hour, minute]

  // eslint-disable-next-line no-unused-vars
  } catch (e) {
    return
  }
}

const formatTime = (time) => {
  let result = ''
  let hours = time.getHours()
  if (hours < 10) {
    result += '0'
  }
  result += hours + ':'
  let minutes = time.getMinutes()
  if (minutes < 10) {
    result += '0'
  }
  result += minutes
  return result
}

const startTimeRules = [
  v => parseTime(v)!=undefined
]
</script>