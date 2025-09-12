<script setup lang="ts">

</script>

<template>
  <div class="tooltip-wrapper">
    <slot name="trigger"></slot>
    <div class="tooltip-box">
      <span>
        <slot></slot>
      </span>
    </div>
  </div>
</template>



<style scoped>

.tooltip-wrapper {
  position: relative;
  display: inline-block;
}


.tooltip-box {
  padding: 13px;
  border:solid 1px #dadce1;
  border-radius: 10px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  position: absolute;
  top: 0;
  transform: translate(-85%, -130%);
  white-space: nowrap;
  z-index: 99;
  opacity: 0;
  transition: opacity 0.2s ease;
  background-color: #fff;
}

.tooltip-box:after {
  content: '';
  position: absolute;
  top: 98%;
  right: 10px;
  border-width: 8px;
  border-style: solid;
  border-color: #fff transparent transparent transparent;

}


.tooltip-wrapper:hover .tooltip-box {
  opacity: 1;
}

.tooltip-box span {
  font-size:14px;
  color:#555;
  font-weight: 400;
  letter-spacing: -0.3px;
  line-height: 23px;
  display: block;
}
</style>
