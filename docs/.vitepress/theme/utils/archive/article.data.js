import fs from 'node:fs'
import parseFrontmatter from 'gray-matter'

export default {
  watch: ['../../../../**/*.md'],
  load(watchedFiles) {
    const articleFiles = watchedFiles.filter((file) => /\/docs\/20\d{2}\/.*\.md$/.test(file))

    return articleFiles.map((articleFile) => {
      const articleContent = fs.readFileSync(articleFile, 'utf-8')
      const { data } = parseFrontmatter(articleContent)

      return {
        ...data,
        path: articleFile.substring(articleFile.lastIndexOf('/docs/') + 6).replace(/\.md$/, ''),
      }
    })
  },
}
