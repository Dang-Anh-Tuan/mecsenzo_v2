<template>
  <div class="w-full h-[450px] px-[50px]">
    <div class="relative w-[180px] cursor-pointer">
      <select
        name=""
        class="appearance-none outline-none w-full px-[30px] py-[8px] rounded-full text-[1.1rem] border border-[#ff7200] shadow-xl cursor-pointer bg-white"
        @change="handleChangeSelector"
      >
        <option value="sent">
          {{ $t('addFriendTab.invitationTab.sent') }}
        </option>
        <option value="pending">
          {{ $t('addFriendTab.invitationTab.pending') }}
        </option>
        <option value="approved">
          {{ $t('addFriendTab.invitationTab.approved') }}
        </option>
      </select>
      <div class="absolute right-4 top-[25%] pointer-events-none">
        <fa icon="caret-down" class="text-dark_bg text-[1.2rem] ml-2" />
      </div>
    </div>
    <div class="grid grid-cols-2 gap-5 w-full h-[400px] my-6 overflow-auto">
      <div
        v-for="user in users"
        :key="user.id"
        class="flex w-full justify-between items-center border-[2px] p-3 h-[86px]"
      >
        <div :id="user.id" class="flex items-center">
          <avatar
            :is-have-avatar="user && !!user.avatar"
            :src-image="user && user.avatar"
            :first-char="user && user.fullName.charAt(0)"
          />
          <p class="select-none text-[1.2rem] font-medium ml-3">
            {{ user && user.fullName }}
          </p>
        </div>
        <div v-if="filter === 'sent'">
          <Button color="#f74242">{{
            $t('addFriendTab.invitationTab.cancel')
          }}</Button>
        </div>
        <div v-if="filter === 'pending'">
          <Button color="#01c851">{{
            $t('addFriendTab.invitationTab.accept')
          }}</Button>
        </div>
        <div v-if="filter === 'approved'">
          <Button color="#f74242">{{
            $t('addFriendTab.invitationTab.unfriend')
          }}</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from './Avatar.vue'
export default {
  components: { Avatar },
  data() {
    return {
      filter: 'sent',
      users: [
        {
          id: 1,
          fullName: 'Nam',
          avatar:
            'https://icdn.dantri.com.vn/thumb_w/640/2020/08/30/diem-danh-nhung-guong-mat-hot-girl-noi-bat-trong-thang-8-docx-1598788426579.jpeg',
        },
        {
          id: 2,
          fullName: 'Nam',
          avatar:
            'https://icdn.dantri.com.vn/thumb_w/640/2020/08/30/diem-danh-nhung-guong-mat-hot-girl-noi-bat-trong-thang-8-docx-1598788426579.jpeg',
        },
        {
          id: 3,
          fullName: 'Nam',
          avatar:
            'https://icdn.dantri.com.vn/thumb_w/640/2020/08/30/diem-danh-nhung-guong-mat-hot-girl-noi-bat-trong-thang-8-docx-1598788426579.jpeg',
        },
        {
          id: 4,
          fullName: 'Nam',
          avatar:
            'https://icdn.dantri.com.vn/thumb_w/640/2020/08/30/diem-danh-nhung-guong-mat-hot-girl-noi-bat-trong-thang-8-docx-1598788426579.jpeg',
        },
        {
          id: 5,
          fullName: 'Nam',
          avatar:
            'https://icdn.dantri.com.vn/thumb_w/640/2020/08/30/diem-danh-nhung-guong-mat-hot-girl-noi-bat-trong-thang-8-docx-1598788426579.jpeg',
        },
        {
          id: 6,
          fullName: 'Nam',
          avatar:
            'https://icdn.dantri.com.vn/thumb_w/640/2020/08/30/diem-danh-nhung-guong-mat-hot-girl-noi-bat-trong-thang-8-docx-1598788426579.jpeg',
        },
        {
          id: 7,
          fullName: 'Nam',
          avatar:
            'https://icdn.dantri.com.vn/thumb_w/640/2020/08/30/diem-danh-nhung-guong-mat-hot-girl-noi-bat-trong-thang-8-docx-1598788426579.jpeg',
        },
      ],
    }
  },
  methods: {
    handleChangeSelector(e) {
      this.filter = e.target.value
    },
  },
}
</script>
