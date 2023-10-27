<script setup lang="ts">
import { reactive } from 'vue'

const theme = reactive({
  dark: false,
  compact: false,
})

const onTheme: any = () => {
  theme.dark = !theme.dark
}
const onCompact: any = () => {
  theme.compact = !theme.compact
}
</script>

<template>
  <div :class="{
    dark: theme.dark,
    compact: theme.compact,
  }" class="font-sans w-screen h-screen bg-container flex flex-col items-center px-2 ">
    <div class="flex flex-col sm:w-md w-full mt-40 border-2 border-color-border rounded-md px-xl py-lg">
      <div class="flex gap-x-4 ">
        <button
          class="text-base rounded-md px-base text-text py-xs border-color-border border-1 hover:border-primary-border hover:text-primary"
          @click="onTheme">
          {{ theme.dark ? 'light' : 'dark' }}
        </button>
        <button
          class="text-base rounded-md px-base text-text py-xs border-color-border border-1 hover:border-primary-border hover:text-primary"
          @click="onCompact">
          {{ theme.compact ? 'loose' : 'compact' }}
        </button>
      </div>

      <div class="mt-10 flex flex-col">
        <h1 class="text-text text-xl font-bold mb-sm">
          Preview
        </h1>
        <p class="text-text text-base">
          This is a long text
        </p>
        <p class="text-primary/50 bg-container/20 text-base">
          The color opacity is 0.5
        </p>
      </div>
      <p class="text-text">You can see all the css in <span class="font-bold">Devtools</span></p>
    </div>
  </div>
</template>

<style scoped></style>
