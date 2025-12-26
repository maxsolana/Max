import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Snowfall } from "@/components/Snowfall";
import solanaImg from "/solana-logo.png";
import logoImg from "/logo.png";

const WALLET_ADDRESS = "DTc8PRT3e3KUAbq1vHrnKm8t2EtNmVjgjThD7t2wdm25";
const BUY_AMOUNTS = [0.1, 0.5, 1, 2, 5, 10];
const PRESALE_PRICE_PER_TOKEN = 0.01; // 0.1 SOL = 10 tokens
const LAUNCH_PRICE_PER_TOKEN = 0.1;

export default function Buy() {
  const [, navigate] = useLocation();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [copied, setCopied] = useState(false);

  const calculateMetrics = (solAmount: number) => {
    const tokensReceived = solAmount / PRESALE_PRICE_PER_TOKEN;
    const valueAtLaunch = tokensReceived * LAUNCH_PRICE_PER_TOKEN;
    const profit = valueAtLaunch - solAmount;
    const profitPercent = (profit / solAmount) * 100;
    return { tokensReceived, valueAtLaunch, profit, profitPercent };
  };

  const handleCompletePurchase = (amount: number) => {
    // Trigger Solana transaction
    const url = `solana:${WALLET_ADDRESS}?amount=${amount}&label=MAX%20Presale`;
    window.location.href = url;
    // Show payment form after transaction
    setTimeout(() => setShowPaymentForm(true), 1000);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(WALLET_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-foreground bg-black">
      <Snowfall />

      <section className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-4xl font-black text-white">Buy <span className="text-primary">$MAX</span></h1>
        </motion.div>

        {/* Quick Price Info */}
        <div className="mb-12 p-6 bg-gradient-to-r from-primary/10 to-yellow-600/10 border border-primary/30 rounded-lg">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">Presale Price</p>
              <p className="text-2xl font-black text-white">0.01 SOL</p>
              <p className="text-xs text-muted-foreground mt-1">Per Token</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">Launch Price</p>
              <p className="text-2xl font-black text-green-400">0.1 SOL</p>
              <p className="text-xs text-green-300 mt-1">10x Gain</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">Total Fundraise</p>
              <p className="text-2xl font-black text-primary">$100M</p>
              <p className="text-xs text-muted-foreground mt-1">Target</p>
            </div>
          </div>
        </div>

        {/* Amount Selection Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Select Amount</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {BUY_AMOUNTS.map((amount, i) => (
              <motion.button
                key={amount}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => {
                  setSelectedAmount(amount);
                  setShowPaymentForm(false);
                }}
                className={`p-8 rounded-lg border transition-all duration-300 text-center font-bold hover:scale-[1.05] active:scale-95 flex flex-col items-center justify-center gap-4 min-h-[160px] ${
                  selectedAmount === amount
                    ? "bg-gradient-to-br from-primary/40 to-yellow-600/30 border-primary/60 ring-2 ring-primary shadow-lg shadow-primary/20"
                    : amount === 5
                    ? "bg-gradient-to-br from-primary/25 to-yellow-600/15 border-primary/45"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <div className="text-4xl text-white">{amount}</div>
                <img src={solanaImg} alt="Solana" className="w-8 h-8 object-contain" />
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-widest">SOL</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Summary Dialog Overlay */}
        <Dialog open={selectedAmount !== null && !showPaymentForm} onOpenChange={(open) => !open && setSelectedAmount(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-black to-gray-900 border border-primary/30">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black text-white">Purchase Summary</DialogTitle>
            </DialogHeader>
            
            {selectedAmount && (
              <div className="space-y-6 mt-6">
                {/* Main Grid - 4 Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* You Pay Card */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-center hover:bg-white/10 transition-colors">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-3">You Pay</p>
                    <p className="text-4xl font-black text-white flex items-center justify-center gap-2 mb-1">
                      <img src={solanaImg} alt="SOL" className="w-6 h-6 object-contain" />
                      {selectedAmount}
                    </p>
                    <p className="text-xs text-muted-foreground">SOL</p>
                  </div>

                  {/* Tokens You Get Card */}
                  <div className="bg-gradient-to-br from-primary/30 to-yellow-600/10 border border-primary/40 rounded-lg p-6 text-center hover:from-primary/40 hover:to-yellow-600/20 transition-all">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-3">Tokens You Get</p>
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <img src={logoImg} alt="$MAX Token" className="w-6 h-6 object-contain drop-shadow-lg" />
                      <p className="text-4xl font-black text-primary">{calculateMetrics(selectedAmount).tokensReceived.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
                    </div>
                    <p className="text-xs text-primary/80">$MAX Tokens</p>
                  </div>

                  {/* Value at Launch Card */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-center hover:bg-white/10 transition-colors">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-3">Value at Launch</p>
                    <p className="text-4xl font-black text-white flex items-center justify-center gap-2 mb-1">
                      <img src={solanaImg} alt="SOL" className="w-6 h-6 object-contain" />
                      {calculateMetrics(selectedAmount).valueAtLaunch.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">SOL</p>
                  </div>

                  {/* Potential Profit Card */}
                  <div className="bg-gradient-to-br from-green-500/30 to-green-600/10 border border-green-500/40 rounded-lg p-6 text-center hover:from-green-500/40 hover:to-green-600/20 transition-all">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-3">Potential Profit</p>
                    <p className="text-4xl font-black text-green-400 mb-1">+{calculateMetrics(selectedAmount).profit.toFixed(2)}</p>
                    <p className="text-sm text-green-300 font-bold">(+{calculateMetrics(selectedAmount).profitPercent.toFixed(0)}%)</p>
                  </div>
                </div>

                {/* Additional Info Row */}
                <div className="grid grid-cols-3 gap-3">
                  {/* Price Per Token */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">Price Per Token</p>
                    <p className="text-2xl font-black text-white">{PRESALE_PRICE_PER_TOKEN} SOL</p>
                  </div>

                  {/* Launch Price */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">Launch Price</p>
                    <p className="text-2xl font-black text-green-400">{LAUNCH_PRICE_PER_TOKEN} SOL</p>
                  </div>

                  {/* Multiple */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">Gain Multiple</p>
                    <p className="text-2xl font-black text-green-400">{(LAUNCH_PRICE_PER_TOKEN / PRESALE_PRICE_PER_TOKEN).toFixed(0)}x</p>
                  </div>
                </div>

                {/* Complete Purchase Button */}
                <button
                  onClick={() => handleCompletePurchase(selectedAmount)}
                  className="w-full bg-gradient-to-r from-primary to-yellow-600 hover:from-primary/90 hover:to-yellow-600/90 text-white font-bold py-4 rounded-lg transition-all duration-300 text-lg"
                >
                  Complete Purchase - {selectedAmount} SOL
                </button>

                <p className="text-center text-xs text-muted-foreground">
                  Send {selectedAmount} SOL to receive {calculateMetrics(selectedAmount).tokensReceived.toLocaleString('en-US', { maximumFractionDigits: 0 })} $MAX tokens
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Payment Proof Form */}
        {selectedAmount && showPaymentForm && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 bg-gradient-to-br from-primary/10 to-yellow-600/10 border border-primary/40 rounded-lg p-12"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-white mb-2">Submit Payment Proof</h2>
              <p className="text-muted-foreground">Complete your purchase for {selectedAmount} SOL</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* Submit Form Link at Top */}
              <a
                href="https://tally.so/r/68e1pO"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-primary to-yellow-600 hover:from-primary/90 hover:to-yellow-600/90 text-white font-bold py-6 rounded-lg transition-all duration-300 text-xl flex items-center justify-center gap-3"
              >
                <span>Submit Payment Proof Form</span>
                <span className="text-lg">→</span>
              </a>

              {/* Wallet Address Section */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-8">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-4">Send SOL To (Optional)</p>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1">
                    <p className="text-sm text-white break-all font-mono bg-black/30 p-4 rounded-lg">{WALLET_ADDRESS}</p>
                  </div>
                  <motion.button
                    onClick={copyAddress}
                    className="flex-shrink-0 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-lg transition-all h-fit"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </motion.button>
                </div>
              </div>

              {/* Purchase Summary */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-8 text-center">
                <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-4">Purchase Summary</p>
                <p className="text-4xl font-black text-white mb-2 flex items-center justify-center gap-3">
                  {selectedAmount}
                  <img src={solanaImg} alt="SOL" className="w-10 h-10 object-contain" />
                </p>
                <p className="text-lg text-primary font-bold">
                  = {calculateMetrics(selectedAmount).tokensReceived.toLocaleString('en-US', { maximumFractionDigits: 0 })} $MAX
                </p>
                <p className="text-xs text-muted-foreground mt-3">
                  Value at Launch: {calculateMetrics(selectedAmount).valueAtLaunch.toFixed(2)} SOL
                </p>
              </div>

              <button
                onClick={() => setShowPaymentForm(false)}
                className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-lg transition-colors border border-white/10"
              >
                Back to Calculator
              </button>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-8">
              Fill out the payment form and send the SOL amount to the wallet above to complete your purchase.
            </p>
          </motion.div>
        )}
      </section>
    </div>
  );
}
