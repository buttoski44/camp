import { createContext, useState } from "react"



export const ErrorContext = createContext();

export const ErrorContextProvider = ({ children }) => {
    const [error, serError] = useState(false);
    if (error)

        return <ErrorContext.Provider value={{ error }}>{children}</ErrorContext.Provider>
}