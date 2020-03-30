export default function User({
  email,
  roles = ['user'],
  username = email.substring(0, email.indexOf('@')),
  summonerName = '',
  lolServer = '',
  builds = []
}) {
  return {
    email,
    roles,
    username,
    summonerName,
    lolServer,
    builds
  }
}
