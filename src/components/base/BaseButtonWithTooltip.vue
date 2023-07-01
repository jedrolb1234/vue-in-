<template>
  <button :class="type">
    <slot>
    </slot>
    <span class="tooltiptext">{{tooltip}}</span>
  </button>
</template>

<script>
export default {
    props: ["type", 'tooltip']
}
</script>

<style scoped>
.tooltiptext {
  visibility: hidden;
  background-color: var(--primary);
  color: var(--secondary);
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 130%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
}

.tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: var(--primary) transparent transparent transparent;
  z-index: 9999;
}
.primary-small {
  padding: 0.3em;
  font-size: 12px;
  color: var(--primary);
  background-color: var(--primaryBtn);
  border-radius: 7px;
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
  border: 0px;
  transition: transform 0.3s ease;
  position: relative;
}

.primary-small:hover {
  transform: translateY(-5px);
  cursor: pointer;
}

.primary-small:hover .tooltiptext {
  visibility: visible;
}

.secondary-small {
  position: relative;
  padding: 0.3em;
  font-size: 12px;
  color: var(--primary);
  background-color: var(--secondaryBtn);
  border-radius: 7px;
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
  border: 1px solid var(--primary);
  transition: transform 0.3s ease;
}

.secondary-small:hover {
  transform: translateY(-5px);
  cursor: pointer;
}

.secondary-small:hover .tooltiptext {
  visibility: visible;
}
</style>