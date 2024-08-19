<template>
  <q-page class="row items-center justify-evenly bg-red-600">
    <!-- <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component> -->

    <ul class="row items-center justify-evenly bg-blue-600 pt-4">
      <li
        v-for="fixedGIF in fixedGIFs"
        :key="fixedGIF.id"
        class="py-2 px-1 shadow-2xl"
      >
        <!-- {{ fixedGIF.image }} -->
        <q-img :src="fixedGIF.image" style="width: 200px; height: 200px" />
      </li>
    </ul>
  </q-page>
</template>

<script setup lang="ts">
import { /* ref, */ onMounted, Ref } from 'vue';
// import { Todo, Meta } from 'components/models';
// import ExampleComponent from 'components/ExampleComponent.vue';
import APIService from 'src/services/APIService';

const API = new APIService();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let fixedGIFs: Ref<any>;

onMounted(async () => {
  try {
    const response = await API.get(
      '/v1/gifs/trending?api_key=Ibyf64xoQQo6sUoTg2QbxMQI4MG5zrR4&limit=25&offset=0&rating=g&bundle=messaging_non_clips'
    );
    console.log(response.data);

    fixedGIFs =
      /* ref( */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      response.data.data.map((gifsData: any) => {
        return {
          id: gifsData.id,
          image: gifsData.images.fixed_height.url,
        };
      });
    /* ); */

    console.log('GIFs:', fixedGIFs);
  } catch (error) {
    console.error(error);
  }
});

defineOptions({
  name: 'IndexPage',
});

/* const todos = ref<Todo[]>([
  {
    id: 1,
    content: 'ct1',
  },
  {
    id: 2,
    content: 'ct2',
  },
  {
    id: 3,
    content: 'ct3',
  },
  {
    id: 4,
    content: 'ct4',
  },
  {
    id: 5,
    content: 'ct5',
  },
]);

const meta = ref<Meta>({
  totalCount: 1200,
}); */
</script>
