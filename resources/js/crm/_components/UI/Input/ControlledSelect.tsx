import React, { FunctionComponent, useState } from "react";
import './index.css'
import Select from 'react-select'
import { Controller } from "react-hook-form";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    children?: React.ReactElement;
    className?: string;
    control: any;
    options: Array<object>;
    name: string;
    placeholder: string;
    defaultValue?: any;
}

export const ControlledSelect: FunctionComponent<SelectProps> = React.forwardRef(({ children, className, control, name, options, placeholder, defaultValue, ...other }, ref) => {
    return <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { value, onChange, onBlur, ref } }) => {
            return (
                <Select
                    ref={ref}
                    options={options}
                    className={`controled_select_input`}
                    classNamePrefix={`controled_select_input`}
                    noOptionsMessage={() => 'Ничего не найдено!'}
                    placeholder={placeholder}
                    value={options.find(c => c.value === value)}
                    onChange={val => onChange(val.value)}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 5,
                        colors: {
                            ...theme.colors,
                            primary25: 'rgba(var(--primary-color), .25)',
                            primary: 'rgba(var(--primary-color))',
                            neutral20: 'rgba(var(--border-color))',
                            neutral30: 'rgba(var(--border-color))',
                        },
                    })}
                />
            );
        }}
    />
})

