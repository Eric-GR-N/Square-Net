import React, { FC } from 'react';
import { Button } from '../layout/Button';
import { Form, Input } from 'antd';
import { SquareNetFormData } from '../../interfaces/forms';

type Props = {
    buttonText?: string;
    formName?: string;
    onFinish?: (formData: SquareNetFormData) => void;
}

export const SaveSquareNetMenu: FC<Props> = ({
    buttonText = 'Save',
    formName = 'editSquareNet',
    onFinish = () => {},
}) => {

    const [form] = Form.useForm<SquareNetFormData>();

    const onSubmit = (formData: SquareNetFormData) => {
        onFinish(formData);
    }

    return (
        <div style={{
            display: 'flex',
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
                    name="id" 
                    hidden={true}
                >
                    <Input style={{ width: '100%' }}/>
                </Form.Item>
                <Form.Item 
                    name="name" 
                    style={{
                        flex: 1, 
                        marginRight: '10px', // spacing between input and button
                        marginBottom: 0, // remove default margin-bottom
                    }}
                >
                    <Input style={{ width: '100%' }}/>
                </Form.Item>
                <Button 
                    type="submit" 
                    text={buttonText} 
                    style={{
                        flexShrink: 1,
                        minWidth: '50px',
                        alignSelf: 'center', // ensure it's aligned to the center vertically
                    }} 
                />
            </Form>
        </div>
    )
}
