export const mapInvitationUser = function (invitation, users) {
  for (let i = 0; i < invitation.length; i++) {
    invitation[i] = {
      ...invitation[i],
      user: users[i],
    }
  }
}
