interface ICharacterData {
    actor: string,
    alive: boolean,
    alternate_actors: string[],
    alternate_names: string[],
    ancestry: string,
    dateOfBirth: string,
    eyeColour: string,
    gender: string,
    hairColour: string,
    hogwartsStaff: boolean,
    hogwartsStudent: boolean,
    house: string,
    id: string,
    image: string,
    name: string,
    patronus: string,
    species: string,
    wand: { wood: string, core: string, length: number }
    wizard: boolean,
    yearOfBirth: number
}

interface IModalProps {
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    char: ICharacterData
}