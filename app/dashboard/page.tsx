import { ArrowUp, ArrowDown, Users, Wallet, AlertCircle, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const stats = [
  { title: "Total Revenue", value: "KES 4.2M", change: "+12.5%", trend: "up", icon: Wallet, color: "text-green-500" },
  { title: "Occupancy Rate", value: "94%", change: "+2.1%", trend: "up", icon: Users, color: "text-blue-500" },
  { title: "Late Payments", value: "12", change: "-5", trend: "down", icon: AlertCircle, color: "text-red-500" }, // Good that it's down
  { title: "Properties", value: "48", change: "+4", trend: "up", icon: Building2, color: "text-purple-500" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back. Here is what is happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="p-6 glass-card rounded-xl border border-white/10 hover:border-primary/30 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-2 rounded-lg bg-white/5", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={cn("text-xs font-medium px-2 py-1 rounded-full bg-white/5", stat.trend === 'up' ? 'text-green-400' : 'text-red-400')}>
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.title}</div>
          </div>
        ))}
      </div>

      {/* Main Content Split */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Revenue Chart Placeholder */}
        <div className="lg:col-span-2 glass-card rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Revenue Analytics</h3>
            <select className="bg-black/30 border border-white/10 rounded-lg text-sm px-3 py-1 outline-none">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>

          {/* Visual Bar Chart */}
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {[65, 59, 80, 81, 56, 55, 40, 70, 75, 85, 90, 88].map((val, i) => (
              <div key={i} className="w-full bg-white/5 rounded-t-lg relative group h-full flex flex-col justify-end">
                <div
                  style={{ height: `${val}%` }}
                  className="w-full bg-primary/20 group-hover:bg-primary transition-all duration-500 rounded-t-sm"
                />
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-2 py-1 rounded transition-opacity">
                  {val}%
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-muted-foreground px-2">
            <span>Jan</span><span>Apr</span><span>Aug</span><span>Dec</span>
          </div>
        </div>

        {/* Recent Payments Feed */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-bold mb-4">Recent Payments</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-xs font-bold">
                    KP
                  </div>
                  <div>
                    <div className="text-sm font-medium">Tenant #{100 + i}</div>
                    <div className="text-xs text-muted-foreground">Unit B-{i + 1}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-green-400">+ 15,000</div>
                  <div className="text-xs text-muted-foreground">Just now</div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm text-primary hover:text-amber-300 transition-colors">
            View All Transactions
          </button>
        </div>
      </div>
    </div>
  );
}
