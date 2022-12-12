import React, { FunctionComponent, useState, useCallback } from "react";
import { useDropzone } from 'react-dropzone';
import Cropper from 'react-easy-crop'
import { getCroppedImg } from "../../_helpers";

import { Button, Image } from "../UI";
import './index.css'


export interface ImageDropzoneProps extends React.HTMLAttributes<HTMLDivElement> {
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;
    name?: string;
    setValue?: any;
    defaultValue?: string;
}

export const ImageDropzone: FunctionComponent<ImageDropzoneProps> = React.forwardRef(({ children, className, name, setValue, defaultValue, ...other }, ref) => {

    const [imageState, setImageState] = useState(defaultValue ? 'ready' : 'empty')

    const [imageSrc, setImageSrc] = useState(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState(null)

    const onDrop = useCallback(acceptedFile => {
        let file = acceptedFile[0];
        onFileChange(file)
        setImageState('edit')
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            'image/png': ['.png', '.jpg', '.jpeg', '.webp', '.bmp'],
        }
    })

    function readFile(file) {
        return new Promise((resolve) => {
            const reader = new FileReader()
            reader.addEventListener('load', () => { resolve(reader.result) }, false)
            reader.readAsDataURL(file)
        })
    }

    const onFileChange = async (file) => {
        let imageDataUrl = await readFile(file)
        setImageSrc(imageDataUrl)
    }

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                imageSrc,
                croppedAreaPixels
            )

            const dataTransfer = new DataTransfer()
            dataTransfer.items.add(croppedImage)

            setValue(name, dataTransfer.files)

            let imageURL = URL.createObjectURL(croppedImage);
            setCroppedImage(imageURL)
            setImageState('ready')
        } catch (e) {
            console.error(e)
        }
    }, [imageSrc, croppedAreaPixels])

    const clearDropzone = () => {
        setImageSrc(null)
        setImageState(defaultValue ? 'ready' : 'empty')
    }

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    return (
        <div className={`courses_constructor_page_dropzone_container`}>
            <div className={`courses_constructor_page_dropzone`} {...getRootProps()}>
                {imageState === 'empty' && <p>Перетащите изображение сюда или нажмите, чтобы выбрать.</p>}
                {imageState === 'edit' && <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={16 / 9}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />}
                {imageState === 'ready' && croppedImage && <img className={`courses_constructor_page_dropzone_ready_image`} src={croppedImage} />}
                {imageState === 'ready' && !croppedImage && defaultValue && <Image className={`courses_constructor_page_dropzone_ready_image`} src={`courses/${defaultValue}`} />}
                <input disabled={imageState === 'edit'} {...getInputProps()} />
                <input ref={ref} id={name} className={`d-none`} type={`text`} defaultValue={defaultValue}/>
            </div>
            {imageState === 'edit' && <div className={`courses_constructor_page_image_actions`} >
                <Button color={`primary`} onClick={showCroppedImage}>Применить</Button>
                <Button onClick={clearDropzone}>Отмена</Button>
            </div>}
        </div>
    )
})