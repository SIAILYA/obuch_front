<template>
  <div class="search pb-2">
    <b-modal id="voted" hide-footer hide-header content-class="text-center">
      <h3 class="thanks">Спасибо!</h3>
      <p>Мы учли Вашу оценку и изменили рейтинг сайта!</p>
      <button @click="$bvModal.hide('voted')" class="voted-btn">Окей</button>
    </b-modal>
    <b-modal id="reported" hide-footer hide-header content-class="text-center">
      <h3 class="thanks">Спасибо!</h3>
      <p>Мы проверим жалобу и заблокируем сайт, если это потребуется!</p>
      <button @click="$bvModal.hide('reported')" class="voted-btn">Окей</button>
    </b-modal>
    <b-container class="pt-4 text-center">
      <Main_logo/>
      <h3 class="subject-name mt-3">{{ subjectName }}</h3>
<!--      <Search_string :need-subject="false"/>-->

      <h2>Посмотрите что мы нашли!</h2>
      <div class="d-flex mt-4 justify-content-center">
        <button class="load-resources overflow-hidden mx-2" @click="loadPhoto" ref="load_photo">Загрузить фото</button>
        <button class="load-resources overflow-hidden mx-2" @click="loadVideo" ref="load_video">Загрузить видео</button>
      </div>
      <span class="text-black-50 mt-2">Загрузка фото и видео может потребовать от 1 до 3 минут!</span>
      <b-row class="mt-5">
        <div v-for="r in getResults.filter(re => re.type === 'wiki')" :key="r.link" class="col-12 col-md-8 col-lg-6 d-flex">
          <Wiki_card :description="r.text" :title="r.title"/>
        </div>
        <div v-for="r in getResults.filter(re => re.type !== 'wiki')" :key="r.link" class="col-12 col-md-4 col-lg-3 d-flex">
          <Resource_card v-if="r.type !== 'wiki'" :link="r.link" :type="r.type" :icon="r.icon" :blocked="r.is_blocked"
                         :description="r.description" :rating="r.rating" :title="r.title" :report="sendReport"/>
        </div>
      </b-row>

      <h6>Не нашли полезной информации? Попробуйте переформулировать свой запрос!</h6>
    </b-container>
    <div class="text-black-50 text-center mt-5">Обучалочка придумана и создана командой FTITN в рамках хакатона Учи.ру</div>
  </div>
</template>

<script>
// import Search_string from "../components/search_string";
import Main_logo from "../components/main_logo";
import {mapActions, mapGetters} from "vuex";
import Resource_card from "../components/resource_card";
import Wiki_card from "../components/wiki_card";
import axios from "axios";
import {BACKEND} from "../backend.config";


export default {
  name: "Search",
  components: {
    Resource_card,
    // Search_string,
    Main_logo,
    Wiki_card
  },
  data() {
    return {
      subj: ""
    }
  },
  methods: {
    ...mapActions(["setSubject", "addResults"]),
    loadVideo() {
      this.$refs.load_video.disabled = true
      axios.post(BACKEND + "/load_videos", {theme: this.getQuery}).then((r) => {
        this.$refs.load_video.style.height = "0"
        this.$refs.load_video.style.width = "0"
        this.$refs.load_video.style.padding = "0"
        this.addResults(r.data)
      })
    },
    loadPhoto() {
      this.$refs.load_photo.disabled = true
      axios.post(BACKEND + "/load_photos", {theme: this.getQuery}).then((r) => {
        this.$refs.load_photo.style.height = "0"
        this.$refs.load_photo.style.width = "0"
        this.$refs.load_photo.style.padding = "0"
        this.addResults(r.data)
      })
    }
  },
  computed: {
    ...mapGetters(["getResults", "getQuery"]),
    subjectName() {
      if (this.subj === "math") {
        return "Математика"
      } else if (this.subj === "rus") {
        return "Русский язык"
      } else if (this.subj === "eng") {
        return "Английский"
      }
      return "Физика"
    }
  },
  mounted() {
    let subj = this.$route.params.subj
    this.subj = subj

    if (this.getResults.length !== 0) {
      this.setSubject(subj)

      if (subj === "math") {
        document.documentElement.setAttribute("theme", "blue")
      } else if (subj === "rus") {
        document.documentElement.setAttribute("theme", "red")
      } else if (subj === "eng") {
        document.documentElement.setAttribute("theme", "cyan")
      } else if (subj === "phys") {
        document.documentElement.setAttribute("theme", "purple")
      }

    } else {
      this.$router.replace("/search/" + subj)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../style";

.voted-btn {
  background: $wkgradient;
  background: $mozgradient;
  background: $gradient;
  color: white;
  border-radius: 50px;
  padding: 6px 30px;
  font-weight: 500;
  border: none;
  outline: none;
}

.report {
  border-radius: 50px 50px 50px 50px;
  border: 2px solid var(--main);
  overflow: hidden;
  outline: none;
  padding: 10px;
  transition: all .3s ease;
}

.load-resources{
  background: $wkgradient;
  background: $mozgradient;
  background: $gradient;
  color: white;
  border-radius: 50px;
  padding: 6px 30px;
  font-weight: 500;
  border: none;
  outline: none;
  font-size: 18px;
}
</style>