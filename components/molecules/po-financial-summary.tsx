import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { PODetails } from "@/lib/po-extraction-service";
import { formatString } from "@/lib/format-utils";

interface POFinancialSummaryProps {
  poDetails: PODetails;
}

export function POFinancialSummary({ poDetails }: POFinancialSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {poDetails.totalAmountExcludingTax !== null &&
            poDetails.totalAmountExcludingTax !== undefined && (
              <div>
                <Label className="text-muted-foreground">
                  Amount (Excl. Tax)
                </Label>
                <p className="text-2xl font-bold">
                  {formatString(poDetails.currencyCode, "USD")}{" "}
                  {poDetails.totalAmountExcludingTax}
                </p>
              </div>
            )}
          {poDetails.totalTaxAmount !== null &&
            poDetails.totalTaxAmount !== undefined && (
              <div>
                <Label className="text-muted-foreground">Tax Amount</Label>
                <p className="text-2xl font-bold">
                  {formatString(poDetails.currencyCode, "USD")}{" "}
                  {poDetails.totalTaxAmount}
                </p>
              </div>
            )}
          {poDetails.totalAmountIncludingTax !== null &&
            poDetails.totalAmountIncludingTax !== undefined && (
              <div>
                <Label className="text-muted-foreground">
                  Total Amount (Incl. Tax)
                </Label>
                <p className="text-2xl font-bold">
                  {formatString(poDetails.currencyCode, "USD")}{" "}
                  {poDetails.totalAmountIncludingTax}
                </p>
              </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
