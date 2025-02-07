import type {Metadata} from "next";
import {ReactNode} from "react";
import Providers from "@/app/Providers";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";

export const metadata: Metadata = {
    title: process.env.NEXT_PUBLIC_TITLE,
    description: process.env.NEXT_PUBLIC_DESCRIPTION
}

export default function RootLayout({children}: {
    children: ReactNode
}) {
    return (
        <html lang="zh-CN">
        <body>
        <AppRouterCacheProvider>
            <Providers>
                {children}
            </Providers>
        </AppRouterCacheProvider>
        </body>
        </html>
    )
}
