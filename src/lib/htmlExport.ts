export function generateStandaloneHTML(maxLogoBase64: string, solanaLogoBase64: string): string {
  const maxLogo = maxLogoBase64;
  const solLogo = solanaLogoBase64;
  const wallet = "DTc8PRT3e3KUAbq1vHrnKm8t2EtNmVjgjThD7t2wdm25";

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$MAX Token - Christmas Presale | Solana</title>
    <meta name="description" content="$MAX is a Christmas-themed community token on Solana. Join the presale and get 10x returns at launch!">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { height: 100%; width: 100%; }
        body { background-color: #000; color: #fff; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; overflow-x: hidden; }
        .snowflake { position: fixed; top: -10px; z-index: 1; user-select: none; color: rgba(255,255,255,0.8); animation: snowfall linear infinite; }
        @keyframes snowfall { to { transform: translateY(100vh); opacity: 0; } }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        a { color: inherit; text-decoration: none; }
        .modal { display: none; } .modal.active { display: flex; }
        .tab-btn { padding: 8px 16px; border: none; background: none; cursor: pointer; font-weight: bold; border-bottom: 2px solid transparent; transition: all 0.3s; color: rgba(255,255,255,0.5); }
        .tab-btn.active { color: #f59e0b; border-bottom: 2px solid #f59e0b; }
        .amount-btn { padding: 20px; border: 2px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.5); border-radius: 8px; color: white; cursor: pointer; text-align: center; font-weight: bold; transition: all 0.3s; display: flex; flex-direction: column; align-items: center; gap: 8px; position: relative; overflow: hidden; }
        .amount-btn:hover { transform: scale(1.05); background: rgba(255,255,255,0.1); }
        .amount-btn.active { background: linear-gradient(to bottom right, rgba(245,158,11,0.4), rgba(220,38,38,0.2)); border-color: #f59e0b; outline: 2px solid #f59e0b; transform: scale(1.05); }
    </style>
</head>
<body class="bg-black text-white">
    <div id="snowfall"></div>
    
    <div style="max-width: 1400px; margin: 0 auto;">
        <!-- Tabs -->
        <div style="display: flex; gap: 16px; padding: 20px 16px; border-bottom: 1px solid rgba(255,255,255,0.05); position: sticky; top: 0; background: rgba(0,0,0,0.95); z-index: 10;">
            <button id="tab-home" onclick="showTab('home')" class="tab-btn active">HOME</button>
            <button id="tab-buy" onclick="showTab('buy')" class="tab-btn">BUY $MAX</button>
        </div>

        <!-- HOME -->
        <div id="home-tab" style="display: block;" class="animate-fade-in">
            <section style="border-bottom: 1px solid rgba(255,255,255,0.05); padding: 48px 16px;">
                <div style="display: flex; align-items: center; gap: 24px; margin-bottom: 32px; flex-wrap: wrap;">
                    <img src="data:image/png;base64,${maxLogo}" alt="$MAX" style="width: 80px; height: 80px; object-fit: contain;">
                    <div style="flex: 1; min-width: 200px;">
                        <h1 style="font-size: 36px; font-weight: 900; margin-bottom: 8px;"><span style="color: #f59e0b;">$MAX</span></h1>
                        <p style="font-size: 14px; color: rgba(255,255,255,0.6);">Christmas vibe coin for community rewards</p>
                    </div>
                </div>
            </section>
            
            <section style="max-width: 1200px; margin: 0 auto; padding: 48px 16px;">
                <div onclick="showTab('buy')" style="width: 100%; background: linear-gradient(to right, rgba(245,158,11,0.3), rgba(220,38,38,0.2)); border: 1px solid rgba(245,158,11,0.3); border-radius: 8px; padding: 32px; cursor: pointer; text-align: left; margin-bottom: 32px;">
                    <p style="font-size: 24px; font-weight: 900; color: white;">Buy $MAX Tokens</p>
                    <p style="color: rgba(255,255,255,0.6);">Select your amount and see your returns →</p>
                </div>
            </section>
        </div>

        <!-- BUY -->
        <div id="buy-tab" style="display: none; padding: 48px 16px;" class="animate-fade-in">
            <h1 style="font-size: 36px; font-weight: 900; margin-bottom: 32px;">Buy <span style="color: #f59e0b;">$MAX</span></h1>
            
            <div id="calculator-view">
                <div style="background: linear-gradient(to right, rgba(245,158,11,0.1), rgba(220,38,38,0.1)); border: 1px solid rgba(245,158,11,0.3); border-radius: 8px; padding: 24px; margin-bottom: 48px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; text-align: center;">
                    <div><p style="font-size: 12px; color: rgba(255,255,255,0.6);">PRESALE</p><p style="font-size: 24px; font-weight: 900;">0.01 SOL</p></div>
                    <div><p style="font-size: 12px; color: rgba(255,255,255,0.6);">LAUNCH</p><p style="font-size: 24px; font-weight: 900; color: #22c55e;">0.1 SOL</p></div>
                    <div><p style="font-size: 12px; color: rgba(255,255,255,0.6);">TARGET</p><p style="font-size: 24px; font-weight: 900; color: #f59e0b;">$100M</p></div>
                </div>

                <h2 style="font-size: 24px; font-weight: 900; margin-bottom: 24px;">Select Amount</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 16px; margin-bottom: 48px;">
                    <button onclick="calc(0.1)" class="amount-btn">0.1<br><span style="font-size: 12px; opacity: 0.6;">SOL</span></button>
                    <button onclick="calc(0.5)" class="amount-btn">0.5<br><span style="font-size: 12px; opacity: 0.6;">SOL</span></button>
                    <button onclick="calc(1)" class="amount-btn">1<br><span style="font-size: 12px; opacity: 0.6;">SOL</span></button>
                    <button onclick="calc(2)" class="amount-btn">2<br><span style="font-size: 12px; opacity: 0.6;">SOL</span></button>
                    <button onclick="calc(5)" class="amount-btn">5<br><span style="font-size: 12px; opacity: 0.6;">SOL</span></button>
                    <button onclick="calc(10)" class="amount-btn">10<br><span style="font-size: 12px; opacity: 0.6;">SOL</span></button>
                </div>
            </div>

            <!-- Payment Proof Form Section -->
            <div id="proof-form" style="display: none; background: linear-gradient(to bottom right, rgba(245,158,11,0.1), rgba(220,38,38,0.1)); border: 1px solid rgba(245,158,11,0.4); border-radius: 12px; padding: 48px;" class="animate-fade-in">
                <div style="text-align: center; margin-bottom: 32px;">
                    <h2 style="font-size: 32px; font-weight: 900;">Submit Payment Proof</h2>
                    <p style="color: rgba(255,255,255,0.6);" id="selected-amt-text"></p>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr; gap: 24px;">
                    <a href="https://tally.so/r/68e1pO" target="_blank" style="display: flex; align-items: center; justify-content: center; gap: 12px; background: linear-gradient(to right, #f59e0b, #dc2626); padding: 24px; border-radius: 8px; color: white; font-weight: bold; font-size: 20px; text-decoration: none;">
                        Submit Payment Proof Form →
                    </a>

                    <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 32px;">
                        <p style="font-size: 12px; color: rgba(255,255,255,0.6); text-transform: uppercase; margin-bottom: 16px; font-weight: 600;">SEND SOL TO (OPTIONAL)</p>
                        <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
                            <p style="flex: 1; background: rgba(0,0,0,0.3); padding: 16px; border-radius: 8px; font-family: monospace; font-size: 14px; word-break: break-all;">${wallet}</p>
                            <button onclick="copyAddr()" id="copy-btn" style="background: #f59e0b; border: none; padding: 16px 32px; border-radius: 8px; color: white; font-weight: bold; cursor: pointer;">Copy</button>
                        </div>
                    </div>

                    <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 32px; text-align: center;">
                        <p style="font-size: 14px; color: rgba(255,255,255,0.6); text-transform: uppercase; margin-bottom: 16px; font-weight: 600;">PURCHASE SUMMARY</p>
                        <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 8px;">
                            <p style="font-size: 48px; font-weight: 900; color: white;" id="summary-amt">0</p>
                            <img src="data:image/png;base64,${solLogo}" style="width: 32px; height: 32px; object-fit: contain;">
                        </div>
                        <p style="font-size: 24px; color: #f59e0b; font-weight: 900;" id="summary-tok">= 0 $MAX</p>
                    </div>
                </div>

                <button onclick="backToCalc()" style="width: 100%; padding: 16px; border: 1px solid rgba(255,255,255,0.1); background: none; color: white; cursor: pointer; border-radius: 8px; margin-top: 24px;">Back to Calculator</button>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div id="modal" class="modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); align-items: center; justify-content: center; z-index: 100;">
        <div style="background: #0a0a0a; border: 1px solid rgba(245,158,11,0.3); border-radius: 12px; padding: 32px; max-width: 600px; width: 90%; max-height: 90vh; overflow-y: auto;" class="animate-fade-in">
            <div style="display: flex; justify-content: space-between; margin-bottom: 24px;">
                <h2 style="font-size: 24px; font-weight: 900;">Purchase Summary</h2>
                <button onclick="closeModal()" style="border: none; background: none; color: #fff; font-size: 24px; cursor: pointer;">&times;</button>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px;">
                <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 24px; text-align: center;">
                    <p style="font-size: 11px; color: rgba(255,255,255,0.6);">YOU PAY</p>
                    <p style="font-size: 36px; font-weight: 900; margin: 8px 0;" id="amt">0</p>
                    <img src="data:image/png;base64,${solLogo}" style="width: 24px;">
                </div>
                <div style="background: linear-gradient(135deg, rgba(245,158,11,0.3), rgba(220,38,38,0.1)); border: 1px solid rgba(245,158,11,0.4); border-radius: 8px; padding: 24px; text-align: center;">
                    <p style="font-size: 11px; color: rgba(255,255,255,0.6);">TOKENS</p>
                    <p style="font-size: 36px; font-weight: 900; color: #f59e0b; margin: 8px 0;" id="tok">0</p>
                    <img src="data:image/png;base64,${maxLogo}" style="width: 32px;">
                </div>
            </div>

            <button id="complete-btn" onclick="executePurchase()" style="width: 100%; padding: 20px; background: linear-gradient(to right, #f59e0b, #dc2626); border: none; border-radius: 8px; color: white; font-weight: bold; cursor: pointer; font-size: 20px;">Complete Purchase</button>
        </div>
    </div>

    <script>
        let currentAmt = 0;
        const wallet = "${wallet}";

        function showTab(t) {
            document.querySelectorAll('[id$="-tab"]').forEach(e => e.style.display = 'none');
            document.querySelectorAll('.tab-btn').forEach(e => e.classList.remove('active'));
            document.getElementById(t + '-tab').style.display = 'block';
            document.getElementById('tab-' + t).classList.add('active');
            if(t === 'buy') backToCalc();
        }

        function calc(a) {
            currentAmt = a;
            const t = a / 0.01;
            document.getElementById('amt').textContent = a;
            document.getElementById('tok').textContent = Math.floor(t).toLocaleString();
            document.getElementById('complete-btn').textContent = 'Complete Purchase - ' + a + ' SOL';
            document.getElementById('modal').classList.add('active');
        }

        function closeModal() {
            document.getElementById('modal').classList.remove('active');
        }

        function executePurchase() {
            // Force browser to treat this as a direct user interaction
            const label = encodeURIComponent('MAX Presale');
            const url = 'solana:' + wallet + '?amount=' + currentAmt + '&label=' + label;
            
            // 1. UPDATE UI STATE FIRST (MANDATORY)
            closeModal();
            document.getElementById('calculator-view').style.display = 'none';
            document.getElementById('proof-form').style.display = 'block';
            document.getElementById('selected-amt-text').textContent = 'Complete your purchase for ' + currentAmt + ' SOL';
            document.getElementById('summary-amt').textContent = currentAmt;
            document.getElementById('summary-tok').textContent = '= ' + Math.floor(currentAmt / 0.01).toLocaleString() + ' $MAX';
            
            // 2. TRIGGER PROTOCOL REDIRECT
            // For local files, we use location.replace or direct href
            // We do NOT use window.open as it triggers popup blockers
            window.location.href = url;
            
            window.scrollTo(0, 0);
        }

        function backToCalc() {
            document.getElementById('proof-form').style.display = 'none';
            document.getElementById('calculator-view').style.display = 'block';
        }

        function copyAddr() {
            navigator.clipboard.writeText(wallet);
            const btn = document.getElementById('copy-btn');
            btn.textContent = 'Copied!';
            setTimeout(() => btn.textContent = 'Copy', 2000);
        }

        function createSnowflake() {
            const snowfall = document.getElementById('snowfall');
            if(!snowfall) return;
            const s = document.createElement('div');
            s.className = 'snowflake';
            s.textContent = '❄';
            s.style.left = Math.random() * 100 + 'vw';
            s.style.animationDuration = (Math.random() * 5 + 5) + 's';
            s.style.opacity = Math.random();
            snowfall.appendChild(s);
            setTimeout(() => s.remove(), 6000);
        }
        setInterval(createSnowflake, 300);
    </script>
</body>
</html>`;
}
