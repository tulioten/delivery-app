export function dbTimeForHuman(str) {
  const fullDate = str.replace('T', ' ').substring(0, 16).split(' ')
  const partDate = fullDate[0].split('-').reverse().join('/')
  const partHour = fullDate[1]
  const fullDateTrans = partDate + ' ' + partHour
  return fullDateTrans
}
