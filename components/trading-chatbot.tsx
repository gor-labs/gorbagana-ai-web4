"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Bot,
  Send,
  RefreshCw,
  Brain,
  Activity,
  PieChart,
  Bell,
  Settings,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

interface TradingMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
  type?: "analysis" | "alert" | "order" | "general"
  data?: any
}

interface MarketData {
  symbol: string
  price: number
  change24h: number
  volume: number
  marketCap: number
  rsi: number
  macd: string
  trend: "bullish" | "bearish" | "neutral"
}

interface Portfolio {
  totalValue: number
  pnl: number
  pnlPercent: number
  assets: Array<{
    symbol: string
    amount: number
    value: number
    change: number
  }>
}

export default function TradingChatbot() {
  const [messages, setMessages] = useState<TradingMessage[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "🚀 Welcome to Gorbagana Trading AI! I'm your advanced trading assistant powered by real-time market data and AI analysis.\n\n✨ What I can help you with:\n• Real-time market analysis & price alerts\n• Technical analysis & trading signals\n• Portfolio management & risk assessment\n• DeFi opportunities & yield farming\n• News sentiment & market predictions\n\nTry asking: 'Analyze GOR token' or 'Show my portfolio'",
      timestamp: new Date().toLocaleTimeString(),
      type: "general",
    },
  ])

  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [marketData, setMarketData] = useState<MarketData[]>([
    {
      symbol: "GOR",
      price: 0.037,
      change24h: 5.2,
      volume: 1200000,
      marketCap: 37000000,
      rsi: 65,
      macd: "bullish",
      trend: "bullish",
    },
    {
      symbol: "SOL",
      price: 185.42,
      change24h: -2.1,
      volume: 890000000,
      marketCap: 87000000000,
      rsi: 45,
      macd: "bearish",
      trend: "bearish",
    },
    {
      symbol: "BTC",
      price: 97250,
      change24h: 1.8,
      volume: 25000000000,
      marketCap: 1920000000000,
      rsi: 58,
      macd: "neutral",
      trend: "neutral",
    },
  ])

  const [portfolio, setPortfolio] = useState<Portfolio>({
    totalValue: 12450.75,
    pnl: 1250.3,
    pnlPercent: 11.2,
    assets: [
      { symbol: "GOR", amount: 50000, value: 1850, change: 15.2 },
      { symbol: "SOL", amount: 25, value: 4635.5, change: -2.1 },
      { symbol: "BTC", amount: 0.06, value: 5835, change: 1.8 },
      { symbol: "USDC", amount: 130.25, value: 130.25, change: 0 },
    ],
  })

  const [activeAlerts, setActiveAlerts] = useState([
    { symbol: "GOR", condition: "price > $0.04", status: "active" },
    { symbol: "SOL", condition: "RSI < 30", status: "triggered" },
    { symbol: "BTC", condition: "volume spike > 50%", status: "active" },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateTradingResponse = (userInput: string): TradingMessage => {
    const input = userInput.toLowerCase()

    // Market Analysis Responses
    if (input.includes("analyze") || input.includes("analysis")) {
      if (input.includes("gor")) {
        return {
          id: Date.now().toString(),
          role: "assistant",
          content: `📊 **GOR Token Analysis** (Real-time)\n\n💰 **Price Action:**\n• Current: $0.037 (+5.2% 24h)\n• Volume: $1.2M (High activity)\n• Market Cap: $37M\n\n📈 **Technical Indicators:**\n• RSI: 65 (Slightly overbought)\n• MACD: Bullish crossover\n• Support: $0.035 | Resistance: $0.042\n\n🎯 **AI Prediction:**\n• Short-term: Bullish momentum\n• Target: $0.045 (21% upside)\n• Risk Level: Medium\n\n⚠️ **Trading Signal:** BUY with stop-loss at $0.033`,
          timestamp: new Date().toLocaleTimeString(),
          type: "analysis",
        }
      }
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: `📊 **Market Overview Analysis**\n\n🔥 **Top Movers:**\n• GOR: +5.2% (Strong momentum)\n• BTC: +1.8% (Consolidating)\n• SOL: -2.1% (Oversold opportunity)\n\n📈 **Market Sentiment:** Cautiously Optimistic\n• Fear & Greed Index: 68 (Greed)\n• DeFi TVL: $45.2B (+2.1%)\n• Institutional Flow: +$120M\n\n🎯 **AI Recommendations:**\n1. Consider GOR accumulation\n2. SOL oversold bounce potential\n3. BTC range-bound trading`,
        timestamp: new Date().toLocaleTimeString(),
        type: "analysis",
      }
    }

    // Portfolio Responses
    if (input.includes("portfolio") || input.includes("balance")) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: `💼 **Portfolio Summary**\n\n💰 **Total Value:** $12,450.75\n📈 **P&L:** +$1,250.30 (+11.2%)\n\n🏆 **Top Performers:**\n• GOR: +15.2% ($1,850)\n• BTC: +1.8% ($5,835)\n\n📊 **Asset Allocation:**\n• BTC: 46.9% ($5,835)\n• SOL: 37.2% ($4,635)\n• GOR: 14.9% ($1,850)\n• USDC: 1.0% ($130)\n\n⚡ **Rebalancing Suggestion:**\nConsider taking profits on GOR and increasing SOL position during dip.`,
        timestamp: new Date().toLocaleTimeString(),
        type: "analysis",
      }
    }

    // Trading Signals
    if (input.includes("signal") || input.includes("trade") || input.includes("buy") || input.includes("sell")) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: `🎯 **Live Trading Signals**\n\n🟢 **BUY Signals:**\n• GOR: Strong momentum, RSI 65\n  Entry: $0.037 | Target: $0.045 | Stop: $0.033\n\n🟡 **WATCH Signals:**\n• SOL: Oversold bounce setup\n  Wait for RSI < 30 confirmation\n\n🔴 **AVOID:**\n• High-risk altcoins in current market\n\n⚡ **Quick Scalp Opportunity:**\nGOR 5-minute chart showing bullish flag pattern. Quick 3-5% move expected.\n\n🤖 **AI Confidence:** 78% (High)`,
        timestamp: new Date().toLocaleTimeString(),
        type: "alert",
      }
    }

    // DeFi and Yield
    if (input.includes("defi") || input.includes("yield") || input.includes("farm")) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: `🌾 **DeFi Yield Opportunities**\n\n🔥 **High APY Pools:**\n• GOR-SOL LP: 45.2% APY (Raydium)\n• SOL Staking: 7.1% APY (Marinade)\n• USDC Lending: 12.8% APY (Solend)\n\n💎 **Arbitrage Opportunities:**\n• GOR price difference: 2.1% between DEXs\n• Estimated profit: $420 on $20K trade\n\n⚠️ **Risk Assessment:**\n• Impermanent Loss Risk: Medium\n• Smart Contract Risk: Low\n• Liquidity Risk: Low\n\n🎯 **Recommendation:** GOR-SOL LP for balanced risk/reward`,
        timestamp: new Date().toLocaleTimeString(),
        type: "analysis",
      }
    }

    // News and Sentiment
    if (input.includes("news") || input.includes("sentiment")) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: `📰 **Market News & Sentiment**\n\n🔥 **Breaking News:**\n• Solana ecosystem growth +25% this month\n• Major DeFi protocol launching on Solana\n• Institutional adoption increasing\n\n📊 **Sentiment Analysis:**\n• Social Media: 72% Bullish\n• Whale Activity: Accumulating\n• Developer Activity: High\n\n🎯 **Impact on GOR:**\n• Positive correlation with SOL ecosystem\n• Increased trading volume expected\n• Technical breakout likely\n\n⚡ **Action Items:**\n1. Monitor SOL ecosystem developments\n2. Watch for volume confirmation\n3. Set alerts for key levels`,
        timestamp: new Date().toLocaleTimeString(),
        type: "general",
      }
    }

    // Risk Management
    if (input.includes("risk") || input.includes("stop") || input.includes("loss")) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: `🛡️ **Risk Management Analysis**\n\n⚠️ **Current Portfolio Risk:**\n• Risk Score: 6.5/10 (Medium-High)\n• Max Drawdown: -15.2%\n• Sharpe Ratio: 1.8\n\n🎯 **Position Sizing:**\n• GOR: Reduce to 10% (currently 14.9%)\n• Add USDC buffer: Increase to 5%\n• Diversify into 2-3 more assets\n\n🔒 **Stop-Loss Recommendations:**\n• GOR: $0.033 (-10.8%)\n• SOL: $175 (-5.6%)\n• BTC: $92,000 (-5.4%)\n\n💡 **Risk Optimization:**\nImplement trailing stops and consider hedging with inverse positions during high volatility periods.`,
        timestamp: new Date().toLocaleTimeString(),
        type: "alert",
      }
    }

    // Default response
    return {
      id: Date.now().toString(),
      role: "assistant",
      content: `🤖 I'm here to help with your trading needs! Here are some things you can ask me:\n\n📊 **Market Analysis:**\n• "Analyze GOR token"\n• "Show market overview"\n• "What's the sentiment?"\n\n💼 **Portfolio Management:**\n• "Show my portfolio"\n• "Risk assessment"\n• "Rebalancing suggestions"\n\n🎯 **Trading Signals:**\n• "Give me trading signals"\n• "Best buy opportunities"\n• "DeFi yield farming"\n\n⚡ Try any of these or ask me anything about trading!`,
      timestamp: new Date().toLocaleTimeString(),
      type: "general",
    }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: TradingMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString(),
      type: "general",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    // Simulate API delay
    setTimeout(() => {
      const response = generateTradingResponse(inputMessage)
      setMessages((prev) => [...prev, response])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatPrice = (price: number) => {
    if (price < 1) return `$${price.toFixed(6)}`
    return `$${price.toLocaleString()}`
  }

  const formatLargeNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`
    return `$${num.toFixed(2)}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 via-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Gorbagana Trading AI</h2>
            <p className="text-gray-400">Advanced AI-powered trading assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-900 text-green-300">
            <Activity className="w-3 h-3 mr-1" />
            Live Market Data
          </Badge>
          <Badge className="bg-blue-900 text-blue-300">
            <Brain className="w-3 h-3 mr-1" />
            AI Analysis
          </Badge>
        </div>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {marketData.map((asset) => (
          <Card key={asset.symbol} className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-white">{asset.symbol}</span>
                <Badge
                  className={`${
                    asset.trend === "bullish"
                      ? "bg-green-900 text-green-300"
                      : asset.trend === "bearish"
                        ? "bg-red-900 text-red-300"
                        : "bg-gray-900 text-gray-300"
                  }`}
                >
                  {asset.trend}
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">{formatPrice(asset.price)}</span>
                  <div className={`flex items-center gap-1 ${asset.change24h > 0 ? "text-green-400" : "text-red-400"}`}>
                    {asset.change24h > 0 ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    <span className="font-medium">{asset.change24h.toFixed(2)}%</span>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  <div>Vol: {formatLargeNumber(asset.volume)}</div>
                  <div>
                    RSI: {asset.rsi} | MACD: {asset.macd}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Portfolio & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Summary */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Portfolio Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Total Value</span>
              <span className="text-2xl font-bold text-white">{formatLargeNumber(portfolio.totalValue)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">P&L</span>
              <div className="text-right">
                <div className="text-green-400 font-semibold">+{formatLargeNumber(portfolio.pnl)}</div>
                <div className="text-sm text-green-400">+{portfolio.pnlPercent}%</div>
              </div>
            </div>
            <div className="space-y-2">
              {portfolio.assets.map((asset) => (
                <div key={asset.symbol} className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">{asset.symbol}</span>
                  <div className="text-right">
                    <div className="text-white">{formatLargeNumber(asset.value)}</div>
                    <div
                      className={`text-xs ${asset.change > 0 ? "text-green-400" : asset.change < 0 ? "text-red-400" : "text-gray-400"}`}
                    >
                      {asset.change > 0 ? "+" : ""}
                      {asset.change}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Alerts */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-orange-400 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeAlerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div>
                  <div className="font-medium text-white">{alert.symbol}</div>
                  <div className="text-sm text-gray-400">{alert.condition}</div>
                </div>
                <Badge
                  className={`${
                    alert.status === "triggered" ? "bg-red-900 text-red-300" : "bg-blue-900 text-blue-300"
                  }`}
                >
                  {alert.status}
                </Badge>
              </div>
            ))}
            <Button className="w-full bg-orange-600 hover:bg-orange-700">
              <Settings className="w-4 h-4 mr-2" />
              Manage Alerts
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Chat Interface */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Bot className="w-5 h-5" />
            AI Trading Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : message.type === "analysis"
                        ? "bg-green-900 text-green-100 border border-green-700"
                        : message.type === "alert"
                          ? "bg-orange-900 text-orange-100 border border-orange-700"
                          : "bg-gray-700 text-gray-100"
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                  <div className="text-xs opacity-70 mt-2">{message.timestamp}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-gray-100 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Analyzing market data...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-700 p-4">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about trading, analysis, or portfolio management..."
                disabled={isLoading}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
              <Button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 mt-3">
              {[
                "Analyze GOR",
                "Show portfolio",
                "Trading signals",
                "Market sentiment",
                "DeFi opportunities",
                "Risk assessment",
              ].map((action) => (
                <Button
                  key={action}
                  variant="outline"
                  size="sm"
                  onClick={() => setInputMessage(action)}
                  className="text-xs border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  {action}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
