'use client'

import React from 'react'

const ModalComponent = (props: IModalProps) => {
    return (
        <>
            <div className='fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-20'>
                <div className='z-10 absolute top-0 left-0 bottom-0 right-0 m-auto max-md:mx-10 max-w-[700px] max-h-[380px] bg-slate-500'>
                    <div>
                        <p className='text-white text-center'>{props.char.name}</p>
                        <p className='text-white text-center'>{props.char.actor}</p>
                        <p className='text-white text-center'>{props.char.species}</p>
                        <p className='text-white text-center'>{props.char.gender}</p>
                        <p className='text-white text-center'>{props.char.wizard}</p>
                    </div>

                    <div>
                        <p onClick={() => props.setIsModalOpen(false)} className=' text-red-300 text-center'>Close</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalComponent
