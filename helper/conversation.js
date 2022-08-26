const { getUsersByEmails, getUserByEmail } = require('~/api/user.api')

const mergeUseIndividualConversation = async function (
  conversationIndividual,
  currentEmail
) {
  const currentUser = await getUserByEmail(currentEmail)
  let partnerEmails = []

  for (const conversation of conversationIndividual) {
    const emailPartner = conversation.member.filter(
      (email) => email !== currentEmail
    )[0]

    partnerEmails = [...partnerEmails, emailPartner]
  }

  if (partnerEmails.length > 0) {
    const partnersUser = await getUsersByEmails(partnerEmails)

    for (const conversation of conversationIndividual) {
      const emailPartner = conversation.member.filter(
        (email) => email !== currentEmail
      )[0]

      conversation.currentUser = currentUser
      for (const partnerUser of partnersUser) {
        if (partnerUser.email === emailPartner) {
          conversation.partnerUser = partnerUser
        }
      }
    }
  }
}

const isRightSearch = function (field, keySearch) {
  return field.toLowerCase().includes(keySearch.toLowerCase())
}

const filterByName = function (conversationsAfterMergeUser, keySearch) {
  return conversationsAfterMergeUser.filter((conversation) => {
    if (conversation.type === 'individual') {
      return isRightSearch(conversation.partnerUser.fullName, keySearch)
    }
    return isRightSearch(conversation.name, keySearch)
  })
}

export { mergeUseIndividualConversation, isRightSearch, filterByName }
