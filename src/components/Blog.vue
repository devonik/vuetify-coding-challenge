<template>
  <div class="d-flex flex-column ga-3">
    <h1 class="text-h2 font-weight-bold text-center mb-3">
      Devnik's Blog
    </h1>
    <div class="d-flex flex-column align-center mb-3">
      <v-autocomplete
        v-model="filterItemId"
        width="300"
        variant="solo-filled"
        density="compact"
        :items="blogStore.list"
        item-value="id"
        clearable
      >
        <template #item="{ props, item }">
          <v-list-item
            v-bind="props"
            :prepend-avatar="item.raw.authorAvatarUrl"
            :prepend-icon="!item.raw.authorAvatarUrl ? 'mdi-post': undefined"
            :subtitle="item.raw.subtitle ? `${item.raw.subtitle} - ${new Date(item.raw.createdAt as string).toLocaleDateString()}` : new Date(item.raw.createdAt as string).toLocaleDateString()"
            :title="`${item.raw.title} - ${item.raw.author}`"
          />
        </template>
      </v-autocomplete>
      
      <blog-item-dialog
        v-model="isEditDialogOpen"
        :item="selectedItem"
      />
    </div>
    <v-row>
      <v-col
        v-for="item in filteredList"
        :key="item.id"
        cols="12"
        md="6"
      >
        <blog-item
          :item="item"
          @edit="edit"
          @delete="deleteItem"
        />
        <v-dialog
          v-model="isDeleteDialogOpen"
          max-width="500"
        >
          <v-card title="Are you sure you want delete the post?">
            <v-card-actions>
              <v-btn
                color="primary"
                @click="confirmDeletion"
              >
                Yes
              </v-btn>
              <v-btn @click="isDeleteDialogOpen = false">
                No
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { useBlogStore, type BlogItem } from '@/stores/blog';

const blogStore = useBlogStore()

const filteredList = computed(() => {
  if(!filterItemId.value) return blogStore.list
  else return blogStore.list.filter(item => item.id === filterItemId.value)
})

const filterItemId = ref<string>()
const selectedItem = ref<BlogItem>()
const isEditDialogOpen = ref(false)
const isDeleteDialogOpen = ref(false)

watch(isEditDialogOpen, (value) => {
  if(!value) selectedItem.value = undefined
})

function edit(id: string){
  selectedItem.value = blogStore.list.find(item => item.id === id)
  isEditDialogOpen.value = true
}

function confirmDeletion(){
  deleteItem(selectedItem.value?.id as string, true)
  isDeleteDialogOpen.value = false
}

function deleteItem(id: string, isConfirmed = false){
  selectedItem.value = blogStore.list.find(item => item.id === id)
  if(isConfirmed) {
    blogStore.deleteItem(id)
    selectedItem.value = undefined
  }else{
    isDeleteDialogOpen.value = true
  }
}
</script>
