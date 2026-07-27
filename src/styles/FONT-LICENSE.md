# 同梱フォントについて

## 導入で使用している毛筆体

オープニングで社名「木工舎」を表示するための毛筆体です。

- **書体**: Yuji Syuku（佑字 肅）
- **著作権**: Copyright 2021 The Yuji Project Authors
  （https://github.com/Kinutafontfactory/Yuji）
- **ライセンス**: SIL Open Font License 1.1 — https://scripts.sil.org/OFL
- **収録文字**: 「木」「工」「舎」の3文字のみ（1,688バイト）
- **組み込み方法**: `src/styles/global.css` の `@font-face` に data URI で埋め込み

### なぜ同梱しているか

この3文字しか使わないため、CDNから書体全体を読み込む必要がありません。
サブセット化して同梱することで、

- 追加の通信が発生しない（CSSに直接埋め込み）
- CDNが応答しない環境でも必ず毛筆体で表示される
- 書体が遅れて届いて表示が入れ替わる、いわゆる「ちらつき」が起きない

SIL Open Font License 1.1 はサブセット化と再配布を許諾しています。
書体名を変更していないため、`Reserved Font Name` の制約にも抵触しません。

### 差し替える場合

同じ Yuji プロジェクトには、より軽やかな **Yuji Mai（佑字 舞）**、
やや素朴な **Yuji Boku（佑字 木）** もあります。
書体を変える場合は、同様にサブセット化してから差し替えてください。
