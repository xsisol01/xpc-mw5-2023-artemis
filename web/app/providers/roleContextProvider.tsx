import { useContext, createContext, useState, useMemo, Dispatch, SetStateAction } from 'react';


interface IContext {
    isAdmin: boolean
    setIsAdmin: Dispatch<SetStateAction<boolean>>
}

export const RoleContext = createContext<IContext>({} as IContext)

interface IProps {
    children: React.ReactNode
}

const RoleContextProvider: React.FC<IProps> = ({children}) => {

    const [ isAdmin, setIsAdmin ] = useState(false);

    const value = useMemo(() => ({
        isAdmin,
        setIsAdmin
    }), [isAdmin])

    return(
        <RoleContext.Provider value={value}>
            {children}
        </RoleContext.Provider>
    )
}

export default RoleContextProvider