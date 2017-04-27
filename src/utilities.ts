export function firebaseObjectToArray(items) {
  return Object.keys(items).map(k => {
    items[k].id = k.toString();
    return items[k];
  })
}
