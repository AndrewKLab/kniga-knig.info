import React, { FunctionComponent, useEffect, useState } from "react";
import { FileOutlineIcon } from "../Icons";
import './index.css'
import { Controller } from "react-hook-form";
export interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    files?: string | null;
    setValue?: any;
}

export const FileInput: FunctionComponent<FileInputProps> = React.forwardRef(({ control, className, files = null, setValue, ...other }, ref) => {
    const [selectedFiles, setSelectedFiles] = useState(null);

    const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        let target_files = event.target.files;

        let files_names = [];
        for (const file of target_files) {
            files_names.push(file.name)
        }

        setSelectedFiles(files_names.join(''))
    }

    return (
        <Controller
            control={control}
            defaultValue={files}
            name={other.name}
            render={({ field }) => (
                <label htmlFor={other?.id} className={`text-input${className ? ` ${className}` : ''}`}>
                    <span>
                        <FileOutlineIcon size={28} />
                        {selectedFiles ? selectedFiles : files ? files : other.placeholder ? other.placeholder : 'Выберите файлы...'}

                    </span>
                    <input
                        type={'file'}
                        className={`d-none`}
                        onChange={(e) => {
                            field.onChange({ target: { value: e.target.files, name: field.name } })
                            onInput(e)
                        }}
                        {...other}
                    />
                </label>)}
        />


    )
})



