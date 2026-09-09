import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS, INDUSTRIES } from '../data/companyData';
import { Send, CheckCircle2, FileText, ArrowRight, ShieldCheck, Download, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function QuotePortal({ selectedProduct, selectedIndustry, onOpenSpecs }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    country: 'India',
    email: '',
    phone: '',
    product: selectedProduct || 'Tyre Pyrolysis Oil — TPO',
    application: selectedIndustry || 'Hotmix Asphalt Plants',
    quantityMT: 100,
    deliveryLocation: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [quoteReference, setQuoteReference] = useState('');

  // Update if parent props change
  React.useEffect(() => {
    if (selectedProduct) {
      setFormData(prev => ({ ...prev, product: selectedProduct }));
    }
  }, [selectedProduct]);

  React.useEffect(() => {
    if (selectedIndustry) {
      setFormData(prev => ({ ...prev, application: selectedIndustry }));
    }
  }, [selectedIndustry]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const refCode = `RFQ-OTQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setQuoteReference(refCode);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (err) {
      // Ignore if not supported
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      company: '',
      country: 'India',
      email: '',
      phone: '',
      product: 'Tyre Pyrolysis Oil — TPO',
      application: 'Hotmix Asphalt Plants',
      quantityMT: 100,
      deliveryLocation: '',
      message: ''
    });
  };

  return (
    <section id="quote" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-brand-border-light dark:border-brand-border-dark gap-4">
          <div>
            <span className="tech-label text-brand-gold dark:text-brand-gold-light">10 / PROCUREMENT INQUIRY</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-brand-text-light dark:text-brand-text-dark mt-2">
              LET'S TALK ABOUT YOUR FUEL REQUIREMENT.
            </h2>
            <p className="text-sm sm:text-base text-brand-text-light-muted dark:text-brand-text-dark-muted mt-2 max-w-xl">
              Share your fuel specification requirement, application, volume, and delivery destination for a customized commercial quotation.
            </p>
          </div>
          <span className="tech-label text-brand-text-light-subtle dark:text-brand-text-dark-subtle self-start md:self-end font-mono">
            COMMERCIAL RESPONSE: SAME-DAY
          </span>
        </div>

        {/* Procurement Form / Submission Card */}
        <div className="border border-brand-border-light dark:border-brand-border-dark bg-brand-bg-surface dark:bg-brand-bg-dark-surface rounded-sm p-6 sm:p-10">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Product & Application Configuration */}
              <div>
                <span className="tech-label text-brand-gold block mb-4">
                  STEP 01: FUEL SPECIFICATION & VOLUME
                </span>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {PRODUCTS.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => setFormData({ ...formData, product: prod.name })}
                      className={`p-4 border rounded-sm cursor-pointer transition-all ${
                        formData.product === prod.name
                          ? 'border-brand-gold bg-brand-bg-light dark:bg-brand-bg-dark shadow-sm'
                          : 'border-brand-border-light dark:border-brand-border-dark hover:border-brand-border-light/80'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-brand-text-light dark:text-brand-text-dark">
                          {prod.name}
                        </span>
                        {formData.product === prod.name && (
                          <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-brand-text-light-muted dark:text-brand-text-dark-muted block">
                        {prod.code}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Application Dropdown */}
                  <div>
                    <label className="tech-label text-brand-text-light-muted dark:text-brand-text-dark-muted block mb-2">
                      OPERATIONAL APPLICATION
                    </label>
                    <select
                      value={formData.application}
                      onChange={(e) => setFormData({ ...formData, application: e.target.value })}
                      className="w-full px-4 py-3 bg-brand-bg-light dark:bg-brand-bg-dark border border-brand-border-light dark:border-brand-border-dark text-brand-text-light dark:text-brand-text-dark text-xs font-medium rounded-sm focus:outline-none focus:border-brand-gold"
                    >
                      <option value="Hotmix Asphalt Plants">Hotmix Asphalt Plants</option>
                      <option value="Steel Reheating Furnaces">Steel Reheating Furnaces</option>
                      <option value="Industrial Boilers & Steam Generation">Industrial Boilers & Steam Generation</option>
                      <option value="Aluminium Smelting / Reverberatory Furnaces">Aluminium Smelting / Reverberatory Furnaces</option>
                      <option value="Forging & Heat Treatment">Forging & Heat Treatment</option>
                      <option value="Refractory Kilns & Ceramics">Refractory Kilns & Ceramics</option>
                      <option value="Chemical / Process Thermal Heating">Chemical / Process Thermal Heating</option>
                      <option value="Bulk Resale / Trading">Bulk Resale / Trading</option>
                    </select>
                  </div>

                  {/* Volume Slider & Input */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="tech-label text-brand-text-light-muted dark:text-brand-text-dark-muted">
                        ESTIMATED MONTHLY VOLUME
                      </label>
                      <span className="text-xs font-mono font-bold text-brand-gold">
                        {formData.quantityMT} METRIC TONS (MT)
                      </span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="2000"
                      step="20"
                      value={formData.quantityMT}
                      onChange={(e) => setFormData({ ...formData, quantityMT: Number(e.target.value) })}
                      className="w-full accent-brand-gold cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-brand-text-light-subtle dark:text-brand-text-dark-subtle mt-1">
                      <span>20 MT (Single Tanker)</span>
                      <span>500 MT</span>
                      <span>2,000+ MT (Contract)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Delivery & Contact Details */}
              <div className="pt-6 border-t border-brand-border-light dark:border-brand-border-dark">
                <span className="tech-label text-brand-gold block mb-4">
                  STEP 02: PROCUREMENT CONTACT & SITE LOCATION
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="tech-label text-brand-text-light-muted dark:text-brand-text-dark-muted block mb-1">
                      CONTACT NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-brand-bg-light dark:bg-brand-bg-dark border border-brand-border-light dark:border-brand-border-dark text-brand-text-light dark:text-brand-text-dark text-xs rounded-sm focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="tech-label text-brand-text-light-muted dark:text-brand-text-dark-muted block mb-1">
                      COMPANY NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Infra Projects Ltd."
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2.5 bg-brand-bg-light dark:bg-brand-bg-dark border border-brand-border-light dark:border-brand-border-dark text-brand-text-light dark:text-brand-text-dark text-xs rounded-sm focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="tech-label text-brand-text-light-muted dark:text-brand-text-dark-muted block mb-1">
                      COUNTRY
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-4 py-2.5 bg-brand-bg-light dark:bg-brand-bg-dark border border-brand-border-light dark:border-brand-border-dark text-brand-text-light dark:text-brand-text-dark text-xs rounded-sm focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="tech-label text-brand-text-light-muted dark:text-brand-text-dark-muted block mb-1">
                      BUSINESS EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="procurement@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-brand-bg-light dark:bg-brand-bg-dark border border-brand-border-light dark:border-brand-border-dark text-brand-text-light dark:text-brand-text-dark text-xs rounded-sm focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="tech-label text-brand-text-light-muted dark:text-brand-text-dark-muted block mb-1">
                      PHONE / WHATSAPP *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-brand-bg-light dark:bg-brand-bg-dark border border-brand-border-light dark:border-brand-border-dark text-brand-text-light dark:text-brand-text-dark text-xs rounded-sm focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="tech-label text-brand-text-light-muted dark:text-brand-text-dark-muted block mb-1">
                      DELIVERY LOCATION / CITY / PORT *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sambalpur, Odisha / Nagpur, MH"
                      value={formData.deliveryLocation}
                      onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                      className="w-full px-4 py-2.5 bg-brand-bg-light dark:bg-brand-bg-dark border border-brand-border-light dark:border-brand-border-dark text-brand-text-light dark:text-brand-text-dark text-xs rounded-sm focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="tech-label text-brand-text-light-muted dark:text-brand-text-dark-muted block mb-1">
                    ADDITIONAL TECHNICAL SPECIFICATIONS / REMARKS
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide any specific viscosity, sulfur, or delivery schedule preferences..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 bg-brand-bg-light dark:bg-brand-bg-dark border border-brand-border-light dark:border-brand-border-dark text-brand-text-light dark:text-brand-text-dark text-xs rounded-sm focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-brand-border-light dark:border-brand-border-dark">
                <div className="flex items-center gap-2 text-xs text-brand-text-light-muted dark:text-brand-text-dark-muted">
                  <ShieldCheck className="w-4 h-4 text-brand-forest" />
                  <span>Direct commercial handling by Oilteq procurement desk. Confidential inquiry.</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-brand-charcoal text-white hover:bg-brand-gold font-bold text-xs uppercase tracking-widest transition-all rounded-sm shadow-md"
                >
                  <span>Submit RFQ Sourcing Inquiry</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          ) : (
            /* Submission Confirmation Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 space-y-6 text-center max-w-2xl mx-auto"
            >
              <div className="w-16 h-16 bg-brand-forest/10 border border-brand-forest/30 text-brand-forest rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="tech-label text-brand-gold font-mono">INQUIRY LOGGED SUCCESSFULLY</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-text-light dark:text-brand-text-dark mt-1">
                  RFQ Reference: {quoteReference}
                </h3>
                <p className="text-sm text-brand-text-light-muted dark:text-brand-text-dark-muted mt-2">
                  Thank you, <strong className="text-brand-text-light dark:text-brand-text-dark">{formData.name}</strong> ({formData.company}). An Oilteq commercial procurement officer has received your specification request for <strong className="text-brand-gold">{formData.quantityMT} MT of {formData.product}</strong> delivering to <strong className="text-brand-text-light dark:text-brand-text-dark">{formData.deliveryLocation}</strong>.
                </p>
              </div>

              {/* Inquiry Summary Box */}
              <div className="p-4 border border-brand-border-light dark:border-brand-border-dark bg-brand-bg-light dark:bg-brand-bg-dark rounded-sm text-left text-xs font-mono space-y-2">
                <div className="flex justify-between">
                  <span className="text-brand-text-light-subtle">Product:</span>
                  <span className="font-bold text-brand-text-light dark:text-brand-text-dark">{formData.product}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-text-light-subtle">Application:</span>
                  <span className="text-brand-text-light dark:text-brand-text-dark">{formData.application}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-text-light-subtle">Monthly Volume:</span>
                  <span className="text-brand-text-light dark:text-brand-text-dark">{formData.quantityMT} MT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-text-light-subtle">Destination:</span>
                  <span className="text-brand-text-light dark:text-brand-text-dark">{formData.deliveryLocation}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={onOpenSpecs}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider border border-brand-border-light dark:border-brand-border-dark hover:border-brand-gold text-brand-text-light dark:text-brand-text-dark rounded-sm flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-brand-teal" />
                  <span>Download Product Datasheet</span>
                </button>

                <button
                  onClick={handleReset}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-brand-charcoal text-white hover:bg-brand-gold rounded-sm flex items-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Submit Another Inquiry</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
