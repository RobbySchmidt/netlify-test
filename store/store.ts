import { defineStore } from "pinia";
import data from '../data';

export const useStore = defineStore('store', {
  state: () => ({   
    images: data,
  }),
    getters:{
      getImageById: (state) => {
        return (id:any) => 
        state.images.find((image) => image.id === id) 
      },
      publishedImages: (state) => {
        return state.images.filter((image) => image.published === true) 
      },
    },
  })