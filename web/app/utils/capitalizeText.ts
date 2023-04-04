

export const capitalizeText = (text: string): string => {
    return (text && text?.length > 0)
        ? text?.charAt(0).toUpperCase() + text?.slice(1)
        : ''
}