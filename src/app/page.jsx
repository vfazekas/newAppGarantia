import React from 'react'
import NavBar from '@/components/Navigation/HomeNavBar'
import { currentUser, auth  } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import GetConsultorRecords from '../utils/getConsultorRecords'

export default async function HomePage() {

  const user = await currentUser()
  const { has } = auth()

  const redirectBool = has({permission: 'org:feature:acessoga'})

  if (redirectBool === true) {
    redirect('/menu')
  }

  const res = await GetConsultorRecords()
  const resStringFy = JSON.stringify(res)

  const name = user.firstName + ' ' + user.lastName


  return (
      <div>
      <NavBar nome={name} data={resStringFy} />
      </div>

  )
}
