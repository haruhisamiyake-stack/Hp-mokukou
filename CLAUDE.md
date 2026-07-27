# 株式会社木工舎 ホームページ

## 設計方針
- Astro（SSG）による実URLの多ページ構成。出力は静的HTMLのみ（SSR・サーバー機能は使わない）
- ページ本文・共通レイアウト・CSSを分離して管理する
  （src/pages＝ページ、src/layouts/Base.astro＝共通枠、src/styles/global.css＝全CSS）
- 色・フォントは global.css の :root のCSS変数で一元管理する
- スマホ表示（レスポンシブ）に対応する
- 画像は public/img/ に置き、絶対パス（/img/…）で参照する
- 外部依存は Astro 本体と Google Fonts 程度にとどめる。React 等のUIフレームワークは導入しない
- ブログ・コラムを設ける場合は1記事=1ページ（実URL）とし、SEOメタ情報を必ず設定する

## 作業フロー（コミット運用）
- 変更を加えたら「npm run build」が通り、表示が壊れていないことを確認してから次へ進む
- 区切りのよいところで、指示を待たずに自動でコミット＆プッシュする：
  1. git add -A
  2. git commit（コミットメッセージは日本語で、変更内容を簡潔に1行。必要なら本文に箇条書き）
  3. git pull --rebase origin main
  4. git push origin HEAD
- コミットは小さくこまめに。main ブランチで直接作業・push（個人開発）
- コミット後は、何をどのコミットでpushしたかを日本語で短く報告する
- ⚠️ 破壊的操作（reset --hard / force push）は避け、取り消しは git revert を使う
  （複数PCでpullするため履歴を壊さない）
- deploy はユーザーの指示があったときのみ、GitHub Actions のワークフローで実行する
  （preview＝確認用の一時URL／live＝本番）

---

## 現在の構成（事実の記録）

### リポジトリに残っている旧サイト

ルート直下の `index.html` と `assets/` は、Astro 導入前に作られた旧サイトです。
**Astro のビルド対象には含まれません**（Astro が見るのは `src/` と `public/` のみ）。

現在この旧サイトが **GitHub Pages で公開稼働中**です。
`https://haruhisamiyake-stack.github.io/Hp-mokukou/`

Astro 側を本番にする際は、旧サイトの扱い（削除するか、内容を `src/` へ移すか）を
決める必要があります。**まだ決まっていないため、削除していません。**

### URL の形

`astro.config.mjs` で `build.format: 'file'`、`trailingSlash: 'never'` を指定しています。
`src/pages/about.astro` → `dist/about.html` が出力され、
`firebase.json` の `cleanUrls: true` により `/about` として配信されます。

### デプロイ

`.github/workflows/deploy.yml` の手動実行のみです。push では動きません。
実行には次の2つの登録が必要です（未登録だと失敗します）。

| 種別 | 名前 | 値 |
| --- | --- | --- |
| Secret | `FIREBASE_SERVICE_ACCOUNT` | サービスアカウントJSONの全文 |
| Variable | `FIREBASE_PROJECT_ID` | Firebase のプロジェクトID |

`.firebaserc` のプロジェクトIDも未設定のままです。
