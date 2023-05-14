export const sortByName = (a, b) => {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  return 0;
};

export const sortByLastName = (a, b) => {
  const nameA = a.name.split(" ")[1].toUpperCase();
  const nameB = b.name.split(" ")[1].toUpperCase();

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  return 0;
};

export const sortByEmail = (a, b) => {
  const emailA = a.email.toUpperCase();
  const emailB = b.email.toUpperCase();

  if (emailA < emailB) {
    return -1;
  }
  if (emailA > emailB) {
    return 1;
  }

  return 0;
};

export const sortByTitle = (a, b) => {
  const titleA = a.title.toUpperCase();
  const titleB = b.title.toUpperCase();

  if (titleA < titleB) {
    return -1;
  }
  if (titleA > titleB) {
    return 1;
  }

  return 0;
};

export const sortByAuthor = (a, b) => {
  const authorA = a.author.toUpperCase();
  const authorB = b.author.toUpperCase();

  if (authorA < authorB) {
    return -1;
  }
  if (authorA > authorB) {
    return 1;
  }

  return 0;
};

export const sortByPrice = (a, b) => {
  return a.price - b.price;
};

export const sortByStatus = (a, b) => {
  if (a.status < b.status) {
    return -1;
  }
  if (a.status > b.status) {
    return 1;
  }

  return 0;
};

export const sortByAvailableStock = (a, b) => {
  return a.availableStock - b.availableStock;
};
