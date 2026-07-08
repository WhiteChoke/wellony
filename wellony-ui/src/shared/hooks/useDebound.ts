import {useEffect, useState} from "react";

export default function useDebounce<T>(value: T, delay = 500) {
    const [deboundValue, setDeboundValue] = useState<T>(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDeboundValue(value);
        }, delay);

        return () => clearTimeout(timeout);
    }, [value,delay]);

    return deboundValue;
}
