import { useContext, createContext } from 'react';

interface DrawerContextData {
    openDrawer: () => void;
    closeDrawer: () => void;

}

const DrawerContext = createContext<DrawerContextData>({} as DrawerContextData);


export function DrawerProvider(){
    return;
}