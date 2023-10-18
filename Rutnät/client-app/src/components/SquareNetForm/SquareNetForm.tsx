import React, { FC } from 'react';
import { Button } from '../layout/Button';
import { Form, Input } from 'antd';
import { SquareNetFormData } from '../../interfaces/forms';

type Props = {
    buttonText?: string;
    formName?: string;
    onFinish?: (formData: SquareNetFormData) => void;
    visible: boolean;
}

export const SquareNetForm: FC<Props> = ({
    buttonText = 'Save',
    formName = 'editSquareNet',
    onFinish = () => {},
    visible,
}) => {

    const [form] = Form.useForm<SquareNetFormData>();

    const onSubmit = (formData: SquareNetFormData) => {
        onFinish(formData);
    }

    return (
        <div style={{
            display: 'flex',
            visibility: visible ? 'visible' : 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '30px 0px',
            width: '100%',
            height: '100px',
        }}>
            <Form 
                name={formName}
                autoComplete="off"
                form={form}
                onFinish={onSubmit}
                layout='horizontal'
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '90%',
                }}
            >
                <Form.Item 
                    name="name" 
                    style={{
                        flex: 1, 
                        marginRight: '10px',
                        marginBottom: 0,
                    }}
                >
                    <Input style={{ width: '100%' }} placeholder='Name of square net'/>
                </Form.Item>
                <Button 
                    type="submit" 
                    text={buttonText} 
                    style={{
                        flexShrink: 1,
                        minWidth: '50px',
                        alignSelf: 'center',
                    }} 
                />
            </Form>
        </div>
    )
}
