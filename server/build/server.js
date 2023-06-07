import express from 'express';
const app = express();
app.get('/ads', (request, response) => {
    response.json([
        { id: 1, nome: 'anúncio 1' },
        { id: 2, nome: 'anúncio 2' },
        { id: 3, nome: 'anúncio 3' },
        { id: 4, nome: 'anúncio 4' },
    ]);
});
app.listen(3333);
