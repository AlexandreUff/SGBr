<template>
  <q-page class="bg-[#451952] flex justify-center pt-8">
    <q-layout class="max-w-5xl px-2">
      <h2 class="text-lg text-[#F39F5A] font-bold">CATEGORIAS</h2>
      <ul class="row items-center justify-evenly pt-4">
        <li
          v-for="category in categoriesNames"
          :key="category.encoded"
          class="text-lg m-1 px-4 p-2 rounded-2xl bg-[#AE445A] cursor-pointer text-[#451952]"
          :style="{
            backgroundColor:
              category.name === categorySelected ? '#F39F5A' : '#AE445A',
          }"
          @click="() => updateCategorySelected(category.name)"
        >
          {{ category.name }}
        </li>
      </ul>
      <q-layout class="pt-8">
        <h3 class="text-lg text-[#F39F5A] font-bold text-center">
          {{ categorySelected }}
        </h3>
        <GIFCardsRender :GIFsDatas="fixedGIFs" />
      </q-layout>
    </q-layout>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import APIService from 'src/services/APIService';
import GIFCardsRender from 'src/components/GIFCardsRender.vue';

const API = new APIService();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const categoriesNames = ref<{ name: string; encoded: string }[]>([]);
const categorySelected = ref<string>('');
const fixedGIFs = ref<{ id: string; image: string }[]>([]);

onMounted(async () => {
  try {
    const response = await API.get(
      'https://api.giphy.com/v1/gifs/categories?api_key=Ibyf64xoQQo6sUoTg2QbxMQI4MG5zrR4'
    );
    console.log(response.data);

    categoriesNames.value =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      response.data.data.map((gifsData: any) => {
        return { name: gifsData.name, encoded: gifsData.name_encoded };
      });

    console.log('Categorias:', categoriesNames);
  } catch (error) {
    console.error(error);
  }
});

defineOptions({
  name: 'categoriesPage',
});

const updateCategorySelected = async (newCategoryName: string) => {
  categorySelected.value = newCategoryName;
  console.log(categorySelected.value);

  try {
    const response = await API.get(
      `/v1/gifs/search?api_key=Ibyf64xoQQo6sUoTg2QbxMQI4MG5zrR4&q=${newCategoryName}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
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
};
</script>
