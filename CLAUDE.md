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
- deploy はユーザーの指示があったときのみ、手元の `firebase` コマンドで実行する
  （preview チャンネル＝確認用の一時URL／`firebase deploy`＝本番）

---

## 現在の構成（事実の記録）

### 移植は完了。ただし切り替えの途中

サイトの中身は **Astro（`src/`）へ移植済み**です。**編集は必ず `src/` 側で行うこと。**

ルート直下の `index.html` と `assets/` には移植前の旧サイトが残っています。
Astro のビルド対象外ですが、**現在この旧サイトが GitHub Pages で公開稼働中**のため、
削除すると公開URLが表示されなくなります。Firebase へのデプロイを確認するまで残します。

`https://haruhisamiyake-stack.github.io/Hp-mokukou/`

切り替え手順は README の「切り替えの途中です」を参照。
手順が終わるまで同じ内容が2か所にあるため、**ルート側は触らないこと**。

### URL の形

`astro.config.mjs` で `build.format: 'file'`、`trailingSlash: 'never'` を指定しています。
`src/pages/about.astro` → `dist/about.html` が出力され、
`firebase.json` の `cleanUrls: true` により `/about` として配信されます。

### デプロイ

**自分のPCから手動で行います。** GitHub からの自動デプロイは廃止しました。
push しても公開はされません。

配信先は、既存プロジェクト **HP-project**（`hp-project-1c251`）の中に追加した
Hosting サイト **`hp-mokukou`** です（マルチサイト構成）。
`.firebaserc` がターゲット `mokukou` をこのサイトに紐づけ、
`firebase.json` の `hosting.target` がそれを指しています。

```bash
npm run build
firebase hosting:channel:deploy preview --only mokukou --expires 7d  # 確認用
firebase deploy --only hosting:mokukou                               # 本番
```

`firebase login` は **haruchan0405@gmail.com** で行うこと。
別アカウントだと HP-project が見えず失敗する。
