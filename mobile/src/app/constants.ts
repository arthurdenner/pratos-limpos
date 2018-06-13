export const APP_KEY = '--pratos--limpos';
export const API_URL = 'http://localhost:7777';
// export const API_URL = 'https://api-quanto-custa.now.sh/';

export const LABELS = {
  teveMerenda: 'Teve merenda hoje?',
  porqueNaoTeveMerenda: 'Por que não teve?',
  recebeuMerenda: 'Você recebeu merenda?',
  porqueNaoRecebeuMerenda: 'Por que não recebeu?',
  quantidadeFoiSuficiente: 'A quantidade recebida foi suficiente?',
  qualidadeDaMerendaRecebida: 'Qual a qualidade da merenda recebida?',
  nivelDeSatisfacao: 'Qual seu nível de satisfação?',

  sim: 'Sim',
  nao: 'Não',

  naoTinhaComida: 'Não tinha comida',
  naoTinhaMerendeira: 'Não tinha merendeira',
  naoSei: 'Não sei',

  naoTinhaComidaSuficiente: 'Não tinha comida suficiente',
  merendaNegadaAoAluno: 'A merenda foi negada a mim',

  muitoRuim: 'Muito ruim',
  ruim: 'Ruim',
  regular: 'Regular',
  boa: 'Boa',
  muitoBoa: 'Muito boa',

  muitoInsatisfeito: 'Muito insatisfeito',
  insatisfeito: 'Insatisfeito',
  indiferente: 'Indiferente',
  satisfeito: 'Satisfeito',
  muitoSatisfeito: 'Muito satisfeito',
};

const NO_USER_FOUND = 'There is no user record corresponding to this identifier. The user may have been deleted.';
const WRONG_PASSWORD = 'The password is invalid or the user does not have a password.';
const USED_EMAIL = 'The email address is already in use by another account.';

const ERRORS = {
  [NO_USER_FOUND]: 'Não há usuário com o e-mail informado',
  [WRONG_PASSWORD]: 'Senha incorreta',
  [USED_EMAIL]: 'Já existe conta com o e-mail informado',
  localStorage: 'Houve um erro ao ler os dados do aplicativo',
  signOut: 'Houve um erro ao tentar sair do aplicativo'
}

export const getErrorMessage = errorMessage => ERRORS[errorMessage] || 'Ocorreu um erro';
