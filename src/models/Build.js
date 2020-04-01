import { v4 as uuidv4 } from 'uuid'

export default function Build({
  id = uuidv4(),
  authorUid = null,
  lastUpdate = null,
  title = 'New build',
  traits = [],
  boards = [],
  isPublic = false
}) {
  return {
    id,
    authorUid,
    lastUpdate,
    title,
    traits,
    boards,
    isPublic
  }
}
