import React, { FunctionComponent, useEffect, useRef } from "react";
import './index.css'
import { Editor } from '@tinymce/tinymce-react';


export interface TextEditorProps extends React.HTMLAttributes<HTMLDivElement> {
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;
    name?: string;
    setValue?: any;
    placeholder?: string;
    height?: number;
    defaultValue?: string|null;
}

export const TextEditor: FunctionComponent<TextEditorProps> = React.forwardRef(({ children, className, name, setValue, placeholder, height, defaultValue, ...other }, ref) => {
    const TextEditorRef = useRef(null);
    const onChange = (value) => setValue(name, value);

    useEffect(()=>{
        if(defaultValue && name) setValue(name, defaultValue);
    },[])

    return (
        <div className={`text-editor${className ? ` ${className}` : ''}`} {...other}>
            <Editor
                ref={ref}
                apiKey='kvyfuraf3a99zhvfy4cfdk1mkpw8lbgg9lfqfykdetrdd823'
                onInit={(evt, editor) => TextEditorRef.current = editor}
                initialValue={defaultValue}
                onEditorChange={onChange}
                init={{

                    placeholder: placeholder,
                    height: height,
                    font_family_formats: 'Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats; Montserrat=Montserrat',
                    font_size_formats: '8px 10px 12px 14px 16px 18px 24px 36px 48px',
                    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                    tinycomments_mode: 'embedded',
                    tinycomments_author: 'Author name',
                    toolbar_mode: 'sliding',
                    content_style: `body { font-family:Montserrat; text-align: justify; font-size:16px; color:${'currentTheme' === 'dark' ? '#fff' : 'rgb(34, 62, 84)'}; } p {text-align: justify;}`,
                    language: 'ru'
                }}
            />
            {children}
        </div>
    )
})