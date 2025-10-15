import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PODetails } from "@/lib/po-extraction-service";
import { formatCurrency, formatString, formatNumber } from "@/lib/format-utils";

interface POItemsTableProps {
  poDetails: PODetails;
}

export function POItemsTable({ poDetails }: POItemsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Items</CardTitle>
        <CardDescription>
          {poDetails.orderItems?.length ?? 0} item(s) in this order
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item No</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>PO Item No</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>UOM</TableHead>
                <TableHead>Shipment Date</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(poDetails.orderItems ?? []).map((item, index) => {
                const quantity = formatNumber(item.quantity);
                const unitPrice = formatNumber(item.unitprice);
                const total = quantity * unitPrice;

                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {formatString(item.itemNo, "-")}
                    </TableCell>
                    <TableCell>{formatString(item.code, "-")}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {formatString(item.itemDescription, "No description")}
                        </p>
                        {item.poDescription && (
                          <p className="text-sm text-muted-foreground">
                            {item.poDescription}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatString(item.poItemNumber, "-")}
                    </TableCell>
                    <TableCell>{quantity}</TableCell>
                    <TableCell>
                      {formatString(poDetails.currencyCode, "USD")}{" "}
                      {formatCurrency(unitPrice)}
                    </TableCell>
                    <TableCell>
                      {formatString(item.unitOfMeasureCode, "-")}
                    </TableCell>
                    <TableCell>
                      {formatString(item.shipmentDate, "-")}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatString(poDetails.currencyCode, "USD")}{" "}
                      {formatCurrency(total)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
