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
              @click="deleteMeetingId=meeting.id; dialogDelete=true"
            ></v-btn>
          </template>
      </v-list-item>
    </v-list>

    <!-- Detelte Dialog -->
    <v-dialog
      v-model="dialogDelete"
    >
      <v-card>
        <v-card-title class="text-h5">
          Delete Meeting?
        </v-card-title>
        <v-card-text>Do you want to delete this meeting?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            text
            @click="dialogDelete = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="secondary"
            text
            @click="deleteMeeting(deleteMeetingId)"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMeetingStore } from '@/stores/MeetingStore.js'
const store = useMeetingStore()

const router = useRouter()

const dialogDelete = ref(false)
let deleteMeetingId = -1;

const openMeeting = (meetingId) => {
  router.push(`/timer/${meetingId}`)
}

const deleteMeeting = (meetingId) => {
  store.deleteMeeting(meetingId)
  dialogDelete.value = false
}
const editMeeting = (meetingId) => {
  router.push(`/meeting/${meetingId}`)
}
</script>