import { create } from "zustand";
import { produce } from "immer";
import User from "@models/User";

type Session = {
    userInfo: User,
    loggedIn: boolean,
    ready: boolean,
}

type AppStoreData = {
    session: Session,
    setSession: Function,
    loadSession: Function,
    logout: Function,
    progress: number,
    stepProgress: Function,
}

const MAX_PROGRESS = 100;
const MIN_PROGRESS = 0;
const STEPS = 3;
const DELTA = MAX_PROGRESS / (STEPS - 1);

export const useAppStore = create<AppStoreData>((set, get) => ({
    session: {
        userInfo: User.getGuestUser(),
        loggedIn: false,
        ready: false
    },
    setSession: async (user: User) => {
        if (!user) user = User.getGuestUser();
        set(produce((draft: AppStoreData) => {
            draft.session = {
                userInfo: user,
                ready: true,
                loggedIn: !!user.email,
            }
        }));
        localStorage.setItem("user", JSON.stringify(user))
    },
    loadSession: () => {
        const currentUserInfo: any = JSON.parse(localStorage.getItem("user"));
        const user = currentUserInfo ? User.load(currentUserInfo): User.getGuestUser();
        get().setSession(user);
    },
    logout: async () => {
        localStorage.removeItem("user");
        set(produce((draft: AppStoreData) => {
            let user = User.getGuestUser();
            draft.session = {
                loggedIn: false,
                userInfo: user,
                ready: true
            };
        }))
    },
    progress: MIN_PROGRESS,
    stepProgress: (step: number) => set(produce((draft: AppStoreData) => {
        draft.progress = step * DELTA
    }))
}));