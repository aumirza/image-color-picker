import React, { useEffect, useRef, useState } from 'react'

export const DragAndUpload = ({ uploadHandler }) => {

    const dropRef = useRef()
    const overlayRef = useRef()

    const [dragging, setDragging] = useState(false)

    const handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDragEnter = (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (e.target !== overlayRef.current) setDragging(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (e.target === overlayRef.current) setDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopImmediatePropagation()


        const { files } = e.dataTransfer

        setDragging(false)

        if (files?.length) uploadHandler(files[0])

    }

    useEffect(() => {
        dropRef.current.addEventListener('dragover', handleDragOver)
        dropRef.current.addEventListener('drop', handleDrop)
        dropRef.current.addEventListener('dragenter', handleDragEnter)
        dropRef.current.addEventListener('dragleave', handleDragLeave)

        return () => {
            dropRef.current.removeEventListener('dragover', handleDragOver)
            dropRef.current.removeEventListener('drop', handleDrop)
            dropRef.current.removeEventListener('dragenter', handleDragEnter)
            dropRef.current.removeEventListener('dragleave', handleDragLeave)
        }
    }, [])

    return (
        <div ref={dropRef} className="absolute z-10 h-full w-full p-3">
            {dragging ?
                <div ref={overlayRef} className="flex justify-center items-center h-full bg-black bg-opacity-20 border-2 border-dashed">
                    <span className='text-white text-4xl'>Drop Here</span>
                </div>
                : ''
            }
        </div>
    )
}
