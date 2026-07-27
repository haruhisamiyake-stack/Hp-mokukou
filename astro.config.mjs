// @ts-check
import { defineConfig } from 'astro/config';

// 出力は静的HTMLのみ。SSR・サーバー機能は使わない。
export default defineConfig({
  // 末尾スラッシュなしの実URL（/about）に揃える。
  // build.format: 'file' で /about.html を出力し、
  // firebase.json の cleanUrls: true が /about として配信する。
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
});
