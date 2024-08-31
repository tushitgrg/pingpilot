"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  LabelList,
  Line,
  LineChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  Rectangle,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator"
import { Performanceone } from "@/components/dashboard/Performanceone"

import axios from "axios"
import { redirect, useRouter } from "next/navigation"
import { useEffect, useState } from "react"



export default function Page() {

    const [cuser, setCuser] = useState(null);
    const [lighthouse, setlighthouse] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const response = await axios.get('https://pingpilot.vercel.app/api/get-user');
                if (response.data) {
                    setCuser(response.data);
                } else {
                    router.push('/onboarding');
                }
            } catch (error) {
                console.error('Error fetching current user:', error);
                router.push('/');
            }
        };

        getCurrentUser();
    }, [router]);

   useEffect(()=>{
const getLighthouse = async ()=>{
  try {
    const response = await axios.get('https://pingpilot.vercel.app/api/get-lighthouse');
    if (response.data) {
        setlighthouse(response.data);
    } else {
        router.push('/onboarding');
    }
} catch (error) {
    console.error('Error fetching current user:', error);
    router.push('/');
}
}
getLighthouse()
   },[router])

    if (!cuser||!lighthouse) return <p>Loading...</p>;
  return (
    <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8 mb-5">
      <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
    
        <Card
          className="lg:max-w-md" x-chunk="charts-01-chunk-0"
        >
          <CardHeader className="space-y-0 pb-2">
            <CardDescription>Today</CardDescription>
            <CardTitle className="text-4xl tabular-nums">
              {lighthouse.uptimedata[lighthouse.uptimedata.length-1].downtimes}{" "}
              <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                downtimes
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                steps: {
                  label: "Steps",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <BarChart
                accessibilityLayer
                margin={{
                  left: -4,
                  right: -4,
                }}
                data={lighthouse.uptimedata}
              >
                <Bar
                  dataKey="downtimes"
                  fill="var(--color-steps)"
                  radius={5}
                  fillOpacity={0.6}
                  activeBar={<Rectangle fillOpacity={0.8} />}
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                  tickFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      weekday: "short",
                    })
                  }}
                />
                <ChartTooltip
                  defaultIndex={2}
                  content={
                    <ChartTooltipContent
                      hideIndicator
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      }}
                    />
                  }
                  cursor={false}
                />
               
              </BarChart>
            </ChartContainer>
          </CardContent>
        
        </Card>
       
      </div>
      <div className="grid w-full flex-1 gap-6 lg:max-w-[20rem]">
      <Performanceone score={ lighthouse.lighthouse.performance *100}/>
      <Card
          className="max-w-xs" x-chunk="charts-01-chunk-7"
        >
          <CardHeader className="space-y-0 pb-0">
            <CardDescription>Average Performance Score</CardDescription>
            <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
              {parseInt( lighthouse.avgperformance)}
              <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                %
              </span>
             
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ChartContainer
              config={{
                time: {
                  label: "Time",
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <AreaChart
                accessibilityLayer
                data={lighthouse.allperformances}
                margin={{
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="date" hide />
                <YAxis domain={["dataMin - 5", "dataMax + 2"]} hide />
                <defs>
                  <linearGradient id="fillTime" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-time)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-time)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="performance"
                  type="natural"
                  fill="url(#fillTime)"
                  fillOpacity={0.4}
                  stroke="var(--color-time)"
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                  formatter={(value) => (
                    <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                      Performance
                      <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                        {value}
                        <span className="font-normal text-muted-foreground">
                          %
                        </span>
                      </div>
                    </div>
                  )}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
       
      </div>
      <div className="grid w-full flex-1 gap-6">
        <Card
          className="max-w-xs" x-chunk="charts-01-chunk-5"
        >
          <CardContent className="flex gap-4 p-4">
            <div className="grid items-center gap-2">
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-sm text-muted-foreground">First Paint</div>
                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                  {lighthouse.lighthouse.firstContentfulPaint}
                  <span className="text-sm font-normal text-muted-foreground">
                 
                  </span>
                </div>
              </div>
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-sm text-muted-foreground">Largest Paint</div>
                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                {lighthouse.lighthouse.largestContentfulPaint}
                  <span className="text-sm font-normal text-muted-foreground">
                 
                  </span>
                </div>
              </div>
             
            </div>
            <ChartContainer
              config={{
                move: {
                  label: "First Paint",
                  color: "hsl(var(--chart-1))",
                },
                exercise: {
                  label: "Largest paint",
                  color: "hsl(var(--chart-2))",
                },
               
              }}
              className="mx-auto aspect-square w-full max-w-[80%]"
            >
              <RadialBarChart
                margin={{
                  left: -10,
                  right: -10,
                  top: -10,
                  bottom: -10,
                }}
                data={[
                
                  {
                    activity: "First Paint",
                    value: lighthouse.lighthousevalues.firstContentfulPaint,
                    fill: "var(--color-exercise)",
                  },
                  {
                    activity: "Largest paint",
                    value: lighthouse.lighthousevalues.largestContentfulPaint,
                    fill: "var(--color-move)",
                  },
                ]}
                innerRadius="20%"
                barSize={24}
                startAngle={90}
                endAngle={450}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  dataKey="value"
                  tick={false}
                />
                <RadialBar dataKey="value" background cornerRadius={5} />
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card
          className="max-w-xs" x-chunk="charts-01-chunk-4"
        >
          <CardContent className="flex gap-4 p-4 pb-2">
            <ChartContainer
              config={{
                move: {
                  label: "Move",
                  color: "hsl(var(--chart-1))",
                },
                stand: {
                  label: "Stand",
                  color: "hsl(var(--chart-2))",
                },
                exercise: {
                  label: "Exercise",
                  color: "hsl(var(--chart-3))",
                },
                
              }}
              className="h-[140px] w-full"
            >
              <BarChart
                margin={{
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 10,
                }}
                data={[
                
                  {
                    activity: "Speed Index",
                    value: lighthouse.lighthousevalues.speedIndex,
                    label: lighthouse.lighthouse.speedIndex,
                    fill: "var(--color-exercise)",
                  },
                  {
                    activity: "Time to Interactive",
                    value: lighthouse.lighthousevalues.timeToInteractive,
                    label: lighthouse.lighthouse.timeToInteractive,
                    fill: "var(--color-move)",
                  },
                  
                  {
                    activity: "Total Blocking Time",
                    value: lighthouse.lighthousevalues.totalBlockingTime,
                    label: lighthouse.lighthouse.totalBlockingTime,
                    fill: "var(--color-stand)",
                  },
                ]}
                layout="vertical"
                barSize={32}
                barGap={2}
              >
                <XAxis type="number" dataKey="value" hide />
                <YAxis
                  dataKey="activity"
                  type="category"
                  tickLine={false}
                  tickMargin={4}
                  axisLine={false}
                  className="capitalize"
                />
                <Bar dataKey="value" radius={5}>
                  <LabelList
                    position="insideLeft"
                    dataKey="label"
                    fill="white"
                    offset={8}
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex flex-row border-t p-4">
            <div className="flex w-full items-center gap-2">
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-muted-foreground">Speed Index</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
{lighthouse.lighthouse.speedIndex}
                 
                </div>
              </div>
              <Separator orientation="vertical" className="mx-2 h-10 w-px" />
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-muted-foreground">Time to Interact</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  {lighthouse.lighthouse.timeToInteractive}
                 
                </div>
              </div>
              <Separator orientation="vertical" className="mx-2 h-10 w-px" />
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-muted-foreground">Total Blocking Time</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  {lighthouse.lighthouse.totalBlockingTime}
                 
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
       
      </div>
    </div>
  )
}
