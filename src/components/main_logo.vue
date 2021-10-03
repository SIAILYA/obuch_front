<template>
  <router-link to="/" class="d-block main-logo text-center">
    <span class="obuch">Обучалочка.ру</span>
    <br>
    <span>удобный поиск материалов для учителей и учеников</span>
  </router-link>
</template>

<script>
export default {
  name: "main_logo"
}
</script>

<style scoped lang="scss">
@import "../style";

.main-logo{
  color: #282828;
  .obuch{
    font-size: 58px;
    font-weight: 500;
    background: #F2C94D;
    background: $wkgradient;
    background: $mozgradient;
    background: $gradient;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    user-select: none;
}

.main-logo:hover{
  text-decoration: none;
}

@media screen and (max-width: 768px) {
  .obuch{
    font-size: 32px!important;
  }
}
</style>