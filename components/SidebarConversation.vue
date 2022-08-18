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
    >
      <div
        class="h-[54px] mb-3 flex items-center cursor-pointer hover:bg-slate-200"
      >
        <avatar
          :is-have-avatar="true"
          src-image="https://nghenghiep.vieclam24h.vn/wp-content/uploads/2022/08/dev-la-gi-1.jpg"
          first-char="D"
        />
        <div class="conversation-content ml-4">
          <p class="select-none font-medium">Fresher F6</p>
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
        <avatar
          :is-have-avatar="true"
          src-image="https://profilenghesi.com/wp-content/uploads/2021/08/dev-nguyen-la-ai-tieu-su-4.jpg"
          first-char="D"
        />
        <div class="conversation-content ml-4">
          <p class="select-none">F6 Vue JS</p>
          <p
            class="select-none truncate text-ellipsis text-[0.9rem] max-w-[180px] md:max-w-[120px] lg:max-w-[180px] h-[1.4rem]"
          >
            non rem voluptas blanditiis animi vel porro ratione dolorem laborum
            atque dolore sed amet odio iste culpa, omnis unde?
          </p>
        </div>
      </div>
      <div
        class="h-[54px] mb-3 flex items-center cursor-pointer hover:bg-slate-200"
      >
        <avatar
          :is-have-avatar="true"
          src-image="https://firebasestorage.googleapis.com/v0/b/mecsenzo.appspot.com/o/user-avatar%2Fxedoisong_novitec_torado_lamborghini_aventador_roadster_h3_orff.jpg074e6d51-750a-4a56-8e8a-49b87877e184?alt=media&token=6b347c93-5c03-43db-90b6-39c32d84e2b7"
          first-char="D"
        />
        <div class="conversation-content ml-4">
          <p class="select-none">Dang Anh Tuan</p>
          <p
            class="select-none truncate text-ellipsis text-[0.9rem] max-w-[180px] md:max-w-[120px] lg:max-w-[180px] h-[1.4rem]"
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
        <avatar
          :is-have-avatar="true"
          src-image="https://images.discotech.me/artists/1510/8ddafc28-37c6-478a-aa6f-58b473be0242.png?auto=format%2Ccompress&w=1000"
          first-char="D"
        />
        <div class="conversation-content ml-4">
          <p class="select-none">Nghe nhac</p>
          <p
            class="select-none truncate text-ellipsis text-[0.9rem] max-w-[180px] md:max-w-[120px] lg:max-w-[180px] h-[1.4rem]"
          >
            omnis unde?
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from './Avatar.vue'
import Separation from './Separation.vue'
export default {
  components: { Avatar, Separation },

  emits: ['open-modal-add-space'],

  methods: {
    showModalAddSpace() {
      this.$emit('open-modal-add-space')
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
