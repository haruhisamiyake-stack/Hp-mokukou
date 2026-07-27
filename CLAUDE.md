# 株式会社木工舎 ホームページ

## 設計方針
- 単一HTMLファイル構成を維持する（CSS・JSも index.html 内に記述）
- 色・フォントは :root の CSS変数で一元管理する
- スマホ表示（レスポンシブ）に対応する
- 外部依存は Google Fonts 程度にとどめる
- React / Vite / npm パッケージ / ビルド工程は導入しない

## 作業フロー（コミット運用）
- 変更を加えたら **表示が壊れていないことを確認**してから次へ進む
  （このプロジェクトはビルド不要のため、public/index.html をブラウザで開き
   エラーなく表示されることを確認する）
- 区切りのよいところで、**指示を待たずに自動でコミット＆プッシュ**する：
  1. `git add -A`
  2. `git commit`（**コミットメッセージは日本語**で、変更内容を簡潔に1行。必要なら本文に箇条書き）
  3. `git pull --rebase origin main`
  4. `git push origin HEAD`
- コミットは**小さくこまめに**。`main` ブランチで直接作業・push（個人開発）。
- コミット後は、何をどのコミットでpushしたかを日本語で短く報告する。
- ⚠️ 破壊的操作（reset --hard / force push）は避け、取り消しは `git revert` を使う
  （複数PCでpullするため履歴を壊さない）
- deploy（firebase deploy）はユーザーの指示があったときのみ実行する

---

## 現在の構成（事実の記録）

> 上の「設計方針」は方針として記載されたものですが、**現時点のリポジトリは
> 一部が異なります**。作業前に必ずこちらを確認してください。
> 方針に合わせて作り替えるかどうかは、まだ決まっていません。

**このリポジトリには、性質の異なる2つのサイトが同居しています。**
どちらを触っているのか、作業前に必ず確認してください。

| | 場所 | 構成 | 配信 |
| --- | --- | --- | --- |
| **本番** | ルート `index.html` ＋ `assets/` | 3分割（HTML / CSS / JS） | GitHub Pages（稼働中） |
| **土台** | `public/index.html` | 単一HTMLファイル | Firebase Hosting（未デプロイ） |

上の「設計方針」に書かれた**単一HTMLファイル構成が当てはまるのは `public/` 側だけ**です。
本番のルート側は3分割で、方針とは異なります。作り替えるかどうかは未決定です。

| 項目 | 方針の記載 | 実態 |
| --- | --- | --- |
| ファイル構成 | 単一HTMLファイル | `public/` は該当。ルートは3分割 |
| 表示確認 | `public/index.html` を開く | 土台はそのとおり。本番はルートの `index.html` |
| 公開ディレクトリ | `public` | `firebase.json` は `"public": "public"`（方針どおり） |
| 公開先 | Firebase Hosting | **本番は GitHub Pages で稼働中**。Firebase は未デプロイ |

- 色・書体は両方とも `:root` に集約済み（方針どおり）
- レスポンシブ対応済み（方針どおり）
- React / Vite / npm / ビルド工程は不使用（方針どおり）
- 外部依存: 本番は Google Fonts のみ。`public/` は外部依存なし
  （導入用の毛筆体は `assets/fonts/` に同梱）

### ⚠️ deploy 時の注意

`firebase.json` の公開ディレクトリは `public` です。
このまま `firebase deploy` すると、**Firebase には「準備中」の仮ページが公開されます**。
本番の内容を Firebase で公開する場合は、事前に構成の整理が必要です。

GitHub Pages はルートを配信しているため、この設定の影響を受けません。
本番URL: `https://haruhisamiyake-stack.github.io/Hp-mokukou/`

GitHub Actions の Firebase ワークフローは**手動実行のみ**に設定されています
（鍵が未登録のため、自動実行すると失敗が記録されるため）。
