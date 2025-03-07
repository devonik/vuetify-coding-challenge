// Utilities
import { useLocalStorage, type RemovableRef } from '@vueuse/core'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid';

export interface BlogItem{
  id?: string
  title: string
  subtitle?: string
  text: string
  createdAt?: string
  updatedAt?: string
  author: string
  authorAvatarUrl: string
}
interface State {
  list: RemovableRef<BlogItem[]>
}

export const useBlogStore = defineStore('blog', {
  state: () => <State>({
    list: useLocalStorage('blogList', [])
  }),
  actions: {
    upsetItem(payload: BlogItem){
      if(payload.id){
        //Update
        payload.createdAt = new Date().toString()
        this.list = this.list.map(item => {
          if(item.id === payload.id) return payload
          else return item
        })
        
      }else{
        //Create
        payload.id = uuidv4();
        payload.createdAt = new Date().toString()
        this.list.push(payload)
      }
    },
    deleteItem(id: string){
      this.list = this.list.filter(item => item.id !== id)
    }
  }
})
