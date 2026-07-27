# 株式会社木工舎 コーポレートサイト

新築・リフォーム・リノベーションを手がける工務店「株式会社木工舎」のホームページです。
静的サイト（HTML / CSS / JavaScript）として構築しており、そのままGitHub Pages等で公開できます。

## 特徴

- 木の温もりを感じさせるアースカラーのデザイン
- スマートフォン対応のレスポンシブレイアウト
- 施工事例のカテゴリ絞り込み（新築 / リフォーム / リノベーション）
- スクロールに応じたアニメーション
- お問い合わせフォーム（フロントエンドのバリデーション付き）

## 更新手順（編集 → プレビュー → 公開）

### 1. 編集

| 変えたいもの | 開くファイル |
| --- | --- |
| 文言・掲載内容 | `index.html` |
| 色・字送り・レイアウト | `assets/css/style.css` |
| 動き（メニュー・フォーム等） | `assets/js/script.js` |

色と書体は `assets/css/style.css` 冒頭の `:root` にまとめてあります。
サイト全体の印象を変えるときは、まずここを見てください。

### 2. プレビュー（公開前に必ず確認）

VS Code の拡張機能 **Live Server** を使います。

1. 拡張機能「Live Server」をインストール
2. エクスプローラーで `index.html` を右クリック
3. **Open with Live Server** を選択

ブラウザが開き、保存するたび自動で再読み込みされます。
**表示が崩れていないこと**を確認してから次に進んでください。

> Live Server を使わず、`index.html` をブラウザに直接ドラッグしても表示できます。

### 3. 公開

`main` ブランチに push すると、GitHub Pages が自動で反映します（1〜2分）。

```bash
git add -A
git commit -m "変更内容を日本語で簡潔に"
git pull --rebase origin main
git push origin HEAD
```

公開URL: https://haruhisamiyake-stack.github.io/Hp-mokukou/

Firebase Hosting へ公開する場合は、後述の「Firebase Hosting へのデプロイ」を参照してください。

## ページ構成（1ページ完結・アンカーリンク）

| セクション | 内容 |
| --- | --- |
| オープニング | 毛筆で社名が書かれる導入（約3.3秒） |
| ヒーロー | 縦組みのキャッチコピーとメインビジュアル |
| 私たちについて | 会社の姿勢 |
| 木工舎の家づくり | 新築・建替え／リフォーム・増改築／内装・大工／屋根・外装・防水／設備／外構 |
| 木工舎にできること | 4つの強み |
| 施工事例 | 準備中（写真が揃い次第掲載） |
| 家づくりの流れ | ご相談〜お引き渡しの6ステップ |
| お客様の声 | 準備中 |
| 会社案内 | 登記情報にもとづく会社情報 |
| お問い合わせ | 電話・フォーム |

## ディレクトリ構成

```
.
├── index.html                      # トップページ（本体）
├── assets/
│   ├── css/style.css               # スタイル（:root に色・書体を集約）
│   ├── js/script.js                # スクリプト
│   ├── fonts/mokukou-fude.woff2    # 導入用の毛筆体（3文字のみ・1.7KB）
│   └── img/favicon.svg             # ファビコン
├── firebase.json                   # Firebase Hosting 設定（公開ディレクトリはルート）
├── .firebaserc                     # Firebase プロジェクトID
├── .github/workflows/              # Firebase への手動デプロイ用
├── .nojekyll                       # GitHub Pages の Jekyll 処理を無効化
├── CLAUDE.md                       # 設計方針と作業フロー
└── README.md
```

## ローカルでの確認

任意の静的サーバーで確認できます。

```bash
# Python が入っている場合
python3 -m http.server 8000
# → http://localhost:8000 を開く
```

## 公開（GitHub Pages）

現在の公開先は **GitHub Pages** です。`main` ブランチの内容がそのまま公開されます。

公開URL: `https://haruhisamiyake-stack.github.io/Hp-mokukou/`

### 初回のみ必要な設定

リポジトリの **Settings → Pages** で、**Source** を「Deploy from a branch」、
**Branch** を `main` / `/(root)` に設定して **Save**。（スマートフォンからでも操作できます）

以後は `main` に push するたびに、自動で公開内容が更新されます。

> `.nojekyll` を置いてあるため、GitHub Pages 側の Jekyll 処理は行われず、
> ファイルがそのまま配信されます。

## Firebase Hosting へのデプロイ（任意）

> 現在は GitHub Pages で公開しているため、このワークフローは**手動実行のみ**の設定です。
> 静的サイトのうちは Pages と見た目・速度は変わりません。
> フォームの実送信や問い合わせ管理など、サーバー側の処理が必要になった段階で移行してください。

このリポジトリは Firebase Hosting 用の設定と、GitHub Actions による自動デプロイを同梱しています。
PCがなくても、スマートフォンのブラウザだけで設定を完了できます。

### 事前準備（初回のみ）

1. **Firebase プロジェクトを作成**
   [console.firebase.google.com](https://console.firebase.google.com) でプロジェクトを作成し、
   **Hosting** を有効化します。

2. **サービスアカウントの鍵を取得**
   Firebase コンソール → ⚙️ **プロジェクトの設定** → **サービス アカウント** タブ →
   **新しい秘密鍵を生成** をタップ。JSONファイルがダウンロードされます。

3. **GitHub にシークレットを登録**
   リポジトリの **Settings → Secrets and variables → Actions** で以下を登録します。

   | 種別 | 名前 | 値 |
   | --- | --- | --- |
   | Secret | `FIREBASE_SERVICE_ACCOUNT` | 手順2のJSONファイルの中身**全文** |
   | Variable | `FIREBASE_PROJECT_ID` | Firebase のプロジェクトID |

4. **`.firebaserc` を更新**
   `REPLACE_WITH_YOUR_FIREBASE_PROJECT_ID` を実際のプロジェクトIDに書き換えます。

### デプロイ

- `main` ブランチに push すると自動でデプロイされます。
- 手動で実行したい場合は、GitHub の **Actions** タブ →
  「Deploy to Firebase Hosting」→ **Run workflow**（スマホからでも実行できます）。

公開URLは `https://<プロジェクトID>.web.app` です。

### CLI から手動でデプロイする場合

```bash
npm install -g firebase-tools
firebase login
firebase deploy --only hosting
```

> **補足**: 静的サイトのみであれば GitHub Pages でも公開できます
> （Settings → Pages → Source を `main` に設定するだけで、鍵の登録が不要）。
> Firebase は、今後フォームの送信処理やお問い合わせ管理などを
> 追加していく場合に適しています。

## 本番公開に向けたカスタマイズ

以下はサンプル値・プレースホルダーです。公開前に実際の情報へ差し替えてください。

### ① ヒーローの写真（最優先）

トップの背景は、現在CSSで描いた**様式化した夕景**です。実写真に差し替えると印象が大きく変わります。
`assets/img/hero.jpg` を置いて、`assets/css/style.css` の `.hero__photo` に一行加えるだけです。

```css
.hero__photo {
  background-image: url("../img/hero.jpg");
}
```

写真を入れると、下地のCSS描画（`.hero__art`）は自動的に隠れます。
逆光・夕景など、白い明朝体が乗る前提の落ち着いた一枚が合います。

### ② 未確定のため、掲載を保留している項目

以下は**事実が確認できていないため、あえて空にしてあります**。
実在企業のサイトに未確認の数値や実績を書くと、景品表示法上の優良誤認表示にあたるおそれがあります。
情報が確定してから追記してください。

| 項目 | 現在の状態 | 備考 |
| --- | --- | --- |
| 電話番号 | 「準備中」と表示 | `.tel__prep` を `.tel__no` に戻し、`href="tel:..."` を設定 |
| 建設業許可番号 | 掲載なし | 許可を取得している場合のみ、会社案内に行を追加 |
| 施工事例 | 「準備中」の案内 | 実際に手がけた物件のみ掲載 |
| お客様の声 | 「準備中」の案内 | 実在のご感想を、本人の許可を得たうえで掲載 |
| 実績数値 | 掲載なし | 施工棟数・満足度などは、集計の根拠がある場合のみ |

### ③ 施工事例の追加方法

`.works` / `.work` のスタイルは残してあるため、HTMLを差し戻すだけで掲載を再開できます。
`index.html` の施工事例セクション内の `<div class="prep">…</div>` を、以下の構造に置き換えてください。

```html
<ul class="works">
  <li class="work" data-cat="new">
    <div class="work__img"><span class="work__cat">新築</span></div>
    <h3 class="work__ttl">物件名</h3>
    <p class="work__meta">新築 ／ 4LDK</p>
  </li>
</ul>
```

写真は `.work__img` に `background-image` を指定します。
カテゴリ絞り込みを使う場合は、`.filter` のボタン群も合わせて戻してください
（JavaScript側の処理は残してあります）。

### ④ オープニング演出

サイトを開くと、縦組みで「木工舎」が毛筆で書かれるように現れます。

| 時刻 | 出来事 |
| --- | --- |
| 0.40s | 「木」を書き始める |
| 0.95s | 「工」 |
| 1.50s | 「舎」（画数が多いのでやや長い） |
| 2.05s | `MOKUKOU` が浮かぶ |
| 2.57s | 本編へ移り始める |
| 3.30s | 導入が消えきる |

- 同じ滞在中は2回目以降表示されません（`sessionStorage`）
- 画面をタップ／クリックすると飛ばせます
- OSの「視差効果を減らす」設定が有効な場合は再生されません

**書体**は毛筆体の Yuji Syuku（佑字 肅）です。使うのは3文字だけなので、
その分だけ切り出して CSS に埋め込んであります（1.7KB）。
外部への通信が発生しないため、回線の状態にかかわらず必ず毛筆で表示されます。
詳細は `assets/fonts/README.md` を参照してください。

**速さを変える場合**は `assets/css/style.css` の以下を調整します。

- 各文字の書き出し … `.op__ch:nth-child(n)` の `animation-delay`
- 本編へ移る時刻 …… `.op` の `animation` の総尺（3.35s）と
  `@keyframes opRun` の割合（78%）。総尺 × 78% が移行開始の時刻です
- 本文の立ち上がり … `.hero__title, .hero__sub` の `animation-delay`（2.85s）

> **設計上の注意**
> `.op` は既定を `visibility: hidden` にしてあり、アニメーションが走って
> 初めて表示され、自ら消えます。逆（既定で表示し、アニメーションで消す）に
> すると、描画が遅れてアニメーションが始まらなかった場合に**画面が塞がれた
> まま復帰しません**。この向きは変更しないでください。
>
> 同じ理由で、ウェブフォントは `rel="preload"` で読み込み、`<noscript>` 用の
> 読み込みは置いていません。フォントCDNが応答しないと描画が止まるためです。

### ⑤ その他

- **お知らせ**: ヒーロー下部の `.news` の日付・文言・リンク先
- **お問い合わせフォーム**: 現状はフロントエンドの入力チェックのみ。
  実際に送信するには、メール送信API（フォームサービス等）との連携が必要です

### デザインの構成

- **配色**: 墨 `#14120f` ／ 琥珀 `#be7f35` ／ 藍鼠 `#6e8497` ／ 絹 `#f4f2ee`
- **書体**: 見出しは明朝（Shippori Mincho）、本文はゴシック（Zen Kaku Gothic New）
- **縦組み**: ヒーローの見出しと各セクションのラベルを縦組みで統一

> フォント指定には、端末内蔵の明朝・ゴシックまでフォールバックを重ねてあります。
> 和文を持たない書体まで落ちると縦組みの字送りが崩れるため、この順序は変更しないでください。

## ライセンス

（社内利用を想定。必要に応じて記載してください）
