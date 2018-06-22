import json5 from 'json5'

const getData = (ref, key) => {
  const element = ref.$el || ref,
    dataString = element.dataset[key]

  return !dataString ? undefined : json5.parse(dataString)
}

export default getData
