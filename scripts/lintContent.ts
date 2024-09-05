import markdownlint from 'markdownlint'

async function lintContent(paths: string[]) {
  const options: markdownlint.Options = {
    files: paths,
    config: {
      MD013: {
        line_length: 250,
      },
      MD024: {
        "siblings_only": true
      }
    },
  }

  const result = await markdownlint.promises.markdownlint(options)
  return result
}

export default lintContent
