export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="card p-6 text-center">
      <div className="text-3xl font-semibold text-herbal-600">{value}</div>
      <div className="text-sm text-gray-600 mt-1">{label}</div>
    </div>
  );
}
