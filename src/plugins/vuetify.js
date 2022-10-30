// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          newentry: '#CCCCCC',
          agendaentry: '#894BE5',
          agendaentryactive: '#EC4079',
          cardbg: '#ECECEC',
        },
      },
      dark: {
        colors: {
          newentry: '#555555',
          agendaentry: '#7B1FA2',
          agendaentryactive: '#AD1457',
          cardbg: '#333333',
          secondary: '#7B1FA2',
        },
      },
    },
  },
})
