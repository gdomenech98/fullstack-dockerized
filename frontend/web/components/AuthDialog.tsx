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
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>("");
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const { setSession } = useAppStore();

    const onLogin = async () => {
        let credentials: any = { email, password };
        try {
            const user = await AuthApi.login(credentials);
            return user
        } catch (e) {
            alert('Auth failed')
            //   setError({ type: 'wrongCredentials', message: 'Invalid credentials' })
        }
    }

    const onRegister = async () => {
        let credentials: any = { email, password };
        try {
            await AuthApi.register(credentials);
            try {
                const user = await AuthApi.login(credentials);
                return user
            } catch (e) {
                alert('Register error')
                // setError({ type: 'registerError', message: "Error during register, try it again!" })
            }
        } catch (e) {
            alert('Register error: email already exsit')
            // setError({ type: 'emailExist', message: "The email was already registered" })
        }
    }

    const onSignPress = async () => {
        const user = isLogin ? await onLogin() : await onRegister();
        if(!user) return
        setSession(user);
        onChange(false)
    }

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
                        <YStack display="flex" flex={1} width="100%" maxWidth="400px" alignSelf="center" >
                            <UIButton
                                icon={<Image alt="googleLogo" src="/images/google_logo.png" width={25} height={25} />}
                                bc="white"
                                variant="outlined"
                                color="black"
                                borderColor="black"
                                fontWeight="600"
                                hoverStyle={{
                                    backgroundColor: 'white',
                                    borderColor: "black",
                                    elevation: 20
                                }}
                            >Continue with Google</UIButton>
                            <Text my={20} fontSize={14} color={theme.secondaryText} textAlign='center'>or</Text>
                            <Input
                                mb="20px"
                                placeholder="Email"
                                onChangeText={(text) => setEmail(text)}
                            />
                            <Input
                                placeholder="Password"
                                secureTextEntry={true}
                                onChangeText={(text) => setPassword(text)}
                            />
                            <UIButton
                                mt="30px"
                                mb="20px"
                                onPress={onSignPress}
                            >
                                {isLogin ? "Log in" : "Create account"}
                            </UIButton>
                            {
                                isLogin ?
                                    <Text textAlign='center' mb={15} fontSize={14} hoverStyle={{ cursor: 'pointer', textDecorationLine: "underline" }}>Reset password</Text>
                                    : <Text fontSize={11} color={theme.secondaryText} mb={15} maxWidth={300} textAlign='center' alignSelf='center'>
                                        By clicking "Create account" or "Continue with Google", you agree to the
                                        <Text pl="4px" hoverStyle={{ cursor: 'pointer' }}>{projectConfig?.companyName + " TOS"}</Text> and <Text hoverStyle={{ cursor: 'pointer' }}>Privacy Policy</Text>.
                                    </Text>
                            }
                            <XStack alignSelf="center">
                                <Text fontSize={14} color={theme.secondaryText}>{isLogin ? "No account?" : "Already have an account?"}</Text>
                                <Text
                                    onPress={() => setIsLogin(!isLogin)}
                                    pl="4px"
                                    fontSize={14}
                                    hoverStyle={{
                                        textDecorationLine: 'underline',
                                        cursor: 'pointer'
                                    }}>{isLogin ? "Create one" : "Log in"} </Text>
                            </XStack>
                        </YStack>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog>
        </>
    )
}

export default AuthDialog;