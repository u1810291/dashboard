
export const ITEMS_PER_PAGE = 20;

export function isPaginable(total) {
  return total > ITEMS_PER_PAGE;
}
