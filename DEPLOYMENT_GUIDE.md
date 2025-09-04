# GitHub Pagesデプロイガイド

## 初期設定

### 1. GitHubリポジトリ設定
1. GitHubリポジトリの「Settings」タブに移動
2. 左サイドバーの「Pages」をクリック
3. 「Source」で「GitHub Actions」を選択
4. 変更を保存

### 2. リポジトリ名の確認
現在の設定では、リポジトリ名が「SNS」であることを前提としています。
リポジトリ名が異なる場合は、`next.config.mjs`の以下の部分を修正してください：

\`\`\`javascript
basePath: process.env.NODE_ENV === 'production' ? '/あなたのリポジトリ名' : '',
assetPrefix: process.env.NODE_ENV === 'production' ? '/あなたのリポジトリ名/' : '',
\`\`\`

## デプロイプロセス

### 自動デプロイ
- `main`ブランチにプッシュすると自動的にデプロイが開始されます
- GitHub Actionsが以下の処理を実行します：
  1. 依存関係のインストール
  2. Next.jsアプリケーションのビルド
  3. 静的ファイルの生成
  4. GitHub Pagesへのデプロイ

### 手動デプロイ
ローカルでビルドしてデプロイする場合：

\`\`\`bash
# 依存関係のインストール
npm install

# 本番用ビルド
npm run build

# 静的ファイルの確認
ls -la out/
\`\`\`

## トラブルシューティング

### よくある問題と解決方法

1. **404エラーが発生する場合**
   - `basePath`の設定を確認
   - リポジトリ名と設定が一致しているか確認

2. **CSSやJSファイルが読み込まれない場合**
   - `assetPrefix`の設定を確認
   - ブラウザの開発者ツールでネットワークエラーを確認

3. **画像が表示されない場合**
   - `next.config.mjs`で`images.unoptimized: true`が設定されているか確認
   - 画像パスが正しいか確認

### デバッグ方法

1. **ローカルでの確認**
   \`\`\`bash
   # 本番環境と同じ設定でローカル確認
   NODE_ENV=production npm run build
   npx serve out
   \`\`\`

2. **GitHub Actionsログの確認**
   - リポジトリの「Actions」タブでビルドログを確認
   - エラーメッセージを確認して問題を特定

## メンテナンス

### 定期的な更新
1. **依存関係の更新**
   \`\`\`bash
   npm update
   npm audit fix
   \`\`\`

2. **Next.jsの更新**
   \`\`\`bash
   npm install next@latest
   \`\`\`

### パフォーマンス最適化
1. **画像の最適化**
   - WebP形式の使用を検討
   - 適切なサイズでの画像提供

2. **バンドルサイズの確認**
   \`\`\`bash
   npm run build
   # ビルド結果でファイルサイズを確認
   \`\`\`

## セキュリティ

### 環境変数の管理
- 機密情報は環境変数として設定
- GitHub Secretsを使用してCI/CDで安全に管理

### 定期的なセキュリティ更新
\`\`\`bash
npm audit
npm audit fix
\`\`\`

## サポート

問題が発生した場合：
1. このガイドのトラブルシューティングセクションを確認
2. GitHub Actionsのログを確認
3. Next.js公式ドキュメントを参照
4. GitHubのIssuesで報告

---

**注意**: このアプリケーションは静的サイトとして生成されるため、サーバーサイド機能（API Routes、Server Actions等）は使用できません。
