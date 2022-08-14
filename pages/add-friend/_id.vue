<template>
  <div class="max-w-[1200px] h-[calc(100vh-100px)] m-auto relative top-[100px]">
    <TabSide :tab-items="tabItems" />
  </div>
</template>

<script>
import Invitation from '~/components/Invitation.vue'
import SearchFriend from '~/components/SearchFriend.vue'
import TabSide from '~/components/TabSide.vue'
export default {
  components: { TabSide },
  data() {
    return {
      tabItems: [
        {
          title: this.$t('addFriendTab.search'),
          component: SearchFriend,
        },
        {
          title: this.$t('addFriendTab.invitation'),
          component: Invitation,
        },
      ],
    }
  },
}
</script>
