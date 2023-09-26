'use client'
import React from "react";
import { TamaguiProvider } from "@tamagui/core";
import tamaguiConfig from '../tamagui.config';
import Loaders from '@components/Loaders'
import { useAppStore } from "@context/appStore";

export default function Template({ children }: { children: React.ReactNode }) {
    const session = useAppStore(state => state.session);
    const ready = session.ready

    return (
        <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
            {ready ? children : null}
            <Loaders />
        </TamaguiProvider>
    )
}