'use client'
import React from 'react';
import { Divider, Table } from 'antd';
import { useRouter } from 'next/navigation';

const columns = [
    {
        title: 'Categoria',
        dataIndex: 'categoria',
    },
    {
        title: 'Consultor Filial',
        dataIndex: ['consultor', 'filial'],
    },
    {
        title: 'Consultor Name',
        dataIndex: ['consultor', 'name'],
    },
    {
        title: 'Data',
        dataIndex: 'data',
    },
];

export default function TableGa({ tableData }) {
    const tableDataParsed = JSON.parse(tableData);
    const router = useRouter()

    const dataSource = tableDataParsed.map(item => ({
        key: item.id,
        categoria: item.categoria,
        consultor: {
            filial: item.consultor.filial,
            name: item.consultor.name,
        },
        data: new Date(item.data).toLocaleString(),
    }));

    const handleRowClick = (id) => {
        router.push(`/info/${id}`)
    }


    return (
        <div>
            <Divider>Processos pendentes Garantia</Divider>
            <Table 
            columns={columns} 
            dataSource={dataSource} 
            size="small" 
            onRow={(record) => ({
                onClick: () => handleRowClick(record.key)
            })}
            />
        </div>
    );
}
