<template>
  <q-page class="row items-center justify-evenly bg-[#451952] pt-8">
    <q-layout class="max-w-5xl px-2">
      <h2 class="text-lg text-[#F39F5A] font-bold">FAVORITOS</h2>
      <GIFCardsRender :GIFsDatas="fixedGIFs" />
    </q-layout>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import APIService from 'src/services/APIService';
import GIFCardsRender from 'src/components/GIFCardsRender.vue';
import { LocalStorage } from 'quasar';

const API = new APIService();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fixedGIFs = ref<{ id: string; image: string }[]>([]);
const favoritesList = ref<string[] | null>([]);

onMounted(async () => {
  favoritesList.value = LocalStorage.getItem('meuArray');

  let favoriteListString: string = '';

  favoritesList.value?.forEach((favorite) => {
    favoriteListString = favoriteListString + favorite + ',';
  });

  console.log(favoriteListString);

  try {
    const response = await API.get(
      // eslint-disable-next-line quotes
      `/v1/gifs?api_key=Ibyf64xoQQo6sUoTg2QbxMQI4MG5zrR4&ids=${favoriteListString}&rating=g`
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
