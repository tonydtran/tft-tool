export default function Message(title, body) {
  return {
    id: Math.random().toString(36).substr(2,9),
    title,
    body
  }  
}
