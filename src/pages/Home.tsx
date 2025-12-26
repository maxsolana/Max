import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Copy, Check, Wallet, Calendar, Gift, TrendingUp, ChevronRight, ShoppingCart, ChevronDown, Twitter, Send } from "lucide-react";
import solanaLogo from "/solana-logo.png";
import logoImg from "/logo.png";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useLogEvent } from "@/hooks/use-events";
import { Snowfall } from "@/components/Snowfall";


export default function Home() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { mutate: logEvent } = useLogEvent();
  const [copied, setCopied] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  const WALLET_ADDRESS = "DTc8PRT3e3KUAbq1vHrnKm8t2EtNmVjgjThD7t2wdm25";

  const downloadHTML = () => {
    const link = document.createElement('a');
    link.href = '/max-token-presale.html';
    link.download = 'max-token-presale.html';
    link.click();
    
    toast({
      title: "HTML Downloaded!",
      description: "Fully functional standalone file - all features working!",
      duration: 2000,
    });
    logEvent({ eventType: "download_html", details: "standalone_app" });
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(WALLET_ADDRESS);
    setCopied(true);
    toast({
      title: "Address Copied!",
      description: "Wallet address copied to clipboard.",
      duration: 2000,
    });
    logEvent({ eventType: "copy_address", details: "wallet_header" });
    setTimeout(() => setCopied(false), 2000);
  };

  const tokenomicsData = [
    { id: "presale", label: "Presale", value: "60%", tokens: "1,260,000 $MAX", color: "from-red-500/20 to-red-600/10", borderColor: "border-red-500/30", desc: "Early believers fund the project" },
    { id: "airdrop", label: "Airdrop / Sharing", value: "20%", tokens: "420,000 $MAX", color: "from-green-500/20 to-green-600/10", borderColor: "border-green-500/30", desc: "Community reward program" },
    { id: "dex", label: "DEX Listing", value: "16%", tokens: "336,000 $MAX", color: "from-blue-500/20 to-blue-600/10", borderColor: "border-blue-500/30", desc: "Liquidity for trading" },
    { id: "team", label: "Team", value: "4%", tokens: "84,000 $MAX", color: "from-amber-500/20 to-amber-600/10", borderColor: "border-amber-500/30", desc: "Locked for first 6 months" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden text-foreground bg-black">
      <Snowfall />

      {/* Header and Socials */}
      <section className="relative py-12 border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <motion.img 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src={logoImg}
                alt="$MAX Token"
                className="w-20 h-20 object-contain drop-shadow-lg"
              />
              <div>
                <motion.h1 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl font-black text-white"
                >
                  <span className="text-primary">$MAX</span>
                </motion.h1>
                <motion.p 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm text-muted-foreground"
                >
                  Christmas vibe coin for community rewards
                </motion.p>
                
                {/* Social Links */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-4 mt-4"
                >
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Follow Us:</p>
                  <a 
                    href="https://x.com/Max_Memex" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    data-testid="link-twitter"
                    className="inline-flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-300"
                  >
                    <Twitter className="w-5 h-5 text-white" />
                  </a>
                  <a 
                    href="https://t.me/max_memex" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    data-testid="link-telegram"
                    className="inline-flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-300"
                  >
                    <Send className="w-5 h-5 text-white" />
                  </a>
                </motion.div>
              </div>
            </div>

            {/* Submit Form at Top Right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-shrink-0"
            >
              <a
                href="https://tally.so/r/68e1pO"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-submit-form"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-yellow-600 hover:from-primary/90 hover:to-yellow-600/90 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-primary/20"
              >
                Submit Payment Proof
                <ChevronRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- MAIN GRID DASHBOARD --- */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-black text-white mb-6">Quick Overview</h2>

        {/* Total Supply Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary/10 to-yellow-600/10 border border-primary/30 rounded-lg p-6 flex items-center gap-4 mb-8"
        >
          <TrendingUp className="w-8 h-8 text-primary shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total Supply</p>
            <p className="text-3xl font-black text-white font-mono">2,100,000 $MAX</p>
          </div>
        </motion.div>

        {/* Buy Card - Link to Buy Page */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => navigate("/buy")}
          className="w-full bg-gradient-to-r from-primary/30 to-yellow-600/20 border border-primary/30 rounded-lg p-8 text-left hover:scale-105 transition-transform duration-300 cursor-pointer group mb-12"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <ShoppingCart className="w-6 h-6 text-primary" />
                <p className="text-2xl font-black text-white">Buy $MAX Tokens</p>
              </div>
              <p className="text-sm text-muted-foreground">Select your amount and see your returns →</p>
            </div>
            <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </motion.button>
        
        {/* Tokenomics Grid */}
        <div className="mb-12">
          <h3 className="text-lg font-bold text-white mb-4">Tokenomics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tokenomicsData.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedCard(item.id)}
                className={`bg-gradient-to-r ${item.color} border ${item.borderColor} rounded-lg p-4 text-left hover:scale-105 transition-transform duration-300 cursor-pointer group`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{item.label}</p>
                    <p className="text-2xl font-black text-white mt-1">{item.value}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
                </div>
                <p className="text-xs text-gray-300 font-mono truncate">{item.tokens}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Presale Details Grid */}
        <div className="mb-12">
          <h3 className="text-lg font-bold text-white mb-4">Presale Info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedCard("timeline")}
              className="bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/30 rounded-lg p-5 text-left hover:scale-105 transition-transform duration-300"
            >
              <Calendar className="w-6 h-6 text-secondary mb-3" />
              <p className="text-sm font-semibold text-muted-foreground mb-1">Timeline</p>
              <p className="text-white font-bold">Jan 15, 2026</p>
              <p className="text-xs text-muted-foreground mt-2">Ends & Listing</p>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              onClick={() => setSelectedCard("bonuses")}
              className="bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30 rounded-lg p-5 text-left hover:scale-105 transition-transform duration-300"
            >
              <Gift className="w-6 h-6 text-green-400 mb-3" />
              <p className="text-sm font-semibold text-muted-foreground mb-1">Bonuses</p>
              <p className="text-white font-bold">All Eligible</p>
              <p className="text-xs text-green-400 mt-2">+Telegram/Twitter</p>
            </motion.button>
          </div>
        </div>
      </section>

      {/* --- MODALS --- */}
      {tokenomicsData.map((item) => (
        <Dialog key={item.id} open={selectedCard === item.id} onOpenChange={() => setSelectedCard(null)}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle className="text-white">{item.label}</DialogTitle>
            </DialogHeader>
            <div className={`bg-gradient-to-r ${item.color} border ${item.borderColor} rounded-lg p-6 mt-4`}>
              <p className="text-lg font-bold text-white mb-2">{item.value}</p>
              <p className="text-sm text-muted-foreground mb-4">{item.tokens}</p>
              <p className="text-sm text-gray-300">{item.desc}</p>
            </div>
          </DialogContent>
        </Dialog>
      ))}

      <Dialog open={selectedCard === "timeline"} onOpenChange={() => setSelectedCard(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-white">Presale Timeline</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="bg-secondary/20 border border-secondary/30 rounded-lg p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Presale Ends</p>
              <p className="text-2xl font-black text-white">January 15, 2026</p>
            </div>
            <div className="bg-secondary/20 border border-secondary/30 rounded-lg p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Token Listing</p>
              <p className="text-2xl font-black text-white">January 16, 2026</p>
            </div>
            <div className="bg-secondary/20 border border-secondary/30 rounded-lg p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Token Distribution</p>
              <p className="text-2xl font-black text-white">Ongoing</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={selectedCard === "bonuses"} onOpenChange={() => setSelectedCard(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-white">Airdrop Bonuses</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
              <p className="text-white font-bold mb-2">✓ Presale Participants</p>
              <p className="text-sm text-muted-foreground">All participants are eligible for the airdrop event</p>
            </div>
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
              <p className="text-white font-bold mb-2">✓ Telegram Users</p>
              <p className="text-sm text-muted-foreground">Get extra tokens by joining our Telegram community</p>
            </div>
            <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
              <p className="text-white font-bold mb-2">✓ Twitter Users</p>
              <p className="text-sm text-muted-foreground">Follow, like, and share to earn additional bonus tokens</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* --- FAQ SECTION --- */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-black text-white mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {/* FAQ Item 1 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setExpandedFaqId(expandedFaqId === "faq1" ? null : "faq1")}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-white/10 transition-colors"
            >
              <h3 className="text-lg font-bold text-white">What is $MAX Token?</h3>
              {expandedFaqId === "faq1" ? (
                <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0 rotate-180" />
              )}
            </button>
            {expandedFaqId === "faq1" && (
              <div className="px-6 pb-6 border-t border-white/10">
                <p className="text-muted-foreground">
                  $MAX is a Christmas-themed community token built on Solana. It's designed to reward early believers and foster a vibrant community during the holiday season.
                </p>
              </div>
            )}
          </motion.div>

          {/* FAQ Item 2 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white/5 border border-white/10 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setExpandedFaqId(expandedFaqId === "faq2" ? null : "faq2")}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-white/10 transition-colors"
            >
              <h3 className="text-lg font-bold text-white">What is the presale price?</h3>
              {expandedFaqId === "faq2" ? (
                <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0 rotate-180" />
              )}
            </button>
            {expandedFaqId === "faq2" && (
              <div className="px-6 pb-6 border-t border-white/10">
                <p className="text-muted-foreground">
                  The presale price is <span className="text-primary font-bold">0.01 SOL per token</span>. This means 0.1 SOL will get you 10 tokens.
                </p>
              </div>
            )}
          </motion.div>

          {/* FAQ Item 3 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 border border-white/10 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setExpandedFaqId(expandedFaqId === "faq3" ? null : "faq3")}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-white/10 transition-colors"
            >
              <h3 className="text-lg font-bold text-white">When is the token launching?</h3>
              {expandedFaqId === "faq3" ? (
                <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0 rotate-180" />
              )}
            </button>
            {expandedFaqId === "faq3" && (
              <div className="px-6 pb-6 border-t border-white/10">
                <p className="text-muted-foreground">
                  The presale ends on <span className="text-primary font-bold">January 15, 2026</span> and the token launches on <span className="text-primary font-bold">January 16, 2026</span>. DEX listing happens immediately at launch.
                </p>
              </div>
            )}
          </motion.div>

          {/* FAQ Item 4 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white/5 border border-white/10 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setExpandedFaqId(expandedFaqId === "faq4" ? null : "faq4")}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-white/10 transition-colors"
            >
              <h3 className="text-lg font-bold text-white">What's the launch price?</h3>
              {expandedFaqId === "faq4" ? (
                <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0 rotate-180" />
              )}
            </button>
            {expandedFaqId === "faq4" && (
              <div className="px-6 pb-6 border-t border-white/10">
                <p className="text-muted-foreground">
                  At launch, the price will be <span className="text-green-400 font-bold">0.1 SOL per token</span>. Early presale participants will see significant gains.
                </p>
              </div>
            )}
          </motion.div>

          {/* FAQ Item 5 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setExpandedFaqId(expandedFaqId === "faq5" ? null : "faq5")}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-white/10 transition-colors"
            >
              <h3 className="text-lg font-bold text-white">How do I participate in the presale?</h3>
              {expandedFaqId === "faq5" ? (
                <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0 rotate-180" />
              )}
            </button>
            {expandedFaqId === "faq5" && (
              <div className="px-6 pb-6 border-t border-white/10">
                <p className="text-muted-foreground">
                  Simply visit the <span className="text-primary font-bold">"Buy $MAX Tokens"</span> page, select your amount, and send SOL to the wallet address. You'll receive your tokens instantly.
                </p>
              </div>
            )}
          </motion.div>

          {/* FAQ Item 6 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white/5 border border-white/10 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setExpandedFaqId(expandedFaqId === "faq6" ? null : "faq6")}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-white/10 transition-colors"
            >
              <h3 className="text-lg font-bold text-white">What about the airdrop bonus?</h3>
              {expandedFaqId === "faq6" ? (
                <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0 rotate-180" />
              )}
            </button>
            {expandedFaqId === "faq6" && (
              <div className="px-6 pb-6 border-t border-white/10">
                <p className="text-muted-foreground">
                  If you are a community holder, share with your community and submit proof within our forum. You will receive your airdrop amount based on total contributors.
                </p>
              </div>
            )}
          </motion.div>

          {/* FAQ Item 7 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 border border-white/10 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setExpandedFaqId(expandedFaqId === "faq7" ? null : "faq7")}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-white/10 transition-colors"
            >
              <h3 className="text-lg font-bold text-white">Is my transaction secure?</h3>
              {expandedFaqId === "faq7" ? (
                <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0 rotate-180" />
              )}
            </button>
            {expandedFaqId === "faq7" && (
              <div className="px-6 pb-6 border-t border-white/10">
                <p className="text-muted-foreground">
                  Yes! Funds are always secure within our hardcoded multi-signature wallet. Always verify the wallet address before sending funds for maximum security.
                </p>
              </div>
            )}
          </motion.div>

          {/* FAQ Item 8 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-white/5 border border-white/10 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setExpandedFaqId(expandedFaqId === "faq8" ? null : "faq8")}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-white/10 transition-colors"
            >
              <h3 className="text-lg font-bold text-white">What's the price estimate at launch?</h3>
              {expandedFaqId === "faq8" ? (
                <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0 rotate-180" />
              )}
            </button>
            {expandedFaqId === "faq8" && (
              <div className="px-6 pb-6 border-t border-white/10">
                <p className="text-muted-foreground">
                  The launch price will be <span className="text-green-400 font-bold">0.1 SOL per token</span>, significantly higher than the presale price of 0.01 SOL. Early participants will see substantial gains.
                </p>
              </div>
            )}
          </motion.div>

          {/* FAQ Item 9 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 border border-white/10 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setExpandedFaqId(expandedFaqId === "faq9" ? null : "faq9")}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-white/10 transition-colors"
            >
              <h3 className="text-lg font-bold text-white">What's the total fundraise target?</h3>
              {expandedFaqId === "faq9" ? (
                <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0 rotate-180" />
              )}
            </button>
            {expandedFaqId === "faq9" && (
              <div className="px-6 pb-6 border-t border-white/10">
                <p className="text-muted-foreground">
                  Our total fundraise estimation is <span className="text-primary font-bold">100 Million US Dollars</span> from community members and venture capital backers combined.
                </p>
              </div>
            )}
          </motion.div>

          {/* FAQ Item 10 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="bg-white/5 border border-white/10 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setExpandedFaqId(expandedFaqId === "faq10" ? null : "faq10")}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-white/10 transition-colors"
            >
              <h3 className="text-lg font-bold text-white">When do I receive my tokens?</h3>
              {expandedFaqId === "faq10" ? (
                <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0 rotate-180" />
              )}
            </button>
            {expandedFaqId === "faq10" && (
              <div className="px-6 pb-6 border-t border-white/10">
                <p className="text-muted-foreground">
                  Tokens will be distributed on <span className="text-primary font-bold">January 1, 2026</span>, the same day as the DEX listing. You can then trade them freely.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-6 border-t border-white/5 bg-black/40 text-center mt-12">
        <p className="text-muted-foreground text-xs">
          © 2025 $MAX Token. A Christmas Community Project.
        </p>
      </footer>
    </div>
  );
}
