import { createContext, useState, useMemo, Dispatch, SetStateAction, FC, memo } from 'react';


interface IContext {
    isAdmin: boolean
    setIsAdmin: Dispatch<SetStateAction<boolean>>
}

export const RoleContext = createContext<IContext>({} as IContext)

interface IProps {
    children: React.ReactNode
}

const RoleContextProvider: FC<IProps> = memo(({children}) => {

    const [ isAdmin, setIsAdmin ] = useState(false);

    const value = useMemo(() => ({
        isAdmin,
        setIsAdmin
    }), [isAdmin])

    console.log('RoleContextProvider', isAdmin)


    return(
        <RoleContext.Provider value={value}>
            {children}
        </RoleContext.Provider>
    )
})

export default RoleContextProvider