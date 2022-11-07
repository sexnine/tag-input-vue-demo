<template>
  <div class="flex min-h-screen flex-col items-center justify-center gap-y-12 py-12 px-8">
    <h1 class="text-2xl font-bold">Tag input demo</h1>
    <p class="max-w-lg text-left">
      An input box that allows you to add tags. <br />
      Allows you to remove tags by either clicking the
      <fa-icon :icon="['fas', 'circle-xmark']" /> button, or by using backspace
      or delete key (like you would with any other text). This tag input also
      allows you to move between the tags as if they were text (something that I
      struggled to find someone implement). <br />
      It feels natural, like any other standard text input. Press enter to add a
      tag to the list
    </p>
    <tag-input v-model="tags" class="my-8" />
    <div class="text-left">
      <p class="font-bold">Tags entered above:</p>
      <ul class="list-disc">
        <li v-for="x in tags" :key="x">
          {{ x }}
        </li>
      </ul>
    </div>
    <p class="max-w-lg text-left">
      Honestly, parts of this are suuuper hacky. I recommend you look at the
      code and look at all the random stuff I had to do, and how I was able to
      make the caret move between tags (it involves zero-width spaces, please
      find a better way if you can lol) or how the text input your looking at
      above is not a text input (&lt;input&gt;) whatsoever :) <br />
      <br />
      This was honestly a fun project and I plan on improving it some more by
      adding features like: ability to edit tags (through maybe double-clicking
      them) and dropdown that gives tag suggestions as you type (like
      autocomplete)<br />
      <br />
      Check out the code
      <a
        class="font-bold text-blue-500"
        href="https://github.com/sexnine/tag-input-vue-demo/blob/main/src/components/TagInput.vue"
        >here</a
      >
      and give me a follow while you're at it ;)
    </p>
    <a
      class="text-xl font-semibold text-blue-500"
      href="https://github.com/sexnine"
    >
      <fa-icon :icon="['fab', 'github']" />/sexnine
    </a>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import TagInput from "./components/TagInput.vue";

  const tags = ref([]);
</script>

<style>
  #app {
    //font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #000;
  }

  body {
    @apply font-inter;
  }
</style>
