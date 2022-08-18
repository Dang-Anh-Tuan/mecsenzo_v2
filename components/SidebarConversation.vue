<template>
  <div
    class="container-sidebar w-[30%] h-full py-[36px] px-[20px] bg-white shadow-2xl rounded-[20px] z-[50]"
  >
    <div class="relative w-full h-[48px]">
      <input
        type="text"
        class="appearance-none outline-none w-full h-full p-[20px] rounded-full bg-gray-200 focus:bg-white focus:shadow-lg transition-all duration-150 ease-in-out opacity-0 group-hover:opacity-100 text-[1.1rem]md:text-[1.2rem] md:opacity-100"
        :placeholder="$t('sidebarConversation.inputPlaceholder')"
      />

      <button
        class="absolute top-0 right-0 h-full w-[48px] flex justify-center items-center rounded-full bg-slate-200 md:bg-transparent hover:bg-slate-200 transition-all"
      >
        <fa icon="magnifying-glass" />
      </button>
    </div>
    <div class="container-conversation my-5 overflow-y-auto overflow-x-hidden">
      <div
        class="h-[54px] mb-3 flex items-center cursor-pointer hover:bg-slate-200"
      >
        <div class="relative">
          <avatar
            :is-have-avatar="true"
            src-image="https://firebasestorage.googleapis.com/v0/b/mecsenzo.appspot.com/o/user-avatar%2Fxedoisong_novitec_torado_lamborghini_aventador_roadster_h3_orff.jpg074e6d51-750a-4a56-8e8a-49b87877e184?alt=media&token=6b347c93-5c03-43db-90b6-39c32d84e2b7"
            first-char="D"
          />
          <div
            class="absolute w-[12px] h-[12px] rounded-full bg-success bottom-0 right-0"
          ></div>
        </div>
        <div class="conversation-content ml-4">
          <p
            class="select-none font-medium truncate text-ellipsis max-w-[180px] md:max-w-[120px] lg:max-w-[180px] h-[1.4rem]"
          >
            Dang Anh Tuan
          </p>
          <p
            class="select-none truncate text-ellipsis text-[0.9rem] max-w-[180px] md:max-w-[120px] lg:max-w-[180px] h-[1.4rem] text-dark_primary font-medium"
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti
            doloremque voluptates, non rem voluptas blanditiis animi vel porro
            ratione dolorem laborum atque dolore sed amet odio iste culpa, omnis
            unde?
          </p>
        </div>
      </div>
      <div
        class="h-[54px] mb-3 flex items-center cursor-pointer hover:bg-slate-200"
      >
        <div class="relative">
          <avatar
            :is-have-avatar="true"
            src-image="https://icdn.dantri.com.vn/thumb_w/640/2020/12/16/ngam-dan-hot-girl-xinh-dep-noi-bat-nhat-nam-2020-docx-1608126694049.jpeg"
            first-char="D"
          />
          <div
            class="absolute w-[12px] h-[12px] rounded-full bg-gray-300 bottom-0 right-0"
          ></div>
        </div>
        <div class="conversation-content ml-4">
          <p class="select-none">Nguyen Van Nam</p>
          <p
            class="select-none truncate text-ellipsis text-[0.9rem] max-w-[180px] md:max-w-[120px] lg:max-w-[180px] h-[1.4rem] text-gray-500"
          >
            Hello
          </p>
        </div>
      </div>
      <div
        class="h-[54px] mb-3 flex items-center cursor-pointer hover:bg-slate-200"
      >
        <div class="relative">
          <avatar
            :is-have-avatar="true"
            src-image="https://wecsaigon.com/wp-content/uploads/2021/11/good-girl.jpg"
            first-char="D"
          />
          <div
            class="absolute w-[12px] h-[12px] rounded-full bg-success bottom-0 right-0"
          ></div>
        </div>
        <div class="conversation-content ml-4">
          <p class="select-none">Nguyen Van C</p>
          <p
            class="select-none truncate text-ellipsis text-[0.9rem] max-w-[180px] md:max-w-[120px] lg:max-w-[180px] h-[1.4rem] text-gray-500"
          >
            Are you free to9 ?
          </p>
        </div>
      </div>
    </div>
    <Separation />
    <div class="w-full h-[20px] flex justify-between items-center px-3">
      <p class="heading-space text-[1.1rem] hidden md:block">
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
      class="container-conversation h-[36%] my-5 overflow-y-auto overflow-x-hidden"
      @scroll="handleScroll"
    >
      <div
        v-for="conversation in conversationSpace"
        :key="conversation.id"
        class="h-[54px] mb-3 flex items-center cursor-pointer hover:bg-slate-200"
      >
        <avatar
          :is-have-avatar="!!conversation.thumb"
          :src-image="conversation.thumb"
          :first-char="conversation.name.charAt(0)"
        />
        <div class="conversation-content ml-4">
          <p :class="`select-none ${getClassNameNotSeen(conversation)}`">
            {{ conversation.name }}
          </p>
          <p
            v-if="getLastMessage(conversation)"
            :class="`select-none truncate text-ellipsis text-[0.9rem] 
            max-w-[180px] md:max-w-[120px] lg:max-w-[180px] h-[1.4rem] ${getClassNewMsgNotSeen(
              conversation
            )} `"
          >
            {{ getLastMessage(conversation).content }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from './Avatar.vue'
import Separation from './Separation.vue'
import { getConversationsSpace } from '~/api/conversation'
export default {
  components: { Avatar, Separation },

  emits: ['open-modal-add-space'],

  data() {
    return {
      conversationSpace: null,
      lastDocConversationsSpace: null,
    }
  },

  computed: {
    getCurrentEmail() {
      if (process.server) {
        return this.$store.getters['account/getAccount']
      } else {
        return localStorage.getItem('email')
      }
    },

    getLastMessage() {
      return (conversation) => {
        const lenMessage = conversation.messages.length

        if (lenMessage > 0) {
          return conversation.messages[lenMessage - 1]
        }
        return false
      }
    },

    getClassNameNotSeen() {
      return (conversation) =>
        conversation.seen.includes(this.getCurrentEmail) ? '' : 'font-medium'
    },

    getClassNewMsgNotSeen() {
      return (conversation) =>
        conversation.seen.includes(this.getCurrentEmail)
          ? ''
          : 'text-dark_primary font-medium'
    },
  },

  created() {
    getConversationsSpace(
      this.getCurrentEmail,
      this.setConversationSpace,
      this.lastDocConversationsSpace
    )
  },

  methods: {
    showModalAddSpace() {
      this.$emit('open-modal-add-space')
    },

    compileDocsToConversationSpace(conversationSpaceDocs) {
      return conversationSpaceDocs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    },

    setConversationSpace(conversationSpaceDocs) {
      const conversationSpace = this.compileDocsToConversationSpace(
        conversationSpaceDocs
      )

      this.conversationSpace = conversationSpace

      const lengthDocs = conversationSpaceDocs.length
      this.lastDocConversationsSpace = conversationSpaceDocs[lengthDocs - 1]
    },

    loadMoreConversationSpace(conversationSpaceDocs) {
      const conversationSpaceNew = this.compileDocsToConversationSpace(conversationSpaceDocs)

      const lastDoc = conversationSpaceDocs[conversationSpaceDocs.length - 1]

      if (lastDoc && lastDoc.id !== this.lastDocConversationsSpace.id) {
        this.lastDocConversationsSpace = lastDoc
        this.conversationSpace = [
          ...this.conversationSpace,
          ...conversationSpaceNew,
        ]
      }
    },

    handleScroll(e) {
      if (
        Math.ceil(e.target.scrollTop) + e.target.clientHeight >=
        e.target.scrollHeight
      ) {
        getConversationsSpace(
          this.getCurrentEmail,
          this.loadMoreConversationSpace,
          this.lastDocConversationsSpace
        )
      }
    },
  },
}
</script>

<style scoped>
.container-conversation > :last-child {
  margin-bottom: 0;
}

@media screen and (max-width: 768px) {
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
</style>
