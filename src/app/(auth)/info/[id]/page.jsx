import React from 'react';
import { getXataClient } from '@/lib/xata';
import Chat from '@/components/Chat';
import { currentUser } from '@clerk/nextjs';
import ListDescri from '@/components/ListDescri';



const xata = getXataClient();

export default async function Page({ params }) {
  const user = await currentUser();
  const imgUrl = user.imageUrl;
  const nome = user.firstName + ' ' + user.lastName;
  const userId = user.id;
  const res = await xata.db.DB_CONSULTOR.read(params.id);
  const dataMsg = res.chat;

  const updateStatus = async (status) => {
    'use server'
    try {
      const res = await xata.db.DB_CONSULTOR.update(params.id, {
        check: status
      })
      
    } catch (error) {
      return console.error(error)
    }
      return 'ok'
  }


  const updateChatMessages = async (newMessages) => {
     'use server'
    const res = await xata.db.DB_CONSULTOR.update(params.id, {
      chat: newMessages,
    });

    return 'ok';
  };

  const timestamp = new Date(res.data);
  
  const dataLocal = timestamp.toLocaleDateString();
  const horaLocal = timestamp.toLocaleTimeString();

  const dataHora = dataLocal + ' as  ' +  horaLocal

  const resString = JSON.stringify(res)

  return (
    <div className="flex flex-col md:flex-row p-5 gap-5">
    <div className="w-full md:w-1/2 pb-16 pt-3"> 
      <Chat messages={dataMsg} userId={userId} name={nome} imgUrl={imgUrl} updateMessages={updateChatMessages} />
    </div>
    <div className="w-full md:w-1/2 items-center justify-center"> 
      <ListDescri nome={nome} res={resString} dataHora={dataHora} updateStatus={updateStatus} />
    </div>
  </div>
  );
}
