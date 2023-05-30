<template>
  <div class="carousel-box" :style="{ height: height }" ref="root" @mouseenter.stop="handlerMouseEnter"
    @mouseleave.stop="handleMouseLeave">
    <div class="arrow arrow-left" v-show="hover" @click.stop="arrowClick('left')">
      <span class="iconfont icon-zuo"></span>
    </div>
    <div class="arrow arrow-right" v-show="hover" @click.stop="arrowClick('right')">
      <span class="iconfont icon-you"></span>
    </div>
    <slot />
    <div class="indicators">
      <div class="item" :class="[activeIndex == index ? 'active-item' : '']" v-for="(item, index) in items" :key="index"
        @click="indicatorClick(index)">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { carouselProps } from './Carousel';
import { useCarousel } from './use-carousel'

const props = defineProps(carouselProps)
// const props = defineProps({
//   height: {
//     type: String,
//     default: '200px'
//   }
// })
const { root, handlerMouseEnter, handleMouseLeave, hover, arrowClick, items, activeIndex, indicatorClick } = useCarousel(props)
</script>
<style scoped lang="scss">
.carousel-box {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.arrow {
  position: absolute;
  z-index: 1;
  cursor: pointer;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-radius: 50%;
  background: #f0f0f0;
  top: 50%;
  margin-top: -25px;

  &.arrow-left {
    left: 10px;
  }

  &.arrow-right {
    right: 10px;
  }
}

.indicators {
  position: absolute;
  z-index: 1;
  bottom: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .item {
    background: rgba(255, 255, 255, .5);
    width: 50px;
    height: 5px;
    margin-right: 10px;

    &:last-child {
      margin-right: 0px;
    }
  }

  .active-item {
    background: #fff;
  }
}
</style>