export const getSavedBookIds = (): number[] => {
  try {
    const raw = localStorage.getItem("booksphere_saved_book_ids");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const isBookSaved = (id: number): boolean => {
  const ids = getSavedBookIds();
  return ids.includes(id);
};

export const toggleSaveBook = (id: number): boolean => {
  const ids = getSavedBookIds();
  let updated: number[];
  let isSaved = false;

  if (ids.includes(id)) {
    updated = ids.filter((bId) => bId !== id);
    isSaved = false;
  } else {
    updated = [...ids, id];
    isSaved = true;
  }

  localStorage.setItem("booksphere_saved_book_ids", JSON.stringify(updated));
  return isSaved;
};
