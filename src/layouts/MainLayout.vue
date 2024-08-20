<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-[#AE445A]">
      <q-toolbar class="py-6">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          class="lg:hidden"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div class="flex align-middle justify-center text-lg">
          <q-icon name="person" class="mt-1 mx-2" />
          Alexandre Magno
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :breakpoint="1038"
      class="py-3 bg-[#662549]"
    >
      <q-list>
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
      <!-- <slot /> -->
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';

defineOptions({
  name: 'MainLayout',
});

const linksList: EssentialLinkProps[] = [
  {
    title: 'Home',
    icon: 'house',
    link: '/#/',
  },
  {
    title: 'Favoritos',
    icon: 'star',
    link: '/#/favorites',
  },
  {
    title: 'Categorias',
    icon: 'category',
    link: '/#/categories',
  },
  {
    title: 'Sobre',
    // caption: 'forum.quasar.dev',
    icon: 'person',
    link: '/#/about',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
