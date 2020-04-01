export default function User({
  uid,
  email,
  roles = ['user'],
  username = email.substring(0, email.indexOf('@')),
  summonerName = '',
  lolServer = '',
  builds = []
}) {
  return {
    uid,
    email,
    roles,
    username,
    summonerName,
    lolServer,
    builds
  }
}
