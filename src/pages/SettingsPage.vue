<template>
  <BasePageLayout>
    <div class="page">
      <BaseHeader>
        Ustawienia
      </BaseHeader>
      <div class="settings">
        <UserProfile :userAvatar="getProfileAvatar" :id="getId"></UserProfile>
        <div class="settings-module" @mouseenter="this.mouseOverProfileSettings = true;"
          @mouseleave="this.mouseOverProfileSettings = false;">
          <div class="settings-module__head">
            <h1>Profil</h1>
            <div class="settings-module__head__actions" v-show="this.mouseOverProfileSettings">
              <BaseButtonWithTooltip @click="this.restoreProfileSettings()" type="primary-small" tooltip="Przywróć"><span
                  class="material-symbols-outlined icon">
                  cancel
                </span></BaseButtonWithTooltip>
              <BaseButtonWithTooltip @click="this.saveProfileSettings()" type="secondary-small" tooltip="Zapisz"><span
                  class="material-symbols-outlined icon">
                  save
                </span></BaseButtonWithTooltip>
            </div>
          </div>
          <hr>
          <div class="settings-module__content">
            <div>Nazwa użytkownika</div>
            <input type="text" v-model="this.username" />
            <div>Opis</div>
            <textarea v-model="this.description"></textarea>
            <div>Avatar użytkownika</div>
            <BaseButton type="secondary-medium" @click="this.isAvatarPickerVisible=true">Zmień avatar</BaseButton>
          </div>
        </div>
        <div class="settings-module" @mouseenter="this.mouseOverUserDataSettings = true;"
          @mouseleave="this.mouseOverUserDataSettings = false;">
          <div class="settings-module__head">
            <h1>Dane użytkownika</h1>
            <div class="settings-module__head__actions" v-show="this.mouseOverUserDataSettings">
              <BaseButtonWithTooltip @click="this.restoreUserDataSettings()" type="primary-small" tooltip="Przywróć"><span
                  class="material-symbols-outlined icon">
                  cancel
                </span></BaseButtonWithTooltip>
              <BaseButtonWithTooltip @click="this.saveUserDataSettigs()" type="secondary-small" tooltip="Zapisz"><span
                  class="material-symbols-outlined icon">
                  save
                </span></BaseButtonWithTooltip>
            </div>
          </div>
          <hr>
          <div class="settings-module__content">
            <div>Imię</div>
            <input type="text" v-model="this.name" />
            <div>Nazwisko</div>
            <input type="text" v-model="this.surname" />
            <div>Data urodzenia</div>
            <input type="date" v-model="this.birthDate" />
            <div>Adres Email</div>
            <input type="email" v-model="this.email" />
          </div>
        </div>
        <div class="settings-module" @mouseenter="this.mouseOverThemeSettings = true;"
          @mouseleave="this.mouseOverThemeSettings = false;">
          <div class="settings-module__head">
            <h1>Motyw</h1>
            <div class="settings-module__head__actions" v-show="this.mouseOverThemeSettings">
              <BaseButtonWithTooltip @click="this.restoreThemeSettings()" type="primary-small" tooltip="Przywróć"><span
                  class="material-symbols-outlined icon">
                  cancel
                </span></BaseButtonWithTooltip>
              <BaseButtonWithTooltip @click="this.saveThemeSettings()" type="secondary-small" tooltip="Zapisz"><span
                  class="material-symbols-outlined icon">
                  save
                </span></BaseButtonWithTooltip>
            </div>
          </div>
          <hr>
          <div class="settings-module__content">
            <div>Motyw strony</div>
            <select name="theme" id="theme" v-model="this.theme">
              <option value="light">Podstawowy</option>
              <option value="dark">Ciemny</option>
            </select>
          </div>
        </div>
        <div class="settings-module">
          <div class="settings-module__head">
            <h1>Zmień hasło</h1>
          </div>
          <hr>
          <div class="settings-module__content">
            <div></div>
            <BaseButton type="secondary-medium" @click="resetPassword">Zmień hasło</BaseButton>             
            <div></div>      
            <div>Zostaniesz przekierowany do strony zmiany hasła.</div>
            <Transition><BaseChangePassword v-if="getVisibleMessageP === true" @visibleMessageP="hidePopup">Zostaniesz wylogowany</BaseChangePassword></Transition>
          </div>
        </div>
        <div class="settings-module">
          <div class="settings-module__head">
            <h1>Usuń konto</h1>
          </div>
          <hr>
          <div class="settings-module__content">
            <div>Usunięcie konta jest nieodwrcalne.</div>
            <BaseButton type="secondary-medium" style="background-color: var(--primary); color: var(--secondary);" @click="showDeletePopup">Usuń
              konto</BaseButton>
            <Transition><base-delete-message :id="id" v-if="getVisibleMessage === true" @visibleMessage="hideDeletePopup"> Czy na pewno chcesz usunąć <br> konto? </base-delete-message></Transition>

          </div>
        </div>
      </div>
    </div>
    <Teleport to="body">
      <Transition>
        <AvatarPickerModal v-if="isAvatarPickerVisible" @close-modal="this.isAvatarPickerVisible=false"></AvatarPickerModal>
      </Transition>
    </Teleport>
  </BasePageLayout>
</template>
<script>
import BasePageLayout from '@/components/base/BasePageLayout.vue';
import BaseHeader from '@/components/base/BaseHeader.vue';
import UserProfile from '@/components/TheSettingsPage/UserProfile.vue'
import BaseButton from '@/components/base/BaseButton.vue';
import { mapActions, mapGetters } from 'vuex';
import AvatarPickerModal from '@/components/TheSettingsPage/AvatarPickerModal.vue';
import BaseButtonWithTooltip from '@/components/base/BaseButtonWithTooltip.vue';
import inputValidators from '@/mixins/inputValidators';
import BaseDeleteMessage from '@/components/base/BaseDeleteAccount.vue';
import BaseChangePassword from '@/components/base/BaseChangePassword.vue';
export default {
  components: {
    BasePageLayout,
    BaseHeader,
    UserProfile,
    BaseButton,
    AvatarPickerModal,
    BaseButtonWithTooltip,
    BaseDeleteMessage,
    BaseChangePassword
  },
  mixins: [inputValidators],
  data() {
    return {
      mouseOverProfileSettings: false,
      username: null,
      description: null,
      avatarId: null,

      name: '',
      surname: '',
      birthDate: null,
      email: '',
      theme: 1,
      password:'',
      rpassword:'',
      mouseOverUserDataSettings: false,
      mouseOverThemeSettings: false,
      isAvatarPickerVisible: false
    }
  },
  computed: {
    ...mapGetters(['getTheme', 'getUsername', 'getDescription', 'getName', 'getSurname', 'getBirthDate', 'getEmail',
                    'getSettins', 'getProfileAvatar', 'getId','getVisibleMessageP', 'getVisibleMessage'])
  },
  methods: {
    ...mapActions(['showAvatarPicker', 'hideAvatarPicker', 'setTheme', 'setUsername', 'setDescription', 
                  'setName', 'setSurname', 'setBirthDate', 'setEmail', 'downloadSettings', 'sendSettings',
                  'changePassword', 'delete', 'resetPassword', 'hidePopup','showDeletePopup','hideDeletePopup']),
    isFormValid() {
      this.isPasswordValid = this.validatePassword(this.password, this.rpassword);
      return this.isPasswordValid;
    },
    saveThemeSettings() {
      this.setTheme(this.theme);
      this.sendSettings(this.getSettings)
    },
    restoreThemeSettings() {
      this.theme = this.getTheme;
      this.setTheme(this.theme)
      console.log(this.theme)
    },
    saveProfileSettings() {
      this.setUsername(this.username);
      this.setDescription(this.description);
      this.sendSettings(this.getSettings);
    },
    restoreProfileSettings() {
      this.username = this.getUsername;
      this.description = this.getDescription;
   },
    saveUserDataSettigs() {
      this.setName(this.name);
      this.setSurname(this.surname);
      this.setBirthDate(this.birthDate);
      console.log(this.getBirthDate)
      this.setEmail(this.email);
      this.sendSettings(this.getSettings)

    },
    restoreUserDataSettings() {
      this.name = this.getName;
      this.surname = this.getSurname;
      this.birthDate = this.getBirthDate;
      this.email = this.getEmail;
      console.log(this.birthDate, this.getBirthDate)
    },
  },
  async created() {
    await this.downloadSettings();
    this.restoreThemeSettings();
    // this.saveThemeSettings();
    // console.log(this.restoreThemeSettings())
    this.restoreProfileSettings();
    this.restoreUserDataSettings();
  },
  // watch: {
  //   getTheme(newTheme, oldTheme) {
  //     document.body.classList.remove(oldTheme)
  //     document.body.classList.add(newTheme);
  //     document.documentElement.style.colorScheme=newTheme;
  //   }
  // }
  }

</script>
<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 30px;
  /* margin-top: 30px; */
  flex-grow: 1;
}

.settings {
  flex-grow: 1;
  margin-bottom: 30px;
  color: var(--primary);
  display: flex;
  flex-direction: column;
  gap: 15px;
}

hr {
  width: 100%;
  border: 1px solid var(--accent);
}

h1 {
  margin-bottom: 5px;
}

.settings-module__head {
  display: flex;
  justify-content: space-between;
}

.settings-module__head__actions {
  align-items: center;
  display: flex;
  gap: 15px;
}

.settings-module__content {
  display: grid;
  width: max(700px, 50%);
  grid-template-columns: 1fr 2fr;
  gap: 15px;
  margin-top: 15px;
}

.settings-module:last-child {
  margin-bottom: 30px;
}

input {
  background-color: var(--secondary);
  border: 1px solid var(--primary);
  padding: 10px;
  color: var(--primary);
}

select {
  background-color: var(--secondary);
  border: 1px solid var(--primary);
  padding: 10px;
  color: var(--primary);
}

textarea {
  /* border: 1px solid var(--primary); */
  resize: none;
  height: 10em;
  padding: 10px;
  color: var(--primary);
  background-color: var(--secondary);
  border: 1px solid var(--primary);

}

.icon {
  font-size: 20px;
}

.v-enter-active,
.v-leave-active {
  animation: modal;
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  animation:modal;
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
  