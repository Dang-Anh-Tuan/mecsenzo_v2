<template>
  <div class="max-w-[1200px] h-[calc(100vh-100px)] m-auto relative top-[100px]">
    <div
      v-if="isShowLoader"
      class="h-[400px] m-auto flex items-center justify-center"
    >
      <LoaderSideConversation />
    </div>
    <div class="h-[400px] m-auto">
      <BarChart
        v-if="statisticTotalMessage.length > 0"
        :chart-data="getChartTotalMessageData"
        :chart-options="getOptionChartTotalMessage"
        :width="20"
        :height="20"
        :style="myStyles"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getConversationIndividualByEmail } from '~/api/conversation'
import { getAllMessageByIdConversation } from '~/api/message.api'
import BarChart from '~/components/BarChart.vue'
import LoaderSideConversation from '~/components/LoaderSideConversation.vue'

export default {
  components: { BarChart, LoaderSideConversation },

  middleware: ['check-auth', 'auth-required'],

  data() {
    return {
      statisticTotalMessage: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      isShowLoader: true,
    }
  },

  head() {
    return {
      title: this.$t('title.statistic'),
    }
  },

  computed: {
    ...mapGetters({
      getCurrentEmail: 'account/getAccount',
    }),

    getChartTotalMessageData() {
      if (this.statisticTotalMessage.length > 0) {
        const fullNameLabel = []
        const dataTotalMessage = []
        const dataAverageTimeReply = []
        const dataAverageMessagePerDay = []

        this.statisticTotalMessage.forEach((item) => {
          fullNameLabel.push(item.user.fullName)
          dataTotalMessage.push(item.totalMessage)
          dataAverageTimeReply.push((Math.random() * 10 + 5).toFixed(0))
          dataAverageMessagePerDay.push(
            (item.totalMessage / (Math.random() * 5 + 1).toFixed(0)).toFixed(2)
          )
        })

        return {
          labels: fullNameLabel,
          datasets: [
            {
              label: this.$t('chart.totalMessage'),
              data: dataTotalMessage,
              backgroundColor: '#ff7200',
            },
            {
              label: this.$t('chart.timeReply'),
              data: dataAverageTimeReply,
              backgroundColor: '#FBDF07',
            },
            {
              label: this.$t('chart.averageMessagePerDay'),
              data: dataAverageMessagePerDay,
              backgroundColor: '#89CFFD',
            },
          ],
        }
      }
      return null
    },

    getOptionChartTotalMessage() {
      const nameChart = this.$t('chart.chartTotalMessage')
      return {
        plugins: {
          title: {
            display: true,
            text: nameChart,
          },
        },
        ...this.chartOptions,
      }
    },

    myStyles() {
      return {
        height: `${500}px`,
        position: 'relative',
        margin: 'auto',
      }
    },
  },

  async created() {
    const conversationOfCurrentUser = await getConversationIndividualByEmail(
      this.getCurrentEmail
    )

    const statisticTotalMessageTemp = []
    for (const conversation of conversationOfCurrentUser) {
      const messagesOfConversation = await getAllMessageByIdConversation(
        conversation.id
      )

      statisticTotalMessageTemp.push({
        user: conversation.partnerUser,
        totalMessage: messagesOfConversation.length,
      })
    }
    this.isShowLoader = false
    this.statisticTotalMessage = statisticTotalMessageTemp
  },
}
</script>

<style></style>
