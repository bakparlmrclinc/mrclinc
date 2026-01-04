import { Decimal } from "@prisma/client/runtime/library";

interface PDEarningsProps {
  totalEarned: Decimal | number;
  totalBonus: Decimal | number;
  unpaidAmount: Decimal | number;
  unpaidBonus: Decimal | number;
}

export default function PDEarnings({
  totalEarned,
  totalBonus,
  unpaidAmount,
  unpaidBonus,
}: PDEarningsProps) {
  const formatCurrency = (amount: Decimal | number) => {
    const num = typeof amount === "number" ? amount : Number(amount);
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "EUR",
    }).format(num);
  };

  const total = Number(totalEarned) + Number(totalBonus);
  const unpaid = Number(unpaidAmount) + Number(unpaidBonus);

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <h3 className="font-medium text-slate-800 mb-3">
        Hak Ediş (Entitlement)
      </h3>
      <dl className="space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-slate-500">Total Earned</dt>
          <dd className="text-slate-700 font-medium">{formatCurrency(total)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Base Amount</dt>
          <dd className="text-slate-600">{formatCurrency(totalEarned)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Bonus Amount</dt>
          <dd className="text-slate-600">{formatCurrency(totalBonus)}</dd>
        </div>
        <div className="pt-2 border-t border-slate-200">
          <div className="flex justify-between">
            <dt className="text-amber-600">Unpaid</dt>
            <dd className="text-amber-600 font-medium">{formatCurrency(unpaid)}</dd>
          </div>
        </div>
      </dl>
    </div>
  );
}
