import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { X, Check, Loader2 } from 'lucide-react';

// Official WhatsApp Logo Component
const WhatsAppLogo = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: '',
    budget: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // 1. Format the message for WhatsApp
    const text = `Salut! Sunt interesat de o oferta Atlantis Furnitures.
    
📋 *Detalii Proiect:*
• Nume: ${formData.name}
• Telefon: ${formData.phone}
• Email: ${formData.email || '-'}
• Tip Proiect: ${formData.projectType || '-'}
• Buget Estimat: ${formData.budget || '-'}

📝 *Mesaj:*
${formData.message || '-'}`;

    // 2. Encode for URL
    const encodedText = encodeURIComponent(text);
    const phoneNumber = "40732717666"; // Numarul tau formatat international

    // 3. Open WhatsApp
    // Use a slight delay to show the "loading" state briefly for UX
    setTimeout(() => {
      window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
      setStatus('success');
      
      // Reset form and close after a moment
      setTimeout(() => {
        onClose();
        setTimeout(() => {
          setStatus('idle');
          setFormData({ name: '', phone: '', email: '', projectType: '', budget: '', message: '' });
        }, 500);
      }, 2000);
    }, 800);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tlRef.current = gsap.timeline({ paused: true });

      tlRef.current
        .to(overlayRef.current, {
          opacity: 1,
          duration: 0.3,
          pointerEvents: 'auto',
          ease: 'power2.inOut'
        })
        .fromTo(modalRef.current, 
          { x: '100%' },
          { x: '0%', duration: 0.6, ease: 'power4.out' },
          "-=0.1"
        )
        .from('.form-item', {
          x: 50,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out'
        }, "-=0.2");

    }, overlayRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (isOpen) {
      tlRef.current?.play();
      document.body.style.overflow = 'hidden';
    } else {
      tlRef.current?.reverse();
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 z-[9999] opacity-0 pointer-events-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
        aria-label="Close modal background"
      />

      {/* Slide-over Panel */}
      <div 
        ref={modalRef}
        className="absolute top-0 right-0 w-full md:w-[500px] h-full bg-atl-bg shadow-2xl overflow-y-auto"
      >
        <div className="p-5 md:p-8 h-full flex flex-col justify-center min-h-[500px]">
          
          <div className="flex justify-between items-center mb-4 shrink-0">
            <div>
              <p id="modal-title" className="font-display text-xl md:text-3xl text-atl-dark">Discuta Proiectul</p>
              <p className="text-xs uppercase tracking-widest text-gray-600 font-medium mt-1">Completeaza formularul</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-black/5 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-atl-dark" />
            </button>
          </div>

          {status === 'success' ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-500">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
                <Check className="w-10 h-10" />
              </div>
              <h3 className="font-display text-2xl">Redirectionare...</h3>
              <p className="text-gray-800 font-normal max-w-xs">
                Te conectam pe WhatsApp pentru a finaliza discutia.
              </p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3 md:gap-4 relative">
              
              {/* Loading Overlay */}
              {status === 'loading' && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-lg">
                  <Loader2 className="w-8 h-8 animate-spin text-atl-dark" />
                </div>
              )}

              <div className="form-item">
                <label htmlFor="name" className="block text-sm uppercase tracking-widest text-gray-700 font-bold mb-1">Numele Tau *</label>
                <input 
                  id="name"
                  required
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="ex: Andrei Popescu"
                  className="w-full bg-transparent border-b border-black/20 py-2 text-atl-dark focus:border-atl-accent outline-none transition-colors placeholder:text-gray-400 text-base"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-item">
                  <label htmlFor="phone" className="block text-sm uppercase tracking-widest text-gray-700 font-bold mb-1">Telefon *</label>
                  <input 
                    id="phone"
                    required
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="07xx..."
                    className="w-full bg-transparent border-b border-black/20 py-2 text-atl-dark focus:border-atl-accent outline-none transition-colors placeholder:text-gray-400 text-base"
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="email" className="block text-sm uppercase tracking-widest text-gray-700 font-bold mb-1">Email</label>
                  <input 
                    id="email"
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="optional"
                    className="w-full bg-transparent border-b border-black/20 py-2 text-atl-dark focus:border-atl-accent outline-none transition-colors placeholder:text-gray-400 text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-item">
                  <label htmlFor="projectType" className="block text-xs uppercase tracking-widest text-gray-700 font-bold mb-0.5">Tip Proiect *</label>
                  <select 
                    id="projectType"
                    required
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-black/20 py-1.5 text-atl-dark focus:border-atl-accent outline-none transition-colors cursor-pointer text-sm"
                  >
                    <option value="" disabled>Selecteaza</option>
                    <option value="Bucatarie">Bucatarie</option>
                    <option value="Dressing">Dressing</option>
                    <option value="Living">Living</option>
                    <option value="Office">Office</option>
                    <option value="Full">Full</option>
                  </select>
                </div>

                <div className="form-item">
                  <label htmlFor="budget" className="block text-xs uppercase tracking-widest text-gray-700 font-bold mb-0.5">Buget</label>
                  <select 
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-black/20 py-1.5 text-atl-dark focus:border-atl-accent outline-none transition-colors cursor-pointer text-sm"
                  >
                    <option value="" disabled>Selecteaza</option>
                    <option value="sub-3000">&lt; 3k EUR</option>
                    <option value="3000-7000">3k - 7k</option>
                    <option value="7000-15000">7k - 15k</option>
                    <option value="peste-15000">&gt; 15k EUR</option>
                  </select>
                </div>
              </div>

              <div className="form-item">
                <label htmlFor="message" className="block text-xs uppercase tracking-widest text-gray-700 font-bold mb-0.5">Detalii Proiect</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Detalii despre spatiu..."
                  className="w-full bg-transparent border-b border-black/20 py-1.5 text-atl-dark focus:border-atl-accent outline-none transition-colors placeholder:text-gray-400 resize-none text-sm"
                />
              </div>

              <button 
                type="submit"
                disabled={status === 'loading'}
                className="group w-full relative overflow-hidden bg-[#25D366] bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white py-4 uppercase tracking-[0.2em] text-xs font-bold shadow-lg hover:shadow-[0_10px_20px_-10px_rgba(37,211,102,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-3 mt-4 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none rounded-sm animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both delay-300"
              >
                {/* Shine effect overlay */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                
                <span className="relative z-10">{status === 'loading' ? 'Se deschide WhatsApp...' : 'Trimite pe WhatsApp'}</span>
                {status === 'idle' && <WhatsAppLogo className="w-5 h-5 relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />}
              </button>

              <p className="text-[10px] text-gray-500 text-center leading-tight mt-1 opacity-60">
                Vei fi redirectionat catre aplicatia WhatsApp.
              </p>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;