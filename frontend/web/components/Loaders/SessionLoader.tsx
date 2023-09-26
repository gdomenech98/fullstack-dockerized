import { useAppStore } from '@context/appStore';
import React, { useEffect } from 'react';


const SessionLoader = () => {
    const loadSession = useAppStore(state => state.loadSession)
    useEffect(() => {
        loadSession();
    }, [])
    return <></>
}

export default SessionLoader;