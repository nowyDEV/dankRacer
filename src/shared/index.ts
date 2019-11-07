export function getRandomItemFromArray(items: any[]): any {
  const rand = Math.floor(Math.random() * items.length)
  return items[rand]
}
