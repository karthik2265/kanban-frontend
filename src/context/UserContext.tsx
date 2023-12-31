import supabase from "@/supbaseClient";
import { ReactNode, createContext, useCallback, useMemo, useState, useEffect, useContext } from "react";
import { DataContext } from "./DataContext";
import BoardSupbaseStorageStrategy from "@/data/stratagies/BoardSupbaseStorageStrategy";
import migrateDataFromLocalStorageToSupbase from "@/data/migrateDataFromLocalStorageToSupbase";
import UserPreferencesSupbaseStorageStrategy from "@/data/stratagies/UserPreferencesSupbaseStorageStrategy";

const UserContext = createContext<{
  user: { id: string } | null;
  login: () => void;
  logout: () => void;
} | null>(null);

function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ id: string } | null>(null);
  const login = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "github" });
    if (error) {
      // TODO show notification
    }
  }, []);
  const logout = useCallback(() => {}, []);

  const { boardDataManager, userPreferencesDataManager } = useContext(DataContext)!;

  useEffect(() => {
    // Set the user immediately if already signed in
    supabase.auth.getSession().then(({ data, error }) => {
      if (data.session) {
        boardDataManager.setStrategy(new BoardSupbaseStorageStrategy());
        userPreferencesDataManager.setStrategy(new UserPreferencesSupbaseStorageStrategy());
        setUser({ id: data.session.user.id });
      }
      if (error) {
        // TODO show notification
      }
    });
    // Subscribe to auth changes
    const { data: authSubscription } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        // migrate data from localstorage
        await migrateDataFromLocalStorageToSupbase(session.user.id);
        boardDataManager.setStrategy(new BoardSupbaseStorageStrategy());
        userPreferencesDataManager.setStrategy(new UserPreferencesSupbaseStorageStrategy());
        setUser({ id: session.user.id });
      }
    });

    // Cleanup the subscription on unmount
    return () => {
      authSubscription.subscription.unsubscribe();
    };
  }, [boardDataManager, userPreferencesDataManager]);

  const providerValue = useMemo(() => {
    return {
      user,
      login,
      logout,
    };
  }, [login, logout, user]);

  return <UserContext.Provider value={providerValue}>{children}</UserContext.Provider>;
}

export { UserContextProvider, UserContext };
