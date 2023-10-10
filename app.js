const express = require('express'); //invocando o módulo express
const app = express(); //instância de um aplicativo Express
const PORT = 8181;
const fs = require('fs'); // invocando metodo fs para a manipulação de arquivos
const path = require('path'); //invocando metodo path para trabalhar com caminhos
const bodyParser = require('body-parser');//!!!!!!!

app.use(bodyParser.json());

// Função para ler um arquivo JSON do caminho ./db/
function readJSONFile(filename) {
    const filePath = path.join(__dirname, 'db', filename);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

// Função para escrever um objeto JSON em um arquivo
function writeJSONFile(filename, data) {
    const filePath = path.join(__dirname, 'db', filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

//!ROTAS PARA CURSOS
//GET - Rota para obter todos os cursos
app.get('/cursos', (req, res) => {
    const cursos = readJSONFile('cursos.json');
    res.json(cursos);
});
//GET - Rota para obter um curso por ID
app.get('/cursos/:id', (req, res) => {
    const cursos = readJSONFile('cursos.json');
    const curso = cursos.find((c) => c.id === parseInt(req.params.id));
    if (curso) {
      res.json(curso);
    } else {
      res.status(404).json({ message: 'Curso não encontrado' });
    }
});
// POST - Rota para adicionar um novo curso
app.post('/cursos', (req, res) => {
    const cursos = readJSONFile('cursos.json');
    const newCurso = {
        id: cursos.length + 1, //OK
        curso: req.body.curso, //OK
        sigla: req.body.sigla, //OK
        ativo: req.body.ativo,//OK
        modalidades: [{
          tipo: req.body.tipo, //!erro aqui - não imprime
          link: req.body.link, //!erro aqui - não imprime
          ativo: req.body.ativo //!esse imprime
        }],
        disciplinas: [req.body.disciplinas], //OK
        id_nucleo: req.body.id_nucleo,//OK
        nucleo: req.body.nucleo,//OK
        tematicas: [req.body.tematicas],//OK
        exp_ti: req.body.exp_ti,//OK
        exp_ti_val: req.body.exp_ti_val,//OK
    };
    cursos.push(newCurso);
    writeJSONFile('cursos.json', cursos);
    res.status(201).json(newCurso);
});

// POST - Rota para adicionar modalidades em um novo curso
app.post('/cursos', (req, res) => {
  const cursos = readJSONFile('cursos.json');
  const newCurso = {
      id: cursos.length + 2, 
      curso: req.body.curso, 
      sigla: req.body.sigla, 
      ativo: req.body.ativo,
      modalidades: [],
      disciplinas: [],
      id_nucleo: req.body.id_nucleo,
      nucleo: req.body.nucleo,
      tematicas: [],
      exp_ti: req.body.exp_ti,
      exp_ti_val: req.body.exp_ti_val
  };
  cursos.push(newCurso);
  writeJSONFile('cursos.json', cursos);
  res.status(201).json(newCurso);
});
//todo: verificar se é necessário POST individual para disciplinas [] e tematicas


// PUT - Rota para atualizar um curso existente
app.put('/cursos/:id', (req, res) => {
    const cursos = readJSONFile('cursos.json');
    const cursoIndex = cursos.findIndex((c) => c.id === parseInt(req.params.id));
    if (cursoIndex !== -1) {
      cursos[cursoIndex] = {
        id: cursos.length, //OK
        curso: req.body.curso, //OK
        sigla: req.body.sigla, //OK
        ativo: req.body.ativo,//OK
        modalidades: [{
          tipo: req.body.tipo, //!erro aqui - não imprime
          link: req.body.link, //!erro aqui - não imprime
          ativo: req.body.ativo //!esse imprime
        }],
        disciplinas: [req.body.disciplinas], //OK
        id_nucleo: req.body.id_nucleo,//OK
        nucleo: req.body.nucleo,//OK
        tematicas: [req.body.tematicas],//OK
        exp_ti: req.body.exp_ti,//OK
        exp_ti_val: req.body.exp_ti_val,//OK
    };
      writeJSONFile('cursos.json', cursos);
      res.json(cursos[cursoIndex]);
    } else {
      res.status(404).json({ message: 'Curso não encontrado' });
    }
});
// DELETE - Rota para excluir um curso
app.delete('/cursos/:id', (req, res) => {
    const cursos = readJSONFile('cursos.json');
    const cursoIndex = cursos.findIndex((c) => c.id === parseInt(req.params.id));
    if (cursoIndex !== -1) {
      cursos.splice(cursoIndex, 1);
      writeJSONFile('cursos.json', cursos);
      res.json({ message: 'Curso excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Curso não encontrado' });
    }
});


//!ROTAS PARA DISCIPLINAS
// GET - Rota para obter todas as disciplinas
app.get('/disciplinas', (req, res) => {
    const disciplinas = readJSONFile('disciplinas.json');
    res.json(disciplinas);
});
// GET - Rota para obter uma disciplina por ID
app.get('/disciplinas/:id', (req, res) => {
    const disciplinas = readJSONFile('disciplinas.json');
    const disciplina = disciplinas.find((c) => c.id === parseInt(req.params.id));
    if (disciplina) {
      res.json(disciplina);
    } else {
      res.status(404).json({ message: 'Disciplina não encontrada' });
    }
});
// POST - Rota para adicionar uma nova disciplina
app.post('/disciplinas', (req, res) => {
    const disciplinas = readJSONFile('disciplinas.json');
    const newDisciplina = {
      id: disciplinas.length + 2, //!!Testar novamente aqui (essa questão do +2). Alguns colocando só +1 já fica com a lógica certa, mas este não. Este precisou de +2
      disciplina: req.body.disciplina,
      grupo_id: req.body.grupo_id
    };
    disciplinas.push(newDisciplina);
    writeJSONFile('disciplinas.json', disciplinas);
    res.status(201).json(newDisciplina);
});
// PUT - Rota para atualizar um disciplina existente
app.put('/disciplinas/:id', (req, res) => {
    const disciplinas = readJSONFile('disciplinas.json');
    const disciplinaIndex = disciplinas.findIndex((c) => c.id === parseInt(req.params.id));
    if (disciplinaIndex !== -1) {
      disciplinas[disciplinaIndex].nome = req.body.nome;
      writeJSONFile('disciplinas.json', disciplinas);
      res.json(disciplinas[disciplinaIndex]);
    } else {
      res.status(404).json({ message: 'Disciplina não encontrada' });
    }
});
// DELETE - Rota para excluir um disciplina
app.delete('/disciplinas/:id', (req, res) => {
    const disciplinas = readJSONFile('disciplinas.json');
    const disciplinaIndex = disciplinas.findIndex((c) => c.id === parseInt(req.params.id));
    if (disciplinaIndex !== -1) {
      disciplinas.splice(disciplinaIndex, 1);
      writeJSONFile('disciplinas.json', disciplinas);
      res.json({ message: 'Disciplina excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Disciplina não encontrado' });
    }
});


//!ROTAS PARA GRUPOS_DISCIPLINAS
// GET - Rota para obter todos os grupos_disciplinas
app.get('/grupos_disciplinas', (req, res) => {
    const grupos_disciplinas = readJSONFile('grupos_disciplinas.json');
    res.json(grupos_disciplinas);
});
// GET - Rota para obter um grupo disciplina por ID
app.get('/grupos_disciplinas/:id', (req, res) => {
    const grupos_disciplinas = readJSONFile('grupos_disciplinas.json');
    const grupoDisciplina = grupos_disciplinas.find((c) => c.id === parseInt(req.params.id));
    if (grupoDisciplina) {
      res.json(grupoDisciplina);
    } else {
      res.status(404).json({ message: 'Grupo disciplina não encontrado' });
    }
});
// POST - Rota para adicionar um novo grupo disciplina
app.post('/grupos_disciplinas', (req, res) => {
    const grupos_disciplinas = readJSONFile('grupos_disciplinas.json');
    const newGrupoDisciplina = {
      id: grupos_disciplinas.length + 1,
      descricao: req.body.descricao,
    };
    grupos_disciplinas.push(newGrupoDisciplina);
    writeJSONFile('grupos_disciplinas.json', grupos_disciplinas);
    res.status(201).json(newGrupoDisciplina);
});
// PUT - Rota para atualizar um grupo disciplina existente
app.put('/grupos_disciplinas/:id', (req, res) => {
    const grupos_disciplinas = readJSONFile('grupos_disciplinas.json');
    const grupoDisciplinaIndex = grupos_disciplinas.findIndex((c) => c.id === parseInt(req.params.id));
    if (grupoDisciplinaIndex !== -1) {
      grupos_disciplinas[grupoDisciplinaIndex].nome = req.body.nome;
      writeJSONFile('grupos_disciplinas.json', grupos_disciplinas);
      res.json(grupos_disciplinas[grupoDisciplinaIndex]);
    } else {
      res.status(404).json({ message: 'Grupo disciplina não encontrado' });
    }
});
// DELETE - Rota para excluir um grupo disciplina
app.delete('/grupos_disciplinas/:id', (req, res) => {
    const grupos_disciplinas = readJSONFile('grupos_disciplinas.json');
    const grupoDisciplinasIndex = grupos_disciplinas.findIndex((c) => c.id === parseInt(req.params.id));
    if (grupoDisciplinasIndex !== -1) {
      grupos_disciplinas.splice(grupoDisciplinasIndex, 1);
      writeJSONFile('grupos_disciplinas.json', grupos_disciplinas);
      res.json({ message: 'Grupo disciplina excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Grupo disciplina não encontrado' });
    }
});


//!ROTAS PARA MODALIDADES
// GET - Rota para obter todas as modalidades
app.get('/modalidades', (req, res) => {
    const modalidades = readJSONFile('modalidades.json');
    res.json(modalidades);
});
// POST -Rota para adicionar uma nova modalidade
app.post('/modalidades', (req, res) => {
    const modalidades = readJSONFile('modalidades.json');
    const newModalidade = req.body.newModalidade;
    modalidades.push(newModalidade);
    writeJSONFile('modalidades.json', modalidades);
    res.status(201).json(newModalidade);
});
// DELETE - Rota para excluir uma modalidade
app.delete('/modalidades/:modalidade', (req, res) => {
    const modalidades = readJSONFile('modalidades.json');
    if(modalidade === req.body.modalidade){
      modalidades.splice(modalidade, 1);
      writeJSONFile('modalidades.json', modalidades);
      res.json({ message: 'Modalidade excluída com sucesso' });
    } else {
      res.status(404).json({ message: 'Modalidade não encontrada' });
    }
});



//!ROTAS PARA NUCLEOS
// GET - Rota para obter todos os nucleos
app.get('/nucleos', (req, res) => {
    const nucleos = readJSONFile('nucleos.json');
    res.json(nucleos);
});
// GET - Rota para obter um nucleo por ID
app.get('/nucleos/:id', (req, res) => {
    const nucleos = readJSONFile('nucleos.json');
    const nucleo = nucleos.find((c) => c.id === parseInt(req.params.id));
    if (nucleo) {
      res.json(nucleo);
    } else {
      res.status(404).json({ message: 'Nucleo não encontrada' });
    }
});
// POST - Rota para adicionar um novo nucleo
app.post('/nucleos', (req, res) => {
    const nucleos = readJSONFile('nucleos.json');
    const newNucleo = {
      id: nucleos.length + 1,
      nucleo: req.body.nucleo,
    };
    nucleos.push(newNucleo);
    writeJSONFile('nucleos.json', nucleos);
    res.status(201).json(newNucleo);
});
// PUT - Rota para atualizar um nucleo existente
app.put('/nucleos/:id', (req, res) => {
    const nucleos = readJSONFile('nucleos.json');
    const nucleoIndex = nucleos.findIndex((c) => c.id === parseInt(req.params.id));
    if (nucleoIndex !== -1) {
      nucleos[nucleoIndex].nucleo = req.body.nucleo;
      writeJSONFile('nucleos.json', nucleos);
      res.json(nucleos[nucleoIndex]);
    } else {
      res.status(404).json({ message: 'Nucleo não encontrada' });
    }
});
// DELETE - Rota para excluir um nucleo
app.delete('/nucleos/:id', (req, res) => {
    const nucleos = readJSONFile('nucleos.json');
    const nucleoIndex = nucleos.findIndex((c) => c.id === parseInt(req.params.id));
    if (nucleoIndex !== -1) {
      nucleos.splice(nucleoIndex, 1);
      writeJSONFile('nucleos.json', nucleos);
      res.json({ message: 'Nucleo excluída com sucesso' });
    } else {
      res.status(404).json({ message: 'Nucleo não encontrada' });
    }
});


//!ROTAS PARA TEMATICAS
// GET - Rota para obter todas as tematicas
app.get('/tematicas', (req, res) => {
    const tematicas = readJSONFile('tematicas.json');
    res.json(tematicas);
});
// POST - Rota para adicionar uma nova temática
app.post('/tematicas', (req, res) => {
    const tematicas = readJSONFile('tematicas.json');
    const newTematica = req.body [
        req.body,
        req.body
    ];
    tematicas.push(newTematica);
    writeJSONFile('tematicas.json', tematicas);
    res.status(201).json(newTematica);
});



//! ROTA PADRÃO
//rota para '/'
app.get('/', (req, res) => res.send('Página inicial'));

//inicia o app informando a porta de escuta
app.listen(PORT, () => {
    console.log(`Listening to http://localhost:${PORT}`); //o app está em funcionamento e pronto para receber solicitações por essa porta
});

