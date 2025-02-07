import {Dispatch, SetStateAction, useEffect, useState} from "react";

export default function useLocalStorage(key: string): [string, Dispatch<SetStateAction<string>>] {
    const [value, setValue] = useState(typeof window === 'undefined' ? '' : window.localStorage.getItem(key) ?? '')
    useEffect(() => {
        if (typeof window === 'undefined') return
        if (value === '') window.localStorage.removeItem(key)
        else window.localStorage.setItem(key, value)
    }, [key, value])
    return [value, setValue]
}