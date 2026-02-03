#!/usr/bin/env node

/**
 * Validates that all imports in the package are correct
 * - No @/ aliases remain
 * - All relative imports point to existing files
 */

import { readFileSync, existsSync } from 'fs'
import { join, dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { glob } from 'glob'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const srcDir = join(__dirname, '../src')

// Find all JavaScript files
const files = await glob('**/*.js', { cwd: srcDir, absolute: true })

console.log(`Validating ${files.length} files...\n`)

let hasErrors = false
let warningCount = 0

files.forEach(filePath => {
  const content = readFileSync(filePath, 'utf-8')
  const fileDir = dirname(filePath)
  const shortPath = filePath.replace(srcDir + '/', '')

  // Check for @/ alias (should not exist)
  if (content.includes('@/')) {
    console.error(`❌ ${shortPath}: Found @/ alias (should be relative path)`)
    hasErrors = true
  }

  // Check for relative imports and verify they exist
  const importRegex = /from\s+['"](\.[^'"]+)['"]/g
  let match

  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1]
    let targetPath = resolve(fileDir, importPath)

    // If import doesn't have .js extension, try adding it
    if (!existsSync(targetPath)) {
      targetPath = targetPath + '.js'
    }

    if (!existsSync(targetPath)) {
      console.error(`❌ ${shortPath}: Import "${importPath}" not found`)
      hasErrors = true
    }
  }

  // Check for absolute imports (should be relative or from vue)
  const absoluteImportRegex = /from\s+['"]([^'".][^'"]*)['"]/g

  while ((match = absoluteImportRegex.exec(content)) !== null) {
    const importPath = match[1]
    // Allow vue imports
    if (importPath !== 'vue') {
      console.warn(`⚠️  ${shortPath}: Absolute import "${importPath}" (should be relative)`)
      warningCount++
    }
  }
})

console.log('')

if (hasErrors) {
  console.error('❌ Validation failed with errors')
  process.exit(1)
} else if (warningCount > 0) {
  console.log(`⚠️  Validation passed with ${warningCount} warnings`)
} else {
  console.log('✅ All imports validated successfully!')
}
