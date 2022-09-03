import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

export const useMeetingStore = defineStore('MeetingStore', {
  state: () => {
    return {
      meetings: [],
    }
  },
  persist: true,
  actions: {
    addNewMeeting() {
      const meeting = {
        id: uuidv4(),
        title: '',
        time: 60,
        agenda: [
          {
            title: '',
            time: 10,
            ctime: 0,
          },
        ],
      }
      this.meetings.push(meeting)
      return meeting.id
    },
    getMeeting(id) {
      return this.meetings.find((meeting) => meeting.id === id)
    },
    deleteMeeting(id) {
      const pos = this.meetings.findIndex((meeting) => meeting.id === id)
      if (pos != -1) {
        return this.meetings.splice(pos, 1)
      }
    },
  },
})
