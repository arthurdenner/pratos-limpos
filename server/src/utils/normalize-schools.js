const omitKeys = (keysToDelete, obj) => {
  const newObject = obj;

  keysToDelete.forEach(key => delete newObject[key]);

  return newObject;
};

const renameKeys = (newKeys, obj) => {
  const keyValues = Object.keys(obj).map(key => {
    const newKey = newKeys[key] || key;

    return { [newKey]: obj[key] };
  });

  return Object.assign({}, ...keyValues);
};

const newKeys = {
  'properties/Nome': 'nome',
  'properties/Município': 'municipio',
  'properties/Endereço': 'endereco',
  'properties/Cep': 'cep',
  'properties/Telefone': 'telefone',
  'properties/Etapas': 'etapas',
  'properties/Código': 'codigo',
};

const keysToDelete = [
  'type',
  'geometry/type',
  'geometry/coordinates/0',
  'geometry/coordinates/1',
  'geometry/coordinates/2',
];

const normalizedSchools = schools =>
  schools.map(item => renameKeys(newKeys, omitKeys(keysToDelete, item)));

module.exports = normalizedSchools;
