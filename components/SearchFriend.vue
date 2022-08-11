<template>
  <div class="w-[420px]">
    <div class="relative h-[43px] rounded-full">
      <input
        ref="inputSearchName"
        v-focus
        type="text"
        class="appearance-none outline-none pl-[20px] py-[8px] pr-[calc(120px+12px)] w-full h-full rounded-full text-[1.1rem] border border-[#ff7200] focus:shadow-md focus:shadow-[#f69443]"
        :placeholder="$t('addFriendTab.searchTab.inputPlaceholder')"
      />
      <Button class="absolute right-0 top-0">
        <fa icon="magnifying-glass" />
      </Button>
    </div>
    <div class="max-h-[350px] overflow-auto px-3 mt-[40px]">
      <div class="flex h-[50px] w-full justify-between items-center mb-[40px]">
        <div class="flex items-center">
          <avatar
            :is-have-avatar="user && !!user.avatar"
            :src-image="user && user.avatar"
            :first-char="user && user.fullName.charAt(0)"
          />
          <p class="select-none text-[1.2rem] font-medium ml-3">
            {{ user && user.fullName }}
          </p>
        </div>
        <div>
          <Button color="#01c851">{{
            $t('addFriendTab.searchTab.invite')
          }}</Button>
        </div>
      </div>
      <div class="flex h-[50px] w-full justify-between items-center mb-[40px]">
        <div class="flex items-center">
          <avatar
            :is-have-avatar="user && !!user.avatar"
            :src-image="user && user.avatar"
            :first-char="user && user.fullName.charAt(0)"
          />
          <p class="select-none text-[1.2rem] font-medium ml-3">
            {{ user && user.fullName }}
          </p>
        </div>
        <div>
          <div
            class="flex items-center justify-center min-w-[120px] px-[12px] py-[6px] text-[1.2rem] text-white rounded-[20px] bg-[#33b5e7] border border-[#33b5e7] select-none"
          >
            {{ $t('addFriendTab.searchTab.friend') }}
          </div>
        </div>
      </div>

      <div class="flex h-[50px] w-full justify-between items-center mb-[40px]">
        <div class="flex items-center">
          <avatar
            :is-have-avatar="user && !!user.avatar"
            :src-image="user && user.avatar"
            :first-char="user && user.fullName.charAt(0)"
          />
          <p class="select-none text-[1.2rem] font-medium ml-3">
            {{ user && user.fullName }}
          </p>
        </div>
        <div>
          <Button color="#f74242">{{
            $t('addFriendTab.searchTab.cancel')
          }}</Button>
        </div>
      </div>
      <div class="flex h-[50px] w-full justify-between items-center mb-[40px]">
        <div class="flex items-center">
          <avatar
            :is-have-avatar="user && !!user.avatar"
            :src-image="user && user.avatar"
            :first-char="user && user.fullName.charAt(0)"
          />
          <p class="select-none text-[1.2rem] font-medium ml-3">
            {{ user && user.fullName }}
          </p>
        </div>
        <div>
          <Button color="#01c851">{{
            $t('addFriendTab.searchTab.invite')
          }}</Button>
        </div>
      </div>
      <div class="flex h-[50px] w-full justify-between items-center mb-[40px]">
        <div class="flex items-center">
          <avatar
            :is-have-avatar="user && !!user.avatar"
            :src-image="user && user.avatar"
            :first-char="user && user.fullName.charAt(0)"
          />
          <p class="select-none text-[1.2rem] font-medium ml-3">
            {{ user && user.fullName }}
          </p>
        </div>
        <div>
          <Button color="#01c851">{{
            $t('addFriendTab.searchTab.invite')
          }}</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from './Button.vue'
import Avatar from './Avatar.vue'
export default {
  components: { Button, Avatar },
  data() {
    return {
      user: {
        fullName: 'Nam',
        avatar:
          'https://icdn.dantri.com.vn/thumb_w/640/2020/08/30/diem-danh-nhung-guong-mat-hot-girl-noi-bat-trong-thang-8-docx-1598788426579.jpeg',
      },
    }
  },
}
</script>
