<template>
  <v-card
    class="ma-2 rounded-xl"
  >
    <v-card-title align="center">Meeting - {{meeting.title}}</v-card-title>

    <v-row
      class="pa-0 ma-1"
    >
      <v-col
        cols="10"
        class="pa-1"
      >
        <v-text-field
          v-model="meeting.title"
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
          v-model="meeting.time"
          density="compact"
          placeholder="min"
        />
      </v-col>
    </v-row>

    <p
      class="ma-2"
    >
      Agenda:
    </p>

    <v-list
      class="ma-0 pa-0"
      v-for="agenda in meeting.agenda"
      :value="agenda"
    >
      <AgendaEntry
        :agenda="agenda"
        @create="createAgenda"
        @delete="deleteAgenda(agenda)"
      />
    </v-list>

  </v-card>
</template>

<script setup>
import AgendaEntry from '@/components/AgendaEntry.vue'
import { useRoute } from 'vue-router'
import { useMeetingStore } from '@/stores/MeetingStore.js'
const store = useMeetingStore()

const route = useRoute()
const meeting = store.getMeeting(route.params.id)

const createAgenda = () => {
  meeting.agenda.push({title: '', time: 10, ctime: 0})

}
const deleteAgenda = (agenda) => {
  // delete agenda if it is not the last one
  let pos = meeting.agenda.findIndex((a) => a === agenda)
  if (pos !== meeting.agenda.length) {
    meeting.agenda.splice(pos, 1)
  }

}

</script>