exports.getPagination = (page = 1, limit = 10) => {
  const pageNum = Math.max(parseInt(page) || 1, 1);
  const limitNum = Math.min(Math.max(parseInt(limit) || 10, 1), 100);
  const offset = (pageNum - 1) * limitNum;
  return { limit: limitNum, offset, page: pageNum };
};
