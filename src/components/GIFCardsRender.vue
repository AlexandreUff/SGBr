<template>
  <q-page class="row items-center justify-evenly bg-[#451952]">
    <ul class="row items-center justify-evenly pt-4 max-w-5xl">
      <li
        v-for="fixedGIF in GIFsDatas"
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
interface GIFProps {
  id: string;
  image: string;
}

const { GIFsDatas } = defineProps<{ GIFsDatas: GIFProps[] }>();
</script>
