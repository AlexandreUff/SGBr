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
          title="Marcar como favorito"
        >
          <q-icon name="star" />
        </QCard>
        <q-img :src="fixedGIF.image" style="width: 200px; height: 200px" />
      </li>
    </ul>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import APIService from 'src/services/APIService';

const API = new APIService();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fixedGIFs = ref<{ id: string; image: string }[]>([]);

onMounted(async () => {
  try {
    const response = await API.get(
      '/v1/gifs/trending?api_key=Ibyf64xoQQo6sUoTg2QbxMQI4MG5zrR4&limit=25&offset=0&rating=g&bundle=messaging_non_clips'
    );
    console.log(response.data);

    fixedGIFs.value =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      response.data.data.map((gifsData: any) => {
        return {
          id: gifsData.id,
          image: gifsData.images.fixed_height.url,
        };
      });

    console.log('GIFs:', fixedGIFs);
  } catch (error) {
    console.error(error);
  }
});

defineOptions({
  name: 'IndexPage',
});
</script>
