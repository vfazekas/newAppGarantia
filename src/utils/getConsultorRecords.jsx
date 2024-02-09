import { getXataClient } from "@/lib/xata"
import { auth } from "@clerk/nextjs"


const xata = getXataClient()

export default async function GetConsultorRecords () {

    const { userId } = auth()
    const currentDate = new Date();
    const utcYear = currentDate.getUTCFullYear();
    const utcMonth = currentDate.getUTCMonth();
    const utcDay = currentDate.getUTCDate();

// current day horas 00:00:00
    const startDate = new Date(Date.UTC(utcYear, utcMonth, utcDay, 0, 0, 0, 0));

// setando a hora para 23:59:59:999
    const endDate = new Date(Date.UTC(utcYear, utcMonth, utcDay, 23, 59, 59, 999));

        const records = await xata.db.DB_CONSULTOR.filter({
            consultor: userId,

            check: false,

            $all: [
              {
                'data': { $ge: startDate }
              },
              {
                'data': { $lt: endDate }
              },
            ]
          }).getMany();

    return records

}