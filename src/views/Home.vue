<template>
  <div class="home">
    <b-container class="pt-4 text-center">
      <Main_logo/>
      <Search_string/>
      <Bubble text="Крещение Руси 988г" id="bubble-1"/>
      <Bubble text="Таблица умножения" id="bubble-2"/>
      <Bubble text="Производные" id="bubble-3"/>
      <Bubble text="Млекопитающие" id="bubble-4"/>
      <Bubble text="Окружающий мир" id="bubble-5"/>
      <Bubble text="Система счисления" id="bubble-6"/>

      <h3 class="text-center materials">Подборки материалов от преподавателей</h3>

      <b-row>
        <b-col class="col-12 col-md-6 col-lg-3 d-flex">
          <Subject_card name="Физика" link="/search/phys" classes="7-11 класс" :icon="physics" :popular="['Физические величины', 'строение вещества', 'механическое движение', 'траектория', 'прямолинейное движение']" gradient="linear-gradient(140.39deg, #9400d3 3.7%, #4b0082 95.61%)"/>
        </b-col>
        <b-col class="col-12 col-md-6 col-lg-3 d-flex">
          <Subject_card name="Математика" link="/search/math" classes="1-11 класс" :icon="calculator" :popular="['Уравнения', 'графики', 'теорема Ферма', 'веселая ферма', 'зомби ферма скачать']" gradient="linear-gradient(146.86deg, #0052D4 5.92%, #4364F7 52.26%, #6FB1FC 98.61%)"/>
        </b-col>
        <b-col class="col-12 col-md-6 col-lg-3 d-flex">
          <Subject_card name="Английский" link="/search/eng" classes="2-11 класс" :icon="translator" :popular="['Презент симпл', 'паст континиус', 'лондон из...', 'неправильные глаголы', 'оксимирон']" gradient="linear-gradient(148.63deg, #00F5A0 2.38%, #00D9F5 100.85%)"/>
        </b-col>
        <b-col class="col-12 col-md-6 col-lg-3 d-flex">
          <Subject_card name="Русский" link="/search/rus" classes="1-11 класс" :icon="rus" :popular="['Суффиксы', 'постфиксы', 'ударения',  'ответы егэ 2020', 'продается икс 5 93 года карбюратор инжектор проректор']" gradient="linear-gradient(145.18deg, #C84E89 5.5%, #F15F79 98.02%)"/>
        </b-col>
      </b-row>

    </b-container>
    <footer class="d-flex pb-3">
      <b-container class="text-center d-flex flex-column">
        <div class="mt-auto d-flex flex-column">
          <span class="text-white mt-auto">Обучалочка - ресурс для поиска учебных материалов для учителей и учеников
  Только на Обучалочке вы можете найти массу полезной информации из различных источников!</span>
          <span class="text-white-50">
            Прототип для хакатона Учи.ру 2021. Создано командой FTITN
          </span>
        </div>
      </b-container>
    </footer>
  </div>
</template>

<script>
import Main_logo from "../components/main_logo";
import Search_string from "../components/search_string";
import Bubble from "../components/bubble";
import Subject_card from "../components/subject_card";
import physics from "../assets/physics.svg"
import calculator from "../assets/calculator.svg"
import translator from "../assets/translator.svg"
import rus from "../assets/file31 1.svg"

export default {
  name: 'Home',
  components: {
    Subject_card,
    Bubble,
    Search_string,
    Main_logo
  },
  data () {
    return {
      physics,
      calculator,
      rus,
      translator
    }
  },
  mounted() {
    document.documentElement.removeAttribute("theme")
  }
}
</script>

<style lang="scss">
#bubble-1{
  top: 350px;
  -webkit-animation-delay: -3s;
  animation-delay: -3s;
  right: 250px;
}

#bubble-2{
  top: 180px;
  -webkit-animation-delay: -8s;
  animation-delay: -8s;
  right: 40px;
}

#bubble-3{
  top: 150px;
  -webkit-animation-delay: -5s;
  animation-delay: -5s;
}

#bubble-4{
  left: 140px;
  top: 260px;
  -webkit-animation-delay: -10s;
  animation-delay: -10s;
}

#bubble-5{
  right: 260px;
  top: 80px;
  -webkit-animation-delay: -10s;
  animation-delay: -10s;
}

#bubble-6{
  left: 340px;
  top: 390px;
  -webkit-animation-delay: -10s;
  animation-delay: -10s;
}

.materials{
  margin-top: 150px;
}

footer{
  background-size: cover!important;
  background: url("../assets/footer.png") no-repeat bottom center;
  height: 30vw;
  //margin-top: 60px;
  padding-top: 60px;
}

@media screen and (max-width: 992px) {
  footer{
    //margin-top: 100px;
    height: 40vh;
    font-size: 13px;
  }

  #bubble-4{
    left: 20px;
  }

  #bubble-1{
    right: 80px;
    top: 400px;
  }

  #bubble-5{
    top: 300px;
    right: 50px;
  }
}

@media screen and (max-width: 768px) {
  .materials{
    margin-top: 40px;
  }

  footer{
    height: 70vh;
  }
}

@media screen and (max-width: 1330px){
  #bubble-6{
    left: 60px;
  }

  #bubble-1{
    right: 80px;
  }

  #bubble-5{
    right: 50px;
  }
}
</style>