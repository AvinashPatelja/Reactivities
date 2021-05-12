import React from 'react'
import { Duck } from './Demo'

interface Props {
    duck: Duck;
}

export default function DuckItem({ duck }: Props) {
    return (
        <div>
            <span>{duck.name}</span>
            <button onClick={() => duck.makeSound(duck.name + ' Quack')}>Make Sound</button>
        </div>
    )
}