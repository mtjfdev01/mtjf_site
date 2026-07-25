/** Project IDs that should use Stripe test checkout (`/test-checkout`). */
export const TEST_CHECKOUT_PROJECT_IDS = ['food-pack']

export function usesTestCheckout(projectId) {
  return TEST_CHECKOUT_PROJECT_IDS.includes(projectId)
}

/**
 * Resolve checkout route from one or more project IDs (e.g. cart lines).
 * If any line is a test-checkout project → `/test-checkout`, else `/checkout`.
 */
export function getCheckoutPathForProjects(projectIds = []) {
  const ids = (Array.isArray(projectIds) ? projectIds : [projectIds]).filter(Boolean)
  if (ids.some((id) => usesTestCheckout(id))) {
    return '/test-checkout'
  }
  return '/checkout'
}
