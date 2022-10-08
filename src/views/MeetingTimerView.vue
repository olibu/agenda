<template>
  <v-card
    class="ma-2 pb-3 rounded-shaped bg-blue-grey-darken-3"
  >
    <v-card-title align="center">{{mRef.title}}</v-card-title>

    <v-row>
      <v-col align="center">
        <v-progress-circular
          :rotate="360"
          :size="100"
          :width="10"
          :model-value="currentAgendaTimePercentage"
          color="teal"
          class="text-h6"
        >
          <b>{{ currentAgendaTime }}</b>
        </v-progress-circular>

      </v-col>
    </v-row>

    <v-row>
      <v-col align="center">
          <b>{{ currentAgendaTitle }}</b>
      </v-col>
    </v-row>

    <v-row v-if="id!=-1">
      <v-col
        align="center"
        cols="12"
        class="ma-2 pa-2"
      >
        <v-btn 
          @click="previous"
          icon="mdi-skip-previous"
          size="small"
          variant="outlined"
          class="mr-2"
          :disabled="timeState===0 || intervalPointerId===0"
        />
        <v-btn 
          icon="mdi-play"
          size="small"
          @click="play"
          v-if="timeState===0 || timeState===2"
          variant="outlined"
          class="mr-2"
        />
        <v-btn 
          icon="mdi-pause"
          @click="pause"
          v-if="timeState===1"
          size="small"
          variant="outlined"
          class="mr-2"
        />
        <v-btn 
          icon="mdi-stop"
          @click="stop"
          size="small"
          variant="outlined"
          class="mr-2"
          :disabled="timeState==0"
        />
        <v-btn 
          @click="next(false)"
          icon="mdi-skip-next"
          size="small"
          variant="outlined"
          :disabled="timeState===0 || (intervalPointerId+3)>meeting.agenda.length"
        />
      </v-col>
    </v-row>

    <v-list
      class="ma-0 pa-0 bg-blue-grey-darken-3"
    >
      <draggable
          v-model="mRef.agenda"
          handle=".handle"
          item-key="id"
        >
        <template #item="{ element }">
        <AgendaEntry
          :agenda="element"
          @create="createAgenda"
          @delete="deleteAgenda"
          @timechange="timeChanged"
        />
        </template>
      </draggable>
    </v-list>
  </v-card>
  <v-dialog
      v-model="showDialog"
    >
      <v-card>
        <v-card-text>
          End of the meeting
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="showDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import AgendaEntry from '@/components/AgendaEntry.vue'
import { useRoute, useRouter } from 'vue-router'
import { useMeetingStore } from '@/stores/MeetingStore.js'
import draggable from "vuedraggable"

const store = useMeetingStore()

const route = useRoute()
let id = (route.params && route.params.id) ? route.params.id : -1
const meeting = store.getMeeting(id)

const mRef = ref(meeting)

const createAgenda = () => {
  mRef.value.agenda.push({title: '', time: 0, ctime: 0})

}
const deleteAgenda = (agenda) => {
  // delete agenda if it is not the last one
  let pos = mRef.value.agenda.findIndex((a) => a === agenda)
  if (pos+1 < mRef.value.agenda.length) {
    mRef.value.agenda.splice(pos, 1)
  }
}

const timeChanged = (time) => {
  mRef.value.time = mRef.value.time - time.oldTime
  mRef.value.time = mRef.value.time + time.newTime
}

const router = useRouter()

let currentAgenda
let intervalPointer   // reference to the current agenda point
let currentTime = -1  // current rest time in seconds
const intervalPointerId = ref(-1)   // ref to the current active agenda point
const timeState = ref(0)  // 0: off; 1: running 2: paused
const currentAgendaTitle = ref('-')
const currentAgendaTime = ref('00:00')
const currentAgendaTimePercentage = ref(-1)

const play = () => {
  if (timeState.value === 0) {
    intervalPointerId.value = 0
    currentAgenda = mRef.value.agenda[intervalPointerId.value]
    currentAgendaTitle.value = currentAgenda.title
    currentTime = currentAgenda.time * 60
    resetAllTimers()
    currentAgenda.isActive = true
    startTimer()
  }
  else if (timeState.value === 2) {
    startTimer()
  }
  timeState.value = 1
}

const stop = () => {
  stopTimer()
  resetAllTimers()
  timeState.value = 0
  currentAgendaTitle.value = '-'
  currentAgendaTime.value = '00:00'
  currentAgendaTimePercentage.value = 0
}

const pause = () => {
  if (timeState.value === 1) {
    stopTimer()
    timeState.value = 2
  }
}

const previous = () => {
  intervalPointerId.value = intervalPointerId.value - 1
  if (intervalPointerId.value >= 0) {
    currentAgenda.isActive = false
    currentAgenda = mRef.value.agenda[intervalPointerId.value]
    currentAgendaTitle.value = currentAgenda.title
    currentTime = currentAgenda.time * 60
    currentAgenda.isActive = true
  }
  else {
    currentAgenda.isActive = false
    stop()
  }
  setCurrentAgendaTime()
}

const next = (auto) => {
  intervalPointerId.value = intervalPointerId.value + 1
  if (mRef.value.agenda.length > (intervalPointerId.value + 1)) {
    currentAgenda.isActive = false
    currentAgenda = mRef.value.agenda[intervalPointerId.value]
    currentAgendaTitle.value = currentAgenda.title
    currentTime = currentAgenda.time * 60
    currentAgenda.isActive = true
    if (auto) {
      playAgendaEnd()
    }
  }
  else {
    currentAgenda.isActive = false
    if (auto) {
      playMeetingEnd()
    }
    showDialog.value = true
    stop()
  }
}

const startTimer = () => {
  if (!intervalPointer) {
    intervalPointer = setInterval(() => {
      currentTime--
      if (currentTime <= 0) {
        // move to next agenda entry
        next(true)
      }
      setCurrentAgendaTime()

    }, 1000)
  }
}
const stopTimer = () => {
  if (intervalPointer) {
    clearInterval(intervalPointer)
    intervalPointer = null
  }
}

const resetAllTimers = () => {
  for (let agenda of mRef.value.agenda) {
    agenda.isActive = false
  }
}

const setCurrentAgendaTime = () => {
  let hours = Math.floor(currentTime / 3600);
  let minutes = Math.floor((currentTime-(hours*60*60)) / 60);
  let seconds = currentTime - (minutes * 60) - (hours*60*60)
  currentAgendaTime.value = (hours>0?hours +':' : '') + (minutes<10?'0'+minutes:minutes) + ':' + (seconds<10?'0'+seconds:seconds)
  let time = ((currentAgenda.time*60)-currentTime)/(currentAgenda.time*60)*100
  currentAgendaTimePercentage.value = time
}

const audioAgendaEnd = new Audio('Ding-sound-effect.mp3')
const audioMeetingEnd = new Audio('bell-melodic-sound-effect.mp3')

const playAgendaEnd = () => {
  audioAgendaEnd.play()
}
const playMeetingEnd = () => {
  audioMeetingEnd.play()
}

const showDialog = ref(false)
</script>