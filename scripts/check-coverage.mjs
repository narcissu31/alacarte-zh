#!/usr/bin/env node
/**
 * 词条覆盖率检查：从正在运行的应用里取出前端 bundle，列出「还没被 zh.js 翻译」的界面文案。
 *
 * 用法：
 *   node scripts/check-coverage.mjs                        # 默认 http://127.0.0.1:8280
 *   node scripts/check-coverage.mjs http://192.168.5.10:8280
 *   node scripts/check-coverage.mjs --file ./index-xxxx.js # 直接分析本地文件
 *
 * 说明：上游改了界面文案后，旧词条会失效、新文案会变英文。跑一遍本脚本就能看到要补哪些，
 * 把输出里的条目翻译后加进 zh.js 即可（无需重建镜像，刷新浏览器生效）。
 */

import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const fileArg = args.indexOf('--file');
const base = args.find((a) => a.startsWith('http')) || 'http://127.0.0.1:8280';

/** 逐字符扫描，正确跳过注释/字符串/正则字面量 —— 比全局正则可靠（转义序列会让全局匹配错位） */
function extractLiterals(src) {
  const out = [];
  const isId = (c) => /[A-Za-z0-9_$]/.test(c);
  let i = 0;
  let prevSig = '';           // 上一个有效字符，用于判断 / 是正则还是除号
  const n = src.length;
  while (i < n) {
    const c = src[i];
    if (c === '/' && src[i + 1] === '/') { while (i < n && src[i] !== '\n') i++; continue; }
    if (c === '/' && src[i + 1] === '*') { i += 2; while (i < n && !(src[i] === '*' && src[i + 1] === '/')) i++; i += 2; continue; }
    if (c === '"' || c === "'" || c === '`') {
      const q = c;
      let j = i + 1, buf = '';
      while (j < n) {
        if (src[j] === '\\') { buf += src[j] + src[j + 1]; j += 2; continue; }
        if (src[j] === q) break;
        buf += src[j]; j++;
      }
      out.push({ raw: buf, quote: q });
      i = j + 1; prevSig = q; continue;
    }
    // 正则字面量：/ 出现在运算符或 ( , = : [ ! & | ? { } ; 之后
    if (c === '/' && (prevSig === '' || '(,=:[!&|?{};'.includes(prevSig))) {
      let j = i + 1, cls = false;
      while (j < n) {
        if (src[j] === '\\') { j += 2; continue; }
        if (src[j] === '[') cls = true;
        else if (src[j] === ']') cls = false;
        else if (src[j] === '/' && !cls) break;
        else if (src[j] === '\n') break;
        j++;
      }
      i = j + 1; while (i < n && isId(src[i])) i++; prevSig = '/'; continue;
    }
    if (!/\s/.test(c)) prevSig = c;
    i++;
  }
  return out;
}

function decode({ raw, quote }) {
  if (quote !== '`') {
    try { return JSON.parse(quote + raw + quote); } catch { /* 含未知转义 */ }
  }
  return raw.replace(/\\(n|t|r|"|'|`|\\)/g, (_, m) => ({ n: '\n', t: '\t', r: '\r' }[m] ?? m));
}

async function loadBundle() {
  if (fileArg >= 0) return fs.readFileSync(args[fileArg + 1], 'utf8');
  const html = await (await fetch(base + '/')).text();
  const m = html.match(/\/assets\/[A-Za-z0-9._-]+\.js/);
  if (!m) throw new Error('首页里找不到 js bundle，请确认服务已启动');
  console.log('bundle:', base + m[0]);
  return await (await fetch(base + m[0])).text();
}

const NOISE = /[:{}<>\\]|https?:\/\/|\bpx\b|var\(|rgba?\(|cubic-bezier|polyfill|node_modules|\.(js|css|png|svg|webp|json|ts|tsx)\b|=>|&&|\|\|/;
const CSSY = /^\s*[a-z-]+:\s*[a-z]/i;
const LOWERCASE_ID = /^[a-z][a-z0-9_$-]*( [a-z0-9_$-]+)*$/;
// 第三方库内部报错（永远不会显示给用户，或显示了我们也不该改）
const LIBRARY_MSG = /React|react-router|useViewTransitionState|useFormAction|HydrateFallback|Suspense Fallback|window\.location|Minified |element child|child routes|navigate\(\)|object Object|full message|Hey developer|history only accepts|single React element/i;

const UTILITY = /^(flex|grid|hidden|block|inline|absolute|relative|fixed|sticky|truncate|rounded|overflow|gap|items|justify|shrink|grow|basis|w|h|min|max|mt|mb|ml|mr|mx|my|pt|pb|pl|pr|px|py|text|bg|border|ring|shadow|opacity|transition|duration|ease|z|top|bottom|left|right|leading|tracking|font|aspect|object|col|row|space|select|pointer|cursor|divide|order|inset|fill|stroke|backdrop|animate|origin|scale|rotate|translate|skew|blur|grayscale|sepia|invert|saturate|contrast|brightness|drop|filter|mix|isolation|caret|accent|scroll|snap|touch|will|content|decoration|underline|list|indent|align|whitespace|break|line-clamp)(-|$)/;
/** 判断一段文字是不是 Tailwind 类名串：含结构字符，或命中工具类词表 */
function classLike(tok) {
  return /[.:[\]/]/.test(tok) || UTILITY.test(tok);
}
function isNoise(t) {
  if (LIBRARY_MSG.test(t)) return true;
  const toks = t.split(' ').filter(Boolean);
  if (!toks.length) return true;
  const n = toks.filter(classLike).length;
  return n / toks.length >= 0.6;
}

const zhSrc = fs.readFileSync(path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'zh.js'), 'utf8');
const dictBlock = zhSrc.match(/D = \{([\s\S]*?)\n  \};/)[1];
// 注意：必须把 \" 之类的转义还原，否则带引号的键（如 `Delete album "` ）永远匹配不上
const decodeKey = (s) => { try { return JSON.parse('"' + s + '"'); } catch { return s; } };
const known = new Set([...dictBlock.matchAll(/"((?:[^"\\]|\\.)+)":/g)].map((m) => decodeKey(m[1])));
// 同时把 RULES 里的动态正则也视为"已覆盖"，避免误报（如 "1400×1400 (recommended)"）
const dynamic = [...zhSrc.matchAll(/\[\/((?:\\.|[^/\\])+)\/([gimsuy]*)\s*,/g)]
  .map((m) => { try { return new RegExp(m[1], m[2]); } catch { return null; } })
  .filter(Boolean);
const covered = (t) => known.has(t) || dynamic.some((re) => re.test(t));

const src = await loadBundle();
const found = new Map();
for (const lit of extractLiterals(src)) {
  const t = decode(lit).replace(/\s+/g, ' ').trim();
  if (t.length < 14 || t.length > 400) continue;
  if (!/\s/.test(t)) continue;
  if (!/[a-zA-Z]{3}/.test(t)) continue;
  if (covered(t)) continue;
  if (NOISE.test(t) || CSSY.test(t) || LOWERCASE_ID.test(t) || isNoise(t)) continue;
  found.set(t, true);
}

const list = [...found.keys()].sort();
console.log(`\n语言包词条数: ${known.size}`);
console.log(`可能未翻译的界面文案: ${list.length}\n`);
for (const s of list) console.log('- ' + s);
if (list.length) {
  console.log('\n提示：把上面这些翻译后加进 zh.js 的 D 字典即可（末项记得带逗号）。');
}
