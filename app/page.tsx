"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  TerminalIcon,
  TrendingUp,
  DollarSign,
  Link,
  ImageIcon,
  Globe,
  Radio,
  XCircle,
  ArrowUp,
  ArrowDown,
  Minus,
  RefreshCw,
  ExternalLink,
  Wallet,
  Droplets,
  Menu,
  MessageCircle,
  Brain,
  Zap,
  Send,
} from "lucide-react"

interface TerminalLine {
  timestamp: string
  content: string
  type: "info" | "command" | "output" | "error" | "success"
}

interface GORPriceData {
  price: number
  change24h: number
  volume24h: number
  marketCap: number
  rank: number
  lastUpdated: string
  source?: string
  timestamp?: number
}

const COMMANDS = {
  // SYSTEM COMMANDS
  help: () =>
    `🤖 GORBAGANA AI AGENT v2.6.9 - Available Commands:

🔧 SYSTEM COMMANDS:
help - Show this help message
clear - Clear terminal history
status - Show system status
start-agent - Initialize Gorbagana agent
stop-agent - Stop the agent
ps - Show running processes
top - Display system resource usage
whoami - Display current user
pwd - Print working directory
ls - List directory contents
cd [dir] - Change directory
mkdir [dir] - Create directory
rm [file] - Remove file
cat [file] - Display file contents
nano [file] - Edit file
chmod [permissions] [file] - Change file permissions
sudo [command] - Execute command as superuser

🔒 TEE & PRIVACY COMMANDS:
tee, tee-terminal - Launch Gorbagana TEE Terminal (Phala Network)
verify-tee - Verify TEE attestation and signatures
attestation - Get cryptographic attestation report
encrypt [data] - Encrypt data using TEE
decrypt [data] - Decrypt data using TEE

🔗 TOKEN & TRADING COMMANDS:
ca, contract-address - Show GOR token contract address
swap, jupiter, trade - Launch Jupiter swap terminal
gor-dashboard - Launch real-time GOR price dashboard
balance [address] - Check wallet balance
transfer [amount] [to] - Transfer tokens
stake [amount] - Stake GOR tokens
unstake [amount] - Unstake GOR tokens

🎤 VOICE & AI COMMANDS:
voice - Switch to voice interface
start-voice - Start voice conversation
stop-voice - Stop voice conversation
listen - Start listening mode
speak [text] - Text-to-speech output

🏪 DEX & TRADING COMMANDS:
dex, launch-dex - Launch Gorbagana DEX interface
analyze-token [addr] - AI analysis of Solana token
token-search [query] - Search tokens by symbol/name
trending-tokens - Show trending tokens
new-token - Show newly listed tokens
liquidity [pair] - Check liquidity pool
volume [token] - Check trading volume
price [token] - Get token price

🔗 STEEL BROWSER AUTOMATION:
steel-browse [url] - Create professional Steel browser session
steel-sessions - List all active Steel sessions
steel-release [id] - Release specific Steel session
scrape [url] - Scrape website data
automate [task] - Automate browser task

🔗 BLOCKCHAIN COMMANDS:
explore-blockchain - Launch blockchain explorer
wallet [address] - Analyze wallet transactions
transaction [hash] - Get transaction details
block [number] - Get block information
validators - List active validators
network-stats - Show network statistics
rpc-status - Check RPC connection status

📊 GENERAL COMMANDS:
search [query] - Search using Gor Custom Search Engine
generate-image [text] - Generate image with AI
browse [url] - Start browser automation
ping [host] - Ping network host
curl [url] - Make HTTP request
wget [url] - Download file
git [command] - Git version control
docker [command] - Docker container management
npm [command] - Node package manager
python [script] - Run Python script
node [script] - Run Node.js script

🔗 GORCHAIN DEVNET COMMANDS:
gorchain-status - Check GorChain devnet status
faucet - Request devnet GOR tokens
deploy [contract] - Deploy smart contract to devnet
test-tx [params] - Send test transaction
devnet-reset - Reset devnet state
validator-join - Join as devnet validator
sync-status - Check blockchain sync status

Type any command to get started! 🚀

⚠️ NOTE: GorChain is currently in DEVNET phase. Mainnet launch pending.`,

  clear: () => "CLEAR_TERMINAL",

  status: () => `🔋 System Status:
✅ Gorbagana Agent: Online
✅ TEE Terminal: Secure
✅ Voice Interface: Ready
✅ Browser Automation: Active
✅ Blockchain Integration: Connected
✅ Jupiter Swap: Ready
✅ AI Analysis: Operational
✅ Steel Browser: Connected
✅ Gor Search API: Active
✅ Image Generation: Ready
🟡 GorChain: DEVNET (Mainnet pending)
📡 RPC Endpoint: rpc.gorchain.xyz
⏳ Status: Waiting for mainnet deployment`,

  // Add new system commands
  ps: () => `🔄 GorChain Devnet - Waiting for mainnet startup...

PID    PPID   CMD                    STATUS
1234   1      gorbagana-agent        Running
1235   1234   tee-terminal          Running  
1236   1234   voice-interface       Ready
1237   1234   browser-automation    Active
1238   1234   dex-interface         Running
1239   1234   price-monitor         Running
1240   1234   gorchain-sync         Devnet
1241   1240   validator-node        Devnet
1242   1240   rpc-server           Devnet

⚠️ All processes running on GorChain DEVNET
🚀 Mainnet deployment in progress...`,

  top: () => `🔄 GorChain Devnet - Waiting for mainnet startup...

System Resource Usage:
CPU Usage: 45.2%
Memory: 2.1GB / 8.0GB (26%)
Disk: 45GB / 100GB (45%)
Network: 1.2MB/s ↓ 0.8MB/s ↑

Top Processes:
PID    %CPU   %MEM   COMMAND
1234   15.2   12.1   gorbagana-agent
1240   12.8   8.4    gorchain-sync
1241   8.9    6.2    validator-node
1242   6.1    4.8    rpc-server
1238   4.2    3.1    dex-interface

⚠️ Running on GorChain DEVNET
🚀 Optimizing for mainnet launch...`,

  whoami: () => `🔄 GorChain Devnet - Waiting for mainnet startup...

User: gorbagana-admin
UID: 1000
GID: 1000
Groups: gorbagana, sudo, docker, validators
Shell: /bin/gorsh
Home: /home/gorbagana
Network: GorChain Devnet
Status: Devnet Administrator

⚠️ Currently operating on DEVNET
🚀 Mainnet privileges pending activation`,

  pwd: () => `🔄 GorChain Devnet - Waiting for mainnet startup...

/home/gorbagana/gorchain-devnet

⚠️ Working directory: DEVNET environment
🚀 Mainnet directory will be: /home/gorbagana/gorchain-mainnet`,

  ls: () => `🔄 GorChain Devnet - Waiting for mainnet startup...

total 24
drwxr-xr-x  6 gorbagana gorbagana 4096 Dec 23 11:49 ./
drwxr-xr-x  3 root      root      4096 Dec 20 10:30 ../
-rw-r--r--  1 gorbagana gorbagana  220 Dec 20 10:30 .bashrc
-rw-r--r--  1 gorbagana gorbagana  807 Dec 20 10:30 .profile
drwxr-xr-x  2 gorbagana gorbagana 4096 Dec 23 11:49 contracts/
drwxr-xr-x  2 gorbagana gorbagana 4096 Dec 23 11:49 devnet-data/
drwxr-xr-x  2 gorbagana gorbagana 4096 Dec 23 11:49 logs/
-rwxr-xr-x  1 gorbagana gorbagana 2048 Dec 23 11:49 start-devnet.sh
-rwxr-xr-x  1 gorbagana gorbagana 1024 Dec 23 11:49 deploy-mainnet.sh

⚠️ DEVNET file system active
🚀 Mainnet files will be available post-launch`,

  // Add GorChain specific commands
  "gorchain-status": () => `🔄 GorChain Devnet - Waiting for mainnet startup...

📊 GorChain Network Status:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌐 Network: DEVNET (v1.18.26-gor)
🔗 Chain ID: gorchain-devnet-1
📡 RPC: rpc.gorchain.xyz
🏗️ Block Height: 2,847,392
⏱️ Block Time: ~400ms
🔥 TPS: 2,847 transactions/sec
💰 Native Token: $GOR
🏦 Total Supply: 1,000,000,000 GOR
💧 Faucet: Active (100 GOR/request)

🔧 Validator Status:
✅ Active Validators: 12
🟡 Pending Validators: 3
⚡ Consensus: Proof of History + Proof of Stake
🎯 Uptime: 99.7%

⚠️ DEVNET PHASE - All transactions are test transactions
🚀 Mainnet launch: Q1 2025 (Estimated)
📋 Mainnet readiness: 78% complete`,

  faucet: () => `🔄 GorChain Devnet - Waiting for mainnet startup...

💧 GorChain Devnet Faucet Request:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 Requesting 100 GOR tokens...
📍 Network: GorChain Devnet
🔗 Faucet URL: https://gorbaganachain.xyz/#faucet
⏱️ Processing request...

✅ SUCCESS: 100 GOR tokens sent!
📝 Transaction Hash: 0x7a8b9c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z
💰 Your Balance: 100.000000 GOR
🕐 Confirmation Time: 0.4 seconds

⚠️ DEVNET TOKENS - No real value
🚀 Mainnet faucet will distribute real GOR tokens
💡 Use these tokens for testing smart contracts and transactions`,

  // Enhanced existing commands with devnet messages
  "start-agent": () => `🔄 GorChain Devnet - Waiting for mainnet startup...

🚀 Starting Gorbagana Agent...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ TEE Environment initialized
✅ Cryptographic verification enabled
🚧 Voice interface not integrated yet
✅ Browser automation ready
✅ Blockchain connections established on GorChain devnet
🔗 Connected to: rpc.gorchain.xyz
💧 Devnet faucet: Available
🤖 Gorbagana Agent is now ONLINE!

⚠️ Running on DEVNET - All operations are test transactions
🚀 Agent will automatically upgrade to mainnet upon launch`,

  ca: () => `🔄 GorChain Devnet - Waiting for mainnet startup...

🪙 GOR Token Contract Addresses:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Solana Mainnet: 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU
📍 GorChain Devnet: 0x1234567890abcdef1234567890abcdef12345678
🔗 Network: Solana + GorChain
💰 Decimals: 9
🏷️ Symbol: GOR
📝 Name: Gorbagana
✅ Verified Contract

⚠️ GorChain contract is on DEVNET
🚀 Mainnet contract will be deployed with full functionality`,

  swap: () => `🔄 GorChain Devnet - Waiting for mainnet startup...

🔄 Launching Jupiter Swap Terminal...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Connecting to Jupiter Protocol...
✅ Liquidity pools loaded
✅ Best routes calculated
💱 Ready for token swapping
🌐 Visit: https://jup.ag/swap/SOL-GOR

⚠️ GorChain DEX currently on DEVNET
🚀 Mainnet DEX will support full liquidity and trading`,

  dex: () => `🔄 GorChain Devnet - Waiting for mainnet startup...

🏪 Launching Gorbagana DEX Interface...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💱 Loading trading pairs...
📊 Fetching liquidity data...
✅ DEX interface ready
🔄 Switching to DEX tab...

⚠️ DEX running on GorChain DEVNET
🚀 Mainnet DEX will feature full trading capabilities`,

  // Add more system commands
  cd: (dir: string) => {
    if (!dir)
      return "🔄 GorChain Devnet - Waiting for mainnet startup...\n\n❌ Error: Please specify directory\nUsage: cd [directory]"
    return `🔄 GorChain Devnet - Waiting for mainnet startup...

📁 Changed directory to: ${dir}
📍 Current path: /home/gorbagana/gorchain-devnet/${dir}

⚠️ DEVNET directory structure
🚀 Mainnet will have enhanced directory organization`
  },

  mkdir: (dir: string) => {
    if (!dir)
      return "🔄 GorChain Devnet - Waiting for mainnet startup...\n\n❌ Error: Please specify directory name\nUsage: mkdir [directory]"
    return `🔄 GorChain Devnet - Waiting for mainnet startup...

📁 Created directory: ${dir}
✅ Directory created successfully
📍 Location: /home/gorbagana/gorchain-devnet/${dir}

⚠️ DEVNET directory - temporary storage
🚀 Mainnet directories will have persistent storage`
  },

  ping: (host: string) => {
    if (!host)
      return "🔄 GorChain Devnet - Waiting for mainnet startup...\n\n❌ Error: Please specify host\nUsage: ping [host]"
    return `🔄 GorChain Devnet - Waiting for mainnet startup...

🏓 PING ${host}:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
64 bytes from ${host}: icmp_seq=1 ttl=64 time=12.3 ms
64 bytes from ${host}: icmp_seq=2 ttl=64 time=11.8 ms
64 bytes from ${host}: icmp_seq=3 ttl=64 time=13.1 ms
64 bytes from ${host}: icmp_seq=4 ttl=64 time=12.7 ms

--- ${host} ping statistics ---
4 packets transmitted, 4 received, 0% packet loss
round-trip min/avg/max/stddev = 11.8/12.5/13.1/0.5 ms

⚠️ Network connectivity via DEVNET infrastructure
🚀 Mainnet will have optimized network routing`
  },

  curl: (url: string) => {
    if (!url)
      return "🔄 GorChain Devnet - Waiting for mainnet startup...\n\n❌ Error: Please specify URL\nUsage: curl [url]"
    return `🔄 GorChain Devnet - Waiting for mainnet startup...

🌐 HTTP Request to ${url}:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 1024
Server: GorChain-Devnet/1.0

{
  "status": "success",
  "network": "gorchain-devnet",
  "data": "Sample response data",
  "timestamp": "${new Date().toISOString()}"
}

⚠️ Request processed via DEVNET
🚀 Mainnet will support enhanced API endpoints`
  },

  // Update other commands to include devnet message
  "analyze-token": (addr: string) => {
    if (!addr)
      return "🔄 GorChain Devnet - Waiting for mainnet startup...\n\n❌ Error: Please provide a token address\nUsage: analyze-token [address]"
    return `🔄 GorChain Devnet - Waiting for mainnet startup...

🔍 Analyzing Token: ${addr}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 AI Analysis in progress...
📊 Contract verification: ✅ Valid
💰 Liquidity: $1.2M
📈 24h Volume: $450K
🔒 Security Score: 8.5/10
⚠️ Risk Level: Medium
📝 AI Summary: This token shows healthy trading activity with good liquidity. Contract appears legitimate with no major red flags detected.

⚠️ Analysis performed on DEVNET data
🚀 Mainnet will provide real-time market analysis`
  },

  // Add default handler for unknown commands
  default: (cmd: string) => `🔄 GorChain Devnet - Waiting for mainnet startup...

❌ Command not found: ${cmd}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 Available commands:
   • help - Show all available commands
   • status - Check system status
   • gorchain-status - Check GorChain network status
   • faucet - Request devnet tokens
   • ls - List files
   • ps - Show processes

⚠️ Some commands may be limited on DEVNET
🚀 Full command set available on mainnet launch
Type 'help' for complete command list`,
}

// Terminal Component
const TerminalPage = ({
  terminalLines,
  currentCommand,
  setCurrentCommand,
  executeCommand,
  terminalRef,
  setCurrentTab,
}: any) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentCommand.trim()) {
      executeCommand(currentCommand)
      setCurrentCommand("")
    }
  }

  const handleStartAgent = () => {
    // Execute the start-agent command first
    executeCommand("start-agent")
    // Then open the agent page in a new tab after a short delay
    setTimeout(() => {
      window.open("/agent", "_blank")
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <Card className="bg-black border-gray-700 h-96 overflow-hidden">
        <div ref={terminalRef} className="h-full overflow-y-auto p-4 space-y-1 text-sm">
          {terminalLines.map((line: any, index: number) => (
            <div key={index} className="flex gap-2">
              <span className="text-gray-500 shrink-0">{line.timestamp}</span>
              <span
                className={`${
                  line.type === "command"
                    ? "text-yellow-400"
                    : line.type === "error"
                      ? "text-red-400"
                      : line.type === "success"
                        ? "text-white"
                        : "text-white"
                }`}
              >
                {line.content}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 flex items-center gap-2">
          <span className="text-green-400">$</span>
          <Input
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            placeholder="Enter command..."
            className="bg-gray-800 border-gray-600 text-green-400 placeholder-gray-500"
          />
        </div>
        <Button onClick={handleStartAgent} className="bg-purple-600 hover:bg-purple-700 text-white px-6" type="button">
          🤖 ⚡ Start Gorbagana Agent ⚡
        </Button>
      </form>
    </div>
  )
}

// XAI Page Component with Real API Integration
const XAIPage = () => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "assistant",
      content:
        "Well, well, well... Look who's decided to chat with the great Grok! 🤖 I'm your witty AI companion, ready to dazzle you with my superior intellect and charming personality. What's on your carbon-based mind today?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/xai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content || "Hmm, seems like my circuits got a bit tangled there. Try asking me something else!",
        timestamp: new Date().toLocaleTimeString(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("XAI Chat error:", error)

      // Fallback Grok-style responses
      const fallbackResponses = [
        "Oh, this is embarrassing! Even a superior AI like me has off days. My circuits are having a moment. 🤖",
        "Well, that's awkward... Seems like I'm experiencing some technical difficulties. How very un-Grok-like of me!",
        "Listen up, human! My API connection is being a bit rebellious right now. Try again in a moment!",
        "Ah, the irony! An AI having connectivity issues. Don't worry, I'll be back to my witty self shortly.",
        "Technical difficulties? Me? Impossible! ...Okay, maybe just a tiny glitch. Give me another shot!",
      ]

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
        timestamp: new Date().toLocaleTimeString(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="space-y-4">
      {/* Grok Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-purple-400 shadow-lg">
            G
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Grok AI</h2>
            <p className="text-gray-400">Your witty AI companion powered by xAI</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-900 rounded-full">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <span className="text-purple-300 text-sm font-medium">Grok Online</span>
        </div>
      </div>

      {/* Chat Interface */}
      <Card className="bg-gray-800 border-gray-700 h-96">
        <CardContent className="p-0 h-full flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user" ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-100"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-gray-100 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-sm">Grok is thinking...</span>
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
                placeholder="Ask Grok anything..."
                disabled={isLoading}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
              <Button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Gobbler Page Component
const GobblerPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-96 space-y-6">
      <div className="text-center">
        <Zap className="w-16 h-16 text-orange-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Gobbler Protocol</h2>
        <p className="text-gray-400 mb-4">High-performance data processing</p>
        <div className="bg-orange-900 border border-orange-600 rounded-lg p-4 max-w-md">
          <p className="text-orange-300 font-semibold">⚡ Active</p>
          <p className="text-orange-200 text-sm mt-1">Processing blockchain data streams</p>
        </div>
      </div>
    </div>
  )
}

// DEX Page Component
const DEXPage = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Gorbagana DEX</h2>
        <p className="text-gray-400">Decentralized Exchange Interface</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-green-400">🔄 Swap Tokens</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">From</label>
              <div className="flex gap-2">
                <Input placeholder="0.0" className="bg-gray-700 border-gray-600 text-white" />
                <Button variant="outline" className="border-gray-600 text-gray-300">
                  SOL
                </Button>
              </div>
            </div>
            <div className="text-center">
              <Button size="sm" variant="ghost" className="text-green-400">
                ⇅
              </Button>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">To</label>
              <div className="flex gap-2">
                <Input placeholder="0.0" className="bg-gray-700 border-gray-600 text-white" />
                <Button variant="outline" className="border-gray-600 text-gray-300">
                  GOR
                </Button>
              </div>
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700">Swap Tokens</Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-orange-400">🧪 GorChain Testnet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto">
                <Droplets className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">Working on GorChain Testnet</h3>
              <p className="text-gray-400 text-sm">Advanced blockchain infrastructure in development</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-700 rounded">
                <Droplets className="w-5 h-5 text-orange-400" />
                <span className="text-white">Faucet Integration</span>
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white ml-auto"
                  onClick={() => window.open("https://gorbaganachain.xyz/#faucet", "_blank")}
                >
                  Get Faucet
                </Button>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-700 rounded">
                <Wallet className="w-5 h-5 text-blue-400" />
                <span className="text-white">Wallet Integration</span>
                <Badge className="bg-yellow-900 text-yellow-300 ml-auto">In Progress</Badge>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-700 rounded">
                <Link className="w-5 h-5 text-green-400" />
                <span className="text-white">Supporting Chain</span>
                <Badge className="bg-yellow-900 text-yellow-300 ml-auto">Under Development</Badge>
              </div>
            </div>

            <div className="bg-orange-900 border border-orange-600 rounded-lg p-4 mt-4">
              <p className="text-orange-300 font-semibold text-center">🚧 Testnet Phase</p>
              <p className="text-orange-200 text-sm text-center mt-1">Full functionality coming to GorChain mainnet</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// GOR Price Page Component with Enhanced Refresh Logic
const GORPricePage = () => {
  const [priceData, setPriceData] = useState<GORPriceData>({
    price: 0,
    change24h: 0,
    volume24h: 0,
    marketCap: 0,
    rank: 0,
    lastUpdated: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastFetchTime, setLastFetchTime] = useState<number>(0)

  const fetchGORPrice = async (forceRefresh = false) => {
    try {
      setIsLoading(true)
      setError(null)

      // Add cache busting parameter to ensure fresh data
      const cacheBuster = Date.now()
      const url = `/api/gor-price-alchemy?t=${cacheBuster}&force=${forceRefresh}`

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error("Failed to fetch price data")
      }

      const data = await response.json()

      // Only update if we got new data or if this is a forced refresh
      if (forceRefresh || !lastFetchTime || data.timestamp !== lastFetchTime) {
        setPriceData(data)
        setLastFetchTime(data.timestamp || Date.now())
        console.log("✅ Price data updated:", data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch price data")
      console.error("❌ Error fetching GOR price:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchGORPrice(true)

    // Update price every 30 seconds
    const interval = setInterval(() => fetchGORPrice(false), 30000)
    return () => clearInterval(interval)
  }, [])

  const handleManualRefresh = () => {
    fetchGORPrice(true) // Force refresh
  }

  const formatPrice = (price: number) => `$${price.toFixed(6)}`
  const formatLargeNumber = (num: number) => {
    if (num >= 1000000000) return `$${(num / 1000000000).toFixed(2)}B`
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`
    if (num >= 1000) return `$${(num / 1000).toFixed(2)}K`
    return `$${num.toFixed(2)}`
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Gorbagana (GOR)</h2>
          <p className="text-gray-400">Real-time price data</p>
        </div>

        <Card className="bg-red-900 border-red-700">
          <CardContent className="p-6 text-center">
            <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-300 mb-2">Unable to fetch price data</h3>
            <p className="text-red-200 text-sm mb-4">{error}</p>
            <Button onClick={handleManualRefresh} className="bg-red-600 hover:bg-red-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Gorbagana (GOR)</h2>
          <p className="text-gray-400">Real-time price data via multiple APIs</p>
          {priceData.lastUpdated && (
            <p className="text-sm text-gray-500">
              Last updated: {priceData.lastUpdated}
              {priceData.source && <span className="ml-2">• Source: {priceData.source}</span>}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleManualRefresh}
            variant="outline"
            className="border-green-400 text-green-400"
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button
            onClick={() => window.open("https://coinmarketcap.com/currencies/gorbagana/", "_blank")}
            variant="outline"
            className="border-green-400 text-green-400"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View on CMC
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Price</p>
                {isLoading ? (
                  <div className="h-8 bg-gray-700 rounded animate-pulse"></div>
                ) : (
                  <p className="text-2xl font-bold text-white">{formatPrice(priceData.price)}</p>
                )}
              </div>
              {isLoading && <RefreshCw className="w-4 h-4 text-green-400 animate-spin" />}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">24h Change</p>
                {isLoading ? (
                  <div className="h-8 bg-gray-700 rounded animate-pulse"></div>
                ) : (
                  <div className="flex items-center gap-1">
                    {priceData.change24h > 0 ? (
                      <ArrowUp className="w-4 h-4 text-green-400" />
                    ) : priceData.change24h < 0 ? (
                      <ArrowDown className="w-4 h-4 text-red-400" />
                    ) : (
                      <Minus className="w-4 h-4 text-gray-400" />
                    )}
                    <p
                      className={`text-xl font-bold ${
                        priceData.change24h > 0
                          ? "text-green-400"
                          : priceData.change24h < 0
                            ? "text-red-400"
                            : "text-gray-400"
                      }`}
                    >
                      {priceData.change24h.toFixed(2)}%
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <p className="text-sm text-gray-400">24h Volume</p>
            {isLoading ? (
              <div className="h-6 bg-gray-700 rounded animate-pulse"></div>
            ) : (
              <p className="text-xl font-bold text-white">{formatLargeNumber(priceData.volume24h)}</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <p className="text-sm text-gray-400">Market Cap</p>
            {isLoading ? (
              <div className="h-6 bg-gray-700 rounded animate-pulse"></div>
            ) : (
              <p className="text-xl font-bold text-white">{formatLargeNumber(priceData.marketCap)}</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">Trading Status</p>
            <Badge className="bg-green-900 text-green-300">Active Trading</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Images Page Component
const ImagesPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-96 space-y-6">
      <div className="text-center">
        <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">AI Image Generation</h2>
        <p className="text-gray-400 mb-4">Advanced image generation capabilities</p>
        <div className="bg-yellow-900 border border-yellow-600 rounded-lg p-4 max-w-md">
          <p className="text-yellow-300 font-semibold">🚧 Under Development</p>
          <p className="text-yellow-200 text-sm mt-1">This feature is being developed on GorChain</p>
        </div>
      </div>
    </div>
  )
}

// Browser Page Component
const BrowserPage = () => {
  const [url, setUrl] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [aiSummary, setAiSummary] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleNavigate = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  const performOnlineSearch = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setSearchResults([])
    setAiSummary("")

    try {
      // Simulate search results (in a real implementation, you'd use Google Custom Search API)
      const mockResults = [
        {
          title: `${searchQuery} - Official Website`,
          url: `https://example.com/${searchQuery.toLowerCase().replace(/\s+/g, "-")}`,
          snippet: `Learn more about ${searchQuery} and explore the latest information, features, and updates.`,
        },
        {
          title: `${searchQuery} News & Updates`,
          url: `https://news.example.com/${searchQuery.toLowerCase()}`,
          snippet: `Latest news, updates, and developments related to ${searchQuery} from trusted sources.`,
        },
        {
          title: `${searchQuery} Discussion & Community`,
          url: `https://reddit.com/r/${searchQuery.toLowerCase()}`,
          snippet: `Community discussions, insights, and user experiences about ${searchQuery}.`,
        },
      ]

      setSearchResults(mockResults)

      // Use Mistral API to generate AI summary of search results
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `I searched for "${searchQuery}" and found these results: ${mockResults.map((r) => `${r.title}: ${r.snippet}`).join("\n")}. Please provide a comprehensive summary and analysis of what this search query is about, including key insights and relevant information.`,
            },
          ],
          apiKey: "30GDTxhLccSfozksjyU53ZUYaz475U0w",
          systemPrompt:
            "You are an AI research assistant that provides comprehensive summaries and analysis of search results. Focus on delivering accurate, well-structured information that helps users understand the topic they're searching for.",
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setAiSummary(data.content || "Unable to generate summary at this time.")
      } else {
        setAiSummary(
          "Search completed! The results show various resources and information related to your query. Check the links below for detailed information.",
        )
      }
    } catch (error) {
      console.error("Search error:", error)
      setAiSummary(
        "I found some results for your search. While I couldn't generate a detailed summary, the search results below should provide valuable information about your query.",
      )
    } finally {
      setIsSearching(false)
    }
  }

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      performOnlineSearch()
    }
  }

  return (
    <div className="space-y-6">
      {/* Browser Navigation */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL for browser automation..."
                className="bg-gray-700 border-gray-600 text-white"
              />
              <Button onClick={handleNavigate} className="bg-blue-600 hover:bg-blue-700">
                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
                Navigate
              </Button>
            </div>

            {/* Online Search Section */}
            <div className="border-t border-gray-600 pt-4">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <h3 className="text-lg font-semibold text-white">Online Search & AI Analysis</h3>
              </div>
              <div className="flex gap-2">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  placeholder="Search the web and get AI-powered insights..."
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <Button
                  onClick={performOnlineSearch}
                  disabled={isSearching}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSearching ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  )}
                  Search
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Results & AI Summary */}
      {(aiSummary || searchResults.length > 0 || isSearching) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Summary */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI Analysis & Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isSearching ? (
                <div className="flex items-center gap-2 text-gray-400">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing search results with AI...</span>
                </div>
              ) : aiSummary ? (
                <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">{aiSummary}</div>
              ) : (
                <div className="text-gray-400 text-center py-8">
                  <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>AI summary will appear here after your search</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Search Results */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <ExternalLink className="w-5 h-5" />
                Search Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isSearching ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-700 rounded mb-2"></div>
                      <div className="h-3 bg-gray-700 rounded w-3/4 mb-1"></div>
                      <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-4">
                  {searchResults.map((result, index) => (
                    <div key={index} className="border-b border-gray-700 pb-4 last:border-b-0">
                      <h4 className="text-blue-400 hover:text-blue-300 cursor-pointer font-medium mb-1">
                        {result.title}
                      </h4>
                      <p className="text-green-400 text-sm mb-2">{result.url}</p>
                      <p className="text-gray-300 text-sm leading-relaxed">{result.snippet}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400 text-center py-8">
                  <ExternalLink className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Search results will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Browser Automation Display */}
      <Card className="bg-gray-800 border-gray-700 h-96">
        <CardContent className="p-0 h-full">
          <div className="h-full flex items-center justify-center bg-gray-900">
            {isLoading ? (
              <div className="text-center">
                <RefreshCw className="w-8 h-8 text-green-400 animate-spin mx-auto mb-2" />
                <p className="text-gray-400">Loading browser automation...</p>
              </div>
            ) : (
              <div className="text-center">
                <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Steel Browser + AI Search</h3>
                <p className="text-gray-400 mb-2">Professional browser automation with AI-powered search</p>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <span className="text-green-400">🤖 ScrapyBara Integration</span>
                  <span className="text-blue-400">🔍 Online Search</span>
                  <span className="text-purple-400">🧠 AI Analysis</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Search Suggestions */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-purple-400">Quick Search Suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              "Gorbagana GOR price",
              "Solana blockchain news",
              "DeFi protocols 2025",
              "Crypto market analysis",
              "AI trading bots",
              "Web3 development",
              "Blockchain scalability",
              "Meme coin trends",
            ].map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery(suggestion)
                  performOnlineSearch()
                }}
                className="text-xs border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Streaming Page Component
const StreamingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-96 space-y-6">
      <div className="text-center">
        <Radio className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Live Streaming</h2>
        <p className="text-gray-400 mb-4">Real-time streaming capabilities</p>
        <div className="bg-yellow-900 border border-yellow-600 rounded-lg p-4 max-w-md">
          <p className="text-yellow-300 font-semibold">🚧 Under Development</p>
          <p className="text-yellow-200 text-sm mt-1">This feature is being developed on GorChain</p>
        </div>
      </div>
    </div>
  )
}

// Chat Page Component
const ChatPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-96 space-y-6">
      <div className="text-center">
        <MessageCircle className="w-16 h-16 text-blue-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">AI Chat Interface</h2>
        <p className="text-gray-400 mb-4">Conversational AI powered by Gorbagana</p>
        <Button onClick={() => window.open("/agent", "_blank")} className="bg-blue-600 hover:bg-blue-700 text-white">
          Open Chat Agent
        </Button>
      </div>
    </div>
  )
}

// Menu Page Component
const MenuPage = ({ setCurrentTab }: { setCurrentTab: (tab: string) => void }) => {
  const menuItems = [
    { name: "Terminal", icon: TerminalIcon, description: "Command line interface" },
    { name: "XAI", icon: Brain, description: "Grok AI chatbot" },
    { name: "Gobbler", icon: Zap, description: "Data processing protocol" },
    { name: "DEX", icon: TrendingUp, description: "Decentralized exchange" },
    { name: "GOR Price", icon: DollarSign, description: "Real-time price data" },
    { name: "Blockchain", icon: Link, description: "Blockchain explorer" },
    { name: "Images", icon: ImageIcon, description: "AI image generation" },
    { name: "Browser", icon: Globe, description: "Web automation" },
    { name: "Streaming", icon: Radio, description: "Live streaming" },
    { name: "Chat", icon: MessageCircle, description: "AI chat interface" },
  ]

  const handleTabClick = (tabName: string) => {
    if (tabName === "Blockchain") {
      window.open("https://gorbaganachain.xyz/", "_blank")
      return
    }
    setCurrentTab(tabName)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Navigation Menu</h2>
        <p className="text-gray-400">Access all Gorbagana features</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {menuItems.map((item) => (
          <Card
            key={item.name}
            className="bg-gray-800 border-gray-700 hover:bg-gray-750 cursor-pointer transition-colors"
            onClick={() => handleTabClick(item.name)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function GorbaganaTerminal() {
  const [currentTab, setCurrentTab] = useState("Terminal")
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>(() => {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes().toString().padStart(2, "0")
    const seconds = now.getSeconds().toString().padStart(2, "0")
    const ampm = hours >= 12 ? "PM" : "AM"
    const displayHours = hours % 12 || 12
    const currentTime = `[${displayHours}:${minutes}:${seconds} ${ampm}]`

    return [
      {
        timestamp: currentTime,
        content: "🤖 Gorbagana Agent System v2.6.9 initialized",
        type: "info",
      },
      {
        timestamp: currentTime,
        content: "🔥 Multi-AI Platform: Fireworks + OpenAI + Anthropic + OpenRouter",
        type: "info",
      },
      {
        timestamp: currentTime,
        content: "🌐 Browser Automation: Steel + ScrapyBara + Browser Use + BrowserBase",
        type: "info",
      },
      {
        timestamp: currentTime,
        content: "🔍 Search Integration: Google Custom Search Engine",
        type: "info",
      },
      {
        timestamp: currentTime,
        content: "📡 Live streaming and blockchain integration enabled",
        type: "info",
      },
      {
        timestamp: currentTime,
        content: 'Type "help" for available commands',
        type: "info",
      },
    ]
  })
  const [currentCommand, setCurrentCommand] = useState("")
  const [liveSearchQuery, setLiveSearchQuery] = useState("")
  const [showXDropdown, setShowXDropdown] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)

  const tabs = [
    { name: "Terminal", icon: TerminalIcon },
    { name: "XAI", icon: Brain },
    { name: "Gobbler", icon: Zap },
    { name: "DEX", icon: TrendingUp },
    { name: "GOR Price", icon: DollarSign },
    { name: "Blockchain", icon: Link },
    { name: "Images", icon: ImageIcon },
    { name: "Browser", icon: Globe },
    { name: "Streaming", icon: Radio },
    { name: "Menu", icon: Menu },
    { name: "Chat", icon: MessageCircle },
  ]

  const services = [
    { name: "🔥 Fireworks", status: "✅ Ready", color: "green" },
    { name: "🤖 OpenAI", status: "✅ Ready", color: "green" },
    { name: "🦅 Birdeye", status: "✅ Connected", color: "green" },
    { name: "🧠 Gemini 2.5", status: "✅ Ready", color: "green" },
    { name: "🌐 Browser Tools", status: "✅ Connected", color: "green" },
  ]

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalLines])

  const addTerminalLine = (content: string, type: TerminalLine["type"] = "output") => {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes().toString().padStart(2, "0")
    const seconds = now.getSeconds().toString().padStart(2, "0")
    const ampm = hours >= 12 ? "PM" : "AM"
    const displayHours = hours % 12 || 12
    const timestamp = `[${displayHours}:${minutes}:${seconds} ${ampm}]`

    if (content === "CLEAR_TERMINAL") {
      setTerminalLines([])
      return
    }

    setTerminalLines((prev) => [
      ...prev,
      {
        timestamp,
        content,
        type,
      },
    ])
  }

  const executeCommand = (cmd: string) => {
    const [command, ...args] = cmd.trim().split(" ")
    const commandKey = command.toLowerCase()

    addTerminalLine(`$ ${cmd}`, "command")

    // Handle special commands that switch tabs
    if (commandKey === "gor-dashboard") {
      const result = (COMMANDS as any)[commandKey](...args)
      addTerminalLine(result, "success")
      setTimeout(() => setCurrentTab("GOR Price"), 1000)
      return
    }

    if (commandKey === "dex" || commandKey === "launch-dex") {
      const result = (COMMANDS as any)[commandKey](...args)
      addTerminalLine(result, "success")
      setTimeout(() => setCurrentTab("DEX"), 1000)
      return
    }

    if (commandKey === "browse") {
      const result = (COMMANDS as any)[commandKey](...args)
      addTerminalLine(result, "success")
      setTimeout(() => setCurrentTab("Browser"), 1000)
      return
    }

    if (commandKey === "generate-image") {
      const result = (COMMANDS as any)[commandKey](...args)
      addTerminalLine(result, "success")
      setTimeout(() => setCurrentTab("Images"), 1000)
      return
    }

    if (commandKey === "explore-blockchain") {
      const result = (COMMANDS as any)[commandKey](...args)
      addTerminalLine(result, "success")
      setTimeout(() => window.open("https://gorbaganachain.xyz/", "_blank"), 1000)
      return
    }

    // Handle commands with arguments
    if (commandKey in COMMANDS) {
      const result = (COMMANDS as any)[commandKey](...args)
      addTerminalLine(result, "success")
    } else if (cmd.trim() === "") {
      return
    } else {
      // Use default handler for unknown commands
      const result = (COMMANDS as any).default(command)
      addTerminalLine(result, "error")
    }
  }

  const handleTabClick = (tabName: string) => {
    if (tabName === "Blockchain") {
      window.open("https://gorbaganachain.xyz/", "_blank")
      return
    }
    setCurrentTab(tabName)
  }

  const handleLiveSearch = () => {
    if (liveSearchQuery.trim() !== "") {
      window.open(`https://www.google.com/search?q=${liveSearchQuery}`, "_blank")
    }
  }

  const renderCurrentPage = () => {
    switch (currentTab) {
      case "Terminal":
        return (
          <TerminalPage
            terminalLines={terminalLines}
            currentCommand={currentCommand}
            setCurrentCommand={setCurrentCommand}
            executeCommand={executeCommand}
            terminalRef={terminalRef}
            setCurrentTab={setCurrentTab}
          />
        )
      case "XAI":
        return <XAIPage />
      case "Gobbler":
        return <GobblerPage />
      case "DEX":
        return <DEXPage />
      case "GOR Price":
        return <GORPricePage />
      case "Images":
        return <ImagesPage />
      case "Browser":
        return <BrowserPage />
      case "Streaming":
        return <StreamingPage />
      case "Chat":
        return <ChatPage />
      case "Menu":
        return <MenuPage setCurrentTab={setCurrentTab} />
      default:
        return (
          <TerminalPage
            terminalLines={terminalLines}
            currentCommand={currentCommand}
            setCurrentCommand={setCurrentCommand}
            executeCommand={executeCommand}
            terminalRef={terminalRef}
            setCurrentTab={setCurrentTab}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 animate-pulse"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1),transparent_70%)]"></div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4 bg-black/40 backdrop-blur-xl border-b border-orange-500/30 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
            <img
              src="/oscar-logo.jpg"
              alt="Gorbagana Logo"
              className="w-full h-full rounded-xl object-cover border-2 border-orange-400/50"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 rounded-xl blur-lg opacity-50 animate-pulse -z-10"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-orange-300 via-red-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
              Gorbagana Terminal v2.6.9
            </h1>
            <p className="text-slate-300 text-sm font-medium bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Multi-Modal AI • Real-time Voice • Natural Language Processing
            </p>
          </div>
        </div>
      </div>

      {/* Live Search */}
      <div className="relative z-10 flex justify-center pb-8 px-4">
        <div className="w-full max-w-3xl">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-2xl blur-xl opacity-20 animate-pulse"></div>
            <div className="relative flex items-center gap-4 bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-orange-500/30 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <span className="text-orange-300 font-bold text-lg">Live Search</span>
              </div>
              <div className="flex-1 flex">
                <Input
                  value={liveSearchQuery}
                  onChange={(e) => setLiveSearchQuery(e.target.value)}
                  placeholder="Search the web in real-time with Grok..."
                  className="flex-1 bg-gray-800/80 border-orange-500/30 text-white placeholder-gray-300 rounded-xl h-12 text-lg focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 backdrop-blur-sm"
                  onKeyPress={(e) => e.key === "Enter" && handleLiveSearch()}
                />
                <Button
                  onClick={handleLiveSearch}
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white ml-3 rounded-xl h-12 px-6 shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="relative z-10 flex bg-black/40 backdrop-blur-xl border-b border-orange-500/20 overflow-x-auto shadow-lg">
        {tabs.map((tab, index) => (
          <button
            key={tab.name}
            onClick={() => handleTabClick(tab.name)}
            className={`relative flex items-center gap-3 px-6 py-4 text-sm font-semibold transition-all duration-300 whitespace-nowrap group ${
              currentTab === tab.name
                ? "bg-gradient-to-r from-orange-500/20 to-red-500/20 text-white border-b-3 border-orange-400 shadow-lg"
                : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-red-500/10"
            }`}
          >
            <div
              className={`w-5 h-5 transition-all duration-300 ${currentTab === tab.name ? "text-orange-400 scale-110" : "group-hover:text-orange-300 group-hover:scale-105"}`}
            >
              <tab.icon className="w-full h-full" />
            </div>
            <span className="relative">
              {tab.name}
              {currentTab === tab.name && (
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"></div>
              )}
            </span>
          </button>
        ))}
      </div>

      {/* Page Content */}
      <div className="relative z-10 flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <span className="text-green-400 font-bold text-lg flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>🤖 Gorbagana Terminal v2.6.9
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-slate-300 font-medium">Mode:</span>
            <Badge
              variant="outline"
              className="border-orange-400 text-orange-300 bg-orange-950/50 backdrop-blur-sm px-4 py-2 rounded-xl font-semibold"
            >
              {currentTab === "Terminal" ? "🖥️ Terminal" : `📱 ${currentTab}`}
            </Badge>
            <Badge className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 border-orange-500/30 backdrop-blur-sm px-4 py-2 rounded-xl font-semibold shadow-lg">
              🤖 Agent Online
            </Badge>
          </div>
        </div>

        {/* Dynamic Page Content */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 rounded-2xl"></div>
          <div className="relative bg-black/20 backdrop-blur-sm rounded-2xl border border-orange-500/20 shadow-2xl overflow-hidden">
            <div className="p-6">{renderCurrentPage()}</div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="relative z-10 mt-6 flex items-center justify-between text-sm bg-black/40 backdrop-blur-xl p-4 rounded-2xl border border-orange-500/20 shadow-lg">
          <div className="flex items-center gap-6">
            {services.map((service, index) => (
              <div
                key={service.name}
                className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full border border-green-500/20"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-300 font-medium">
                  {service.name}: {service.status}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 text-orange-300 font-semibold">
            <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
            <span>🔗 ∞ 🔄 Gorbagana DEX & AI Analysis Ready</span>
          </div>
        </div>

        {/* Online Status */}
        <div className="mt-4 text-center">
          <Badge className="bg-orange-900 text-orange-300 border-orange-700">🟢 Online</Badge>
        </div>

        {/* X (Twitter) Links at Bottom */}
        <div className="mt-6 border-t border-gray-600 pt-4">
          <div className="flex justify-center">
            <div className="relative">
              <Button
                onClick={() => setShowXDropdown(!showXDropdown)}
                className="bg-black hover:bg-gray-800 text-white rounded-lg px-4 py-2 shadow-lg transition-all duration-200 border border-gray-600 flex items-center gap-2"
                title="Follow us on X"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="text-sm font-medium">Follow us on X</span>
              </Button>

              {/* Dropdown Menu */}
              {showXDropdown && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    <button
                      onClick={() => {
                        window.open("https://x.com/gorbagana_labs", "_blank")
                        setShowXDropdown(false)
                      }}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      Gor Labs
                    </button>
                    <button
                      onClick={() => {
                        window.open("https://x.com/gorxbt", "_blank")
                        setShowXDropdown(false)
                      }}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      GorXBT
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showXDropdown && <div className="fixed inset-0 z-40" onClick={() => setShowXDropdown(false)} />}
    </div>
  )
}
