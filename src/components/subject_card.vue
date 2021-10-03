<template>
  <router-link :to="link" class="subject-card mt-5 d-block" :style="'background:' + gradient ">
    <div class="content text-center d-flex flex-column">
      <span class="sname">{{ name }}</span>
      <span class="classes">{{ classes }}</span>
      <img class="my-3 w-50 mx-auto" :src="icon" alt="">
      <span class="populars mt-auto">Популярные темы</span>
      <div class="themes">
        <a v-for="theme in popular" class="theme" :key="theme">{{ theme }}, </a>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    name: String,
    classes: String,
    icon: String,
    popular: Array,
    gradient: String,
    link: String
  },
  name: "subject_card"
}
</script>

<style scoped>
.subject-card{
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  padding: 15px;
  color: white;
  transition: all .3s ease;
  flex: 1 1 auto;
}

.subject-card:hover{
  transform: scale(1.08);
  text-decoration: none;
  cursor: pointer;
}

.sname{
  font-size: 28px;
  font-weight: 600;
}

.populars{
  font-size: 18px;
}

.theme{
  color: white;
  font-size: 14px;
}
</style>