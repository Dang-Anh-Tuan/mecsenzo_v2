<template>
  <div
    :class="`relative container-sidebar w-[30%] h-full py-[36px] px-[20px] 
    bg-white shadow-lg sm:shadow-2xl rounded-[20px] z-[50] 
    dark:bg-dark_bg_light
    ${
      getShowSidebarConversation ? 'translate-x-0' : 'translate-x-[-100px]'
    }  sm:translate-x-0`"
  >
    <div class="relative w-full h-[48px]">
      <input
        type="text"
        class="appearance-none outline-none w-full h-full p-[20px] rounded-full bg-gray-200 focus:bg-white focus:shadow-lg transition-all duration-150 ease-in-out opacity-0 group-hover:opacity-100 text-[0.9rem] md:text-[1rem]"
        :placeholder="$t('sidebarConversation.inputPlaceholder')"
        @input="handleChangeSearchKey"
      />

      <button
        class="absolute top-0 right-0 h-full w-[48px] flex justify-center items-center rounded-full bg-slate-200 md:bg-transparent transition-all"
      >
        <fa icon="magnifying-glass" />
      </button>
    </div>
    <div
      class="container-conversation relative h-[36%] my-5 overflow-y-auto overflow-x-hidden"
      @scroll="handleScroll($event, handleLoadMoreIndividual)"
    >
      <div v-if="conversationIndividual">
        <nuxt-link
          v-for="conversation in conversationIndividual"
          :id="conversation.id"
          :key="conversation.id"
          :to="{
            path: `/`,
            params: { id: conversation.id },
            name: `id___${$i18n.locale}`,
          }"
          :class="`h-[54px] mb-3 flex items-center cursor-pointer hover:bg-slate-200 hover:bg-[rgba(255,255,255,0.1)]
                  ${getClassBgCurrentConversation(conversation.id)}`"
          @click.native="handleSeenConversation(conversation)"
        >
          <div class="relative">
            <avatar
              :is-have-avatar="!!conversation.partnerUser.avatar"
              :src-image="
                conversation.partnerUser.avatar &&
                conversation.partnerUser.avatar
              "
              :first-char="conversation.partnerUser.fullName.charAt(0)"
            />
            <div
              :class="`absolute w-[12px] h-[12px] rounded-full bottom-0 right-0 
              ${getClassIsOnline(conversation.partnerUser)}`"
            ></div>
          </div>
          <div class="conversation-content ml-4">
            <p
              :class="`select-none truncate text-ellipsis max-w-[180px] 
              md:max-w-[120px] lg:max-w-[180px] h-[1.4rem]  dark:text-dark_text_strong
              ${getClassNameNotSeen(conversation)}`"
            >
              {{ conversation.partnerUser.fullName }}
            </p>
            <p
              :class="`select-none truncate text-ellipsis text-[0.9rem] max-w-[180px] 
              md:max-w-[120px] lg:max-w-[180px] h-[1.4rem] dark:text-dark_text_light
              ${getClassNewMsgNotSeen(conversation)}`"
            >
              <span v-if="getLastMessage(conversation).type === 'text'">
                {{ getLastMessage(conversation).content }}
              </span>
              <span v-else-if="getLastMessage(conversation).type === 'audio'">
                {{ $t('sidebarConversation.lastMsgAudio') }}
              </span>
              <span v-else-if="getLastMessage(conversation).type === 'image'">
                {{ $t('sidebarConversation.lastMsgImage') }}
              </span>
              <span
                v-else-if="getLastMessage(conversation).type === 'videoCall'"
              >
                {{ $t('sidebarConversation.lastMsgVideoCall') }}
              </span>
            </p>
          </div>
        </nuxt-link>
      </div>
      <div
        v-if="isShowLoaderIndividualConversation"
        class="h-[100px] w-full bg-transparent absolute top-0 left-0 flex justify-center items-center"
      >
        <LoaderSideConversation />
      </div>
    </div>
    <Separation />
    <div class="w-full h-[20px] flex justify-between items-center px-3">
      <p class="heading-space text-[1.1rem] hidden dark:text-white">
        {{ $t('sidebarConversation.spaces') }}
      </p>
      <button
        class="btn-add-space w-[36px] h-[36px] text-[1.1rem] text-success rounded-full bg-slate-200 md:bg-transparent hover:bg-slate-200 transition-colors"
        @click="showModalAddSpace"
      >
        <fa icon="plus" />
      </button>
    </div>
    <div
      class="container-conversation relative h-[36%] my-5 overflow-y-auto overflow-x-hidden"
      @scroll="handleScroll($event, handleLoadMoreSpaces)"
    >
      <nuxt-link
        v-for="conversation in conversationSpace"
        :id="conversation.id"
        :key="conversation.id"
        :to="{
          path: `/`,
          params: { id: conversation.id },
          name: `id___${$i18n.locale}`,
        }"
        :class="`h-[54px] mb-3 flex items-center cursor-pointer hover:bg-slate-200  hover:bg-[rgba(255,255,255,0.1)]
        ${getClassBgCurrentConversation(conversation.id)}`"
        @click.native="handleSeenConversation(conversation)"
      >
        <avatar
          :is-have-avatar="!!conversation.thumb"
          :src-image="conversation.thumb"
          :first-char="conversation.name.charAt(0)"
        />
        <div class="conversation-content ml-4">
          <p
            :class="`select-none truncate 
            text-ellipsis max-w-[180px] 
            md:max-w-[120px] lg:max-w-[180px] h-[1.4rem]  dark:text-dark_text_strong
            ${getClassNameNotSeen(conversation)}`"
          >
            {{ conversation.name }}
          </p>
          <p
            v-if="getLastMessage(conversation)"
            :class="`select-none truncate text-ellipsis text-[0.9rem] 
            max-w-[180px] md:max-w-[120px] lg:max-w-[180px] dark:text-dark_text_light
            h-[1.4rem] ${getClassNewMsgNotSeen(conversation)}`"
          >
            <span v-if="getLastMessage(conversation).type === 'text'">
              {{ getLastMessage(conversation).content }}
            </span>
            <span v-else-if="getLastMessage(conversation).type === 'audio'">
              {{ $t('sidebarConversation.lastMsgAudio') }}
            </span>
            <span v-else-if="getLastMessage(conversation).type === 'image'">
              {{ $t('sidebarConversation.lastMsgImage') }}
            </span>
          </p>
        </div>
      </nuxt-link>
      <div
        v-if="isShowLoaderGroupConversation"
        class="h-[100px] w-full bg-transparent absolute top-0 left-0 flex justify-center items-center"
      >
        <LoaderSideConversation />
      </div>
    </div>
    <keep-alive>
      <AsyncResultSearchConversation v-show="getKeySearch" />
    </keep-alive>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { defineAsyncComponent } from 'vue'
import Avatar from './Avatar.vue'
import LoaderSideConversation from './LoaderSideConversation.vue'
import Separation from './Separation.vue'
import {
  getConversationsIndividual,
  getConversationsSpace,
  updateConversation,
} from '~/api/conversation'
import { mergeUseIndividualConversation } from '~/helper/conversation'

const AsyncResultSearchConversation = defineAsyncComponent({
  loader: () => import('@/components/ResultSearchConversation.vue'),

  loadingComponent: LoaderSideConversation,
  delay: 200,

  timeout: 3000,
})

export default {
  components: { Avatar, Separation, AsyncResultSearchConversation },

  emits: ['open-modal-add-space'],

  data() {
    return {
      conversationSpace: null,
      lastDocConversationsSpace: null,
      conversationIndividual: null,
      lastDocConversationIndividual: null,
      unsubscribeGetSpaces() {},
      unsubscribeGetIndividual() {},
      unsubscribeLoadMoreSpaces() {},
      unsubscribeLoadMoreIndividual() {},
      isShowLoaderIndividualConversation: true,
      isShowLoaderGroupConversation: true,

    }
  },

  computed: {
    ...mapGetters({
      getShowSidebarConversation: 'sidebarConversation/getIsShow',
      getKeySearch: 'searchSidebarConversation/getKeySearch',
      getCurrentEmail: 'account/getAccount',
    }),

    getLastMessage() {
      return (conversation) => {
        return conversation.lastMessage ? conversation.lastMessage : ''
      }
    },

    getClassNameNotSeen() {
      return (conversation) =>
        conversation.seen.includes(this.getCurrentEmail) ? '' : 'font-medium'
    },

    getClassNewMsgNotSeen() {
      return (conversation) =>
        conversation.seen.includes(this.getCurrentEmail)
          ? 'text-gray-400'
          : 'text-dark_primary font-medium'
    },

    getClassIsOnline() {
      return (partnerUser) => {
        return partnerUser.isActive ? 'bg-success' : 'bg-gray-300'
      }
    },

    getCurrentConversationId() {
      const currentConversation =
        this.$store.getters['conversation/getCurrentConversation']

      return currentConversation ? currentConversation.id : null
    },

    getClassBgCurrentConversation() {
      return (idConversation) => {
        return idConversation === this.getCurrentConversationId
          ? 'bg-[#eaf3ff]'
          : ''
      }
    },
  },

  created() {
    this.unsubscribeGetIndividual = getConversationsIndividual(
      this.getCurrentEmail,
      this.setConversationIndividual,
      this.lastDocConversationIndividual
    )

    this.unsubscribeGetSpaces = getConversationsSpace(
      this.getCurrentEmail,
      this.setConversationSpace,
      this.lastDocConversationsSpace
    )
  },

  beforeDestroy() {
    this.unsubscribeGetIndividual()
    this.unsubscribeGetSpaces()
    this.unsubscribeLoadMoreIndividual()
    this.unsubscribeLoadMoreSpaces()
  },

  methods: {
    showModalAddSpace() {
      this.$emit('open-modal-add-space')
    },

    compileDocsToConversation(conversationSpaceDocs) {
      return conversationSpaceDocs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    },

    setConversationSpace(conversationSpaceDocs) {
      const conversationSpace = this.compileDocsToConversation(
        conversationSpaceDocs
      )

      this.conversationSpace = conversationSpace

      const lengthDocs = conversationSpaceDocs.length
      this.lastDocConversationsSpace = conversationSpaceDocs[lengthDocs - 1]

      this.isShowLoaderGroupConversation = false
    },

    loadMoreConversationSpace(conversationSpaceDocs) {
      const conversationSpaceNew = this.compileDocsToConversation(
        conversationSpaceDocs
      )

      const lastDoc = conversationSpaceDocs[conversationSpaceDocs.length - 1]

      if (lastDoc && lastDoc.id !== this.lastDocConversationsSpace.id) {
        this.lastDocConversationsSpace = lastDoc
        this.conversationSpace = [
          ...this.conversationSpace,
          ...conversationSpaceNew,
        ]
      }
    },

    handleLoadMoreSpaces() {
      this.unsubscribeLoadMoreSpaces = getConversationsSpace(
        this.getCurrentEmail,
        this.loadMoreConversationSpace,
        this.lastDocConversationsSpace
      )
    },

    handleScroll(e, handleLoadMore) {
      if (
        Math.ceil(e.target.scrollTop) + e.target.clientHeight >=
        e.target.scrollHeight
      ) {
        handleLoadMore()
      }
    },

    async setConversationIndividual(conversationSpaceDocs) {
      const conversationIndividual = this.compileDocsToConversation(
        conversationSpaceDocs
      )

      await mergeUseIndividualConversation(
        conversationIndividual,
        this.getCurrentEmail
      )

      this.conversationIndividual = conversationIndividual
      this.lastDocConversationIndividual =
        conversationSpaceDocs[conversationSpaceDocs.length - 1]

      this.isShowLoaderIndividualConversation = false
    },

    async loadMoreConversationIndividual(conversationIndividualDocs) {
      const conversationIndividualNew = this.compileDocsToConversation(
        conversationIndividualDocs
      )

      await mergeUseIndividualConversation(
        conversationIndividualNew,
        this.getCurrentEmail
      )

      const lastDoc =
        conversationIndividualDocs[conversationIndividualDocs.length - 1]

      if (lastDoc && lastDoc.id !== this.lastDocConversationIndividual.id) {
        this.lastDocConversationIndividual = lastDoc
        this.conversationIndividual = [
          ...this.conversationIndividual,
          ...conversationIndividualNew,
        ]
      }
    },

    handleLoadMoreIndividual() {
      this.unsubscribeLoadMoreIndividual = getConversationsIndividual(
        this.getCurrentEmail,
        this.loadMoreConversationIndividual,
        this.lastDocConversationIndividual
      )
    },

    handleChangeSearchKey(e) {
      this.$store.dispatch(
        'searchSidebarConversation/setKeySearch',
        e.target.value
      )
    },

    async handleSeenConversation(conversation) {
      const seenOfConversation = conversation.seen
      const newSeenOfConversation = seenOfConversation.includes(
        this.getCurrentEmail
      )
        ? seenOfConversation
        : [...seenOfConversation, this.getCurrentEmail]

      await updateConversation({
        ...conversation,
        seen: newSeenOfConversation,
      })
    },
  },
}
</script>

<style scoped>
.container-conversation > :last-child {
  margin-bottom: 0;
}

@media screen and (max-width: 767px) {
  .container-sidebar {
    position: absolute;
    width: 90px;
    height: 80vh;
    border-radius: 5px;
  }
  .container-sidebar:hover {
    width: 300px;
  }
  .container-sidebar:hover input {
    opacity: 1;
  }
  .container-sidebar:hover .heading-space {
    display: block;
  }
  .btn-add-space {
    position: absolute;
    left: 25px;
  }
  .container-sidebar:hover .btn-add-space {
    position: relative;
    left: 0;
  }
  .container-conversation {
    overflow-y: hidden;
  }
  .container-sidebar:hover .container-conversation {
    overflow-y: auto;
  }
  .conversation-content {
    display: none;
    max-width: 180px !important;
  }
  .container-sidebar:hover .conversation-content {
    display: block;
  }
}

@media screen and (min-width: 767px) {
  .container-sidebar input {
    opacity: 1;
  }

  .heading-space {
    display: block;
  }
}
</style>
