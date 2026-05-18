// ============================================================
// DADOS FICTÍCIOS - Sistema de Faltas IFC
// Curso de Ciência da Computação · Semestre 2026.1
// ============================================================
//
// Distribuição calibrada (sobre total_aulas):
//   >= 15 faltas em 60 aulas (25%) → CRÍTICO (reprovação por falta)
//    9 a 14 faltas em 60 aulas      → ATENÇÃO
//    0 a  8 faltas em 60 aulas      → OK
// (TCC tem 30 aulas: critico >= 8, atencao 5-7, ok 0-4)
// ============================================================

const USUARIOS = [
  {
    nome: 'Antônio Mendes',
    email: 'coord@ifc.br',
    senha: '123',
    perfil: 'coordenador'
  },
  {
    nome: 'João Silva',
    email: 'joao@ifc.br',
    senha: '123',
    perfil: 'professor',
    disciplinas: ['CCC0740', 'CCC0741', 'CCC0945']
  },
  {
    nome: 'Maria Santos',
    email: 'maria@ifc.br',
    senha: '123',
    perfil: 'professor',
    disciplinas: ['CCC0742', 'CCC0743']
  },
  {
    nome: 'Carlos Lima',
    email: 'carlos@ifc.br',
    senha: '123',
    perfil: 'professor',
    disciplinas: ['CCC0744', 'CCC0102']
  }
];

const DISCIPLINAS = [
  { codigo: 'CCC0740', nome: 'Aprendizado de Máquina',          professor: 'João Silva',   total_aulas: 60, aulas_dadas: 40, semestre: '2026.1' },
  { codigo: 'CCC0741', nome: 'Compiladores',                    professor: 'João Silva',   total_aulas: 60, aulas_dadas: 40, semestre: '2026.1' },
  { codigo: 'CCC0742', nome: 'Computação Gráfica',              professor: 'Maria Santos', total_aulas: 60, aulas_dadas: 40, semestre: '2026.1' },
  { codigo: 'CCC0743', nome: 'Infraestrutura e Serviços Web',   professor: 'Maria Santos', total_aulas: 60, aulas_dadas: 40, semestre: '2026.1' },
  { codigo: 'CCC0744', nome: 'Sistemas Embarcados',             professor: 'Carlos Lima',  total_aulas: 60, aulas_dadas: 40, semestre: '2026.1' },
  { codigo: 'CCC0102', nome: 'Tópicos Especiais em Computação', professor: 'Carlos Lima',  total_aulas: 60, aulas_dadas: 40, semestre: '2026.1' },
  { codigo: 'CCC0945', nome: 'Trabalho de Conclusão de Curso',  professor: 'João Silva',   total_aulas: 30, aulas_dadas: 20, semestre: '2026.1' }
];

const ALUNOS = [
  { matricula: '20231001', nome: 'Mariana Silva Oliveira',     curso: 'Ciência da Computação' },
  { matricula: '20231002', nome: 'Pedro Henrique Almeida',     curso: 'Ciência da Computação' },
  { matricula: '20231003', nome: 'Júlia Fernandes Costa',      curso: 'Ciência da Computação' },
  { matricula: '20231004', nome: 'Lucas Pereira Santos',       curso: 'Ciência da Computação' },
  { matricula: '20231005', nome: 'Beatriz Carvalho Ribeiro',   curso: 'Ciência da Computação' },
  { matricula: '20231006', nome: 'Gabriel Rodrigues Lima',     curso: 'Ciência da Computação' },
  { matricula: '20231007', nome: 'Sophia Martins Pereira',     curso: 'Ciência da Computação' },
  { matricula: '20231008', nome: 'Rafael Souza Mendes',        curso: 'Ciência da Computação' },
  { matricula: '20231009', nome: 'Larissa Gomes Oliveira',     curso: 'Ciência da Computação' },
  { matricula: '20231010', nome: 'Thiago Barbosa Costa',       curso: 'Ciência da Computação' },
  { matricula: '20231011', nome: 'Camila Ribeiro Santos',      curso: 'Ciência da Computação' },
  { matricula: '20231012', nome: 'Bruno Lima Cardoso',         curso: 'Ciência da Computação' },
  { matricula: '20231013', nome: 'Letícia Almeida Vieira',     curso: 'Ciência da Computação' },
  { matricula: '20231014', nome: 'Felipe Castro Nogueira',     curso: 'Ciência da Computação' },
  { matricula: '20231015', nome: 'Isabela Moreira Dias',       curso: 'Ciência da Computação' },
  { matricula: '20231016', nome: 'Matheus Pinto Ferreira',     curso: 'Ciência da Computação' },
  { matricula: '20231017', nome: 'Amanda Cardoso Teixeira',    curso: 'Ciência da Computação' },
  { matricula: '20231018', nome: 'João Vitor Araújo Costa',    curso: 'Ciência da Computação' },
  { matricula: '20231019', nome: 'Helena Nascimento Silva',    curso: 'Ciência da Computação' },
  { matricula: '20231020', nome: 'Daniel Vieira Marques',      curso: 'Ciência da Computação' },
  { matricula: '20231021', nome: 'Vinícius Rocha Andrade',     curso: 'Ciência da Computação' },
  { matricula: '20231022', nome: 'Carolina Freitas Lopes',     curso: 'Ciência da Computação' },
  { matricula: '20231023', nome: 'Eduardo Pacheco Ramos',      curso: 'Ciência da Computação' },
  { matricula: '20231024', nome: 'Natália Borges Cunha',       curso: 'Ciência da Computação' },
  { matricula: '20231025', nome: 'Henrique Tavares Melo',      curso: 'Ciência da Computação' }
];

// Registros de matrícula + faltas por disciplina (~85 registros)
const FREQUENCIA = [
  // === EXEMPLARES (faltas baixas) ===
  { matricula: '20231001', disciplina: 'CCC0740', faltas:  1 },
  { matricula: '20231001', disciplina: 'CCC0741', faltas:  2 },
  { matricula: '20231001', disciplina: 'CCC0742', faltas:  0 },
  { matricula: '20231001', disciplina: 'CCC0945', faltas:  1 },

  { matricula: '20231005', disciplina: 'CCC0740', faltas:  0 },
  { matricula: '20231005', disciplina: 'CCC0741', faltas:  1 },
  { matricula: '20231005', disciplina: 'CCC0742', faltas:  2 },
  { matricula: '20231005', disciplina: 'CCC0743', faltas:  0 },
  { matricula: '20231005', disciplina: 'CCC0945', faltas:  1 },

  { matricula: '20231013', disciplina: 'CCC0740', faltas:  2 },
  { matricula: '20231013', disciplina: 'CCC0741', faltas:  1 },
  { matricula: '20231013', disciplina: 'CCC0743', faltas:  3 },
  { matricula: '20231013', disciplina: 'CCC0744', faltas:  2 },
  { matricula: '20231013', disciplina: 'CCC0945', faltas:  0 },

  { matricula: '20231008', disciplina: 'CCC0741', faltas:  3 },
  { matricula: '20231008', disciplina: 'CCC0743', faltas:  4 },
  { matricula: '20231008', disciplina: 'CCC0744', faltas:  2 },
  { matricula: '20231008', disciplina: 'CCC0945', faltas:  2 },

  { matricula: '20231017', disciplina: 'CCC0740', faltas:  3 },
  { matricula: '20231017', disciplina: 'CCC0741', faltas:  4 },
  { matricula: '20231017', disciplina: 'CCC0742', faltas:  3 },
  { matricula: '20231017', disciplina: 'CCC0744', faltas:  5 },

  // === ESTÁVEIS (faltas baixas/médias) ===
  { matricula: '20231003', disciplina: 'CCC0740', faltas:  6 },
  { matricula: '20231003', disciplina: 'CCC0742', faltas:  8 },
  { matricula: '20231003', disciplina: 'CCC0743', faltas:  5 },
  { matricula: '20231003', disciplina: 'CCC0102', faltas:  3 },

  { matricula: '20231006', disciplina: 'CCC0740', faltas:  9 },
  { matricula: '20231006', disciplina: 'CCC0741', faltas:  7 },
  { matricula: '20231006', disciplina: 'CCC0744', faltas: 10 },
  { matricula: '20231006', disciplina: 'CCC0102', faltas:  8 },

  { matricula: '20231010', disciplina: 'CCC0740', faltas:  5 },
  { matricula: '20231010', disciplina: 'CCC0742', faltas:  6 },
  { matricula: '20231010', disciplina: 'CCC0743', faltas:  7 },
  { matricula: '20231010', disciplina: 'CCC0102', faltas:  4 },

  { matricula: '20231012', disciplina: 'CCC0740', faltas:  4 },
  { matricula: '20231012', disciplina: 'CCC0741', faltas:  5 },
  { matricula: '20231012', disciplina: 'CCC0742', faltas:  6 },
  { matricula: '20231012', disciplina: 'CCC0102', faltas:  2 },

  { matricula: '20231020', disciplina: 'CCC0740', faltas:  6 },
  { matricula: '20231020', disciplina: 'CCC0742', faltas:  5 },
  { matricula: '20231020', disciplina: 'CCC0743', faltas:  4 },
  { matricula: '20231020', disciplina: 'CCC0102', faltas:  7 },

  { matricula: '20231022', disciplina: 'CCC0741', faltas:  7 },
  { matricula: '20231022', disciplina: 'CCC0742', faltas:  5 },
  { matricula: '20231022', disciplina: 'CCC0744', faltas:  6 },

  { matricula: '20231025', disciplina: 'CCC0740', faltas:  4 },
  { matricula: '20231025', disciplina: 'CCC0743', faltas:  8 },
  { matricula: '20231025', disciplina: 'CCC0102', faltas:  5 },

  // === EM ATENÇÃO (entre 9 e 14 faltas → 15-23%) ===
  { matricula: '20231009', disciplina: 'CCC0740', faltas: 11 },
  { matricula: '20231009', disciplina: 'CCC0741', faltas: 12 },
  { matricula: '20231009', disciplina: 'CCC0742', faltas: 13 },
  { matricula: '20231009', disciplina: 'CCC0744', faltas:  9 },

  { matricula: '20231015', disciplina: 'CCC0740', faltas:  7 },
  { matricula: '20231015', disciplina: 'CCC0741', faltas: 11 },
  { matricula: '20231015', disciplina: 'CCC0742', faltas:  9 },
  { matricula: '20231015', disciplina: 'CCC0102', faltas:  6 },

  { matricula: '20231018', disciplina: 'CCC0741', faltas: 10 },
  { matricula: '20231018', disciplina: 'CCC0742', faltas: 11 },
  { matricula: '20231018', disciplina: 'CCC0743', faltas: 12 },
  { matricula: '20231018', disciplina: 'CCC0102', faltas:  9 },

  { matricula: '20231016', disciplina: 'CCC0740', faltas: 12 },
  { matricula: '20231016', disciplina: 'CCC0743', faltas: 11 },
  { matricula: '20231016', disciplina: 'CCC0744', faltas: 13 },
  { matricula: '20231016', disciplina: 'CCC0945', faltas:  4 },

  { matricula: '20231021', disciplina: 'CCC0740', faltas: 10 },
  { matricula: '20231021', disciplina: 'CCC0741', faltas:  9 },
  { matricula: '20231021', disciplina: 'CCC0742', faltas: 12 },

  { matricula: '20231023', disciplina: 'CCC0741', faltas: 14 },
  { matricula: '20231023', disciplina: 'CCC0743', faltas: 10 },
  { matricula: '20231023', disciplina: 'CCC0744', faltas: 11 },

  // === CRÍTICOS (>= 15 faltas → reprovação) ===
  { matricula: '20231002', disciplina: 'CCC0740', faltas: 18 },
  { matricula: '20231002', disciplina: 'CCC0741', faltas: 16 },
  { matricula: '20231002', disciplina: 'CCC0743', faltas: 15 },
  { matricula: '20231002', disciplina: 'CCC0744', faltas: 12 },
  { matricula: '20231002', disciplina: 'CCC0945', faltas:  5 },

  { matricula: '20231004', disciplina: 'CCC0741', faltas: 14 },
  { matricula: '20231004', disciplina: 'CCC0742', faltas: 13 },
  { matricula: '20231004', disciplina: 'CCC0744', faltas: 16 },
  { matricula: '20231004', disciplina: 'CCC0102', faltas: 11 },

  { matricula: '20231007', disciplina: 'CCC0740', faltas: 17 },
  { matricula: '20231007', disciplina: 'CCC0742', faltas: 19 },
  { matricula: '20231007', disciplina: 'CCC0743', faltas: 14 },
  { matricula: '20231007', disciplina: 'CCC0102', faltas: 16 },

  { matricula: '20231011', disciplina: 'CCC0741', faltas: 15 },
  { matricula: '20231011', disciplina: 'CCC0743', faltas: 17 },
  { matricula: '20231011', disciplina: 'CCC0744', faltas: 18 },
  { matricula: '20231011', disciplina: 'CCC0945', faltas:  6 },

  { matricula: '20231014', disciplina: 'CCC0742', faltas: 21 },
  { matricula: '20231014', disciplina: 'CCC0743', faltas: 18 },
  { matricula: '20231014', disciplina: 'CCC0744', faltas: 20 },
  { matricula: '20231014', disciplina: 'CCC0102', faltas: 17 },

  { matricula: '20231019', disciplina: 'CCC0740', faltas: 22 },
  { matricula: '20231019', disciplina: 'CCC0741', faltas: 19 },
  { matricula: '20231019', disciplina: 'CCC0744', faltas: 16 },
  { matricula: '20231019', disciplina: 'CCC0945', faltas:  8 },

  { matricula: '20231024', disciplina: 'CCC0740', faltas: 13 },
  { matricula: '20231024', disciplina: 'CCC0741', faltas: 15 },
  { matricula: '20231024', disciplina: 'CCC0742', faltas: 16 }
];
