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
      if (id == -1) {
        const meeting = {
          id: -1,
          title: '',
          time: 0,
          agenda: [
            {
              title: '',
              time: 0,
              ctime: 0,
            },
          ],
        }
        return meeting
      }
      let meeting = this.meetings.find((meeting) => meeting.id === id)
      return { ...meeting }
    },
    addMeeting(meeting) {
      meeting.id = uuidv4()
      this.meetings.push(meeting)
    },
    saveMeeting(meeting) {
      const pos = this.meetings.findIndex((m) => m.id === meeting.id)
      if (pos != -1) {
        this.meetings.splice(pos, 1, meeting)
      } else {
        this.addMeeting(meeting)
      }
    },
    deleteMeeting(id) {
      const pos = this.meetings.findIndex((meeting) => meeting.id === id)
      if (pos != -1) {
        return this.meetings.splice(pos, 1)
      }
    },
  },
})
