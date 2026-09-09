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
├── .firebaserc                # Firebase プロジェクトID・配信先サイト
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
| 4.20s | 見出しが上から順に現れはじめる |
| 4.76s | 導入が消えきる |
| 6.50s | 添え書きが現れる |
| 7.80s | 見出しが下りきる |
| 8.10s | 添え書きが出そろう |

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
| 見出しの出る速さ | `.hero__title` の `animation`（3.6s）と `animation-delay`（4.2s） |
| 添え書きの出る速さ | `.hero__sub` の `animation`（1.6s）と `animation-delay`（6.5s） |
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

### 4. デプロイ（自分のPCから手動）

push しただけでは公開されません。手元で `firebase` コマンドを実行します。

```bash
npm run build                                   # dist/ を作り直す

# 確認用の一時URL（7日で失効）に出す
firebase hosting:channel:deploy preview --only mokukou --expires 7d

# 問題なければ本番へ
firebase deploy --only hosting:mokukou
```

初回のみ `npm install -g firebase-tools` と `firebase login` が必要です。
ログインは **haruchan0405@gmail.com**（HP-project の所有者）で行ってください。

> 何が公開されるか事前に見たいときは `--dry-run` を付けて実行します。

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

### 1. Firebase の配信先（設定済み）

既存プロジェクト **HP-project**（`hp-project-1c251`）の中に、
このサイト専用の Hosting サイト **`hp-mokukou`** を追加してあります。
1つのプロジェクトで複数サイトを持つ、Firebase の「マルチサイト」構成です。

| ファイル | 役割 |
| --- | --- |
| `.firebaserc` | プロジェクト `hp-project-1c251` と、ターゲット `mokukou` → サイト `hp-mokukou` の対応 |
| `firebase.json` | `hosting.target: "mokukou"` で、上のターゲットへ配信 |

プロジェクトIDもサイトIDもリポジトリに入っているため、書き換えは不要です。

### 2. Firebase CLI を用意する

```bash
npm install -g firebase-tools
firebase login          # haruchan0405@gmail.com でログイン
firebase projects:list  # hp-project-1c251 が見えれば準備完了
```

デプロイはこのログインの権限で行います。
GitHub 側にサービスアカウントの鍵を置く必要はありません。

---

## 🔒 検索結果に出さない設定にしています（公開準備中）

電話番号や施工写真が揃うまで、Googleなどの検索結果に出ないようにしてあります。
**URLを知っている人は普通に閲覧できます。** 検索でたどり着けないだけです。

| 場所 | 設定 |
| --- | --- |
| 全ページの `<head>` | `<meta name="robots" content="noindex, nofollow">` |
| Firebase のHTTPヘッダー | `X-Robots-Tag: noindex, nofollow` |
| 旧サイト（GitHub Pages） | `index.html` に同じ `meta` 指定 |

> ⚠️ **`robots.txt` に `Disallow: /` と書いてはいけません。**
> クロールを止めると `noindex` を読んでもらえず、かえって検索結果に
> URL が残り続けます。「読みに来てもらったうえで、載せないでと伝える」のが正しい形です。

### 公開してよくなったら

1. `src/layouts/Base.astro` の `noindex` を `false` にする
2. `firebase.json` の `X-Robots-Tag` の項目を削除する
3. 旧サイトを削除済みでなければ、`index.html` の `meta` も外す
4. `public/robots.txt` の説明書きを整理する

反映には数日〜数週間かかります。急ぐ場合は Google Search Console から
サイトを登録し、削除をリクエストしてください。

## ⚠️ 旧サイトが残っています（片付け待ち）

サイトの中身は **Astro（`src/`）へ移植済み**です。今後の編集は `src/` 側で行ってください。

ただし、ルート直下の `index.html` と `assets/` に**移植前の旧サイトが残っています**。
これは、現在この旧サイトが **GitHub Pages で公開稼働中**のためです。

`https://haruhisamiyake-stack.github.io/Hp-mokukou/`

**配信先は HP-project 配下の Hosting サイト `hp-mokukou` です。**

| URL | 中身 | 配信元 |
| --- | --- | --- |
| **https://hp-mokukou.web.app** | 新（Astro） | Firebase（HP-project 内のサイト `hp-mokukou`） |
| https://haruhisamiyake-stack.github.io/Hp-mokukou/ | 旧（移植前） | GitHub Pages |

### 残っている片付け

1. ルートの `index.html`・`assets/`・`.nojekyll` を削除する
2. GitHub Pages を停止する（Settings → Pages → Source を None に）

> 片付けが終わるまで、同じ内容が2か所で公開されています。
> **編集は `src/` 側だけ**にしてください。旧サイト側は更新されません。
