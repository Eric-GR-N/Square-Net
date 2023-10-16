import { Button, Divider, Modal } from 'antd'
import React, { FC } from 'react'
import { SaveSquareNetMenu } from '../SaveSquareNetMenu';

type Props = {
    visible: boolean;
    onCancel: () => void;
    onFinish: () => void;
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
            <SaveSquareNetMenu buttonText="Create" formName='createSquareNet'/>
            <Divider />
            <Button type="primary" onClick={onCancel}>Cancel</Button> 
        </div>
    </Modal>
  )
}