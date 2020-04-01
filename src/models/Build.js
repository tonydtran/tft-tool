export default function Build({
  uid = null,
  authorUid = null,
  lastUpdate = new Date(),
  title = 'New build',
  traits = [],
  boards = [],
  isPublic = false
}) {
  return {
    uid,
    authorUid,
    lastUpdate,
    title,
    traits,
    boards,
    isPublic
  }
}
