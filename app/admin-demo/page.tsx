import Link from 'next/link';

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-black text-white p-8 font-sans">

            {/* Header */}
            <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                        AI Sales Command Center
                    </h1>
                    <p className="text-gray-400 mt-1">Real-time Lead Acquisition & Conversion Engine</p>
                </div>
                <div className="flex gap-4">
                    <div className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-green-400 text-sm font-medium">System Active</span>
                    </div>
                    <Link href="/" className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-sm transition-colors">
                        View Live Site
                    </Link>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* KPI Cards */}
                <div className="col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <Card title="Acquired Leads" value="128" change="+12% this week" color="blue" />
                    <Card title="AI Qualified" value="84" change="65% conversion" color="indigo" />
                    <Card title="Site Visits Booked" value="32" change="+8 today" color="green" />
                    <Card title="Est. Revenue Pipeline" value="$2.4M" change="High Value" color="amber" />
                </div>

                {/* Live Conversation Feed */}
                <div className="col-span-2 bg-zinc-900/50 rounded-2xl border border-white/10 p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <span className="text-xl">💬</span> Live AI Conversations
                    </h3>
                    <div className="space-y-4">
                        <ConversationItem
                            name="Rahul Sharma"
                            status="Booking"
                            lastMsg="Does Saturday 10 AM work for the site visit?"
                            time="Now"
                        />
                        <ConversationItem
                            name="Priya V."
                            status="Qualifying"
                            lastMsg="I am looking for a 2400 sqft plot near the highway."
                            time="2m ago"
                        />
                        <ConversationItem
                            name="Unknown (WhatsApp)"
                            status="Acquisition"
                            lastMsg="Send me details about the new project."
                            time="5m ago"
                        />
                    </div>
                </div>

                {/* Calendar Sim */}
                <div className="col-span-1 bg-zinc-900/50 rounded-2xl border border-white/10 p-6">
                    <h3 className="text-lg font-semibold mb-4 text-white">📅 Upcoming Visits</h3>
                    <div className="space-y-3">
                        <VisitItem name="Rahul S." time="Sat, 10:00 AM" location="Green Valley" confirmed={true} />
                        <VisitItem name="Amit K." time="Sat, 02:00 PM" location="North Ave" confirmed={true} />
                        <VisitItem name="Sneha R." time="Sun, 11:30 AM" location="Green Valley" confirmed={false} />
                    </div>
                </div>
            </div>
        </div>
    );
}

const Card = ({ title, value, change, color }: { title: string, value: string, change: string, color: string }) => {
    const colors: Record<string, string> = {
        blue: "text-blue-400 border-blue-500/20 bg-blue-500/5",
        indigo: "text-indigo-400 border-indigo-500/20 bg-indigo-500/5",
        green: "text-green-400 border-green-500/20 bg-green-500/5",
        amber: "text-amber-400 border-amber-500/20 bg-amber-500/5",
    };

    return (
        <div className={`p-6 rounded-xl border ${colors[color]}`}>
            <p className="text-sm text-gray-400 mb-1">{title}</p>
            <h2 className="text-3xl font-bold text-white mb-2">{value}</h2>
            <p className={`text-xs font-medium opacity-80`}>{change}</p>
        </div>
    );
}

const ConversationItem = ({ name, status, lastMsg, time }: { name: string, status: string, lastMsg: string, time: string }) => (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-black/40 border border-white/5 hover:border-white/10 transition-colors">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-xs font-bold">
            {name[0]}
        </div>
        <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium text-white text-sm">{name}</h4>
                <span className="text-xs text-gray-500">{time}</span>
            </div>
            <p className="text-xs text-gray-400 mb-2 line-clamp-1">"{lastMsg}"</p>
            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${status === 'Booking' ? 'bg-green-500/10 border-green-500/30 text-green-400' :
                    status === 'Qualifying' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' :
                        'bg-zinc-700 border-zinc-600 text-gray-400'
                }`}>
                {status}
            </span>
        </div>
    </div>
)

const VisitItem = ({ name, time, location, confirmed }: { name: string, time: string, location: string, confirmed: boolean }) => (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-black/40 border border-white/5">
        <div className={`w-2 h-full min-h-[40px] rounded-full ${confirmed ? 'bg-green-500' : 'bg-amber-500'}`}></div>
        <div>
            <h5 className="text-sm font-medium text-white">{name}</h5>
            <p className="text-xs text-gray-400">{time} • {location}</p>
        </div>
    </div>
)
