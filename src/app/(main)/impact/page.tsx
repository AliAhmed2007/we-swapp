import { getSustainabilityTotals, getCategoryBreakdown } from '@/features/sustainability/actions';
import { ImpactClient } from './impact-client';

export const metadata = {
  title: 'Campus Impact - We-Swap',
  description: 'Track our collective sustainability impact',
};

export default async function ImpactPage() {
  const totals = await getSustainabilityTotals();
  const categoryData = await getCategoryBreakdown();

  return <ImpactClient totals={totals} categoryData={categoryData} />;
}
