import { createContext } from "react";

export const FirebaseContext = createContext({loading: false, notes: [], fetchNotes: ()=>null, addNote: () => null, removeNote: () => null})