<template>
  <div class="img-preview-box">
    <img v-for="(item,index) in previewList" :key="index"
     :src="item"
    />
  </div>
</template>

<script setup>
import { ref,reactive, toRefs, onMounted, getCurrentInstance,computed } from 'vue'

const props = defineProps({
    previewList:{
        type:Array,
        default:['https://dsn.siimax.com/res/group1/M00/01/06/eBhmAWQ4_P6AVOWEAAAXpZzAPbk883.png']
    }
})

</script>

<style scoped>
.img-preview-box{
    position: fixed;
    background: rgba(0, 0, 0,.2);
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
}
</style>