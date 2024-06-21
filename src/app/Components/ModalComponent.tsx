'use client'

import React, { useEffect, useState } from 'react'
import defaultImage from "@/app/assets/noimeg.png"

const ModalComponent = (props: IModalProps) => {
    const [image, setImage] = useState<string>();
    const [altNames, setAltNames] = useState<string>();
    const [isAlive, setIsAlive] = useState<string>();
    const [birth, setBirth] = useState<string>();
    const [wiz, setWiz] = useState<string>();

    useEffect(() => {
        if (props.char.alternate_names.length > 0) {
            setAltNames(props.char.alternate_names.join(", "))
        }

        if (props.char.image !== "") {
            setImage(props.char.image)
        } else {
            setImage(defaultImage.src)
        }

        if (props.char.alive === true) {
            setIsAlive("Yes")
        } else {
            setIsAlive("No")
        }

        if (props.char.wizard === true) {
            setWiz("Yes")
        } else {
            setWiz("No")
        }

        if (props.char.dateOfBirth) {
            let birthArr = props.char.dateOfBirth.split("-");

            setBirth(birthArr[1] + "/" + birthArr[0] + "/" + birthArr[2]);
        }
    }, [])

    return (
        <>
            <div className='fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-40'>
                <div className='z-10 absolute top-0 left-0 bottom-0 right-0 m-auto max-md:mx-10 max-w-[700px] max-h-[500px] rounded-3xl grid grid-rows-12 bg-slate-500'>
                    <div className='row-span-11 flex flex-col self-center'>
                        {image &&
                            <div className='flex justify-center mt-2'>
                                <img width={150} src={image} alt="Image Of Character" />
                            </div>
                        }
                        <p className='text-white text-center mt-2'>Name: {props.char.name}</p>
                        {
                            altNames &&
                            <p className='text-white text-center'>AKA: {altNames}</p>
                        }
                        {
                            props.char.actor &&
                            <p className='text-white text-center'>Actor: {props.char.actor}</p>
                        }
                        {
                            props.char.species &&
                            <p className='text-white text-center'>Species: {props.char.species[0].toUpperCase() + props.char.species.substring(1)}</p>
                        }
                        {
                            props.char.gender &&
                            <p className='text-white text-center'>Gender: {props.char.gender[0].toUpperCase() + props.char.gender.substring(1)}</p>
                        }
                        {
                            isAlive &&
                            <p className='text-white text-center'>Are They Alive?: {isAlive}</p>
                        }
                        {
                            birth &&
                            <p className='text-white text-center'>Birth Date: {birth}</p>
                        }
                        {
                            props.char.ancestry &&
                            <p className='text-white text-center'>Ancestry: {props.char.ancestry[0].toUpperCase() + props.char.ancestry.substring(1)}</p>
                        }
                        {
                            wiz &&
                            <p className='text-white text-center'>Are They a Wizard?: {wiz}</p>
                        }
                    </div>

                    <div className='row-span-1 flex justify-center'>
                        <p onClick={() => { props.setIsModalOpen(false) }} className='bg-red-500 w-20 h-[25px] rounded-full text-white text-center'>Close</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalComponent
