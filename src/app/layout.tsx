import type {Metadata} from "next";
import {ReactNode} from "react";
import Providers from "@/app/Providers";

export const metadata: Metadata = {
    title: "Z岛",
    description: "一个没有用户系统的真匿名论坛",
}

export default function RootLayout({children}: {
    children: ReactNode
}) {
    return (
        <html lang="zh-CN">
        <body suppressHydrationWarning>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    )
}
