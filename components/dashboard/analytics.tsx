'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ArrowUp, DollarSign, Users, Video } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { usePayments } from '../payments/payments-provider';

const engagementData = [
  { name: 'Jan', engagement: 4000 },
  { name: 'Feb', engagement: 3000 },
  { name: 'Mar', engagement: 2000 },
  { name: 'Apr', engagement: 2780 },
  { name: 'May', engagement: 1890 },
  { name: 'Jun', engagement: 2390 },
  { name: 'Jul', engagement: 3490 },
];

const chartConfig = {
  engagement: {
    label: 'Engagement',
    color: 'hsl(var(--primary))',
  },
};

export function Analytics() {
  const { payments } = usePayments();

  const totalEarnings = payments
    .filter(p => p.status === 'Completed')
    .reduce((acc, p) => acc + p.totalAmount, 0);

  const pendingPayments = payments
    .filter(p => p.status !== 'Completed')
    .reduce((acc, p) => acc + p.remainingAmount, 0);

  const kpiData = [
    {
      title: 'Total Earnings',
      value: `$${totalEarnings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: '+20.1% from last month',
      icon: DollarSign,
    },
    {
      title: 'Total Campaigns',
      value: `+${payments.length}`,
      change: '+180.1% from last month',
      icon: Video,
    },
    {
      title: 'Pending Payments',
      value: `$${pendingPayments.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: '+19% from last month',
      icon: DollarSign,
    },
    {
      title: 'Top Creator',
      value: 'Addison Rae',
      change: '5 Active Campaigns',
      icon: Users,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">{kpi.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Engagement Overview</CardTitle>
          <CardDescription>Monthly campaign engagement statistics.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <ResponsiveContainer>
              <BarChart data={engagementData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar
                  dataKey="engagement"
                  fill="var(--color-engagement)"
                  radius={4}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
