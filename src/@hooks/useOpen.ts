import {useState} from 'react';

interface Props<T> {
    initialState?: T,
}

const useOpen = <T>({initialState}: Props<T>) => {

    const [open, setOpen] = useState(false);

    const [values, setValues] = useState<T | null>(initialState || null);

    const [array, setArray] = useState<any[]>([initialState]);

    const onOpen = () => setOpen(!open);

    const onOpenValue = (value:T, change=false) => {
        if((value === values) && !change) return setValues(null);
        setValues(value);
    };

    const onOpenItems = (value: string) => {
        const isOpen = array.includes(value);
        if(isOpen) {
            const newOpen = array.filter(el => el !== value);
            setArray(newOpen);
        } else {
            setArray((state) => [...state, value])
        }
    };

    const onOpenItemsClear = () => {
        setArray([]);
    };

    return {
        setOpen,
        onOpen,
        open,
        values,
        onOpenValue,
        setValues,
        array,
        setArray,
        onOpenItems,
        onOpenItemsClear,
    }
};

export default useOpen;