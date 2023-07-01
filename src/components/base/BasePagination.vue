<template>
  <div class="pagination">
    <div class="pagination__page-size">
      <label for="page-size">Liczba wierszy na stronie:</label>
      <select id="page-size" @input="changePgaeSize($event)">
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
    <div v-if="this.numberOfPages > 1" class="pagination__switch-page">
      <span class="material-symbols-outlined" @click="this.decrementPage()">arrow_back_ios_new</span>
      <div v-if="this.numberOfPages <= 7" class="pages">
        <div v-for="page in parseInt(this.numberOfPages)" :key="page" :class="{ selectedPage: page == this.selectedPage }"
          @click="this.selectPage(page)">{{ page }}</div>
      </div>
      <div v-else-if="this.selectedPage < 5" class="pages">
        <div :class="{ selectedPage: this.selectedPage == 1 }" @click="this.selectPage(1)">1</div>
        <div :class="{ selectedPage: this.selectedPage == 2 }" @click="this.selectPage(2)">2</div>
        <div :class="{ selectedPage: this.selectedPage == 3 }" @click="this.selectPage(3)">3</div>
        <div :class="{ selectedPage: this.selectedPage == 4 }" @click="this.selectPage(4)">4</div>
        <div :class="{ selectedPage: this.selectedPage == 5 }" @click="this.selectPage(5)">5</div>
        <div class="cursorAuto">...</div>
        <div @click="this.selectPage(this.numberOfPages)">{{ numberOfPages }}</div>
      </div>
      <div v-else-if="this.selectedPage >= 5 && this.selectedPage <= this.numberOfPages - 4" class="pages">
        <div @click="this.selectPage(1)">1</div>
        <div class="cursorAuto">...</div>
        <div @click="this.selectPage(this.selectedPage - 1)">{{ this.selectedPage - 1 }}</div>
        <div :class="{ selectedPage: true }">{{ this.selectedPage }}</div>
        <div @click="this.selectPage(this.selectedPage + 1)">{{ this.selectedPage + 1 }}</div>
        <div class="cursorAuto">...</div>
        <div @click="this.selectPage(this.numberOfPages)">{{ numberOfPages }}
        </div>
      </div>
      <div v-else-if="this.selectedPage > this.numberOfPages - 4" class="pages">
        <div @click="this.selectPage(1)">1</div>
        <div class="cursorAuto">...</div>
        <div :class="{ selectedPage: this.selectedPage == this.numberOfPages - 4 }"
          @click="this.selectPage(this.numberOfPages - 4)">{{ this.numberOfPages - 4 }}</div>
        <div :class="{ selectedPage: this.selectedPage == this.numberOfPages - 3 }"
          @click="this.selectPage(this.numberOfPages - 3)">{{ this.numberOfPages - 3 }}</div>
        <div :class="{ selectedPage: this.selectedPage == this.numberOfPages - 2 }"
          @click="this.selectPage(this.numberOfPages - 2)">{{ this.numberOfPages - 2 }}</div>
        <div :class="{ selectedPage: this.selectedPage == this.numberOfPages - 1 }"
          @click="this.selectPage(this.numberOfPages - 1)">{{ this.numberOfPages - 1 }}</div>
        <div :class="{ selectedPage: this.selectedPage == this.numberOfPages }"
          @click="this.selectPage(this.numberOfPages)">
          {{ numberOfPages }}
        </div>
      </div>
      <span class="material-symbols-outlined" @click="this.incrementPage()">arrow_forward_ios</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['numberOfPages', 'selectedPage', 'pageSize'],
  methods: {
    selectPage(page) {
      this.$emit('update:selectedPage', page)
    },
    decrementPage() {
      if (this.selectedPage > 1) {
        this.selectPage(this.selectedPage - 1)
      }
    },
    incrementPage() {
      if (this.selectedPage < this.numberOfPages) {
        this.selectPage(this.selectedPage + 1)
      }
    },
    changePgaeSize(e) {
      this.$emit('update:pageSize', e.target.value)
      this.selectPage(1)
    }
  }
}
</script>

<style scoped>
.pagination {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  display: flex;
  justify-content: space-between;
}

.pagination__page-size {
  display: flex;
  gap: 15px;
}

.pagination__switch-page {
  display: flex;
  gap: 5px;
}

.pagination__switch-page>* {
  cursor: pointer;
}

.selectedPage {
  /* background-color: var(--primaryBtn); */
  border: 1px solid var(--primary);
}

.pages {
  display: flex;
  /* gap: 5px; */
}

.pages>* {
  border-radius: 5px;
  padding-left: 0.5em;
  padding-right: 0.5em;
  text-align: center;
}

.cursorAuto {
  cursor: auto;
}
</style>