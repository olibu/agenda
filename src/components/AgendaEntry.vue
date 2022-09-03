<template>
  <v-row
    class="pa-0 ma-1 rounded-lg"
    v-bind:class="inactive ? 'bg-purple-darken-2' : 'bg-grey-darken-3'"
  >
  <v-col
    cols="8"
    class="pl-1 pt-1 pb-1 pr-0"
  >
    <v-text-field
      label="title"
      density="compact"
      variant="outlined"
      hide-details="auto"
      v-model="agenda.title"
    />
  </v-col>
  <v-col
    cols="2"
    class="pl-1 pt-1 pb-1 pr-0"
  >
    <v-text-field
      label="min"
      density="compact"
      variant="outlined"
      hide-details="auto"
      v-model="agenda.time"
    />
  </v-col>
  <v-col
    cols="1"
    class="pl-1 pt-1 pb-1 pr-0 text-caption"
  >
  <v-progress-circular
      :rotate="360"
      :size="40"
      :width="5"
      :model-value="agenda.ctime"
      color="teal"
    >
      {{ agenda.ctime }}
    </v-progress-circular>
  </v-col>
  <v-col
    cols="1"
    class="pl-3 pt-2 pb-1 pr-1"
  >
  <v-menu
      open-on-hover
    >
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind:color="inactive ? 'purple-darken-2' : 'grey-darken-3'"
          v-bind="props"
          icon="mdi-dots-vertical"
          density="compact"
          size="small"
          variant="flat"
        />
      </template>

      <v-list>
        <v-list-item
          class="ma-0 pa-0"
        >
        <v-btn
          width="100%"
          @click="$emit('delete')"
        >delete</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-col>
  </v-row>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps(['agenda'])

const emit = defineEmits(['create', 'delete'])

watch(() => props.agenda.title, (newValue, oldValue) => {
  inactive.value = true
  if (!oldValue && newValue) {
    emit('create')
  }
  else if (oldValue && !newValue) {
    emit('delete')
  }
})

const inactive = ref(false)

if (props.agenda.title) {
  inactive.value = true
}
</script>