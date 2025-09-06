export const base = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "")

export function withBase(path: string): string {
  if (!path) return base === "" ? "/" : base
  const trimmedPath = path.replace(/^\//, "") // 先頭 / を削る
  return base === "" ? `/${trimmedPath}` : `${base}/${trimmedPath}`
}
