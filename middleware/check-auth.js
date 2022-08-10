export default function (context) {
  context.store.dispatch('account/initAuth', context.req)
}
