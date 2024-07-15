<script setup>
import { ref, computed } from 'vue'
import SuggestInput from '@/components/Suggest/Input.vue'
import SuggestWrapper from '@/components/Suggest/Wrapper.vue'

const emit = defineEmits(['input', 'reset'])

const props = defineProps({
  maxLength: {
    type: Number,
    default: 1
  },
  minInputLength: {
    type: Number,
    default: 3
  },
  list: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  }
})

const selectedTags = ref([])
const searchQuery = ref('')

const shouldShowSuggestions = computed(() => {
  return selectedTags.value.length < props.maxLength && props.list.length > 0
})

const appendTag = (tag) => {
  selectedTags.value.push(tag)
  searchQuery.value = ''
  emit('reset')
}

const removeTag = (tag) => {
  const index = selectedTags.value.findIndex((item) => item.id === tag.id)
  selectedTags.value.splice(index, 1)
  emit('reset')
}

const handleInput = (value) => {
  searchQuery.value = value
  emit('input', searchQuery.value)
}
</script>

<template>
  <section>
    <form>
      <fieldset>
        <label v-if="label">{{ label }}</label>
        <SuggestInput
          v-model="searchQuery"
          :placeholder="placeholder"
          :selectedTags="selectedTags"
          :disabled="selectedTags.length < props.maxLength"
          :loading="loading"
          :error="error"
          @remove="removeTag"
          @input="handleInput"
        />
      </fieldset>
    </form>

    <SuggestWrapper v-if="shouldShowSuggestions">
      <slot
        v-for="(item, index) in list" 
        :item="item"
        :key="index"
        :selected="appendTag"
      />
    </SuggestWrapper>

    <div v-if="error" class="suggest-error">
      <span>{{ error }}</span>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.suggest-error {
  margin-top: var(--pico-spacing);
  background-color: var(--pico-dropdown-background-color);
  border-radius: var(--pico-border-radius);
  padding: var(--pico-spacing);
}
</style>
