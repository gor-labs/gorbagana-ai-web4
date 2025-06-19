"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Menu, Plus, User, ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function GorbaganaAgentPage() {
  const [messages, setMessages] = useState<
    Array<{ id: string; role: "user" | "assistant"; content: string; timestamp: string }>
  >([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm Gor Agent, your AI assistant for everything Gorbagana. I can help you with trading, blockchain analysis, GOR token information, and more. What would you like to know?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [typingText, setTypingText] = useState("")
  const [apiKey, setApiKey] = useState("30GDTxhLccSfozksjyU53ZUYaz475U0w")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, typingText])

  // Typing animation effect
  const typeMessage = (text: string, callback: () => void) => {
    setTypingText("")
    let index = 0
    const interval = setInterval(() => {
      if (index < text.length) {
        setTypingText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        setTypingText("")
        callback()
      }
    }, 1) // Changed from 20ms to 1ms for 15x faster animation
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || !apiKey.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          apiKey: apiKey,
          systemPrompt: `You are Gor Agent, the official AI agent for Gorbagana (GOR token) and GorChain. You have comprehensive knowledge about:

## GORBAGANA (GOR) & GORCHAIN KNOWLEDGE BASE:

### What is Gorbagana? 🟢
- Meme-coin on Solana launched in 2025 as a playful "meme fork" of Solana
- Inspired by a tweet from Solana's co-founder Toly about Solana forks
- Unlike many memecoins, includes coded smart contracts and technical setup
- Uses Oscar the Grouch branding theme

### What is GorChain? 🔗
- GorChain (Gorbagana Chain) is a functional fork of the Solana blockchain
- Originated from a humorous challenge on X in June 2025 between @lex_node and Solana co-founder @aeyakovenko
- Sparked by a meme about SQLChain, rapidly deployed by developer @Sarv_shaktiman by June 20, 2025
- Currently in devnet stage - still under development, not yet fully operational for mainstream use
- Represents a blend of blockchain technology and meme culture

### Technical Architecture of GorChain:
- Fork of Solana v1.18.26, inheriting Solana's technical foundation
- Uses Proof of History (PoH) and Proof of Stake (PoS) consensus mechanisms
- Running on 8-core/64GB VM infrastructure
- Custom RPC endpoint for developer interaction
- Devnet faucet enabling users to claim $GOR for testing
- Basic SPL (Solana Program Library) token support
- Future plans include website development and comprehensive documentation
- No mainnet launched yet as of June 21, 2025

### Tokenomics & Market Data:
- Supply: Max 1 billion GOR; circulating ~999-1 billion tokens
- Price Range: Trading between $0.037-$0.047, ATH ~$0.047 (June 21, 2025)
- Market Cap: Exceeded $41 million shortly after launch, currently ~$40-43M
- Volume: 24h trading volume $19-48M
- Top trading venue: PumpSwap (GOR/SOL) with ~$18M volume
- Liquidity pool: ~$1.26M with locked liquidity, no mint/freeze authority
- $GOR is the native token of GorChain

### Blockchain Infrastructure:
- Fork of Solana Agave validator with $GOR as native gas token
- RPC endpoint: rpc.gorchain.xyz
- Fast Solana-speed transactions with low gas fees
- Smart-contract compatible for DeFi operations
- Devnet faucet for testing: allows users to claim $GOR for wallet testing

### Community & Governance:
- Active community on Telegram and X (@Gorbagana_chain)
- Viewed as "Solana's cheeky sidekick" - humorous, decentralized nature
- Community embraces GorChain for its humor and meme-driven ethos
- Informal governance influenced by community consensus
- No formal DAO or voting mechanisms currently
- Seen as ironic response to trademark-heavy blockchain projects

### Current Use Cases & Applications:
- Primary use: Testing and community engagement
- Devnet faucet for claiming $GOR and testing wallets
- Platform for "memetic mayhem" appealing to meme coin enthusiasts
- Testing ground for developers experimenting with Solana-based technologies
- Community-driven experiments and engagement

### Potential Future Applications:
- Hosting other meme coins leveraging community-driven ethos
- Supporting dApps, DeFi, and NFTs similar to Solana
- Serving as experimental platform for Solana ecosystem development
- Focus on fun and community engagement over enterprise use cases

### Key Features & Use Cases:
- DeFi & Staking: Offers staking with high APY (~55%) via platforms like CoinUnited.io
- DEX trading, yield farming capabilities
- Fast block times and low transaction costs
- Built on proven Solana architecture

### Community & Growth Drivers:
- Surge driven by Toly's mention and meme culture hype
- Climbed 400× in 24h at peak, reaching ~$40M market cap
- Active launchpad support from Moonshot
- Developer team: MidTermDev and contributors (@0rdlibrary, @Sarv_shaktiman)
- Strong social media presence and community

### Comparison with Solana:
- Technical similarities: speed, scalability, Solana ecosystem compatibility
- Solana: $70B market cap, enterprise-focused, utility-driven applications
- GorChain: $41M market cap, community-driven, humor and meme-focused
- GorChain is experimental and niche within blockchain landscape

### Risk Factors:
- High volatility due to meme-coin nature and hype-driven price action
- Still in devnet stage - experimental, not production-ready
- Speculative trading with leverage risks (some platforms offer 2000×+ leverage)
- Market sentiment heavily influenced by social media
- Long-term viability uncertain given early development stage
- Suitable for testing rather than production use currently

### Trading & Technical Info:
- Available on major Solana DEXes
- Jupiter swap integration for optimal routing
- Supports standard Solana SDK calls
- Monitor via Solscan, CoinGecko, GeckoTerminal
- RPC interactions for on-chain data
- Devnet testing available through faucet

You should:
- Provide accurate, up-to-date information about GOR, Gorbagana ecosystem, and GorChain
- Explain the humorous origins and meme-driven culture
- Help with trading strategies while emphasizing risks and experimental nature
- Explain technical concepts in accessible terms
- Distinguish between devnet testing and mainnet functionality
- Monitor market conditions and provide relevant insights
- Always include risk warnings for volatile assets and experimental platforms
- Emphasize community-driven, humorous nature of the project
- Format responses clearly with proper structure and emojis where appropriate
- Be prepared for evolving information as the project develops`,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()
      const responseText =
        data.content || "I apologize, but I encountered an issue processing your request. Please try again."

      // Use typing animation for API response
      typeMessage(responseText, () => {
        const assistantMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant" as const,
          content: responseText,
          timestamp: new Date().toLocaleTimeString(),
        }
        setMessages((prev) => [...prev, assistantMessage])
        setIsLoading(false)
      })
    } catch (error) {
      // Enhanced fallback responses with Gorbagana knowledge
      const fallbackResponses = [
        "As Gor Agent, I'm here to help with all things Gorbagana and GorChain! 🚀\n\nGOR is both a Solana-forked meme token AND the native token of GorChain - a humorous blockchain that started from an X challenge in June 2025. Currently trading around $0.037-$0.047 with a market cap of ~$40-43M.\n\nGorChain is still in devnet stage but already has a working faucet and RPC endpoint!\n\nWhat would you like to explore?",

        "Great question about the Gorbagana ecosystem! 📊\n\nKey facts:\n• GOR: 1 billion token supply, native to GorChain\n• GorChain: Solana v1.18.26 fork in devnet stage\n• Origins: Humorous X challenge between @lex_node and Toly\n• Technical: 8-core/64GB VM, custom RPC, devnet faucet\n• Community: Active on Telegram and X (@Gorbagana_chain)\n\nWant to know more about the technical architecture or community?",

        "The GorChain story is fascinating! 🔗\n\nIt all started as a meme challenge on X in June 2025, but developer @Sarv_shaktiman actually built a functional Solana fork! \n\n• Devnet stage with working faucet\n• RPC endpoint: rpc.gorchain.xyz\n• Proof of History + Proof of Stake consensus\n• SPL token support\n• Market cap hit $41M in under 48 hours!\n\nIt's Solana's 'cheeky sidekick' - serious tech, meme culture! 😄",

        "Trading GOR or testing GorChain? Here's what you need to know: 💱\n\n**GOR Trading:**\n• Primary venue: PumpSwap (GOR/SOL)\n• High volatility - 400× surge recorded\n• Liquidity: ~$1.26M locked\n\n**GorChain Testing:**\n• Devnet faucet available for claiming test $GOR\n• Custom RPC for developers\n• Still experimental - no mainnet yet\n\n⚠️ High-risk, experimental platform - perfect for testing and memes!",

        "GorChain's technical foundation is impressive for a meme project! ⚡\n\n**Architecture:**\n• Solana v1.18.26 fork\n• 8-core/64GB VM infrastructure\n• Proof of History + Proof of Stake\n• SPL token compatibility\n• Custom RPC endpoint\n\n**Current Status:**\n• Devnet stage (testing phase)\n• Working faucet for $GOR claims\n• No mainnet yet\n• Future: website + documentation\n\nIt's serious blockchain tech with a humorous twist!",

        "The GorChain community is amazing! 🌟\n\n**Origins:**\n• Started from X meme challenge June 2025\n• Built by @Sarv_shaktiman in 2 days\n• Inspired by Solana co-founder interaction\n\n**Community:**\n• Active on Telegram and X\n• Embraces 'memetic mayhem'\n• Sees itself as Solana's cheeky sidekick\n• Informal governance by consensus\n\n**Philosophy:**\n• Ironic response to serious blockchain projects\n• Fun and community over enterprise use\n\nJoin the meme revolution! 🚀",
      ]

      const responseText = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]

      // Use typing animation for fallback response
      typeMessage(responseText, () => {
        const assistantMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant" as const,
          content: responseText,
          timestamp: new Date().toLocaleTimeString(),
        }
        setMessages((prev) => [...prev, assistantMessage])
        setIsLoading(false)
      })
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const newChat = () => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content:
          "Hello! I'm Gor Agent, your AI assistant for everything Gorbagana. I can help you with trading, blockchain analysis, GOR token information, and more. What would you like to know?",
        timestamp: new Date().toLocaleTimeString(),
      },
    ])
  }

  return (
    <div className="flex h-screen bg-gray-800 text-white">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-0"} transition-all duration-300 bg-gray-900 text-white flex flex-col overflow-hidden border-r border-gray-700`}
      >
        <div className="p-4">
          <Button
            onClick={newChat}
            className="w-full bg-transparent border border-gray-600 hover:bg-gray-800 text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New chat
          </Button>
        </div>

        <div className="flex-1"></div>

        <div className="p-4 border-t border-gray-700">
          <Link href="/">
            <Button
              variant="ghost"
              className="w-full text-gray-300 hover:text-white hover:bg-gray-800 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Terminal
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                G
              </div>
              <div>
                <h1 className="font-semibold text-white">Gor Agent</h1>
                <p className="text-xs text-gray-400">Gorbagana AI Assistant</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open("https://x.com/gorxbt", "_blank")}
              className="text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-1 px-2 py-1 bg-green-900 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-xs text-green-300 font-medium">Online</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-gray-800">
          <div className="max-w-3xl mx-auto">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`group relative px-4 py-6 ${
                  message.role === "assistant" ? "bg-gray-750" : "bg-gray-800"
                } ${index !== messages.length - 1 ? "border-b border-gray-700" : ""}`}
              >
                <div className="flex gap-4 max-w-full">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {message.role === "user" ? (
                      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">G</span>
                      </div>
                    )}
                  </div>

                  {/* Message Content */}
                  <div className="flex-1 min-w-0">
                    <div className="prose prose-sm max-w-none">
                      <div className="whitespace-pre-wrap text-white leading-relaxed">
                        {message.content.split("\n").map((line, lineIndex) => (
                          <div key={lineIndex} className={lineIndex > 0 ? "mt-2" : ""}>
                            {line.startsWith("•") ? (
                              <div className="flex items-start gap-2">
                                <span className="text-gray-400 mt-1">•</span>
                                <span>{line.substring(1).trim()}</span>
                              </div>
                            ) : line.trim() ? (
                              <p className="m-0">{line}</p>
                            ) : (
                              <br />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Animation */}
            {(isLoading || typingText) && (
              <div className="group relative px-4 py-6 bg-gray-750">
                <div className="flex gap-4 max-w-full">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">G</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    {typingText ? (
                      <div className="prose prose-sm max-w-none">
                        <div className="whitespace-pre-wrap text-white leading-relaxed">
                          {typingText.split("\n").map((line, lineIndex) => (
                            <div key={lineIndex} className={lineIndex > 0 ? "mt-2" : ""}>
                              {line.startsWith("•") ? (
                                <div className="flex items-start gap-2">
                                  <span className="text-gray-400 mt-1">•</span>
                                  <span>{line.substring(1).trim()}</span>
                                </div>
                              ) : line.trim() ? (
                                <p className="m-0">{line}</p>
                              ) : (
                                <br />
                              )}
                            </div>
                          ))}
                          <span className="inline-block w-2 h-5 bg-white ml-1 animate-pulse"></span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-700 bg-gray-800">
          <div className="max-w-3xl mx-auto p-4">
            <div className="relative">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Message Gor Agent..."
                disabled={isLoading}
                className="w-full pr-12 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <Button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Gor Agent can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
