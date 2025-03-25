import filter from "leo-profanity"

filter.add(filter.getDictionary('en'))
filter.add(filter.getDictionary('fr'))
filter.add(filter.getDictionary('ru'))

export default function filterText(text) {
  return filter.clean(text)
}
