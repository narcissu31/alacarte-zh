#!/usr/bin/env bash
# 拉取/更新上游 ALACarte 源码到 ./upstream，并打好国内网络所需的加速器补丁。
# 用法：./scripts/fetch-upstream.sh [分支或标签，默认 main]
set -euo pipefail

REF="${1:-main}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# 1) 备份本地数据（data/ 与 music/ 不在此脚本管辖范围内，仅提示）
if [ -d data/web ] && [ ! -f data/.backup-hint ]; then
  echo "⚠️  检测到已有 data/web（含 Apple 凭据与设置），请确认已备份。" >&2
  touch data/.backup-hint 2>/dev/null || true
fi

# 2) 拉取源码（github.com 的 codeload 在国内常被墙，失败时改用手动下载 + 上传）
URL="https://github.com/sosjalapeno/ALACarte/archive/refs/heads/${REF}.tar.gz"
[ "$REF" != "main" ] && URL="https://github.com/sosjalapeno/ALACarte/archive/refs/tags/${REF}.tar.gz"

TMP="$(mktemp -d)"
echo "==> 下载上游源码：$URL"
if ! curl -fL --connect-timeout 15 -o "$TMP/src.tar.gz" "$URL"; then
  echo "❌ 下载失败。国内可直接访问 github.com 时请用代理；" >&2
  echo "   否则请在能联网的机器上下载同名 tar.gz，放到本目录后重跑本脚本。" >&2
  exit 1
fi

echo "==> 解压到 upstream/"
rm -rf upstream
tar xzf "$TMP/src.tar.gz" -C "$TMP"
mv "$TMP"/ALACarte-* upstream
rm -rf "$TMP"

# 3) 加速器补丁：把 Docker Hub 的 FROM 换成可达的镜像加速器（ghcr.io 引用保持不动）
echo "==> 应用镜像加速器补丁"
MIRROR="docker.m.daocloud.io/library"
for f in upstream/backend/Dockerfile upstream/wrapper/Dockerfile; do
  [ -f "$f" ] || continue
  # 只替换形如 "FROM node:22-..." / "FROM debian:..." 这种 Docker Hub 官方镜像
  sed -i.bak -E "s#^(FROM[^A-Za-z]*)((node|debian|golang|alpine|ubuntu|nginx):)#\1${MIRROR}/\2#g" "$f"
  rm -f "$f.bak"
done

echo "==> 完成。当前 FROM 行："
grep -n '^FROM' upstream/backend/Dockerfile upstream/wrapper/Dockerfile

cat <<'EOF'

下一步：
  docker compose up -d --build
  docker logs alacarte-web 2>&1 | grep -i "setup token"
  # 浏览器打开 http://<你的IP>:8280

更新上游：
  ./scripts/fetch-upstream.sh && docker compose up -d --build
  （zh.js 语言包与上游解耦，更新后汉化自动保留；若有新英文界面文案，
    运行 node scripts/check-coverage.mjs 会列出未翻译项）
EOF
