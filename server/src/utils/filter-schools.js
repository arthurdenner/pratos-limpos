const filterSchools = (normalized = [], current = []) => {
  const currentNames = current.map(s => s.name);

  return normalized.filter(school => !currentNames.includes(school.name));
};

module.exports = filterSchools;
