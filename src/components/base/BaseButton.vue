<template>
  <button :class="$style[type]">
    <slot></slot>
  </button>
</template>

<script>
export default {
    props: ["type"]
}
</script>

<style module>
.primary-medium {
  padding: 1em;
  font-size: 16px;
  color: var(--primary);
  background-color: var(--primaryBtn);
  border-radius: 7px;
  border: 0px;
  transition: transform 0.3s ease;
}

.primary-medium:hover {
  transform: translateY(-5px);
  cursor: pointer;
}

.secondary-medium {
  padding: 1em;
  font-size: 16px;
  color: var(--primary);
  background-color: var(--secondaryBtn);
  border-radius: 7px;
  border: 1px solid var(--primary);
  transition: transform 0.3s ease;
}

.secondary-medium:hover {
  transform: translateY(-5px);
  cursor: pointer;
}

.primary-large {
  height: 90px;
  padding: 1em;
  font-size: 24px;
  color: var(--primary);
  background-color: var(--primaryBtn);
  border-radius: 7px;
  border: 0px;
  transition: transform 0.3s ease;
}

.primary-large:hover {
  cursor: pointer;
  transform: translateY(-5px);
}

.secondary-large {
  height: 90px;
  padding: 1em;
  font-size: 24px;
  color: var(--primary);
  background-color: var(--secondaryBtn);
  border-radius: 7px;
  border: 0px;
  transition: transform 0.3s ease;
  border: 1px solid var(--primary);
}

.secondary-large:hover {
  cursor: pointer;
  transform: translateY(-5px);
}
</style>