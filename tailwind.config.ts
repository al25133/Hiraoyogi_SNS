import type { Config } from "tailwindcss"

const config: Config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
        colors: {
            header: "#3b843dff", // 好きな色
        },
        },
    },
    plugins: [],
}

export default config
