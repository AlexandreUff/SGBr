<template>
  <q-page class="row items-center justify-evenly bg-[#451952] pt-8">
    <q-layout class="max-w-5xl px-2">
      <div class="flex pb-4">
        <q-input
          v-model="searchText"
          label="Digite o nome de algum GIF que queira pesquisar"
          placeholder="Ex: Animais, aniversário, carros..."
          class="flex-grow bg-[#ffffff80] px-2 text-2xl"
          label-color="purple"
        />
        <QCard
          class="flex align-middle justify-center bg-[#AE445A] w-14 pt-2 cursor-pointer"
          title="Pesquisar"
          @click="() => updateCategorySelected(searchText)"
        >
          <q-icon name="search" size="lg" class="text-slate-300" />
        </QCard>
      </div>
      <h2 class="text-lg text-[#F39F5A] font-bold">
        {{
          lastSearchResult
            ? `Exibindo resultados para "${lastSearchResult}"`
            : 'PRINCIPAIS GIFs'
        }}
      </h2>
      <GIFCardsRender :GIFsDatas="fixedGIFs" />
    </q-layout>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import APIService from 'src/services/APIService';
import GIFCardsRender from 'src/components/GIFCardsRender.vue';

const API = new APIService();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fixedGIFs = ref<{ id: string; image: string }[]>([]);
const searchText = ref<string>('');
const lastSearchResult = ref<string>('');

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

const updateCategorySelected = async (newCategoryName: string) => {
  lastSearchResult.value = newCategoryName;

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

defineOptions({
  name: 'IndexPage',
});
</script>
