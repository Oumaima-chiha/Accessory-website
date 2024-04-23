function paginate(content, totalElements, page = 1, size = 10) {
  // Calculate total pages
  const totalPages = Math.ceil(totalElements / size);

  // Construct the pagination response
  return {
    pageSize: content.length,
    currentPage: page,
    totalPages: totalPages,
    content: content,
    totalElements: totalElements,
  };
}

module.exports = { paginate };
