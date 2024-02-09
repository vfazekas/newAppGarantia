import React from 'react';
import { getXataClient } from '@/lib/xata';
import Chat from '@/components/Chat';
import { currentUser } from '@clerk/nextjs';
import {Badge, Descriptions } from 'antd'
import  Link  from 'next/link';




const xata = getXataClient();

export default async function Page({ params }) {
  const user = await currentUser();
  const imgUrl = user.imageUrl;
  const nome = user.firstName + ' ' + user.lastName;
  const res = await xata.db.DB_CONSULTOR.read(params.id);
  const dataMsg = res.chat;


  const updateChatMessages = async (newMessages) => {
     'use server'
    const res = await xata.db.DB_CONSULTOR.update(params.id, {
      chat: newMessages,
    });

    return 'ok';
  };

  const timestamp = new Date(res.data);
  timestamp.setHours(timestamp.getHours() + 3); 
  
  const formattedTimestamp = timestamp.toLocaleString('pt-BR', {
    hour12: true, 
    timeZone: 'America/Sao_Paulo', 
    dateStyle: 'short', 
    timeStyle: 'short' 
  });


  const items = [
    {
      key: '1',
      label: 'Categoria',
      children: res.categoria,
    },
    {
      key: '4',
      label: 'Data de criação',
      children: formattedTimestamp,
    },
    {
      key: '6',
      label: 'Status',
      children: <Badge status="warning" text="Pendente" />,
    },
    {
      key: '7',
      label: 'Inconsistência',
      children: res.erro ,
    },
  ]


  return (
    <div className="flex flex-col md:flex-row p-5 gap-5">
    <div className="w-full md:w-1/2 pb-16 pt-3"> 
      <Chat messages={dataMsg} name={nome} imgUrl={imgUrl} updateMessages={updateChatMessages} />
    </div>
    <div className="w-full md:w-1/2 items-center justify-center"> 
      <Descriptions
        title={nome}
        layout="vertical"
        bordered
        items={items}
        contentStyle={{ textAlign: 'center' }}
      />
       <Link href="/">
        <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer text-center">
          Voltar para página inicial
        </div>
      </Link>
    </div>
  </div>
  );
}
