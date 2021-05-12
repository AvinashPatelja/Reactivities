import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

interface Store {
    acvtivityStore: ActivityStore
}

export const store: Store = {
    acvtivityStore: new ActivityStore()
}

export const StoreContext= createContext(store);

export function useStore(){
    return useContext(StoreContext);
}