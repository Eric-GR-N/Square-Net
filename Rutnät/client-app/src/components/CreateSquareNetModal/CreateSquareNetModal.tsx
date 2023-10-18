import { Button, Divider, Modal } from 'antd'
import React, { FC } from 'react'
import { SquareNetFormData } from '../../interfaces/forms';
import { SquareNetForm } from '../SquareNetForm';

type Props = {
    visible: boolean;
    onCancel: () => void;
    onFinish: (formData: SquareNetFormData) => void;
}

export const CreateSquareNetModal:FC<Props> = ({
    visible,
    onCancel = () => {},
    onFinish = () => {},
}) => {
  return (
    <Modal
    title="Create New SquareNet"
    centered={true}
    destroyOnClose={true}
    open={visible}
    onCancel={onCancel}
    footer={null}
    >
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <SquareNetForm buttonText="Create" formName='createSquareNet' onFinish={formData => onFinish(formData)} visible={true}/>
            <Divider />
            <Button type="primary" onClick={onCancel}>Cancel</Button> 
        </div>
    </Modal>
  )
}