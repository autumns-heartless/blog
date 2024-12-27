<template>
  <div>
    <ul>
      <li v-for="post in posts" :key="post.url">
        <a :href="post.url">{{ post.title }}</a>
        <!-- <p>{{ post.updated.string }}</p> -->
        <!-- <p>{{ post.created.string }}</p> -->
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { data as postsData } from '../utils/notes.data.ts'

const posts = ref([])

onMounted(() => {
  console.log(postsData)
  posts.value = postsData
})
</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 1em 0;
}
</style>
