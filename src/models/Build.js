export default function Build({
  uid = null,
  authorUid = null,
  lastUpdate = new Date(),
  name = 'New build',
  traits = [],
  boards = [],
  isPublic = false
}) {
  return {
    uid,
    authorUid,
    lastUpdate,
    name,
    traits,
    boards,
    isPublic
  }
}
