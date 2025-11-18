import { Check, Crown, Wallet, ArrowDown, ArrowUp, Sparkles } from "lucide-react";
import "./Pricing.css";
import { Navbar } from "./Home";

export default function Pricing() {
  return (
    <>
      <Navbar />
      <div className="pricing-page">
        <div className="container">
          {/* Hero */}
          <div className="pricing-hero">
            <h1>Simple, Transparent Pricing</h1>
            <p>No hidden fees. No subscriptions you forget. Just credits that fuel learning & teaching.</p>
          </div>

          {/* SECTION 1: Membership Plans */}
          <section className="membership-section">
            <h2 className="section-title">Choose Your Membership</h2>
            <p className="section-subtitle">Get <strong>daily free daily credits</strong> just for being active</p>

            <div className="plans-grid">
              {/* Basic Plan */}
              <div className="plan-card basic">
                <div className="plan-header">
                  <h3>Basic</h3>
                  <p className="price">Free Forever</p>
                </div>
                <ul className="features">
                  <li><Check size={20} /> 10 credits every day</li>
                  <li><Check size={20} /> Send messages</li>
                  <li><Check size={20} /> Join live sessions</li>
                  <li><Check size={20} /> Rate teachers</li>
                </ul>
                <button className="plan-btn active">Current Plan</button>
              </div>

              {/* Premium Plan */}
              <div className="plan-card premium">
                <div className="popular-badge">
                  <Crown size={18} /> Most Popular
                </div>
                <div className="plan-header">
                  <h3>Premium</h3>
                  <p className="price">₹499 <span>/month</span></p>
                </div>
                <ul className="features">
                  <li><Check size={20} /> <strong>50 credits every day</strong></li>
                  <li><Check size={20} /> Priority in teacher search</li>
                  <li><Check size={20} /> No ads</li>
                  <li><Check size={20} /> HD video calls</li>
                  <li><Check size={20} /> Early access to new features</li>
                </ul>
                <button className="plan-btn premium">Upgrade to Premium</button>
              </div>
            </div>
          </section>

          {/* SECTION 2: Buy Credits Directly */}
          <section className="buy-credits-section">
            <h2 className="section-title">Need Credits Now?</h2>
            <p className="section-subtitle">Top up instantly — no waiting for tomorrow</p>

            <div className="credits-grid">
              {[
                { credits: 100, price: 149, per: "₹1.49/credit", popular: false },
                { credits: 300, price: 399, per: "₹1.33/credit", popular: true },
                { credits: 600, price: 699, per: "₹1.16/credit", popular: false },
                { credits: 1200, price: 1299, per: "₹1.08/credit", popular: false },
              ].map(pack => (
                <div key={pack.credits} className={`credit-pack ${pack.popular ? "popular" : ""}`}>
                  {pack.popular && <div className="best-value">Best Value</div>}
                  <h3>{pack.credits} Credits</h3>
                  <p className="pack-price">₹{pack.price}</p>
                  <p className="per">{pack.per}</p>
                  <button className="buy-btn">Buy Now</button>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: Withdraw Earnings (For Teachers) */}
          <section className="withdraw-section">
            <h2 className="section-title">Teach & Earn Real Money</h2>
            <p className="section-subtitle">Every credit you earn from teaching can be withdrawn as cash</p>

            <div className="withdraw-info">
              <div className="earn-flow">
                <div className="flow-item">
                  <ArrowUp />
                  <h4>Teach a session</h4>
                  <p>Earn credits per minute</p>
                </div>
                <div className="flow-arrow">→</div>
                <div className="flow-item">
                  <Wallet />
                  <h4>Accumulate credits</h4>
                  <p>Minimum 500 to withdraw</p>
                </div>
                <div className="flow-arrow">→</div>
                <div className="flow-item">
                  <ArrowDown />
                  <h4>Get paid to bank/PayPal</h4>
                  <p>₹0.80 per credit • Paid weekly</p>
                </div>
              </div>

              <div className="withdraw-box">
                <h3>Current Rate</h3>
                <p className="rate">1 Credit = ₹0.80</p>
                <p className="example">
                  Teach 10 hours at 80 credits/hr → Earn ₹6,400/month
                </p>
                <button className="withdraw-btn">Become a Teacher →</button>
              </div>
            </div>
          </section>

          {/* FAQ Snippet */}
          <section className="faq-snippet">
            <h2>Common Questions</h2>
            <div className="faq-item">
              <p><strong>Do credits expire?</strong> No — they never expire.</p>
            </div>
            <div className="faq-item">
              <p><strong>Can I gift credits?</strong> Yes! Coming soon.</p>
            </div>
            <div className="faq-item">
              <p><strong>Is there a refund policy?</strong> Yes — 7-day refund on unused credit packs.</p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="pricing-footer">
          <p>© 2025 SkillXchange • Made with passion for learning & teaching</p>
        </footer>
      </div>
    </>
  );
}