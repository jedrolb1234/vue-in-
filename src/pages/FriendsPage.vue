<template>
  <base-page-layout>
    <div class="container">
      <BaseHeader>Znajomi ( {{ getFriendsCount }} )</BaseHeader>
      <div class="FriendsContainer">
        <h2 class="friendsHeader">Znajomi</h2>
        <hr class="hr1" />
        <div v-if="getIsLoading === true">
          <table class="spinnerTable">
            <tr :style="{ height: 38 + 'px' }" colspan="1">
              <base-loading-spinner class="spinnerTr"></base-loading-spinner>
            </tr>
          </table>
        </div>
        <table
          class="friend"
          v-if="getIsLoading === false && getFriends.length !== 0"
        >
          <thead>
            <tr>
              <th>Podgląd</th>
              <th>Nazwa użytkownika</th>
              <th>Ostatnie logowanie</th>
              <th>Ostatnia gra</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="friendsList"
              v-for="(f, index) in getFriends"
              :key="index"
            >
              <td class="tableButton">
                <base-look-button
                  class="firstCellButton"
                  @click="redirect(f.userId, 'null')"
                ></base-look-button>
              </td>
              <td>{{ f.userName }}</td>
              <td>{{ f.lastActivityDate }}</td>
              <td>{{ f.lastGame }}</td>
              <td class="tableButton">
                <base-remove-button
                  class="lastCellButton"
                  @click="showRemovePopup(f)"
                ></base-remove-button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="buttons">
          <base-previous-button
            @click="previousPage"
            :disable="getCurrentPage === 0"
          ></base-previous-button>
          <base-next-button
            @click="nextPage"
            :disable="getCurrentPage === getFriendsPages"
          ></base-next-button>
          <span class="page">{{ pageNr }}</span>
        </div>
        <!-- </ul> -->
        <p v-if="getFriends.length === 0 && getIsLoading === false">
          Nie dodano żadnych znajomych.
        </p>
      </div>
      <Transition name="v">
        <base-delete-message
          :id="getId"
          :hideModal="getIsVisibleMessage"
          v-if="getIsVisibleMessage === true"
          @visibleMessage="hideRemovePopup"
          @close-modal="hideRemovePopup"
        >
          Czy na pewno chcesz usunąć <br />
          użytkownika {{ getRemUser }} ?
        </base-delete-message>
      </Transition>
      <div class="invitations">
        <h2 class="friendsHeader">Zaproszenia</h2>
        <hr class="hr2" />
        <table class="friend">
          <thead>
            <tr>
              <th class="tableButton">Podgląd</th>
              <th>Nazwa użytkownika</th>
              <th>Ostatnie logowanie</th>
              <th>Ostatnia gra</th>
              <th class="tableButton"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="invitationsList"
              v-for="(i, index) in getInvitations"
              :key="index"
            >
              <td class="tableButton">
                <base-look-button
                  class="invFirstCell"
                  @click="redirect(i.userId, i.id)"
                ></base-look-button>
              </td>
              <td>{{ i.userName }}</td>
              <td>{{ i.lastActivityDate }}</td>
              <td>{{ i.lastGame }}</td>
              <td class="tableButton">
                <base-remove-button
                  class="invLastCellButton"
                  @click="removeFriendInvitation(i.id)"
                ></base-remove-button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="invButtons" v-if="getInvPages > 1">
          <base-previous-button @click="invPreviousPage"></base-previous-button>
          <base-next-button @click="invNextPage"></base-next-button>
          <p class="page">{{ invPageNr }}</p>
        </div>
        <p v-if="getAvilabeInvitations === 0">
          Nie otrzymano zaproszeń od znajomych.
        </p>
      </div>
      <div class="searchFriend">
        <h2 class="friendsHeader">Znajdź znajomego</h2>
        <hr class="hr3" />
        <div class="searchMargin">
          <form @submit.prevent="searchFriend" class="inputFriend">
            <base-input
              type="username"
              v-model.trim="username"
              :valid="true"
            ></base-input>
            <p></p>
            <BaseButton
              type="primary-medium"
              @click="find(username)"
              @keyup.enter="find(username)"
              >Znajdź</BaseButton
            >
          </form>
          <transition name="slideON">
            <div v-if="this.getFindUser === true" class="findUser">
              <p>Znaleziono:</p>
              <table class="findFriend">
                <tr>
                  <td class="tableButton">
                    <base-look-button
                      class="friendFirstCellButton"
                      @click="redirect(getUser.id, 'null')"
                    ></base-look-button>
                  </td>
                  <td>{{ getUser.userName }}</td>
                  <td>{{ getUser.firstName + " " + getUser.lastName }}</td>
                </tr>
              </table>
            </div>
            <div v-else-if="this.getFindUser === false" class="findUser">
              Nie znaleziono użytkownika o podnym imieniu.
            </div>
          </transition>
        </div>
      </div>
    </div>
    <base-notification-list></base-notification-list>
  </base-page-layout>
</template>
<script>
import BaseInput from "@/components/base/BaseInput.vue";
import BaseNextButton from "@/components/base/BaseNextButton.vue";
import BasePreviousButton from "@/components/base/BasePreviousButton.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseRemoveButton from "@/components/base/BaseRemoveButton.vue";
import BaseLookButton from "@/components/base/BaseLookButton.vue";
import BaseNotificationList from "@/components/base/BaseNotificationList.vue";
import { mapActions, mapGetters } from "vuex";
import BasePageLayout from "@/components/base/BasePageLayout.vue";
import BaseLoadingSpinner from "@/components/base/BaseLoadingSpinner.vue";
import BaseHeader from "@/components/base/BaseHeader.vue";
import BaseDeleteMessage from "@/components/base/BaseDeleteMessage.vue";

export default {
  props: ["history"],
  components: {
    BaseInput,
    BaseNextButton,
    BasePreviousButton,
    BaseLookButton,
    BaseRemoveButton,
    BaseButton,
    BaseNotificationList,
    BasePageLayout,
    BaseLoadingSpinner,
    BaseHeader,
    BaseDeleteMessage,
  },
  data() {
    return {
      username: "",
      findUser: null,
    };
  },
  mounted() {
    this.downloadFriends();
    this.downloadInvitations();
  },

  computed: {
    ...mapGetters("Friends", [
      "getIsLoading",
      "currentPage",
      "pageNr",
      "getFriendsPages",
      "getUser",
      "getFriends",
      "getFindFriend",
      "getFindUser",
      "getDynamicHeight",
      "pPageNr",
      "getPageNr",
      "getItemsPerPage",
      "getAvilabeInvitations",
      "getInvitations",
      "getId",
      "getCurrentPage",
      "invPageNr",
      "invAllPages",
      "getIsVisibleMessage",
      "getInvPages",
      "getFriendsCount",
      "getRemUser",
    ]),
  },

  methods: {
    ...mapActions("Friends", [
      "nextPage",
      "previousPage",
      "find",
      "addFriend",
      "removeFI",
      "downloadFriends",
      "downloadInvitations",
      "removeFriendInvitation",
      "redirect",
      "invNextPage",
      "invPreviousPage",
      "showRemovePopup",
      "hideRemovePopup",
      'clearSearchFriend',
    ]),
    ...mapActions(["showNotification", "setInvitationId"]),

    redirect(id, invId) {
      if (invId !== "null") {
        sessionStorage.setItem("invId", invId);
        return this.$router.push({
          name: "uhp",
          params: { id: id },
        });
      }
      const inv = this.getInvitations;
      const user = this.getUser;
      for (let i = 0; i < inv.length; i++) {
        if (inv[i].userId === user.id) {
          sessionStorage.setItem("invId", inv[i].userId);
          return this.$router.push({
            name: "uhp",
            params: { id: id },
          });
        }
      }
      return this.$router.push({
        name: "uhp",
        params: { id: id },
      });
    },
  },
  mutations: {
    ...mapGetters("Friends", ["setUserName"]),
  },
  unmounted() {
    this.clearSearchFriend();
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-bottom: 25px;
  padding-bottom: 80px;
  min-height: 1350px;
  width: 100%;
}

hr {
  width: 100%;
  border: 1px solid var(--accent);
  margin-top: 15px;
  margin-bottom: 15px;
}
.friendsContainer {
  margin-left: 50px;
  color: var(--secondary);
}

h1,
h2 {
  color: var(--primary);
  align-items: flex-start;
  width: 800px;
}
.friendsHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* align-items: center; */
  background-color: var(--secondary);
  width: 800px;
  height: 40px;
  margin: 40px 0px 0px 0px;
  border-radius: 8px 8px 0px 0px;
  color: var(--primary);
}
table {
  justify-content: center;
  width: auto;
  border-collapse: collapse;
  color: var(--primary);
  border: 1px solid var(--primary);
  border-spacing: 0px;
  padding: 0px;
  background-color: var(--secondary);
  padding-left: 40px;
}
tr {
  border: 1px solid var(--primary);
  text-align: left;
  border-radius: 8px;
  width: 800px;
}

th {
  width: 160px;
  height: 51px;
  padding: var(--td-padding-top-bottom) var(--td-padding-left-right); /* odstępy */
}
.table.button,
th:first-child,
th:last-child {
  margin-left: 0px;
  padding-left: 5px;
  width: 60px !important;
}
th:nth-child(2):nth-child(4),
td:nth-child(2):nth-child(4) {
  margin-left: 0px;
  padding-left: 10px;
  width: calc((100% - 4 * 10px) / 3);
}
td {
  padding: var(--td-padding-top-bottom) var(--td-padding-left-right); /* odstępy */
  height: 38px;
  font-size: 18px;
  color: var(--primary);
  margin: 0px 0px 0px 0px;
}

th {
  background-color: var(--accent);
  color: var(--table-header-color);
}
table > tbody> tr:nth-child(even) {
  background-color: var(--primaryBtn);
}
.lastCellButton {
  margin-left: 15px;
}
.firstCellButton {
  margin-left: 15px;
}
.frinedId {
  width: 100px;
  justify-content: center;
}
.searchFriend {
  color: var(--secondary);
  width: auto;
  margin-left: 0px;
  margin-top: 0px;
}
.inputFriend {
  width: 400px;
  margin-top: 10px;
}
.child-inputFriend {
  margin: 10px;
}
.friend {
  width: 800px;
  color: var(--primary);
  justify-content: center;
  align-items: center;
}
p {
  font-size: 22px;
  color: var(--primary);
}
.buttons,
.invButtons {
  display: flex;
  flex-direction: row;
  width: 70px;
  justify-content: space-between;
  margin-left: 10px;
}
.invButtons {
  margin-left: 30px;
}
.invContainer {
  border: none;
}
.friendFirstCellButton {
  margin-left: 10px;
}
.spinnerTable {
  width: 800px;
  margin-left: 20px;
}
.spinnerTr {
  margin-left: 350px;
  margin-top: 150px;
}
.page {
  width: 13px;
  font-size: 22px;
  margin-top: 0px;
  margin-right: 0px;
  margin-left: 0px;
  padding: 0px;
}
.tableButton {
  width: 75px;
  padding-left: 15px;
}
.invFirstCell {
  margin-left: 12px;
}
.invLastCellButton {
  margin-left: 7px;
}
.inv {
  width: 600px;
  justify-content: center;
  align-items: center;
}
.noInvMargin {
  margin-left: -20px;
}
.findMargin {
  margin-left: 0px;
}
.searchMargin {
  margin-left: 0px;
}
/* .invitations{
    width: 100%;
    margin-left: -20px;
} */
.findUser {
  color: var(--primary);
}
.slideON-enter-active,
.slideON-leave-active {
  transition: transform 300ms ease, max-height 300ms ease;
  transform-origin: top;
  max-height: 419px;
}
.slideON-enter-from,
.slideON-leave-to {
  transform: scaleY(0);
  max-height: 0px;
}
.divSlideON {
  transform-origin: top;
  animation-name: transition; /* Zmiana nazwy animacji na "slideON" */
  animation-duration: 300ms;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.avInvs-enter-active,
.avInvs-leave-active {
  transition: opacity 0.3s ease-out;
}

.avInvs-enter,
.avInvs-leave-to {
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  animation: modal;
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  animation: modal;
  opacity: 0;
}
@keyframes modal {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
