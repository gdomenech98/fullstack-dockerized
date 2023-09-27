`use client`
import { X } from '@tamagui/lucide-icons'
import {
    Button,
    Dialog,
    Unspaced,
    YStack,
    Text,
    XStack
} from 'tamagui'
import UIButton from '@uikit/Button';
import Input from '@uikit/Input';
import { theme } from '@themes/theme';
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import projectConfig from "../projectConfig.json";
import { useAppStore } from '@context/appStore';
import AuthApi from '@api/AuthApi';
import router from 'next/router';

const AuthDialog = ({ visible, onChange }) => {


    return (
        <>
            <Dialog
                modal
                open={visible}
                onOpenChange={onChange}
            >
                <Dialog.Portal>
                    <Dialog.Overlay
                        key="overlay"
                        animation="slow"
                        opacity={0.5}
                        enterStyle={{ opacity: 0 }}
                        exitStyle={{ opacity: 0 }}
                    />
                    <Dialog.Content
                        bordered
                        maxWidth="600px"
                        w="90%"
                        elevate
                        key="content"
                        animateOnly={['transform', 'opacity']}
                        animation={[
                            'quick',
                            {
                                opacity: {
                                    overshootClamping: true,
                                },
                            },
                        ]}
                        enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                        exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                        space
                    >
                        <Dialog.Title alignSelf='center' color={theme.text} fontSize={24} mb="10px">{(isLogin ? "Sign in" : "Sign up") + " for " + projectConfig?.companyName}</Dialog.Title>
                        <Unspaced>
                            <Dialog.Close asChild>
                                <Button
                                    position="absolute"
                                    backgroundColor="transparent"
                                    top="$3"
                                    right="$3"
                                    size="$2"
                                    circular
                                    icon={X}
                                />
                            </Dialog.Close>
                        </Unspaced>
                        
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog>
        </>
    )
}

export default AuthDialog;