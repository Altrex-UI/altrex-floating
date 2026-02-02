#!/usr/bin/env node

/**
 * Fix import paths: Convert @/composables/floating/... to relative paths
 *
 * This script walks through all .js files in src/ and converts
 * Vite alias imports to relative paths based on file location.
 */

import { readFileSync, writeFileSync } from 'fs'
import { join, relative, dirname } from 'path'
import { fileURLToPath } from 'url'
import { glob } from 'glob'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const srcDir = join(__dirname, '../src')

// Find all JavaScript files
const files = await glob('**/*.js', { cwd: srcDir, absolute: true })

console.log(`Found ${files.length} files to process\n`)

let totalReplacements = 0

files.forEach(filePath => {
  let content = readFileSync(filePath, 'utf-8')
  const originalContent = content
  let fileReplacements = 0

  // Get the directory of the current file
  const fileDir = dirname(filePath)

  // Define import patterns to replace
  const patterns = [
    {
      // @/composables/floating/core -> relative path to core/index.js
      pattern: /@\/composables\/floating\/core(?!\/)/g,
      getRelative: (fileDir) => {
        const targetPath = join(srcDir, 'core/index.js')
        const rel = relative(fileDir, targetPath)
        return rel.startsWith('.') ? rel : `./${rel}`
      }
    },
    {
      // @/composables/floating/dom -> relative path to dom/index.js
      pattern: /@\/composables\/floating\/dom(?!\/)/g,
      getRelative: (fileDir) => {
        const targetPath = join(srcDir, 'dom/index.js')
        const rel = relative(fileDir, targetPath)
        return rel.startsWith('.') ? rel : `./${rel}`
      }
    },
    {
      // @/composables/floating/utils/dom -> relative path to utils/dom.js
      pattern: /@\/composables\/floating\/utils\/dom/g,
      getRelative: (fileDir) => {
        const targetPath = join(srcDir, 'utils/dom.js')
        const rel = relative(fileDir, targetPath)
        return rel.startsWith('.') ? rel : `./${rel}`
      }
    },
    {
      // @/composables/floating/utils -> relative path to utils/index.js
      pattern: /@\/composables\/floating\/utils(?!\/)/g,
      getRelative: (fileDir) => {
        const targetPath = join(srcDir, 'utils/index.js')
        const rel = relative(fileDir, targetPath)
        return rel.startsWith('.') ? rel : `./${rel}`
      }
    }
  ]

  // Apply each pattern
  patterns.forEach(({ pattern, getRelative }) => {
    const matches = content.match(pattern)
    if (matches) {
      const relativePath = getRelative(fileDir)
      content = content.replace(pattern, relativePath)
      fileReplacements += matches.length
    }
  })

  // Write back if changes were made
  if (content !== originalContent) {
    writeFileSync(filePath, content, 'utf-8')
    const shortPath = relative(srcDir, filePath)
    console.log(`✓ ${shortPath} (${fileReplacements} replacements)`)
    totalReplacements += fileReplacements
  }
})

console.log(`\n✅ Done! Fixed ${totalReplacements} import paths across ${files.length} files`)
