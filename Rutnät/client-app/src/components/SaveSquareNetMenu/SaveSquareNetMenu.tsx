import React, { FC } from 'react';
import { Button } from '../layout/Button';
import { Form, Input } from 'antd';

type Props = {
    buttonText?: string;
    formName?: string;
}

export const SaveSquareNetMenu: FC<Props> = ({
    buttonText = 'Save',
    formName = 'saveSquareNet',
}) => {

    const onSubmit = (formData: any) => {
        console.log(formData);
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
                    name="squareNetName" 
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
