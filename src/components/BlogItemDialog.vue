<template>
  <v-dialog
    v-model="isDialogOpen"
    max-width="600"
  >
    <template #activator="{ props: activatorProps }">
      <v-btn
        class="text-none font-weight-regular"
        prepend-icon="mdi-plus"
        color="primary"
        text="New post"
        variant="tonal"
        v-bind="activatorProps"
      />
    </template>

    <v-card
      prepend-icon="mdi-post"
      title="Blog post"
    >
      <v-form
        v-model="isFormValid"
        @submit.prevent="submit"
      >
        <v-card-text>
          <v-row dense>
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="model.title"
                :rules="[requiredRule('title')]"
                label="Title*"
              />
            </v-col>
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="model.subtitle"
                label="Subtitle"
              />
            </v-col>
            <v-col
              cols="12"
            >
              <v-textarea
                v-model="model.text"
                label="Text*"
                :rules="[requiredRule('text')]"
              />
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="model.author"
                hint="Your username"
                label="Created by name*"
                :rules="[requiredRule('username')]"
              />
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="model.authorAvatarUrl"
                label="Created by image"
                hint="Must be a URL"
              />
            </v-col>
          </v-row>

          <small class="text-caption text-medium-emphasis">*indicates required field</small>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />

          <v-btn
            text="Close"
            variant="plain"
            @click="isDialogOpen = false"
          />

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            type="submit"
          />
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script lang="ts" setup>
import { useBlogStore, type BlogItem } from '@/stores/blog';
const initialItem: BlogItem = {
    title: '',
    subtitle: '',
    text: '',
    author: '',
    authorAvatarUrl: ''
}

const blogStore = useBlogStore()
const props = defineProps<{
    item?: BlogItem
}>()

const isDialogOpen = defineModel<boolean>({default: false})
const isFormValid = ref()
const model = ref<BlogItem>(props.item || {...initialItem}) 

watch(isDialogOpen, (value) => {
    if(!value){
        //Close dialog
        model.value = {...initialItem}
    }else{
        //Open dialog
        model.value = props.item ? {...props.item} : {...initialItem}
    }
})

const requiredRule = (fieldName: string) => {
    return (value: boolean) => 
    {
        if (value) return true

        return `You must enter a ${fieldName}.`
    }
}

function submit(){
    if(!isFormValid.value) return
    blogStore.upsetItem(model.value)
    isDialogOpen.value = false
}
</script>