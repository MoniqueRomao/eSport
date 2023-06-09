import express from 'express';
// import cors from 'cors';

import { PrismaClient } from '@prisma/client'
import { HourStringToMinutes } from './utils/hour-string-to-minutes';
import { MinutesToHourString } from './utils/minutes-to-hour-string';

const app = express()

app.use(express.json())
// app.use(cors())

const prisma = new PrismaClient({
    log: ['query']
});

app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    });
    return response.status(200).json(games);
});




app.post('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;
    const body: any = request.body;

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: HourStringToMinutes(body.hourStart),
            hourEnd: HourStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
        }
    })

    return response.status(201).json(ad);
})



app.get('/games/:id/ads', async (request, response) => {
    const id = request.params.id;

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            hourStart: true,
            hourEnd: true,
            yearsPlaying: true,
        },
        where: {
            gameId: id,
        },
        orderBy: {
            createAt: 'desc'
        }
    })


    response.status(200).json(ads.map(ad => {
        return {
            ...ads,
            weekDays: ad.weekDays.split(','),
            hourStart: MinutesToHourString(ad.hourStart),
            hourEnd: MinutesToHourString(ad.hourEnd),
        }
    }))
})

app.get('/ads/:id/discord', async (request, response) => {
    const id = request.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true,
        },
        where: {
            id,
        }
    })


    response.status(200).json({
        discord: ad.discord
    })
})

app.listen(3333)