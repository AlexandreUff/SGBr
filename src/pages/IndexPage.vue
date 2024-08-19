<template>
  <q-page class="row items-center justify-evenly">
    <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';
import APIService from 'src/services/APIService';

const API = new APIService();

onMounted(async () => {
  try {
    const response = await API.get(
      '/v1/gifs/trending?api_key=Ibyf64xoQQo6sUoTg2QbxMQI4MG5zrR4&limit=25&offset=0&rating=g&bundle=messaging_non_clips'
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
});

defineOptions({
  name: 'IndexPage',
});

const todos = ref<Todo[]>([
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
});
</script>
