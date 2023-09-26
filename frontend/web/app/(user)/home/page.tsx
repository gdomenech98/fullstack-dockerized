'use client'
import React, { useEffect, useState } from 'react'
import { PortalProvider, YStack } from 'tamagui'
import { useRouter } from 'next/navigation';
import { useAppStore } from '@context/appStore';
import AuthDialog from '@components/AuthDialog';

export default function Home() {
    const router = useRouter();
    const session = useAppStore(state => state.session);
    const currentUser = session.userInfo;

    const [authDialogVisible, setAuthDialogVisible] = useState<boolean>(true);
    return (
        <PortalProvider>
            <YStack display="flex" flex="1">
                <AuthDialog visible={authDialogVisible} onChange={(state) => setAuthDialogVisible(state)} />
            </YStack>
        </PortalProvider>
    )
}

