<template>
    <button :class="$style[type]">
      <slot></slot>
    </button>
  </template>
  
  <script>
  export default {
    props: ['type']
  }
  </script>
  
  <style module>
  .dark-small {
    height: 30px;
    padding-left: 5px;
    padding-right: 5px;
    font-size: large;
    color: white;
    background-color: #ACC12F;
    border-radius: 3px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: 0px;
  }
  
  .dark-small:hover {
    background-color: black;
    cursor: pointer;
  }
  .dark-large {
  height: 30px;
  padding: 5px 8px 5px 8px;
  font-size: large;
  color: #FBF5F3;
  background-color: #262A2C;
  border-radius: 5px;
  box-shadow: 10px 15px 20px rgba(0, 0, 0, 0.25);
  border: 0px;
}

.dark-large:hover {
  background-color: black;
  cursor: pointer;
}

.green-large {
  padding: 8px 10px 8px 10px;
  font-size: large;
  color: #FBF5F3;
  background-color: #ACC12F;
  border-radius: 5px;
  box-shadow: 10px 15px 20px rgba(0, 0, 0, 0.25);
  border: 0px;
  width: 300px;
}

.green-large:hover {
  background-color: #c3e40a;
  cursor: pointer;
}
 </style>