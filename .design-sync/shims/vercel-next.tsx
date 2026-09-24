// Stand-in for @vercel/analytics/next and @vercel/speed-insights/next in the
// design-sync bundle. Both mount only from RootHtml (lib/site.tsx); a design
// built from these components must not report page views to the live site.
export function Analytics() {
  return null;
}

export function SpeedInsights() {
  return null;
}
