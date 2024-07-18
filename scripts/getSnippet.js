import fs from 'fs'
import crypto from 'crypto'
import path from 'path'

/**
 * @description hashes the snippet
 *
 * @input snippet
 *
 * @returns hash of the snippet
 */
function hashSnippet(snippet) {
  // Normalize line endings and trim whitespace
  const normalizedSnippet = snippet.replace(/\r\n/g, '\n').trim()
  // console.log('Hashing content:', normalizedSnippet); // For debugging
  return crypto.createHash('md5').update(normalizedSnippet).digest('hex')
}

/**
 * @description extracts code snippets from a file using regex
 *
 * @input filePath
 *
 * @returns List of objects containing the snippet content, language, title, description, and hash
 */
function extractSnippetsFromFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const regex =
    /<!--snippet(?:\s+([a-f0-9]{32}))?-->\s*(<!--title:\s*.*?-->\s*)?\s*(<!--descr:\s*.*?-->\s*)?\s*```(\w+)\s*\n([\s\S]*?)\n\s*```[\s\S]*?<!--\/snippet-->/g
  let match
  let snippets = []
  let collectionHash = []

  while ((match = regex.exec(fileContent)) !== null) {
    const existingHash = match[1] || ''
    const title = match[2] || ''
    const desc = match[3] || ''
    const language = match[4]
    const content = match[5]
    const hash = hashSnippet(content)

    if (existingHash && existingHash !== hash) {
      console.log(`Hash mismatch in ${filePath}`)
      snippets.push({ title, desc, content, language, hash })
      collectionHash.push(existingHash)
    }
  }

  return { snippets, collectionHash }
}

/**
 * @description adds or updates the hash beside the snippet marker
 *
 * @input filePath
 *
 * @returns void
 */
function addHashToFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const regex =
    /(<!--snippet)(?:\s+([a-f0-9]{32}))?(-->)([\s\S]*?)(<!--\/snippet-->)/g

  let newContent = fileContent.replace(
    regex,
    (match, start, existingHash, end, content, closeTag) => {
      // Check if the content follows the expected format
      const formatRegex =
        /^\s*(<!--title:\s*.*?-->\s*)?\s*(<!--descr:\s*.*?-->\s*)?\s*```(\w+)\s*\n([\s\S]*?)\n\s*```\s*$/
      const formatMatch = formatRegex.exec(content)

      if (formatMatch) {
        const [, title, desc, language, snippetContent] = formatMatch
        const snippetHash = hashSnippet(snippetContent.trim())
        return `${start} ${snippetHash}${end}${content}${closeTag}`
      } else {
        // If the format doesn't match, return the original content without modification
        return match
      }
    },
  )

  fs.writeFileSync(filePath, newContent, 'utf-8')
}

/**
 * @description cleans the title and description fields by removing the tags
 *
 * @input snippets
 *
 * @returns List of cleaned snippets
 */
function cleanSnippets(snippets) {
  return snippets.map((snippet) => ({
    ...snippet,
    title: snippet.title.replace(/<!--title:\s*(.*?)-->/, '$1').trim(),
    desc: snippet.desc.replace(/<!--descr:\s*(.*?)-->/, '$1').trim(),
  }))
}

/**
 * @description Main function that extracts snippets, cleans them, and adds hashes to the file
 *
 * @input filePath
 *
 * @returns void
 */
async function processSnippets(filePath) {
  try {
    const { snippets, collectionHash } = extractSnippetsFromFile(filePath)
    const cleanedSnippets = cleanSnippets(snippets)
    console.log(cleanedSnippets)
    addHashToFile(filePath)
    console.log('Hashes added to file')

    // prepare the payload
    const payload = {
      hashes: collectionHash,
      snippets: cleanedSnippets,
    }
    console.log('hash', payload.hashes)
    console.log('code', payload.snippets)

    // send to the server
    const response = await fetch(
      'https://kb-backend-ompt.onrender.com/api/code_snippet',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    )

    if (!response.ok) {
      throw new Error('Failed to send snippets to the server')
    }
    console.log('Snippets sent successfully')
  } catch (error) {
    console.error(error.message)
  }
}

/**
 * @description Function to get all markdown file paths in a directory
 *
 * @input dir
 * @input fileList
 *
 * @returns List of markdown file paths
 */
function getMdPaths(dir, fileList = []) {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      // Recursively search in the subdirectory
      getMdPaths(filePath, fileList)
    } else if (path.extname(file) === '.md') {
      // If it's a markdown file, add it to the list
      fileList.push(filePath)
    }
  })

  return fileList
}

/**
 * @description Function to process all markdown files in a directory
 *
 * @input dirPath
 *
 * @returns void
 */
function processAllMarkdownFiles(dirPath) {
  const mdPaths = getMdPaths(dirPath)
  mdPaths.forEach((filePath) => {
    processSnippets(filePath)
  })
}

processAllMarkdownFiles('content')

export default processSnippets
