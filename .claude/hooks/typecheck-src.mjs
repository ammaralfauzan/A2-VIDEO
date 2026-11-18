// Hook PostToolUse (Edit|Write|MultiEdit): setelah file di src/ diubah, jalankan typecheck agar galat langsung terlihat.
import {spawnSync} from 'node:child_process';
import fs from 'node:fs';

const input = JSON.parse(fs.readFileSync(0, 'utf8'));
const file = input.tool_input?.file_path ?? '';
if (!/\/src\/.*\.(ts|tsx)$/.test(file)) process.exit(0);
const root = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();
const r = spawnSync('npx', ['tsc', '--noEmit', '-p', '.'], {cwd: root, encoding: 'utf8', timeout: 100000});
if (r.status === 0) process.exit(0);
console.error(`Typecheck gagal setelah mengubah ${file}:\n${(r.stdout + r.stderr).split('\n').filter((l) => !l.startsWith('npm notice')).slice(0, 25).join('\n')}`);
process.exit(2);
