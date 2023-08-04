export function printSnapshot({
  snapshot,
  __filename,
}: {
  snapshot: any
  __filename: string
}) {
  console.log(
    `[${__filename.replace(/.*\/([\wáéíóúãàèìòùõ]+?)\..*/g, '$1')}]:`,
    snapshot.value,
    ':',
    snapshot.context
  )
}
