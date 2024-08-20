<template>
  <q-page class="row items-center justify-evenly bg-red-600">
    <ul class="row items-center justify-evenly bg-blue-600 pt-4">
      <li
        v-for="fixedGIF in fixedGIFs"
        :key="fixedGIF.id"
        class="py-2 px-1 shadow-2xl relative"
      >
        <QCard
          class="flex absolute top-3 right-2 z-10 bg-neutral-50 opacity-30 rounded-2xl p-1 cursor-pointer"
          title="Adicionar aos favoritos"
        >
          <q-icon name="star" />
        </QCard>
        <q-img :src="fixedGIF.image" style="width: 200px; height: 200px" />
      </li>
    </ul>
  </q-page>
</template>

<script setup lang="ts">
interface FixedGIF {
  id: string;
  image: string;
}

const { fixedGIFs } = defineProps<{ fixedGIFs: FixedGIF[] }>();
</script>
