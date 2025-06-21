#!/bin/bash

# Minecraft Vibe Crafting - 開発サーバー起動スクリプト
# ES Modules対応のローカルサーバーを起動します

echo "🚀 Minecraft Vibe Crafting 開発サーバー"
echo "=================================="

# ポート設定
PORT=${1:-8080}

echo "📦 サーバー起動中... (ポート: $PORT)"
echo ""

# 利用可能なサーバーを順番に試す
if command -v python3 >/dev/null 2>&1; then
    echo "🐍 Python3 HTTPサーバーを使用"
    echo "   アクセス: http://localhost:$PORT"
    echo "   停止: Ctrl+C"
    echo ""
    python3 -m http.server $PORT
elif command -v python >/dev/null 2>&1; then
    echo "🐍 Python HTTPサーバーを使用"
    echo "   アクセス: http://localhost:$PORT"
    echo "   停止: Ctrl+C"
    echo ""
    python -m SimpleHTTPServer $PORT
elif command -v node >/dev/null 2>&1; then
    echo "📦 Node.js http-serverを使用"
    echo "   アクセス: http://localhost:$PORT"
    echo "   停止: Ctrl+C"
    echo ""
    npx http-server . -p $PORT -c-1 --cors
elif command -v php >/dev/null 2>&1; then
    echo "🐘 PHP内蔵サーバーを使用"
    echo "   アクセス: http://localhost:$PORT"
    echo "   停止: Ctrl+C"
    echo ""
    php -S localhost:$PORT
else
    echo "❌ 利用可能なHTTPサーバーが見つかりません"
    echo ""
    echo "以下のいずれかをインストールしてください:"
    echo "  • Python3 (推奨): https://python.org"
    echo "  • Node.js: https://nodejs.org"
    echo "  • PHP: https://php.net"
    echo ""
    echo "または、任意のHTTPサーバーでこのディレクトリを公開してください。"
    exit 1
fi
