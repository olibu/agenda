<template>
  <v-app>
    <v-navigation-drawer 
      permanent
      rail
    >
      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-calendar"
          title="Meetings"
          value="meetings"
          to="/"
        />
        <v-list-item
          prepend-icon="mdi-plus"
          title="Add meeting"
          value="new-meeting"
          :to="getNewMeeting()"
        />
        <v-list-item
          prepend-icon="mdi-information"
          title="About"
          value="about"
          to="/about"
        />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup>
import { useMeetingStore } from '@/stores/MeetingStore.js'
const store = useMeetingStore()

const getNewMeeting = () => {
  let meetingId = store.addNewMeeting()
  return `/meeting/${meetingId}`
}
</script>
