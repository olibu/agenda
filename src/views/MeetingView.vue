<template>
  <v-card
    class="ma-2 pb-3 rounded-shaped bg-cardbg"
  >
    <v-card-title align="center">Edit Meeting</v-card-title>

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
          label="Meetingtitle"
          density="compact"
          autofocus
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
          label="duration"
          type="number"
          disabled
        />
      </v-col>
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
import { ref, watch } from 'vue'
import AgendaEntry from '@/components/AgendaEntry.vue'
import AgendaEntryNew from '@/components/AgendaEntryNew.vue'
import { useRoute, useRouter } from 'vue-router'
import { useMeetingStore } from '@/stores/MeetingStore.js'
import draggable from "vuedraggable"

const store = useMeetingStore()

const route = useRoute()

let id = (route.params && route.params.id) ? route.params.id : -1

const mRef = ref(store.getMeeting(id))

watch(() => route.params.id, (newValue, oldValue) => {
  if (newValue) {
    id = newValue
    let meeting = store.getMeeting(id)
    mRef.value = meeting
  }
})

const addAgenda = (agenda) => {
  mRef.value.agenda.push({title: agenda.title, time: agenda.time})
  mRef.value.time = mRef.value.time + agenda.time
}

const deleteAgenda = (agenda) => {
  // delete agenda if it is not the last one
  let pos = mRef.value.agenda.findIndex((a) => a === agenda)
  mRef.value.agenda.splice(pos, 1)
}

const timeChanged = (time) => {
  mRef.value.time = mRef.value.time - time.oldTime
  mRef.value.time = mRef.value.time + time.newTime
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
</script>