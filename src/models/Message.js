import { v4 as uuidv4 } from 'uuid'

export default function Message(title, body, duration = 3000) {
  return {
    id: uuidv4(),
    title,
    body,
    duration
  }
}
