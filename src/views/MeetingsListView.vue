<template>
  <v-list
    class="ma-2"
    rounded="lg"
  >
  <v-list-subheader>Meetings</v-list-subheader>
  <v-list-item
    class="ma-2"
    v-for="(meeting, i) in store.meetings"
    :key="i"
    :value="meeting"
    rounded="lg"
    active-color="primary"
    @click="openMeeting(meeting.id)"
  >
  <v-list-item-title v-text="meeting.title"></v-list-item-title>
    
  </v-list-item>
</v-list>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useMeetingStore } from '@/stores/MeetingStore.js'
const store = useMeetingStore()

const router = useRouter()

const openMeeting = (meetingId) => {
  router.push(`/meeting/${meetingId}`);
}
</script>