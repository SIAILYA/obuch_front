<template>
  <div class="card-box d-flex w-100">
    <div class="resource-card d-flex flex-column">
      <a :href="link" target="_blank" class="d-block mb-3">
        <h3 class="title mt-auto">
          Ответ с Википедии
        </h3>
        {{description.substring(0, 350)}}...
      </a>
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