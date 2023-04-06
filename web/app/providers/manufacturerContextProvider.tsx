import { createContext, useState, useMemo, Dispatch, SetStateAction, FC, memo } from 'react';

interface IContext {
    currentManufacturer: string
    setCurrentManufacturer: Dispatch<SetStateAction<string>>
}

export const ManufacturerContext = createContext<IContext>({} as IContext)

interface IProps {
    children: React.ReactNode
}

const ManufacturerContextProvider: FC<IProps> = memo(({children}) => {

    const [ currentManufacturer, setCurrentManufacturer ] = useState<string>('');

    const value = useMemo(() => ({
        currentManufacturer,
        setCurrentManufacturer
    }), [currentManufacturer])

    return(
        <ManufacturerContext.Provider value={value}>
            {children}
        </ManufacturerContext.Provider>
    )
})

export default ManufacturerContextProvider