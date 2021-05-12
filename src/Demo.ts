export interface Duck {
    name: string,
    numleg: number,
    makeSound: (sound: string) => void;
}

const duck1 = {
    name: 'Huey',
    numleg: 2,
    makeSound: (sound: string) => console.log(sound)
}

const duck2 = {
    name: 'Luey',
    numleg: 2,
    makeSound: (sound: string) => console.log(sound)
}

//duck1.makeSound('Quack');
duck1.name='Duey'

export const ducks=[duck1,duck2];