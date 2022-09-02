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
          @click="showMeetingList"
        />
        <v-list-item
          prepend-icon="mdi-plus"
          title="Add meeting"
          value="new-meeting"
          @click="showNewMeeting"
        />
        <v-list-item
          prepend-icon="mdi-information"
          title="About"
          value="about"
          @click="showAbout"
        />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const showMeetingList = () => {
  router.push('/')
}

const showNewMeeting = () => {
  router.push('/meeting')
}

const showAbout = () => {
  router.push('/about')
}
</script>
