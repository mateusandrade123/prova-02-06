import { buscarPorId, buscarPorNome, inserirFilmes } from "../repository/filmeRepository.js";
import { Router } from 'express';

const server = Router();



server.get('/filme/busca', async (req, resp) => {

    try {

        const { nome } = req.query;

        const resposta = await buscarPorNome(nome);

        if (resposta.length == 0)

            resp.status(404).send([])

        else

            resp.send(resposta);

    } catch (err) {

        resp.status(400).send({

            erro: err.message

        })

    }

})

server.get('/filme/:id', async (req, resp) => {

    try {

        const id = Number(req.params.id);

        const resposta = await buscarPorId(id);

        if (!resposta)

            resp.status(404).send([])

        else

            resp.send(resposta);

    } catch (err) {

        resp.status(400).send({

            erro: err.message

        })

    }

})


server.post('/filme', async (req, resp) => {

    try {

        const novoFilme = req.body;

        if (!novoFilme.nome)

            throw new Error('Nome do Filme é OBRIGATÓRIO!!');

        if (!novoFilme.sinopse)

            throw new Error('Sinopse do Filme é OBRIGATÓRIO!!');

        if (!novoFilme.avaliacao == undefined || novoFilme.avaliacao < 0)

            throw new Error('Avaliação do Filme é OBRIGATÓRIO!!');

        if (!novoFilme.lancamento)

            throw new Error('Lançamento do Filme é OBRIGATÓRIO!!');

        if (!novoFilme.disponivel)

            throw new Error('Campo Disponíval é OBRIGATÓRIO!!');

        if (!novoFilme.usuario)

            throw new Error('Usuário não LOGADO!!');

        const filmeInserido = await inserirFilmes(novoFilme);

        resp.send(filmeInserido);

    } catch (err) {
        resp.send(400).send({

            erro: err.message
        })
    }
})


export default server;