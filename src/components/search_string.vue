<template>
  <div class="search-string">
    <div class="d-flex justify-content-center">
      <input @input="startSearchInput" @focus="changeColor(1)" @blur="changeColor" type="text" class="search-box w-50"
             ref="sbox" :placeholder="placeholder || 'График функции'">
    </div>
    <div class="popular mt-2" ref="popular">
      <span class="mr-1">Популярные темы:</span>
      <a @click="setQueryIn('Таблица умножения')" class="mr-1 popular-item">Таблица умножения,</a>
      <a @click="setQueryIn('Синус и косинус')" class="mr-1 popular-item">Синус и косинус,</a>
      <a @click="setQueryIn('Теорема Ферма')" class="mr-1 popular-item">Теорема Ферма</a>
    </div>
    <div class="subject-select text-center mt-3" ref="subjects">
      <span>По какому предмету ищем материалы?</span>
      <div class="d-flex flex-wrap justify-content-center">
        <Pill :clicked="() => selectSubject(1, 'Математика', 'math')" :active="activeSubjectId" :sid="1"
              text="Математика"></Pill>
        <Pill :clicked="() => selectSubject(2, 'Физика', 'phys')" :active="activeSubjectId" :sid="2"
              text="Физика"></Pill>
        <Pill :clicked="() => selectSubject(3, 'Английский', 'eng')" :active="activeSubjectId" :sid="3"
              text="Английский"></Pill>
        <Pill :clicked="() => selectSubject(4, 'Русский', 'rus')" :active="activeSubjectId" :sid="4"
              text="Русский"></Pill>
      </div>
    </div>
    <div class="article-input col-12 px-0 col-md-8 col-lg-6 mx-auto mt-3" ref="article">
      <p class="mb-1">Добавьте статью или выдержку из учебника для более точного поиска</p>
      <textarea class="article" cols="50" rows="5"
                :placeholder="placeholderArt || 'Чтобы построить график функции, следует вычислить значение функции в каждой точке области определения, а затем...'"
                @input="startArticleInput"
                ref="article_input"
      ></textarea>
    </div>
    <div class="search-btn" ref="sbtn">
      <button @click="sendSearchRequest">
        Найти!
      </button>
    </div>
    <div class="search-progress" ref="spg">
      <b-spinner type="grow" class="mb-2"></b-spinner>
      <br>
      <span class="mt-2">Собираем информацию...</span>
      <br>
      <div class="wait mt-2" ref="wait">Иногда нужно подождать чуть больше, мы анализируем множество ресурсов и ищем
        именно то, что Вам нужно!
      </div>
      <div class="wait2 mt-2" ref="wait2">Может показаться, что Обучалочка сломалась, но ожидание может длится до 2
        минут. Пожалуйста, дождитесь загрузки!
      </div>
    </div>
  </div>
</template>

<script>
import Pill from "./pill"
import axios from "axios";
import {BACKEND} from "../backend.config";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "search_string",
  props: {
    needSubject: {
      type: Boolean,
      default: true,
    },
    subj: String,
    placeholder: String,
    placeholderArt: String
  },
  components: {
    Pill
  },
  data() {
    return {
      activeSubjectId: -1,
      activeSubjectName: "",
      subjectPath: "",
    }
  },
  computed: {
    ...mapGetters(["getSubject"]),
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
    ...mapActions(["setResults", "setQuery"]),
    changeColor(a) {
      if (a === 1) {
        this.$refs.sbox.classList.add("hovered-border")
      } else {
        this.$refs.sbox.classList.remove("hovered-border")
      }
    },
    startSearchInput(e) {
      let input_text = e.currentTarget.value

      if (input_text.length > 0) {
        this.$refs.popular.classList.add("hide-popular")
        if (this.needSubject) {
          this.$refs.subjects.classList.add("subject-select-active")
        } else {
          this.$refs.article.classList.add("article-input-active")
        }
      } else {
        this.$refs.subjects.classList.remove("subject-select-active")
        this.$refs.popular.classList.remove("hide-popular")
        this.$refs.sbtn.classList.remove("search-btn-active")
        this.$refs.article.classList.remove("article-input-active")
      }
    },
    setQueryIn(q) {
      this.$refs.sbox.value = q
      this.startSearchInput({currentTarget: {value: q}})
    },
    startArticleInput(e) {
      if (e.currentTarget.value.length > 0) {
        this.$refs.sbtn.classList.add("search-btn-active")
      } else {
        this.$refs.sbtn.classList.remove("search-btn-active")
      }
    },
    selectSubject(id, name, sname) {
      this.activeSubjectId = id
      this.activeSubjectName = name
      this.subjectPath = sname
      this.$refs.article.classList.add("article-input-active")
    },
    sendSearchRequest() {
      this.$refs.spg.classList.add("search-active")
      this.$refs.subjects.classList.remove("subject-select-active")
      this.$refs.article.classList.remove("article-input-active")
      this.$refs.sbtn.classList.remove("search-btn-active")

      setTimeout(() => {
        this.$refs.wait.style.opacity = "0.8"
      }, 3000)
      setTimeout(() => {
        this.$refs.wait2.style.opacity = "0.8"
      }, 33000)

      axios.post(BACKEND + "/getsearchresults", {
        theme: `${this.$refs.sbox.value}`,
        article: this.$refs.article_input.value,
        material_type: "all",
        user_type: 0,
        subject: this.getSubject
      }).then(r => {
        console.log(r.data.urls)
        console.log(r.data)
        this.setResults(r.data.urls)
        this.setQuery(this.$refs.sbox.value)
        this.$router.push("/results/" + (this.subjectPath || this.getSubject))
        this.$refs.spg.classList.remove("search-active")
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../style";

.search-string {
  margin-top: 90px;
}

.search-box {
  border-radius: 50px 50px 0 50px;
  border: 2px solid var(--main);
  overflow: hidden;
  outline: none;
  padding: 10px;
  transition: all .3s ease;
}

@media screen and (max-width: 768px) {
  .search-box {
    width: 100% !important;
  }

  .search-string {
    margin-top: 45px;
  }
}

.search-button {
  background: var(--main);
  //background: linear-gradient(273.19deg, #F2994A 0.81%, #F2C94D 100.4%);
  border-radius: 0px 47px 47px 0;
  padding: 7px 30px 7px 30px;
  font-size: 18px;
  color: white;
  font-weight: 600;
  transition: all .3s ease;
}

.hovered {
  background: var(--second);
  font-size: 1.1rem;
}

.hovered-border {
  border: 2px solid var(--second);
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, .1);
}

.popular {
  opacity: .5;
  height: 25px;
  transition: all .3s ease;
  overflow: hidden;
}

@media screen and (max-width: 768px) {
  .popular {
    height: 45px;
  }
}

@media screen and (max-width: 450px) {
  .popular {
    height: 70px;
  }
}

.hide-popular {
  height: 0;
}

.popular-item {
  color: black;
  transition: all .3s ease;
}

.popular-item:hover {
  text-decoration: underline dashed;
  color: var(--second);
  cursor: pointer;
}

.subject-select {
  height: 0;
  overflow: hidden;
  transition: all .3s ease;
}

.subject-select-active {
  height: 82px;
}

@media screen and (max-width: 768px) {
  .subject-select-active {
    height: 162px;
  }
}


.search-btn {
  height: 0;
  overflow: hidden;
  transition: all .3s ease;
  margin-top: 0;

  button {
    border-radius: 50px 50px 50px 0;
    background: $gradient;
    color: white;
    font-size: 24px;
    font-weight: 500;
    padding: 5px 30px;
    border: none;
    outline: none;
    transition: all .3s ease;
    box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.1);
  }

  button:hover {
    opacity: 0.9;
    transform: scale(1.01);
  }

  button:active {
    filter: brightness(0.95);
  }
}

.search-btn-active {
  height: 50px;
  margin-top: 15px;
}

.article-input {
  textarea {
    outline: none;
    border-radius: 0 50px 50px 50px;
    width: 100%;
    border: 2px solid var(--main);
    resize: none;
    padding: 5px 10px;
  }

  height: 0;
  overflow: hidden;
  transition: all .3s ease;
}

.article-input-active {
  height: 200px;
}

.search-progress {
  height: 0;
  overflow: hidden;
  transition: all .3s ease;
}

.search-active {
  height: 150px;
}


.wait, .wait2 {
  font-size: 14px;
  opacity: 0;
  transition: all .6s ease;
  line-height: 1;
}

@media screen and (max-width: 576px) {
  .subject-select-active {
    height: 140px;
  }

  .article-input-active {
    height: 250px;
  }
}
</style>
