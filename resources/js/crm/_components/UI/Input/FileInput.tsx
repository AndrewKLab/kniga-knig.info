import React, { FunctionComponent, useEffect, useState } from "react";
import { FileOutlineIcon } from "../Icons";
import './index.css'
export interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    files?: string | null;
    setValue?: any;
}

export const FileInput: FunctionComponent<FileInputProps> = React.forwardRef(({ className, files, setValue, ...other }, ref) => {
    const [selectedFiles, setSelectedFiles] = useState(null);

    useEffect(()=>{
        setValue(other.name, files)
    },[])

    const onChange = (event) => {
        const files = event.target.files;
        setValue(other.name, files)
        let files_names = [];
        for (const file of files) {
            files_names.push(file.name)
        }
        setSelectedFiles(files_names.join(''))
    }
    return (
        <label htmlFor={other?.id} className={`text-input${className ? ` ${className}` : ''}`}>
            <span>
                <FileOutlineIcon size={28} />
                {selectedFiles ? selectedFiles : files ? files : other.placeholder ? other.placeholder : 'Выберите файлы...'}
                
            </span>
            <input type={'file'} ref={ref}  {...other} hidden onChange={onChange} />
        </label>

    )
})



