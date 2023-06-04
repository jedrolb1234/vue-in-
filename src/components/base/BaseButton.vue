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
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
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

.dark-large {
  height: 90px;
  padding: 30px 40px 30px 40px;
  font-size: xx-large;
  color: #FBF5F3;
  background-color: #262A2C;
  border-radius: 15px;
  box-shadow: 10px 15px 20px rgba(0, 0, 0, 0.25);
  border: 0px;
}

.dark-large:hover {
  background-color: black;
  cursor: pointer;
  border-radius: 15px;
}

.green-large {
  padding: 30px 40px 30px 40px;
  font-size: xx-large;
  color: #FBF5F3;
  background-color: #ACC12F;
  border-radius: 15px;
  box-shadow: 10px 15px 20px rgba(0, 0, 0, 0.25);
  border: 0px;
}

.green-large:hover {
  background-color: #c3e40a;
  border-radius: 15px;
  cursor: pointer;
}
</style>