import { Avatar, Comment } from 'antd';
import React from 'react';
interface I_ExpamleComment {
    children?: React.ReactNode;
    title?: string;
    text?: string;
    isAvatar?: boolean;
}
const ExampleComment: React.FC<I_ExpamleComment> = (props) => (
    <Comment
        // actions={[<span key="comment-nested-reply-to">Reply to</span>]}
        author={<a>{props.title}</a>}
        avatar={
            props.isAvatar && <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        }
        content={<p>{props.text}</p>}
    >
        {props.children}
    </Comment>
);

export default ExampleComment;
