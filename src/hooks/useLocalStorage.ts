import {Dispatch, SetStateAction, useEffect, useState} from "react";

export default function useLocalStorage(key: string): [string, Dispatch<SetStateAction<string>>] {
    const [value, setValue] = useState('')
    useEffect(() => {
        if (typeof window === 'undefined') return
        const newValue = localStorage.getItem(key)
        if (newValue === null) return
        setValue(newValue)
    }, [key])
    useEffect(() => {
        if (typeof window === 'undefined') return
        if (value === '') localStorage.removeItem(key)
        else localStorage.setItem(key, value)
    }, [key, value])
    return [value, setValue]
}