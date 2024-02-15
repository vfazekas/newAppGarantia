'use client'

import React, { useState } from 'react';
import { Descriptions, Button, Badge, Modal, Switch } from 'antd';
import { LeftCircleOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

export default function ListDescri({ nome, res, dataHora, updateStatus }) {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [switchValue, setSwitchValue] = useState(false);
    const [status, setStatus] = useState(false)

    const router = useRouter();
    const resParsed = JSON.parse(res);

    const items = [
        {
            key: '1',
            label: 'Categoria',
            children: resParsed.categoria,
        },
        {
            key: '4',
            label: 'Data de criação',
            children: dataHora,
        },
        {
            key: '6',
            label: 'Status',
            children: <Badge status={status ? "success" : "warning"} text={status ? "Concluído" : "Pendente"} />,
        },
        {
            key: '7',
            label: 'Inconsistência',
            children: resParsed.erro,
        },
    ];

    const showModal = () => {
        setOpen(true);
    };

    const handleGoBack = () => {
      router.push('/');
      router.refresh();
    };

    const handleOk = async () => {
        setConfirmLoading(true);
       const res = await  updateStatus(switchValue)

        if (res === 'ok') {
          setStatus(true)
        }
       
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    return (
        <div>
            <Descriptions
                title={nome}
                layout="vertical"
                bordered
                items={items}
                extra={<Button onClick={showModal} type="primary">Status<SafetyCertificateOutlined /></Button>}
                contentStyle={{ textAlign: 'center', marginBottom: '20px' }}
            />
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Button onClick={handleGoBack} type='primary'>Voltar<LeftCircleOutlined /></Button>
            </div>

            <Modal
                title="Marcar como solucionado"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Switch
                    defaultChecked={resParsed.check}
                    checkedChildren="C"
                    unCheckedChildren="P"
                    onChange={(value) => setSwitchValue(value)}
                />
            </Modal>
        </div>
    );
}
