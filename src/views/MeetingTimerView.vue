<template>
  <v-card
    class="ma-2 pb-3 rounded-shaped bg-blue-grey-darken-3"
  >
    <v-card-title align="center">{{mRef.title}}</v-card-title>

    <v-row
      class="pa-0 ma-1"
    >
      <v-col
        cols="10"
        class="pa-1"
      >
        <v-text-field
          v-model="mRef.title"
          hide-details="auto"
          variant="outlined"
          placeholder="Title"
          density="compact"
        />
      </v-col>
      <v-col
        cols="2"
        class="pl-0 pt-1 pb-1 pr-1"
      >
        <v-text-field
          hide-details="auto"
          variant="outlined"
          v-model="mRef.time"
          density="compact"
          placeholder="min"
          disabled
        />
      </v-col>
    </v-row>

    <v-row v-if="id!=-1">
      <v-col
        align="center"
        cols="12"
        class="ma-2 pa-2"
      >
        <!-- <v-btn 
          icon="mdi-skip-previous"
          size="small"
          variant="outlined"
          class="mr-2"
          :disabled="timeState===0 || intervalPointerId===0"
        /> -->
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
        <!-- <v-btn 
          icon="mdi-skip-next"
          size="small"
          variant="outlined"
          :disabled="timeState===0 || (intervalPointerId+3)>meeting.agenda.length"
        /> -->
      </v-col>
    </v-row>

    <p
      class="ma-2"
    >
      Agenda:
    </p>

    <v-list
      class="ma-0 pa-0 bg-blue-grey-darken-3"
      v-for="agenda in mRef.agenda"
      :value="agenda"
    >
      <AgendaEntry
        :agenda="agenda"
        @create="createAgenda"
        @delete="deleteAgenda"
        @timechange="timeChanged"
      />
    </v-list>

    <v-row
      v-if="id==-1"
      class="ma-1"
    >
      <v-col align="right">
        <v-btn
          @click="addMeeting"          
        >Add</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import AgendaEntry from '@/components/AgendaEntry.vue'
import { useRoute, useRouter } from 'vue-router'
import { useMeetingStore } from '@/stores/MeetingStore.js'
const store = useMeetingStore()

const route = useRoute()
let id = (route.params && route.params.id) ? route.params.id : -1
console.log('id',id);
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

const addMeeting = () => {
  store.addMeeting(meeting)
  router.push(`/meeting/${meeting.id}`)
}

let currentAgenda
let intervalPointer   // reference to the current agenda point
const intervalPointerId = ref(0)
const timeState = ref(0)  // 0: off; 1: running 2: paused

const play = () => {
  if (timeState.value === 0) {
    intervalPointerId.value = 0
    currentAgenda = mRef.value.agenda[intervalPointerId.value]
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
}

const pause = () => {
  if (timeState.value === 1) {
    stopTimer()
    timeState.value = 2
  }
}

const startTimer = () => {
  if (!intervalPointer) {
    intervalPointer = setInterval(() => {
      currentAgenda.ctime = currentAgenda.ctime + 1
      if (currentAgenda.ctime >= currentAgenda.time) {
        // move to next agenda entry
        intervalPointerId.value = intervalPointerId.value + 1
        if (mRef.value.agenda.length > intervalPointerId.value) {
          currentAgenda.isActive = false
          currentAgenda = mRef.value.agenda[intervalPointerId.value]
          currentAgenda.isActive = true
        }
        else {
          currentAgenda.isActive = false
          alert('ende');
          stop()
        }
      }
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
    agenda.ctime = 0
    agenda.isActive = false
  }
}
</script>