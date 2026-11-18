// Hook PreToolUse (Bash): penjaga render dan penjaga file.
// 1) `remotion render <Id>` / `npm run render:*` diblokir bila pemeriksa tabrakan menemukan teks bertabrakan,
//    keluar area aman 9:16, atau menutup wajah. Lewati dengan menulis SKIP_CC=1 di perintah.
// 2) `rm` yang menyentuh lembar ekspresi Gigi atau seluruh out/stills/satu-pesanan diblokir
//    (00-gigi-ekspresi.png pernah ikut terhapus oleh rm berpola dan bukan keluaran render-stills).
import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const input = JSON.parse(fs.readFileSync(0, 'utf8'));
const cmd = input.tool_input?.command ?? '';
const root = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();
const block = (msg) => {
  console.error(msg);
  process.exit(2);
};

if (/\brm\b/.test(cmd) && (/00-gigi-ekspresi/.test(cmd) || /out\/stills\/satu-pesanan\/?(\*|\s|$)/.test(cmd))) {
  block('Diblokir: rm ini menyentuh out/stills/satu-pesanan atau 00-gigi-ekspresi.png (lembar ekspresi dibuat dari GigiSheet, bukan render-stills). Hapus file satu per satu dengan nama lengkap bila memang perlu.');
}

let id = cmd.match(/remotion\s+render\s+(?:\S+\s+)*?([A-Za-z0-9]+)\s+\S*out\//)?.[1];
if (!id) {
  const npm = cmd.match(/npm\s+run\s+(render[\w:-]*)/)?.[1];
  if (npm) {
    const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
    id = pkg.scripts?.[npm]?.match(/remotion\s+render\s+([A-Za-z0-9]+)/)?.[1];
  }
}
if (!id || /\bSKIP_CC=1\b/.test(cmd)) process.exit(0);

const env = {...process.env};
const shell = '/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
if (!env.REMOTION_BROWSER && fs.existsSync(shell)) env.REMOTION_BROWSER = shell;
const r = spawnSync('node', ['scripts/check-collisions.mjs', id, '--every=30'], {cwd: root, env, encoding: 'utf8', timeout: 540000});
if (r.status === 0) process.exit(0);
const out = (r.stdout || '').split('\n').filter((l) => !/memory|Memory|docker|lower amount/.test(l)).join('\n');
block(`Render ${id} ditahan oleh pemeriksa tabrakan (scripts/check-collisions.mjs):\n${out}\n${r.stderr?.split('\n').slice(-5).join('\n') ?? ''}\nPerbaiki tata letak, atau tulis SKIP_CC=1 di perintah bila temuan ini memang disengaja.`);
