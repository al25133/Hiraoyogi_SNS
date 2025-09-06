// utils/withBase.ts
// NEXT_PUBLIC_BASE_PATH を安全に結合するユーティリティ

export const base = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "")

/**
 * withBase("/logo.png") -> "/logo.png" (ローカル)
 * withBase("/logo.png") -> "/StarRe/logo.png" (本番: NEXT_PUBLIC_BASE_PATH=/StarRe)
 */
export function withBase(path: string): string {
  if (!path) return base === "" ? "/" : base
  const trimmedPath = path.replace(/^\//, "") // 先頭 / を削る
  return base === "" ? `/${trimmedPath}` : `${base}/${trimmedPath}`
}
