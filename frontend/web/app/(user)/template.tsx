"use client";
import { YStack } from "tamagui";
import React from 'react';
export default function ({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <YStack flex={1} display="flex">
            <YStack display='flex' flex={1}>
                {children}
            </YStack>
        </YStack>
    )
}