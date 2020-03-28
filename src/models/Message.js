export default function Message(title, body, duration = 5000) {
  return {
    id: Math.random().toString(36).substr(2,9),
    title,
    body,
    duration
  }  
}
