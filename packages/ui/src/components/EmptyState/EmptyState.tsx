import { Card, CardDescription, CardHeader, CardTitle } from "@app/ui/components/ui/card";

export interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <Card className="border-dashed shadow-none">
      <CardHeader className="items-center py-12 text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
