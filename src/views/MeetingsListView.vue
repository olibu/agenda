<template>
  <v-card class="ma-2 pb-3 rounded-lg bg-cardbg">
    <v-card-title align="center">Meetings</v-card-title>
    <v-list
      class="ma-0 bg-cardbg"
    >
        <v-list-item
          class="ma-2"
          v-for="(meeting, i) in store.meetings"
          :key="i"
          :value="meeting"
          rounded="lg"
          active-color="primary"
          @click.self="openMeeting(meeting.id)"
        >
          <v-list-item-title
            v-text="meeting.title"
            @click.self="openMeeting(meeting.id)"
          ></v-list-item-title>

          <template v-slot:append>
            <v-btn
              icon="mdi-pencil"
              variant="text"
              density="compact"
              @click="editMeeting(meeting.id)"
            ></v-btn>
            <v-btn
              icon="mdi-delete"
              variant="text"
              density="compact"
              @click="deleteMeeting(meeting.id)"
            ></v-btn>
          </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useMeetingStore } from '@/stores/MeetingStore.js'
const store = useMeetingStore()

const router = useRouter()

const openMeeting = (meetingId) => {
  router.push(`/timer/${meetingId}`);
}

const deleteMeeting = (meetingId) => {
  store.deleteMeeting(meetingId)
}
const editMeeting = (meetingId) => {
  router.push(`/meeting/${meetingId}`);
}
</script>