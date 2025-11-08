import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

export const useMeetingStore = defineStore('MeetingStore', {
  state: () => {
    return {
      meetings: [],
      soundOn: true,
      autoOn: true,
      adjustStartTime: true,
      showStartTime: false,
      theme: 'os',
      customThemeL: {
        newentry: '#CCCCCC',
        agendaentry: '#894BE5',
        agendaentryactive: '#EC4079',
        cardbg: '#ECECEC',
        secondary: '#61CDF9',
      },
      customThemeD: {
        newentry: '#555555',
        agendaentry: '#7B1FA2',
        agendaentryactive: '#AD1457',
        cardbg: '#333333',
        secondary: '#7B1FA2',
      },
    }
  },
  persist: true,
  actions: {
    getMeeting(id) {
      if (id == -1) {
        const meeting = {
          id: -1,
          title: '',
          time: 0,
          starttime: '09:00',
          agenda: [],
        }
        return meeting
      }
      let meeting = this.meetings.find((meeting) => meeting.id === id)
      if (!meeting) {
        // return an empty meeting if id not found
        return {
          id: -1,
          title: '',
          time: 0,
          starttime: '09:00',
          agenda: [],
        }
      }
      if (!meeting.starttime) {
        meeting.starttime = '09:00'
      }
      return JSON.parse(JSON.stringify(meeting))
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
    refreshTheme(vTheme) {
      let themeSetting = this.theme

      if (themeSetting === 'os') {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')
        if (prefersDarkScheme.matches) {
          themeSetting = 'dark'
        } else {
          themeSetting = 'light'
        }
      } else if (themeSetting === 'customLight') {
        const customTheme = this.customThemeL
        for (let key in customTheme) {
          vTheme.themes.value.customLight.colors[key] = customTheme[key]
        }
      } else if (themeSetting === 'customDark') {
        const customTheme = this.customThemeD
        for (let key in customTheme) {
          vTheme.themes.value.customDark.colors[key] = customTheme[key]
        }
      }
      vTheme.global.name.value = themeSetting
    },
    // Migration: ensure every agenda item has a stable id
    migrateAgendaIds() {
      let changed = false
      for (let meeting of this.meetings) {
        if (!meeting.agenda) continue
        for (let item of meeting.agenda) {
          if (!item.id) {
            item.id = uuidv4()
            changed = true
          }
        }
      }
      // if changed, rewrite the meetings array to ensure persistence plugins notice changes
      if (changed) {
        this.meetings = JSON.parse(JSON.stringify(this.meetings))
      }
    },
  },
})
