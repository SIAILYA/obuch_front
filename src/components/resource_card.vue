<template>
  <div class="card-box d-flex w-100">
    <div class="resource-card d-flex flex-column" v-if="type === 'text'">
      <a :href="link" target="_blank" class="d-block mb-3">
        <div class="d-flex justify-content-between mb-3">
          <img :src="favicon" class="icon" width="28" height="28" alt="">
          <span class="domain">{{ domain.substring(0, 15) + (domain.length > 15 ? "..." : "") }}</span>
        </div>

        <h3 class="title mt-auto">
          {{ title.substring(0, 35) + (title.length > 35 ? "..." : "") }}
        </h3>

        <div class="mt-3 description ">{{ description.substring(0, 100) + (description.length > 100 ? "..." : "") }}</div>
      </a>

      <div class="control d-flex mt-auto justify-content-between">
        <span class="material-icons-outlined cursor-pointer" @click="sendReport">block</span>
        <div class="d-flex">
          <span class="material-icons-outlined cursor-pointer mr-1 transition" @click="voteSite(1)" :class="voted === 1 ? 'voted-green' : ''">expand_less</span>
          <span class="material-icons-outlined cursor-pointer transition" @click="voteSite(0)" :class="voted === -1 ? 'voted-red' : ''">expand_more</span>
        </div>
      </div>
    </div>
    <a :href="link" target="_blank" class="resource-card resource-img d-block" v-if="type === 'image'">
      <img :src="link" class="w-100" alt="">
    </a>
    <a :href="link" target="_blank" class="resource-card resource-wiki d-block" v-if="type === 'wiki'">
      <img :src="link" class="w-100" alt="">
    </a>
    <div class="resource-card resource-video d-block" v-if="type === 'video'">
      <iframe width="100%" height="100%" :src="'https://www.youtube.com/embed/' + getVideoCode(link)"
              title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {BACKEND} from "../backend.config";

export default {
  name: "resource_card",
  props: {
    link: String,
    title: String,
    description: String,
    icon: String,
    rating: Number,
    blocked: Number,
    type: String,
    report: Function
  },
  data () {
    return {
      voted: 0
    }
  },
  computed: {
    domain() {
      let url = new URL(this.link)
      return url.host
    },
    origin() {
      let url = new URL(this.link)
      return url.origin
    },
    favicon() {
      if (this.icon.indexOf("http") !== -1) {
        return this.icon
      } else if (this.icon) {
        return this.origin + this.icon
      }
      return "https://catherineasquithgallery.com/uploads/posts/2021-03/1614560288_6-p-ikonki-na-belom-fone-6.jpg"
    }
  },
  methods: {
    getVideoCode(link) {
      return link.split("?v=")[1]
    },
    voteSite(v) {
      if (this.voted === 0) {
        axios.post(BACKEND + "/rate_site", {url: this.origin, vote: v}).then(() => {
          this.voted = (v === 0 ? -1 : 1)
          this.$bvModal.show("voted")
        })
      }
    },
    sendReport() {
      axios.post(BACKEND + "/block_site", {url: origin, reason: "Захотелось"}).then(() => {
        this.$bvModal.show("reported")
      })
    }
  }
}
</script>

<style scoped lang="scss">
.resource-card {
  background: white;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  padding: 10px;
  margin-bottom: 24px;
  transition: all .3s ease;
  flex: 1 1 auto;
  a{
    color: #282828;
  }
}

.resource-card:hover {
  transform: scale(1.03);
  a{
    text-decoration: none;
  }
}

.icon {
  border-radius: 15px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.3);
}

.domain {
  font-weight: 600;
}

.title {
  font-size: 16px;
  color: var(--main);
}

.description {
  font-size: 14px;
  word-break: break-word;
}

.resource-img, .resource-video {
  object-fit: cover;
  padding: 0;
  overflow: hidden;

  img {
    object-fit: cover;
    height: 100%;
  }
}

.voted-green{
  color: green;
}

.voted-red{
  color: red;
}
</style>