<template>
  <div class="img-preview-box" @click.stop="closePreview">
    <div class="control-item del-icon" @click.stop="closePreview">
      <span class="iconfont icon-shanchu2"></span>
    </div>
    <div class="control-item left-icon" @click.stop="changeImg('left')">
      <span class="iconfont icon-zuo"></span>
    </div>
    <div class="control-item right-icon" @click.stop="changeImg('right')">
      <span class="iconfont icon-you"></span>
    </div>
    <div class="control-box">
      <span class="iconfont icon-suoxiao" @click.stop="changeImgPose('small')"></span>
      <span class="iconfont icon-fangda" @click.stop="changeImgPose('big')"></span>
      <span class="iconfont icon-xiangzuoxuanzhuan" @click.stop="changeImgPose('leftRotate')"></span>
      <span class="iconfont icon-xiangyouxuanzhuan" @click.stop="changeImgPose('rightRotate')"></span>
    </div>
    <img :src="previewList[curImg]" :style="curTransform" @click.stop="cancelClick" />
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted, getCurrentInstance, computed } from 'vue'

const scaleUnit = 0.2 // 缩放比例
const rotateUnit = 90 // 旋转比例

const props = defineProps({
  previewList: {
    type: Array,
    default: []
  },
  onClose: {
    type: Function,
    default: () => { }
  }
})

const curImg = ref(0)
const curScale = ref(1)
const curRotate = ref(0)

const curTransform = computed(() => {
  return `transform: scale(${curScale.value}) rotate(${curRotate.value}deg);`
})

function changeImg(direct) {
  resetPose()
  if (direct == 'right') {
    if (curImg.value == props.previewList.length - 1) {
      curImg.value = 0
    } else {
      curImg.value++
    }
  } else {
    if (curImg.value == 0) {
      curImg.value = props.previewList.length - 1
    } else {
      curImg.value--
    }
  }
}

function closePreview() {
  props.onClose()
}

function changeImgPose(type) {
  if (type == 'small') {
    curScale.value = curScale.value - scaleUnit
  }
  if (type == 'big') {
    curScale.value = curScale.value + scaleUnit
  }
  if (type == 'leftRotate') {
    curRotate.value = curRotate.value - rotateUnit
  }
  if (type == 'rightRotate') {
    curRotate.value = curRotate.value + rotateUnit
  }
}

function resetPose() {
  curScale.value = 1
  curRotate.value = 0
}

// 用于点击图片时，阻止点击事件冒泡
function cancelClick() {

}

</script>

<style scoped>
.img-preview-box {
  z-index: 10000;
  position: fixed;
  background: rgba(127, 127, 127, .6);
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-preview-box img {
  transition: transform 0.3s ease 0s;
  max-height: 100%;
  max-width: 100%;
}

.preview-body {
  position: relative;
}

.control-item {
  z-index: 10;
  background: rgba(0, 0, 0, .5);
  width: 50px;
  height: 50px;
  line-height: 50px;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  position: absolute;
}

.control-box {
  z-index: 10;
  background: rgba(0, 0, 0, .5);
  color: #fff;
  height: 50px;
  line-height: 50px;
  width: 220px;
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  border-radius: 50px;
  position: absolute;
}

.control-box .iconfont {
  font-size: 30px;
}

.del-icon {
  right: 40px;
  top: 40px;
}

.left-icon {
  left: 40px;
  top: 50%;
  margin-top: -25px;
}

.right-icon {
  right: 40px;
  top: 50%;
  margin-top: -25px;
}

.control-box {
  bottom: 40px;
  left: 50%;
  margin-left: -110px;
}
</style>