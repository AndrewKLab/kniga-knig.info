

import React, { FunctionComponent } from "react";
import './index.css';
import { Button } from "../UI/Button/Button";

// const client = new ClientService({
//     privateKey: 'private key',
//     publicId: 'pk_c7e901dc17201762a41e6c5e5beb6',
//     org: {
//         taxationSystem: TaxationSystem.GENERAL,
//         inn: 123456789
//     }
// });

export interface DonateButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children?: React.ReactElement | React.ReactNode;
    className?: string;
    loading?: boolean;
}

export const DonateButton: FunctionComponent<DonateButtonProps> = ({ children, className, loading, ...other }) => {
    const pay = () => {
        var widget = new cp.CloudPayments();

        var data = { //данные дарителя
            name: document.getElementById('name-sample-4')?.value,
            lastName: document.getElementById('lastName-sample-4')?.value,
            phone: document.getElementById('phone-sample-4')?.value
        };
    
        var auto = document.getElementById('recurrent-sample-4')?.checked //проверка
    
        if (auto) { //включаем подписку
            data.CloudPayments = {
                recurrent: { interval: 'Month', period: 1 } //один раз в месяц начиная со следующего месяца
            }
        }
    
        var amount = parseFloat(document.getElementById('amount-sample-4')?.value);
        var accountId = document.getElementById('email-sample-4')?.value;
    
        widget.charge({ // options
            publicId: 'pk_c7e901dc17201762a41e6c5e5beb6', //id из личного кабинета
            description: 'Пожертвование в фонд ...', //назначение
            amount: amount, //сумма
            currency: 'RUB', //валюта
            accountId: accountId, //идентификатор плательщика (обязательно для создания подписки)
            email: accountId,
            data: data
        },
        function (options) { // success
            //действие при успешной оплате
        },
        function (reason, options) { // fail
            //действие при неуспешной оплате
        });

    }
    return (
        <Button className={`donate-button${className ? ` ${className}` : ''}`} loading={loading} {...other} onClick={()=>pay()}>
            {children}
        </Button>
    );
} 