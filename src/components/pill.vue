<template>
  <div class="d-block pill text-nowrap" @click="clicked" :class="sid === active ? 'active-pill' : ''">
    {{text}}
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    href: String,
    clicked: Function,
    sid: Number,
    active: Number
  },
  name: "pill"
}
</script>

<style scoped>
.pill{
  padding: 10px 20px;
  color: black;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.1);
  border-radius: 50px;
  margin: 8px 8px;
  transition: all .3s ease;
  background: white;
}

.pill:hover{
  text-decoration: none;
  transform: scale(1.05);
  cursor: pointer;
}

.active-pill{
  background: #ececec;
}
</style>