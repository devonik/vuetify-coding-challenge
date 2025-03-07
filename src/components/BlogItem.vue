<template>
  <v-card
    rounded="lg"
    variant="elevated"
    :title="item.title"
    :subtitle="item.subtitle"
    :height="isReadMoreSelected ? 'auto': '230'"
    class="d-flex flex-column"
  >
    <v-card-text>
      <div class="d-flex ga-3">
        <v-icon
          icon="mdi-text"
          class="text-disabled"
        />
        <div class="overflow-auto"> 
          <span>{{ text }}</span>
          <span
            v-if="item.text.length > textMaxLength"
            class="cursor-pointer ml-3 text-info"
            @click="isReadMoreSelected = !isReadMoreSelected"
          >
            {{ isReadMoreSelected ? 'read less' : 'read more' }}
          </span>
        </div>
      </div>
    </v-card-text>
    <v-card-actions class="justify-space-between mx-2">
      <div class="d-flex ga-3">
        <v-btn
          icon="mdi-pencil"
          color="primary"
          @click="$emit('edit', item.id as string)"
        />
        <v-btn
          icon="mdi-delete"
          color="error"
          @click="$emit('delete', item.id as string)"
        />
      </div>
      <div>
        <div class="mb-1">
          <v-avatar
            :image="item.authorAvatarUrl"
            :icon="!item.authorAvatarUrl ? 'mdi-account' : undefined"
          />
          <span class="text-subtitle-2">{{ item.author }}</span>
        </div>


        <p class="text-subtitle-2">
          {{ createdAt }}
        </p>
      </div>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts" setup>
import type { BlogItem } from '@/stores/blog';

const props = defineProps<{
    item: BlogItem
}>()
defineEmits<{
  edit: [id: string]
  delete: [id: string]
}>()

//truncate the text
//if substring is not set the text can be longer before truncated
const textMaxLength = computed(()  => props.item.subtitle ? 80 : 100)
const text = computed(() => {
    if(isReadMoreSelected.value || props.item.text.length < textMaxLength.value) return props.item.text
    else return props.item.text.substring(0, textMaxLength.value)
})
const createdAt = computed(() => new Date(props.item.createdAt as string).toLocaleDateString())

const isReadMoreSelected = ref(false)
</script>