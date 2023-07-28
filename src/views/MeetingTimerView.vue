<template>
  <v-card
    class="ma-2 pb-3 rounded-shaped bg-cardbg"
  >
    <v-card-title align="center">{{mRef.title}} - {{endTime}}</v-card-title>

    <v-row>
      <v-col 
        align="center"
      >
        <v-progress-circular
          :rotate="360"
          :size="100"
          :width="10"
          :model-value="currentAgendaTimePercentage"
          :color="currentAgendaTimeColor"
          class="text-h6"
        >
          <b>{{ currentAgendaTime }}</b>
        </v-progress-circular>

      </v-col>
    </v-row>

    <v-btn
      to="/"
      icon="mdi-arrow-left"
      density="compact"
      variant="text"
      style="position: absolute; top: 10px; left:10px"
    />

    <v-menu
      open-on-hover
      location="start"
      class="ma-0 pa-0"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          icon="mdi-cog"
          density="compact"
          variant="text"
          style="position: absolute; top: 10px; right:10px"
        />
      </template>

      <v-list
        class="ma-0 pa-0"
      >
        <v-list-item
          class="ma-0 pa-0"
        >
          <v-checkbox
            class="ma-0 pa-0"
            v-model="store.soundOn"
            label="Sound on"
            hide-details
          />
        </v-list-item>
        <v-list-item
          class="ma-0 pa-0"
        >
          <v-checkbox
            class="ma-0 pa-0 pr-2"
            v-model="store.autoOn"
            label="Automatic move to next agenda entry"
            hide-details
          />
        </v-list-item>
        <v-list-item
          class="ma-0 pa-0"
        >
          <v-checkbox
            class="ma-0 pa-0 pr-2"
            v-model="store.adjustStartTime"
            label="Adjust start time"
            hide-details
          />
        </v-list-item>
      </v-list>
    </v-menu>

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
          :disabled="timeState===0 || currentAgendaId===0"
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
          class="mr-2"
          :disabled="timeState===0 || (currentAgendaId+2)>meeting.agenda.length"
        />
        <v-btn 
          @click="scramble()"
          icon="mdi-compare-vertical"
          size="small"
          variant="outlined"
        >
          <v-tooltip
            activator="parent"
            location="top"
          >
            Scramble Entries
          </v-tooltip>
          <v-icon
            center
            icon="mdi-compare-vertical"
          ></v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-list
      class="ma-0 pa-0 bg-cardbg"
    >
      <draggable
          v-model="mRef.agenda"
          handle=".handle"
          item-key="id"
          @change="adjustCurrentPositionAfterDragEvent"
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
import AgendaEntryNew from '@/components/AgendaEntryNew.vue'
import { useRoute, useRouter } from 'vue-router'
import { useMeetingStore } from '@/stores/MeetingStore.js'
import draggable from "vuedraggable"

const store = useMeetingStore()

const route = useRoute()
let id = (route.params && route.params.id) ? route.params.id : -1
const meeting = store.getMeeting(id)

const mRef = ref(meeting)   // reference to the meeting (agenda)

const addAgenda = (agenda) => {
  mRef.value.agenda.push({title: agenda.title, time: agenda.time})
  mRef.value.time = mRef.value.time + agenda.time
  calculateEndTime()
}
const deleteAgenda = (agenda) => {
  // delete agenda if it is not the last one
  let pos = mRef.value.agenda.findIndex((a) => a === agenda)
  mRef.value.agenda.splice(pos, 1)
  calculateEndTime()
}

const timeChanged = (time) => {
  mRef.value.time = mRef.value.time - time.oldTime
  mRef.value.time = mRef.value.time + time.newTime
  calculateEndTime()
}

const router = useRouter()

let currentAgenda     // the current agenda entrie object; -1 if meeting has not been started
let intervalPointer   // reference to the current setInterval method
let currentTime = -1  // current rest time in seconds
let currentAgendaNotified = false 
const timeState = ref(0)  // 0: off; 1: running 2: paused
const currentAgendaId = ref(-1)   // ref to the current active agenda point
const currentAgendaTitle = ref('-')
const currentAgendaTime = ref('00:00')
const currentAgendaTimePercentage = ref(0)
const currentAgendaTimeColor = ref('teal')
const endTime = ref('00:00')

const play = () => {
  if (timeState.value === 0) {
    currentAgendaId.value = 0
    currentAgenda = mRef.value.agenda[currentAgendaId.value]
    currentAgendaTitle.value = currentAgenda.title
    currentTime = currentAgenda.time * 60
    if (store.adjustStartTime) {
      // check for the last "even" time and adjust the currentTime accordingly
      let currentMinutes = new Date().getMinutes()
      let currentSeconds = new Date().getSeconds()
      let adjustment = (currentMinutes * 60) + currentSeconds
      if (currentMinutes > 30) {
        adjustment -= (30 * 60)
      }
      if (currentTime> adjustment) {
        currentTime = currentTime - adjustment
      }
    }
    currentAgenda.isActive = true
    startTimer()
  }
  else if (timeState.value === 2) {
    startTimer()
  }
  timeState.value = 1
  calculateEndTime()
}

const stop = () => {
  currentAgendaNotified = false
  currentAgenda.isActive = false
  stopTimer()
  timeState.value = 0
  currentAgendaTitle.value = '-'
  currentAgendaTime.value = '00:00'
  currentAgendaTimePercentage.value = 0
  currentAgendaTimeColor.value = 'teal'
  endTime.value = '00:00'
}

const pause = () => {
  if (timeState.value === 1) {
    stopTimer()
    timeState.value = 2
  }
}

const previous = () => {
  currentAgendaNotified = false
  currentAgendaId.value = currentAgendaId.value - 1
  if (currentAgendaId.value >= 0) {
    currentAgenda.isActive = false
    currentAgenda = mRef.value.agenda[currentAgendaId.value]
    currentAgendaTitle.value = currentAgenda.title
    currentTime = currentAgenda.time * 60
    currentAgenda.isActive = true
    calculateEndTime()
  }
  else {
    currentAgenda.isActive = false
    stop()
  }
}

const next = (triggeredAutomatically) => {
  currentAgendaNotified = false
  currentAgendaId.value = currentAgendaId.value + 1
  if (mRef.value.agenda.length > (currentAgendaId.value)) {
    currentAgenda.isActive = false
    currentAgenda = mRef.value.agenda[currentAgendaId.value]
    currentAgendaTitle.value = currentAgenda.title
    currentTime = currentAgenda.time * 60
    currentAgenda.isActive = true
    if (triggeredAutomatically) {
      playAgendaEnd()
    }
    calculateEndTime()
  }
  else {
    currentAgenda.isActive = false
    if (triggeredAutomatically) {
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
      if (currentTime <= 0 && !currentAgendaNotified) {
        // move to next agenda entry
        if (store.autoOn) {
          next(true)
        }
        else {
          if (mRef.value.agenda.length > (currentAgendaId.value + 1)) {
            playAgendaEnd()
            currentAgendaNotified = true
          }
          else {
            playMeetingEnd()
            currentAgendaNotified = true
          }
        }
      }
      calculateEndTime()
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

const setCurrentAgendaTime = () => {
  if (timeState.value===1) {
    let localTime = currentTime
    let negativ = currentTime < 0
    if (negativ) {
      localTime = currentTime * -1
    }
    let hours = Math.floor(localTime / 3600)
    let minutes = Math.floor((localTime-(hours*60*60)) / 60)
    let seconds = localTime - (minutes * 60) - (hours*60*60)
    currentAgendaTime.value = (negativ?'-':'') + (hours>0?hours +':' : '') + (minutes<10?'0'+minutes:minutes) + ':' + (seconds<10?'0'+seconds:seconds)
    let time = 100
    if (!negativ) {
      time = ((currentAgenda.time*60)-localTime)/(currentAgenda.time*60)*100
    }
    currentAgendaTimePercentage.value = time
    if (time == 100) {
      currentAgendaTimeColor.value = 'red'
    }
    else if (time > 90) {
      currentAgendaTimeColor.value = 'orange'
    }
    else {
      currentAgendaTimeColor.value = 'teal'
    }
  }
}

const audioAgendaEnd = new Audio('/agenda/Ding-sound-effect.mp3')
const audioMeetingEnd = new Audio('/agenda/bell-melodic-sound-effect.mp3')

const playAgendaEnd = () => {
  if (store.soundOn) {
    audioAgendaEnd.play()
  }
}
const playMeetingEnd = () => {
  if (store.soundOn) {
    audioMeetingEnd.play()
  }
}

const showDialog = ref(false)

const adjustCurrentPositionAfterDragEvent = (e) => {
  if (currentAgendaId.value!=-1) {
    if (e.moved.oldIndex > currentAgendaId.value && e.moved.newIndex <= currentAgendaId.value ) {
      currentAgendaId.value += 1 
    }
    else if (e.moved.oldIndex < currentAgendaId.value && e.moved.newIndex >= currentAgendaId.value ) {
      currentAgendaId.value -= 1 
    }
    else if (e.moved.oldIndex === currentAgendaId.value) {
      if (e.moved.newIndex < e.moved.oldIndex) {
        currentAgendaId.value -= (e.moved.oldIndex - e.moved.newIndex)
      }
      else if (e.moved.newIndex > e.moved.oldIndex) {
        currentAgendaId.value += (e.moved.newIndex - e.moved.oldIndex) 
      }
    }
    calculateEndTime()
  }
}

const calculateEndTime = () => {
  if (timeState.value !== 0) {
    let currentEndTime = new Date()
    let restOfMeeting = currentTime
    if (currentTime<0) {
      restOfMeeting = 0
    }
    for (let i=currentAgendaId.value+1; i<mRef.value.agenda.length; i++) {
      restOfMeeting += (mRef.value.agenda[i].time * 60)
    }
    currentEndTime.setSeconds(currentEndTime.getSeconds() + restOfMeeting)

    let hours = currentEndTime.getHours()
    let minutes = currentEndTime.getMinutes()
    endTime.value = (hours<10?'0'+hours:hours) + ':' + (minutes<10?'0'+minutes:minutes)
  }
}

/**
 * Change the order of the agenda entries randomly.
 * 
 * In case the meeting has already been started, only the not already started entires are scrambled.
 */
const scramble = () => {
  var startPos = 0  // all entries lager than this one will be scrambled
  if (currentAgendaId.value!=-1) {
    startPos = currentAgendaId.value + 1 // start after the active one
  }
  const a = mRef.value.agenda
  const aLength = a.length - startPos
  var randomNewPos, tempPos, changePos;
  for (changePos = aLength - 1; changePos > 0; changePos--) {
    randomNewPos = Math.floor(Math.random() * (changePos + 1));
    tempPos = a[changePos+startPos];
    a[changePos+startPos] = a[randomNewPos+startPos];
    a[randomNewPos+startPos] = tempPos;
  }
}

</script>