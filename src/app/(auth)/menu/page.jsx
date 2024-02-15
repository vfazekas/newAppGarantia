import React from 'react'
import NavBar from '@/components/Navigation/NavBar'
import { currentUser } from '@clerk/nextjs'
import { getXataClient } from '@/lib/xata'
import TableGa from '@/components/TableGa'

  const xata = getXataClient()

export default async function MenuPage() {
  const user = await currentUser()
    if (!user) return <div>Não está logado</div>
      const filial = user.publicMetadata.filial

      const res = await xata.db.DB_CONSULTOR.filter({
        'consultor.filial': filial,
          check:  false
      })
      .select(["id", "data", "categoria", "consultor.*"])
      .getMany();

      const resStringify = JSON.stringify(res)

  return (

   <NavBar filial={filial}>
    <TableGa tableData={resStringify} />
   </NavBar>
   
  )
}
