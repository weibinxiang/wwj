<template>
  <!--
     @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseUp"
  -->
  <div class="touch-scroll-container" @wheel="handleWheel" ref="containerRef">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const containerRef = ref();

  // let isMouseDown = false;
  // let startX = 0;
  // let scrollLeft = 0;

  // const handleMouseDown = (e) => {
  //   isMouseDown = true;
  //   startX = e.clientX;
  //   scrollLeft = containerRef.value.scrollLeft;
  // };

  // const handleMouseMove = (e) => {
  //   if (!isMouseDown) return;

  //   const x = e.clientX;
  //   const walk = (x - startX) * 2;
  //   const newScrollLeft = scrollLeft - walk;

  //   const maxScrollLeft = containerRef.value.scrollWidth - containerRef.value.clientWidth;

  //   if (newScrollLeft < 0) {
  //     containerRef.value.scrollLeft = 0;
  //   } else if (newScrollLeft > maxScrollLeft) {
  //     containerRef.value.scrollLeft = maxScrollLeft;
  //   } else {
  //     containerRef.value.scrollLeft = newScrollLeft;
  //   }
  // };

  // const handleMouseUp = () => {
  //   isMouseDown = false;
  // };

  const handleWheel = (e) => {
    const delta = e.deltaX || e.deltaY;

    containerRef.value.scrollLeft += delta;
    e.preventDefault();
  };
</script>

<style scoped>
  .touch-scroll-container {
    display: flex;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .touch-scroll-container::-webkit-scrollbar {
    display: none;
  }
</style>
