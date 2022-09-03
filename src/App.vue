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
          to="/meeting/-1"
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
