import * as React from 'react';
import './style.scss';

interface FlatButtonProps {
    title: string;
    onClick?: () => void;
}

export const FlatButton: React.FC<FlatButtonProps> = (props) => {
    return <input type="button" value={props.title} onClick={props.onClick} />;
};
