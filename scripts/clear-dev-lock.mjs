/**
 * Removes Next.js 16+ dev lock (`.next/dev/lock`) so `pnpm dev` can start again.
 * Use when you see: "Another next dev server is already running" but no server is actually up.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const lockPath = path.join(root, '.next', 'dev', 'lock')

try {
  fs.unlinkSync(lockPath)
  console.log('Removed .next/dev/lock — you can run pnpm dev now.')
} catch (err) {
  if (err && typeof err === 'object' && 'code' in err && err.code === 'ENOENT') {
    console.log('No .next/dev/lock found — nothing to clear.')
  } else {
    throw err
  }
}
