import React from 'react'; const X=()=> (<>
            <>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Welcome back, Admin!</h1>
                  <p className="mt-1 text-sm text-gray-400">Here is what is happening with NewsSphere AI today.</p>
                </div>
                <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm text-gray-200">
                <CalendarDays size={16} /> May 15 - May 21, 2026
              </button>
              <button onClick={exportReport} className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm text-gray-200">
                <Download size={16} /> Export Report
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              const spark = metric.data.map((value, index) => ({ index, value }));

              return (
                <Card key={metric.label} className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br ${metric.color} shadow-glass-sm`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">{metric.label}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className="text-xs text-emerald-400">{metric.change} vs last 7 days</p>
                    </div>
                  </div>
                  <div className="mt-3 h-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={spark}>
                        <Line type="monotone" dataKey="value" stroke="#b833ff" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="grid gap-4 2xl:grid-cols-[minmax(0,1fr)_240px]">
            <div className="space-y-4">
              <div className="grid gap-4 xl:grid-cols-[1.15fr_0.9fr_1fr]">
                <Card className="p-4">
                  <SectionHeader title="Article Views Overview" action={<span className="rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-300">Last 7 Days</span>} />
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={weekData}>
                        <defs>
                          <linearGradient id="views" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#b833ff" stopOpacity={0.45} />
                            <stop offset="95%" stopColor="#b833ff" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid stroke="#1f2745" vertical={false} />
                        <XAxis dataKey="day" stroke="#8b93a7" tick={{ fontSize: 11 }} />
                        <YAxis stroke="#8b93a7" tick={{ fontSize: 11 }} />
                        <Tooltip contentStyle={{ backgroundColor: '#0B1026', border: '1px solid rgba(255,255,255,0.12)' }} />
                        <Area type="monotone" dataKey="views" stroke="#b833ff" fill="url(#views)" strokeWidth={3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                <Card className="p-4">
                  <SectionHeader title="Category Wise Traffic" />
                  <div className="grid gap-4 md:grid-cols-[1fr_130px]">
                    <div className="h-56">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={categories} dataKey="value" innerRadius={48} outerRadius={88} paddingAngle={1}>
                            {categories.map((item) => <Cell key={item.name} fill={item.color} />)}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-2 self-center">
                      {categories.map((item) => (
                        <div key={item.name} className="flex items-center justify-between gap-2 text-xs">
                          <span className="flex items-center gap-2 text-gray-300"><span className="h-2 w-2 rounded-full" style={{ background: item.color }} />{item.name}</span>
                          <span className="text-gray-300">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <SectionHeader title="User Engagement" action={<span className="rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-300">Last 7 Days</span>} />
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weekData}>
                        <CartesianGrid stroke="#1f2745" vertical={false} />
                        <XAxis dataKey="day" stroke="#8b93a7" tick={{ fontSize: 11 }} />
                        <YAxis stroke="#8b93a7" tick={{ fontSize: 11 }} />
                        <Tooltip contentStyle={{ backgroundColor: '#0B1026', border: '1px solid rgba(255,255,255,0.12)' }} />
                        <Line type="monotone" dataKey="views" stroke="#b833ff" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="sessions" stroke="#00d4ff" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="users" stroke="#14b8a6" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>

              <div className="grid gap-4 xl:grid-cols-[0.9fr_0.95fr_1fr]">
                <Card className="p-4">
                  <SectionHeader title="Source Credibility Score" />
                  <div className="space-y-3">
                    {sourceScores.map(([name, score]) => (
                      <div key={name} className="grid grid-cols-[90px_1fr_44px] items-center gap-3 text-xs">
                        <span className="text-gray-300">{name}</span>
                        <div className="h-2 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full rounded-full bg-gradient-neon" style={{ width: `${score}%` }} />
                        </div>
                        <span className="text-right text-gray-200">{score}/100</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-4">
                  <SectionHeader title="Trending Topics" />
                  <div className="flex flex-wrap gap-3">
                    {topics.map(([topic, size]) => (
                      <span
                        key={topic}
                        className={`rounded-lg bg-white/5 px-3 py-2 font-semibold ${
                          size === 'xl' ? 'text-2xl text-neon-cyan' : size === 'lg' ? 'text-xl text-fuchsia-300' : 'text-xs text-gray-300'
                        }`}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </Card>

                <Card className="p-4">
                  <SectionHeader title="Daily Active Users" action={<span className="rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-300">Last 7 Days</span>} />
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={activeUsers}>
                        <defs>
                          <linearGradient id="bars" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ff4bd8" />
                            <stop offset="100%" stopColor="#00a3ff" />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="day" stroke="#8b93a7" tick={{ fontSize: 11 }} />
                        <YAxis stroke="#8b93a7" tick={{ fontSize: 11 }} />
                        <Tooltip contentStyle={{ backgroundColor: '#0B1026', border: '1px solid rgba(255,255,255,0.12)' }} />
                        <Bar dataKey="users" fill="url(#bars)" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>

              <Card className="overflow-hidden p-4">
                <SectionHeader title="Recent Articles" />
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead className="text-xs text-gray-400">
                      <tr>
                        <th className="px-3 py-3 font-medium">Title</th>
                        <th className="px-3 py-3 font-medium">Category</th>
                        <th className="px-3 py-3 font-medium">Author</th>
                        <th className="px-3 py-3 font-medium">Status</th>
                        <th className="px-3 py-3 font-medium">Views</th>
                        <th className="px-3 py-3 font-medium">Published On</th>
                        <th className="px-3 py-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {articles.map(([title, category, author, status, views]) => (
                        <tr key={title} className="border-t border-white/5 text-gray-300">
                          <td className="max-w-[360px] px-3 py-4 text-white">{title}</td>
                          <td className="px-3 py-4"><span className={`rounded-md px-2 py-1 text-xs ${tagColors[category]}`}>{category}</span></td>
                          <td className="px-3 py-4">{author}</td>
                          <td className="px-3 py-4"><span className="rounded-md bg-emerald-500/15 px-2 py-1 text-xs text-emerald-300">{status}</span></td>
                          <td className="px-3 py-4">{views}</td>
                          <td className="px-3 py-4">May 21, 2026</td>
                          <td className="px-3 py-4">
                            <div className="flex gap-3 text-gray-300">
                              <Eye size={16} />
                              <Edit3 size={16} />
                              <Trash2 size={16} className="text-neon-pink" />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            <aside className="space-y-4">
              <Card className="p-4">
                <SectionHeader title="Real-time Activity" action={<span className="flex items-center gap-2 text-xs text-neon-pink"><span className="h-2 w-2 rounded-full bg-neon-pink" />Live</span>} />
                <div className="space-y-4">
                  {activity.map(([event, time, Icon]) => (
                    <div key={event} className="flex items-center justify-between gap-3 text-xs">
                      <span className="flex items-center gap-3 text-gray-200"><Icon size={16} className="text-gray-300" />{event}</span>
                      <span className="text-gray-500">{time}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-5 w-full rounded-lg border border-white/10 bg-white/5 py-3 text-sm text-blue-300">View All Activity</button>
              </Card>

              <Card className="p-4">
                <SectionHeader title="Top Performing Articles" />
                <div className="space-y-3">
                  {topArticles.map(([title, category, views], index) => (
                    <div key={title} className="flex items-center gap-3">
                      <div className="flex h-11 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple text-xs font-bold">{index + 1}</div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs text-white">{title}</p>
                        <p className="text-xs text-neon-cyan">{category}</p>
                      </div>
                      <span className="text-xs text-gray-300">{views}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-5 w-full rounded-lg border border-white/10 bg-white/5 py-3 text-sm text-blue-300">View All Articles</button>
              </Card>

              <Card className="p-4">
                <SectionHeader title="AI Search Analytics" />
                <div className="grid gap-4 md:grid-cols-[1fr_120px] 2xl:grid-cols-1">
                  <div className="flex h-36 items-center justify-center rounded-lg border border-neon-blue/20 bg-[radial-gradient(circle,_rgba(0,212,255,0.22),_transparent_60%)]">
                    <Activity size={64} className="text-neon-cyan" />
                  </div>
                  <div className="space-y-3 rounded-lg border border-white/10 bg-white/5 p-3">
                    {[
                      ['Articles', 18, '#6366f1'],
                      ['Comments', 10, '#b833ff'],
                      ['Users', 4, '#f59e0b'],
                    ].map(([label, value, color]) => (
                      <div key={label} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-gray-300"><span className="h-3 w-3 rounded" style={{ background: color }} />{label}</span>
                        <span className="text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="mt-5 w-full rounded-lg border border-white/10 bg-white/5 py-3 text-sm text-blue-300">View Full Analytics</button>
              </Card>
            </aside>
          </div>
</>);
