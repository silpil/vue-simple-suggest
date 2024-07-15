<script setup>
import { useSuggest } from '@/composables/useSuggest'
import Suggest from '@/components/Suggest/index.vue'
import SuggestItem from '@/components/Suggest/Item.vue'

const apiUrl = import.meta.env.VITE_API_URL
const { list, errorMessage, isLoading, handleInput, handleReset } = useSuggest({ apiUrl })
</script>

<template>
  <main class="container">
    <Suggest
      :max-length="1"
      :list="list"
      :error="errorMessage"
      :loading="isLoading"
      label="Пользователь или компания"
      placeholder="Введите логин"
      @input="handleInput"
      @reset="handleReset"
    >
      <template v-slot="{ item, selected }">
        <SuggestItem
          :title="item.name || `@${item.alias}`"
          :description="item.type === 'company' ? 'Компания' : `@${item.alias}`"
          :image="item.avatar"
          @selected="selected(item)"
        />
      </template>
    </Suggest>
  </main>
</template>
