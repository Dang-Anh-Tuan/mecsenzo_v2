export default function (context) {
  if (context.store.getters['account/getToken']) {
    context.redirect('/')
  }
}
