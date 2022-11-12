<template>
  <div
    ref="fauxInput"
    class="relative flex w-96 items-center overflow-x-hidden rounded-lg bg-gray-300 font-bold text-black shadow-md outline-none ring-red-500 transition focus-within:ring-2"
  >
    <template v-for="(x, i) in tags" :key="x">
      <span
        ref="tagSpanRefs"
        class="px-1 py-2 outline-0"
        role="textbox"
        contenteditable
        type="text"
        @input="tagSpanInput"
        @keydown="handleTagSpanKeyDown($event, i)"
      >
        <!-- ZWSP Below -->
        ​
      </span>
      <div
        class="flex items-center whitespace-nowrap rounded-lg bg-red-500 px-2 py-0 font-semibold text-white"
      >
        <fa-icon
          contenteditable="false"
          :icon="['fas', 'circle-xmark']"
          class="mr-1 cursor-pointer opacity-60 transition-opacity hover:opacity-90"
          @click="deleteTag(i)"
        />
        <span>
          {{ x }}
        </span>
      </div>
    </template>
    <input
      ref="newTagInputEl"
      v-model="newTagInput"
      class="bg-gray-300 py-2 pl-2 outline-0"
      size="999999"
      :style="{ width: newTagInputElWidth + 'px' }"
      @keydown="handleNewTagInputKeyPress"
      @keydown.left.up="handleNewTagInputArrow"
      @keydown.enter="handleNewTagInputEnter"
    />
    <div
      aria-hidden="true"
      class="h-10 w-full cursor-text"
      @click="focusNewTag('end')"
    />
    <span
      v-if="tags.length === 0 && newTagInput === ''"
      class="absolute cursor-text select-none whitespace-nowrap pl-2 text-gray-600"
      @click="focusNewTag"
      >Search something...</span
    >
  </div>
  <span
    ref="newTagInputWidthSpanEl"
    aria-hidden="true"
    class="invisible fixed top-0 left-0 font-bold"
    >{{ newTagInput }}</span
  >
</template>

<script setup lang="ts">
  import {
    ref,
    watch,
    nextTick,
    defineProps,
    defineEmits,
    computed,
    withDefaults,
  } from "vue";
  import { useScroll } from "@vueuse/core";

  const props = withDefaults(
    defineProps<{
      modelValue: string[];
    }>(),
    {
      modelValue: () => [],
    }
  );

  const emit = defineEmits<{
    (e: "update:modelValue", val: string[]): void;
  }>();

  // const tags = ref<string[]>([]);
  const tags = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit("update:modelValue", value);
    },
  });
  const tagSpanRefs = ref<HTMLSpanElement[]>([]);
  const newTagInput = ref<string>("");
  const newTagInputEl = ref<HTMLInputElement>();
  const newTagInputWidthSpanEl = ref<HTMLSpanElement>();
  const newTagInputElWidth = ref<number>(30);
  const fauxInput = ref<HTMLDivElement>();
  const fauxInputScroll = useScroll(fauxInput);

  const deleteTag = (index: number) => tags.value.splice(index, 1);

  /**
   * @param index - If null or out of bounds, will focus on new tag input
   */
  const focusTag = (index?: number) => {
    if (index == undefined || index >= tagSpanRefs.value.length)
      return focusNewTag("start");

    tagSpanRefs.value[index].focus();
  };

  const focusNewTag = (position?: number | "start" | "end") => {
    if (newTagInputEl.value == undefined)
      return console.error("This shouldn't happen 4");

    if (typeof position === "number") {
    } else if (position == "end") position = newTagInput.value.length - 1;
    else position = 0;

    console.debug("newTagPos: " + position);

    newTagInputEl.value.focus();
  };

  const tagSpanInput = (e: InputEvent) => {
    // @ts-ignore
    e.target.innerText = "​"; // ZWSP
    newTagInput.value += e.data;
    focusNewTag("end");
  };

  const handleTagSpanKeyDown = (event: KeyboardEvent, tagIndex: number) => {
    // This code is an absolute mess, I don't want to touch it

    if (tagIndex == undefined) tagIndex = tagSpanRefs.value.length;

    let d = 1;
    if (["ArrowLeft", "ArrowUp", "Backspace"].includes(event.key)) d = -1;

    // If previous condition not met and isn't any of following keys, return
    if (d == 1 && !["ArrowRight", "ArrowDown", "Delete"].includes(event.key))
      return;

    event.preventDefault();

    let index = tagIndex + d;

    if (index < 0) return;
    console.debug(index);

    if (["Backspace", "Delete"].includes(event.key)) {
      if (d == 1) index -= 1;
      console.debug(index);
      deleteTag(index);
      focusTag(index + 1);
      return;
    }

    focusTag(index);
  };

  const handleNewTagInputKeyPress = (e: KeyboardEvent) => {
    if (newTagInputEl.value == undefined)
      return console.error("This shouldn't happen");

    console.debug(e);
    console.debug(newTagInputEl.value.selectionStart);
    console.debug(newTagInputEl.value.selectionEnd);

    if (
      e.key != "Backspace" ||
      (newTagInputEl.value.selectionStart ?? 1) > 0 ||
      newTagInputEl.value.selectionEnd != newTagInputEl.value.selectionStart ||
      tagSpanRefs.value.length < 1
    )
      return;
    deleteTag(tagSpanRefs.value.length - 1);
  };

  const handleNewTagInputArrow = () => {
    if (newTagInputEl.value == undefined)
      return console.error("This shouldn't happen 3");

    if (
      (newTagInputEl.value.selectionStart ?? 1) > 0 ||
      newTagInputEl.value.selectionEnd != newTagInputEl.value.selectionStart ||
      tagSpanRefs.value.length < 1
    )
      return;

    focusTag(tagSpanRefs.value.length - 1);
  };

  const handleNewTagInputEnter = () => {
    const val = newTagInput.value.trim();
    if (val == "" || tags.value.includes(val)) return;
    tags.value.push(val);
    newTagInput.value = "";

    nextTick(() => {
      if (fauxInput.value == undefined)
        return console.error("This shouldn't happen 2");

      fauxInputScroll.x.value = fauxInput.value.scrollWidth;
    });
  };

  watch(newTagInput, () => {
    nextTick(
      () =>
        (newTagInputElWidth.value =
          (newTagInputWidthSpanEl.value?.clientWidth ?? 0) + 30)
    );
  });
</script>

<style scoped>
  input:focus {
    outline: none;
  }
</style>
