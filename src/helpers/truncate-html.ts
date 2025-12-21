// lib/utils.ts または適切な場所に追加
export function truncateHtml(html: string, maxLength: number = 10): string {
  // HTMLタグを削除
  const text = html.replace(/<[^>]*>/g, "");

  // HTMLエンティティをデコード（&nbsp; など）
  const decoded = text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .trim();

  // 指定文字数で切り取り
  if (decoded.length <= maxLength) {
    return decoded;
  }

  return decoded.slice(0, maxLength) + "...";
}
