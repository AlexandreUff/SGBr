<template>
  <q-page class="bg-red-600">
    <h2 class="text-center text-lg">CATEGORIAS</h2>
    <ul class="row items-center justify-evenly bg-blue-600 pt-4">
      <li
        v-for="category in categoriesNames"
        :key="category.encoded"
        class="text-lg m-1 px-4 p-2 rounded-2xl bg-red-600"
        @click="() => updateCategorySelected(category.name)"
      >
        {{ category.name }}
      </li>
    </ul>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import APIService from 'src/services/APIService';

const API = new APIService();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const categoriesNames = ref<{ name: string; encoded: string }[]>([]);
const categorySelected = ref('');

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

const updateCategorySelected = (newCategoryName: string) => {
  categorySelected.value = newCategoryName;
  console.log(categorySelected.value);
};
</script>
