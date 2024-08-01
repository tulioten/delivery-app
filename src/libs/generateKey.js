export default function generateKey() {
  return `${Date.now()}-${Math.floor(Math.random() * 1000)}`
}
