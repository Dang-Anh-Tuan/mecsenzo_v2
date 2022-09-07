import { mount } from '@vue/test-utils'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import HeaderChatSide from '@/components/HeaderChatSide.vue'
import Avatar from '~/components/Avatar.vue'

const factory = (values) => {
  return mount(HeaderChatSide, {
    propsData: {
      infoConversation: values,
      isShowSidebarConversation: false,
    },
    mocks: {
      $t: (msg) => msg,
      $i18n: { en: 'en' },
    },
    stubs: {
      ValidationObserver,
      ValidationProvider,
      NuxtLink: { template: '<div></div> ' },
      Avatar,
      fa: { template: '<div></div> ' },
    },
  })
}

describe('Header Chat Side', () => {
  it('check name header', () => {
    const wrapper = factory({
      name: 'Dang Anh Tuan',
      avatar: 'https://deviet.vn/wp-content/uploads/2019/04/vuong-quoc-anh.jpg',
      conversation: {
        type: 'individual',
      },
    })

    expect(wrapper.find('.select-none.font-semibold.truncate').text()).toEqual(
      'Dang Anh Tuan'
    )
  })
})
