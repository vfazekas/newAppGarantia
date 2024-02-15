import React from 'react'
import NavBar from '@/components/Navigation/NavBar'
import FormConsultor from '@/components/form/FormConsultor'
import { currentUser } from '@clerk/nextjs'
import { getXataClient } from '@/lib/xata'
import { v4 as uuidv4 } from 'uuid'

const xata = getXataClient();

export default async function FormConsultorPage() {
  const user = await currentUser()
  
  if (!user) return <div>Não está logado</div>
  const imgUrl = user.imageUrl;
  const nome = user.firstName + ' ' + user.lastName;
  const userId = user.id;
  const filial = user.publicMetadata.filial




  const handleFormSubmit = async (formValues) => {
    'use server'

    // Parse string representation back to Date object
    const dataDate = new Date(formValues.formConsultor.Data);

    const formattedTimestamp = dataDate.toLocaleString('pt-BR', {
      hour12: false, 
      timeZone: 'America/Sao_Paulo',
      dateStyle: 'short', // format ('dd/MM/yyyy')
      timeStyle: 'short' //  format ('HH:mm')
    })

    const newMessageGa = [{
      msgId: uuidv4(),
      message: formValues.formConsultor.msg,
      user_id: userId,
      user_name: nome,
      timestamp: formattedTimestamp,
      picture: imgUrl
    }]


    try {
      
      const res = await xata.db.DB_CONSULTOR.create({
        data: dataDate,
        os: formValues.formConsultor.OS,
        categoria: formValues.formConsultor.categoria,
        erro: formValues.formConsultor.inconsistencia,
        consultor: formValues.formConsultor.consultor,
        chat: newMessageGa
      })


    } catch (error) {
      console.error("Error para salvar os dados:", error)
    }

    return "ok"
}

  return (
    <NavBar filial={filial}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>  
        <FormConsultor loja={filial} onSubmit={handleFormSubmit} />
      </div>
    </NavBar>
  )
}
