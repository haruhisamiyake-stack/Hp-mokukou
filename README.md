# 株式会社木工舎 ホームページ

[Astro](https://astro.build/) による静的サイトです。
ビルドすると `dist/` に静的HTMLが出力され、Firebase Hosting で公開します。
公開後の動作にサーバーは不要です。

## ディレクトリ構成

```
.
├── src/
│   ├── pages/
│   │   └── index.astro        # トップページ（/）
│   ├── layouts/
│   │   └── Base.astro         # 全ページ共通レイアウト（head・ヘッダー・フッター）
│   └── styles/
│       └── global.css         # 全CSS（:root で色・フォントを一元管理）
├── public/
│   └── img/                   # 画像置き場（/img/… で参照）
├── astro.config.mjs           # Astro 設定
├── firebase.json              # Firebase Hosting 設定（公開ディレクトリ dist）
├── .firebaserc                # Firebase プロジェクトID
├── .github/workflows/
│   └── deploy.yml             # デプロイ（手動実行・preview / live 選択）
├── package.json
├── CLAUDE.md                  # 設計方針と作業フロー
└── README.md
```

`src/pages/` に置いた `.astro` ファイルが、そのまま実URLのページになります。
例：`src/pages/company.astro` → `/company`

---

## 更新手順（編集 → プレビュー → コミット → デプロイ）

### 1. 編集

| 変えたいもの | 開くファイル |
| --- | --- |
| ページの中身 | `src/pages/*.astro` |
| ヘッダー・フッター・head | `src/layouts/Base.astro` |
| 色・フォント・全体のスタイル | `src/styles/global.css`（冒頭の `:root`） |
| 画像 | `public/img/` に置き、`/img/ファイル名` で参照 |

色とフォントは `global.css` の `:root` にまとめてあります。
個別ページに色を直接書かず、必ず変数を参照してください。

### 2. プレビュー

```bash
npm run dev
```

`http://localhost:4321` が開きます。保存すると自動で反映されます。

公開前には、本番と同じ状態でビルドが通ることも確認してください。

```bash
npm run build     # dist/ に出力。エラーが出ないこと
npm run preview   # dist/ の内容をローカルで確認
```

### 3. コミット

```bash
git add -A
git commit -m "変更内容を日本語で簡潔に"
git pull --rebase origin main
git push origin HEAD
```

### 4. デプロイ（GitHub Actions）

push しただけでは公開されません。手動で実行します。

1. GitHub の **Actions** タブを開く
2. 左から「**Deploy to Firebase Hosting**」を選ぶ
3. 「**Run workflow**」→ デプロイ先を選んで実行
   - **preview** … 確認用の一時URL（7日で失効）
   - **live** … 本番

初回は Secret / Variable の登録が必要です（後述）。

---

## 別のPCで作業を始めるとき

```bash
git clone https://github.com/haruhisamiyake-stack/Hp-mokukou.git
cd Hp-mokukou
npm install
npm run dev
```

`package-lock.json` をコミットしているため、`npm install` で同じ依存関係が入ります。
`node_modules/` と `dist/` は Git 管理外です（各PCで生成されます）。

作業前に `git pull` を忘れないでください。

---

## 公開の準備（初回のみ）

### 1. Firebase プロジェクトを作る

[Firebase コンソール](https://console.firebase.google.com) でプロジェクトを作成し、
**Hosting** を有効化します。作成後、プロジェクトIDを控えてください。

### 2. `.firebaserc` を更新

`REPLACE_WITH_YOUR_FIREBASE_PROJECT_ID` を実際のプロジェクトIDに書き換えます。

### 3. サービスアカウントの鍵を取得

Firebase コンソール → ⚙️ **プロジェクトの設定** → **サービス アカウント** →
**新しい秘密鍵を生成**。JSONファイルがダウンロードされます。

### 4. GitHub に登録

リポジトリの **Settings → Secrets and variables → Actions** で登録します。

| 種別 | 名前 | 値 |
| --- | --- | --- |
| Secret | `FIREBASE_SERVICE_ACCOUNT` | 手順3のJSONファイルの**中身全文** |
| Variable | `FIREBASE_PROJECT_ID` | Firebase のプロジェクトID |

これで Actions からデプロイできるようになります。

---

## ⚠️ リポジトリに旧サイトが残っています

ルート直下の `index.html` と `assets/` は、Astro 導入前に作られた旧サイトです。
**Astro のビルド対象外**（Astro が見るのは `src/` と `public/` のみ）ですが、
現在この旧サイトが **GitHub Pages で公開稼働中**です。

`https://haruhisamiyake-stack.github.io/Hp-mokukou/`

Astro 側を本番に切り替える際は、旧サイトを削除するか、内容を `src/` へ移すかを
決める必要があります。判断がついていないため、まだ削除していません。
