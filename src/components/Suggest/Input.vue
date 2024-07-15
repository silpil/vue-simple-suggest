<script setup>
import { ref } from 'vue'

const emit = defineEmits(['input', 'remove'])

const props = defineProps({
  selectedTags: {
    type: Array,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const model = defineModel()
const isFocus = ref(false)
</script>

<template>
  <div :class="{ 'suggest-input-wrapper': true, 'is-focus': isFocus }">
    <div
      v-for="(tag, index) in selectedTags"
      :key="index"
      role="group"
      aria-label="Selected tag"
      class="suggest-input-tag"
    >
      <button class="suggest-input-tag-name" tabindex="-1">{{ tag.name }}</button>
      <button
        class="suggest-input-tag-close"
        @click="emit('remove', tag)"
        @keyup.delete="emit('remove', tag)"
        aria-label="Remove tag {{ tag.name }}"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="1" y1="1" x2="23" y2="23" stroke="black" stroke-width="2"/>
          <line x1="23" y1="1" x2="1" y2="23" stroke="black" stroke-width="2"/>
        </svg>
      </button>
    </div>

    <input
      v-if="disabled"
      v-model="model"
      class="suggest-input-input"
      :placeholder="placeholder"
      @keyup.enter="addTag"
      @focus="isFocus = true"
      @blur="isFocus = false"
      @input="emit('input', model)"
      aria-label="Input for adding tags"
    />

    <button v-if="loading" :aria-busy="loading" class="outline suggest-input-loader" />
</div>

</template>

<style scoped lang="scss">
.suggest-input-wrapper {
  display: flex;
  flex-wrap: wrap;
  background-color: var(--pico-form-element-background-color);
  gap: calc(var(--pico-spacing) * 0.5);
  padding: calc(var(--pico-spacing) * 0.5);
  border-radius: var(--pico-border-radius);
  box-shadow: var(--pico-box-shadow);

  transition: background-color var(--pico-transition), color var(--pico-transition), box-shadow var(--pico-transition);

  &.is-focus {
    --pico-box-shadow: 0 0 0 var(--pico-outline-width) var(--pico-form-element-focus-color);
    background-color: var(--pico-form-element-active-background-color);
  }
}

.suggest-input-input {
  border: 0;
  margin: 0;

  display: inline-flex;
  width: unset;
  flex-grow: 1;

  &:focus { 
    --pico-box-shadow: none;
  }
}
.suggest-input-tag {
  display: inline-flex;
  width: unset;
  margin: 0;
}

.suggest-input-tag-name {
  justify-content: left;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.suggest-input-tag-close {
  justify-content: left;
  padding-left: 1.2rem;
  padding-right: 1.2rem;

  svg {
    height: 12px;
    width: 12px;
  }
}

.suggest-input-loader {
  border: 0;
}
</style>