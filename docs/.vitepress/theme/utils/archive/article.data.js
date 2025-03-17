import fs from 'node:fs'
import parseFrontmatter from 'gray-matter'

export default {
  watch: ['../../../../**/*.md'],
  load(watchedFiles) {
    console.log('[ watchedFiles ] 🌸>', watchedFiles)
    const ARCHIVE_REGEX = /^docs\/archiving\/20\d{2}\//
    const articleFiles = watchedFiles.filter((file) => ARCHIVE_REGEX.test(file))
    console.log('[ articleFiles ] 🌸>', articleFiles)
    return articleFiles.map((articleFile) => {
      const articleContent = fs.readFileSync(articleFile, 'utf-8')
      const { data } = parseFrontmatter(articleContent)
      console.log('[ data ] 🌸>', data)
      return {
        ...data,
        path: articleFile.substring(articleFile.lastIndexOf('/docs/') + 6).replace(/\.md$/, ''),
      }
    })
  },
}
