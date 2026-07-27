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
│   │   └── Base.astro         # 全ページ共通レイアウト（head・導入・ヘッダー・フッター）
│   ├── styles/
│   │   ├── global.css         # 全CSS（:root で色・フォントを一元管理）
│   │   └── FONT-LICENSE.md    # 同梱している毛筆体の出典とライセンス
│   └── scripts/
│       └── site.js            # メニュー・フォーム等の動き
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
| 動き（メニュー・フォーム等） | `src/scripts/site.js` |
| 画像 | `public/img/` に置き、`/img/ファイル名` で参照 |

色とフォントは `global.css` の `:root` にまとめてあります。
個別ページに色を直接書かず、必ず変数を参照してください。

#### オープニング演出について

サイトを開くと、縦組みで「木工舎」が毛筆で書かれる導入が入ります。

| 時刻 | 出来事 |
| --- | --- |
| 0.55s | 「木」を書き始める |
| 1.20s | 「工」 |
| 1.85s | 「舎」（画数が多いのでひと呼吸長く） |
| 2.55s | `MOKUKOU` が浮かぶ |
| **4.00s** | **本編へ移り始める** |
| 4.20s | 見出しが上から順に現れはじめる（2.1秒かけて下りる） |
| 5.60s | 添え書きが現れる |
| 4.76s | 導入が消えきる |

- 同じ滞在中は2回目以降表示されません（`sessionStorage`）
- 画面をタップ／クリックすると飛ばせます
- OSの「視差効果を減らす」設定が有効な場合は再生されません

**書体**は毛筆体の Yuji Syuku（佑字 肅）です。使うのは3文字だけなので、
その分だけ切り出して CSS に埋め込んであります（1.7KB）。
外部への通信が発生しないため、回線の状態にかかわらず必ず毛筆で表示されます。
詳細は `src/styles/FONT-LICENSE.md` を参照してください。

**速さを変える場合**は `src/styles/global.css` の以下を調整します。

| 変えたいもの | 場所 |
| --- | --- |
| 各文字の書き出し | `.op__ch:nth-child(n)` の `animation-delay` |
| 本編へ移る時刻 | `.op` の総尺（4.75s）× `@keyframes opRun` の割合（84%） |
| 見出しの出る速さ | `.hero__title` の `animation`（2.1s）と `animation-delay`（4.2s） |
| 添え書きの出る速さ | `.hero__sub` の `animation`（1.4s）と `animation-delay`（5.6s） |
| スクロール解除 | `src/scripts/site.js` の `setTimeout(unlock, 4800)` |

> **設計上の注意**
> `.op` は既定を `visibility: hidden` にしてあり、アニメーションが走って
> 初めて表示され、自ら消えます。逆（既定で表示し、アニメーションで消す）に
> すると、描画が遅れてアニメーションが始まらなかった場合に**画面が塞がれた
> まま復帰しません**。この向きは変更しないでください。

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

## ⚠️ 切り替えの途中です（旧サイトが残っています）

サイトの中身は **Astro（`src/`）へ移植済み**です。今後の編集は `src/` 側で行ってください。

ただし、ルート直下の `index.html` と `assets/` に**移植前の旧サイトが残っています**。
これは、現在この旧サイトが **GitHub Pages で公開稼働中**のためです。

`https://haruhisamiyake-stack.github.io/Hp-mokukou/`

Firebase へのデプロイがまだ行われていないため、いま旧サイトを削除すると
**公開中のURLが表示されなくなります**。そのため残してあります。

### 切り替えの手順

1. 下の「公開の準備」に従って Firebase を設定する
2. Actions から `preview` でデプロイし、表示を確認する
3. `live` でデプロイし、本番URLで表示を確認する
4. **確認できてから**、ルートの `index.html`・`assets/`・`.nojekyll` を削除する
5. GitHub Pages を停止する（Settings → Pages → Source を None に）

> 手順4まで、同じ内容が2か所に存在します。
> **編集は `src/` 側だけ**にしてください。ルート側を触ると差異が生まれます。
