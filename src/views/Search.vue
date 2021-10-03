<template>
  <div class="search">
    <b-container class="pt-4 text-center">
      <Main_logo/>
      <h3 class="subject-name mt-3">{{ subjectName }}</h3>
      <Search_string :subj="subj" :need-subject="false"/>

      <div class="d-flex flex-wrap justify-content-between mt-5">
        <pill v-for="p in popular" :key="p" :text="p" :active="false"/>
      </div>
    </b-container>
  </div>
</template>

<script>
import Search_string from "../components/search_string";
import Main_logo from "../components/main_logo";
import {mapActions} from "vuex";
import {BACKEND} from "../backend.config";
import axios from "axios";
import Pill from "../components/pill";

export default {
  name: "Search",
  components: {
    Pill,
    Search_string,
    Main_logo
  },
  data() {
    return {
      subj: "",
      popular: []
    }
  },
  computed: {
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
  methods: {
    ...mapActions(["setSubject"])
  },
  mounted() {
    let subj = this.$route.params.subj
    this.subj = subj
    this.setSubject(subj)

    if (subj === "math") {
      document.documentElement.setAttribute("theme", "blue")
    } else if (subj === "rus"){
      document.documentElement.setAttribute("theme", "red")
    } else if (subj === "eng"){
      document.documentElement.setAttribute("theme", "cyan")
    } else if (subj === "phys"){
      document.documentElement.setAttribute("theme", "purple")
    }

    axios.get(BACKEND + "/get_popular/" + subj).then(r => {
      this.popular = r.data
    })
  }
}
</script>

<style scoped>

</style>