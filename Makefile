# Minecraft Vibe Crafting - Makefile
# 開発とビルド用のコマンドを提供

.PHONY: help install check test serve build clean lint format

# デフォルトターゲット
help:
	@echo "Minecraft Vibe Crafting - 利用可能なコマンド:"
	@echo ""
	@echo "  make install    - 依存関係をインストール"
	@echo "  make check      - シンタックスチェック"
	@echo "  make test       - 全ファイルのテスト"
	@echo "  make serve      - 開発サーバーを起動"
	@echo "  make build      - プロダクション用ビルド"
	@echo "  make lint       - コードの静的解析"
	@echo "  make format     - コードフォーマット確認"
	@echo "  make clean      - 一時ファイルを削除"
	@echo "  make stats      - ファイル統計表示"
	@echo ""

# 依存関係のインストール
install:
	@echo "📦 依存関係をインストールしています..."
	@if ! command -v node >/dev/null 2>&1; then \
		echo "❌ Node.jsがインストールされていません。"; \
		echo "   https://nodejs.org/ からインストールしてください。"; \
		exit 1; \
	fi
	@if ! command -v npm >/dev/null 2>&1; then \
		echo "❌ npmが利用できません。"; \
		exit 1; \
	fi
	@echo "✅ Node.js環境が確認できました"
	@npm install
	@echo "✅ 依存関係のインストールが完了しました"

# シンタックスチェック
check:
	@echo "🔍 JavaScriptファイルのシンタックスチェック中..."
	@error_count=0; \
	for file in biomes.js player.js mining-game.js building-game.js survival-redstone-games.js mini-games-manager.js notifications.js ui.js main.js; do \
		if [ -f "$$file" ]; then \
			echo -n "  $$file: "; \
			if node -c "$$file" 2>/dev/null; then \
				echo "✅ OK"; \
			else \
				echo "❌ ERROR"; \
				error_count=$$((error_count + 1)); \
			fi; \
		else \
			echo "  $$file: ⚠️  ファイルが見つかりません"; \
		fi; \
	done; \
	if [ $$error_count -eq 0 ]; then \
		echo "✅ 全てのファイルのシンタックスチェックが通りました"; \
	else \
		echo "❌ $$error_count 個のファイルでエラーが見つかりました"; \
		exit 1; \
	fi

# テスト（シンタックス + 基本動作確認）
test: check
	@echo "🧪 基本機能テスト中..."
	@echo "  HTMLファイルの確認..."
	@if [ -f "index.html" ]; then \
		echo "  ✅ index.html が存在します"; \
	else \
		echo "  ❌ index.html が見つかりません"; \
		exit 1; \
	fi
	@echo "  CSSファイルの確認..."
	@if [ -f "minecraft-style.css" ]; then \
		echo "  ✅ minecraft-style.css が存在します"; \
	else \
		echo "  ❌ minecraft-style.css が見つかりません"; \
		exit 1; \
	fi
	@echo "  package.jsonの確認..."
	@if [ -f "package.json" ]; then \
		echo "  ✅ package.json が存在します"; \
	else \
		echo "  ❌ package.json が見つかりません"; \
		exit 1; \
	fi
	@echo "✅ 全ての基本テストが通りました"

# 開発サーバーの起動
serve:
	@echo "🚀 開発サーバーを起動しています..."
	@echo "   ブラウザで http://localhost:8080 にアクセスしてください"
	@echo "   サーバーを停止するには Ctrl+C を押してください"
	@echo ""
	@if command -v python3 >/dev/null 2>&1; then \
		echo "🐍 Python3サーバーを使用します"; \
		python3 -m http.server 8080; \
	elif command -v python >/dev/null 2>&1; then \
		echo "🐍 Pythonサーバーを使用します"; \
		python -m SimpleHTTPServer 8080; \
	elif command -v npx >/dev/null 2>&1; then \
		echo "📦 http-serverを使用します"; \
		npx http-server . -p 8080 -c-1; \
	elif command -v php >/dev/null 2>&1; then \
		echo "🐘 PHPサーバーを使用します"; \
		php -S localhost:8080; \
	else \
		echo "❌ 利用可能なHTTPサーバーが見つかりません"; \
		echo "   以下のいずれかをインストールしてください:"; \
		echo "   - Python3 (推奨)"; \
		echo "   - Node.js + npx"; \
		echo "   - PHP"; \
		exit 1; \
	fi

# プロダクション用ビルド
build:
	@echo "🏗️ プロダクション用ビルドを作成しています..."
	@mkdir -p dist
	@echo "  ファイルをコピーしています..."
	@cp index.html dist/
	@cp minecraft-style.css dist/
	@cp *.js dist/
	@cp package.json dist/
	@if [ -f "README.md" ]; then cp README.md dist/; fi
	@echo "✅ ビルドが完了しました (dist/ ディレクトリ)"

# コードの静的解析
lint:
	@echo "🔍 コードの静的解析中..."
	@echo "  ファイルサイズチェック..."
	@for file in *.js; do \
		if [ -f "$$file" ]; then \
			lines=$$(wc -l < "$$file"); \
			if [ $$lines -gt 400 ]; then \
				echo "  ⚠️  $$file: $$lines行 (400行を超えています)"; \
			else \
				echo "  ✅ $$file: $$lines行"; \
			fi; \
		fi; \
	done
	@echo "  ES Module構文チェック..."
	@for file in *.js; do \
		if [ -f "$$file" ] && [ "$$file" != "script.js" ]; then \
			if grep -q "^export\|^import" "$$file"; then \
				echo "  ✅ $$file: ES Module構文を使用"; \
			else \
				echo "  ⚠️  $$file: ES Module構文が見つかりません"; \
			fi; \
		fi; \
	done

# コードフォーマット確認
format:
	@echo "📝 コードフォーマット確認..."
	@echo "  インデント確認..."
	@for file in *.js; do \
		if [ -f "$$file" ]; then \
			tab_count=$$(grep -c "	" "$$file" || true); \
			space_count=$$(grep -c "^    " "$$file" || true); \
			if [ $$tab_count -gt 0 ] && [ $$space_count -gt 0 ]; then \
				echo "  ⚠️  $$file: タブとスペースが混在しています"; \
			elif [ $$tab_count -gt 0 ]; then \
				echo "  ✅ $$file: タブインデント"; \
			elif [ $$space_count -gt 0 ]; then \
				echo "  ✅ $$file: スペースインデント"; \
			else \
				echo "  ℹ️  $$file: インデントなし"; \
			fi; \
		fi; \
	done

# 一時ファイルの削除
clean:
	@echo "🧹 一時ファイルを削除しています..."
	@rm -rf dist/
	@rm -rf node_modules/
	@rm -f package-lock.json
	@rm -f *.log
	@rm -f *~
	@rm -f *.backup
	@echo "✅ クリーンアップが完了しました"

# ファイル統計表示
stats:
	@echo "📊 プロジェクト統計:"
	@echo ""
	@echo "  📁 ファイル数:"
	@echo "    JavaScript: $$(ls -1 *.js 2>/dev/null | wc -l | tr -d ' ')"
	@echo "    HTML: $$(ls -1 *.html 2>/dev/null | wc -l | tr -d ' ')"
	@echo "    CSS: $$(ls -1 *.css 2>/dev/null | wc -l | tr -d ' ')"
	@echo ""
	@echo "  📏 コード行数:"
	@if ls *.js >/dev/null 2>&1; then \
		total_lines=$$(cat *.js | wc -l | tr -d ' '); \
		echo "    JavaScript: $$total_lines行"; \
	fi
	@if ls *.html >/dev/null 2>&1; then \
		html_lines=$$(cat *.html | wc -l | tr -d ' '); \
		echo "    HTML: $$html_lines行"; \
	fi
	@if ls *.css >/dev/null 2>&1; then \
		css_lines=$$(cat *.css | wc -l | tr -d ' '); \
		echo "    CSS: $$css_lines行"; \
	fi
	@echo ""
	@echo "  📦 モジュール詳細:"
	@for file in *.js; do \
		if [ -f "$$file" ]; then \
			lines=$$(wc -l < "$$file"); \
			size=$$(wc -c < "$$file"); \
			size_kb=$$((size / 1024)); \
			echo "    $$file: $$lines行, $${size_kb}KB"; \
		fi; \
	done

# 開発用クイックスタート
dev: check serve

# デプロイ前チェック
deploy-check: test lint
	@echo "🚀 デプロイ前チェック完了"
	@echo "   全ての検証が通りました"
