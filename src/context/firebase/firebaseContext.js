import { createContext } from "react";

export const FirebaseContext = createContext({loading: true, notes: [], fetchNotes: ()=>null, addNote: () => null, removeNote: () => null})