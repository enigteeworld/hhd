import { SITE } from '@/lib/site';

const WhatsAppGlyph = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true" className="h-7 w-7 fill-current">
    <path d="M19.11 17.35c-.27-.14-1.57-.77-1.82-.86-.24-.09-.42-.14-.59.14-.18.27-.68.86-.84 1.04-.15.18-.31.2-.58.07-.27-.14-1.12-.41-2.13-1.31-.79-.7-1.32-1.57-1.47-1.84-.15-.27-.02-.41.11-.55.12-.12.27-.31.41-.46.13-.16.18-.27.27-.46.09-.18.05-.34-.02-.48-.07-.14-.59-1.42-.81-1.95-.21-.5-.42-.43-.59-.44h-.51c-.18 0-.46.07-.7.34-.24.27-.92.9-.92 2.19 0 1.29.94 2.53 1.07 2.71.14.18 1.85 2.82 4.48 3.95.63.27 1.12.43 1.5.55.63.2 1.21.17 1.67.1.51-.08 1.57-.64 1.79-1.25.22-.61.22-1.13.15-1.25-.07-.12-.24-.18-.51-.31Z" />
    <path d="M16.03 3.2C8.94 3.2 3.2 8.94 3.2 16.03c0 2.5.72 4.94 2.09 7.04L3 29l6.12-2.24a12.8 12.8 0 0 0 6.91 2.02h.01c7.08 0 12.82-5.75 12.82-12.83 0-3.43-1.34-6.65-3.76-9.07A12.74 12.74 0 0 0 16.03 3.2Zm0 23.32h-.01a10.7 10.7 0 0 1-5.44-1.49l-.39-.23-3.63 1.33 1.19-3.74-.25-.38a10.72 10.72 0 0 1-1.65-5.68c0-5.93 4.82-10.75 10.76-10.75 2.87 0 5.57 1.12 7.6 3.15a10.68 10.68 0 0 1 3.15 7.6c0 5.93-4.83 10.76-10.75 10.76Z" />
  </svg>
);

const WhatsAppFloat = () => {
  const url = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(SITE.whatsappMessage)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float fixed bottom-6 right-5 z-50 group sm:bottom-8 sm:right-8"
      aria-label="Chat on WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-20 animate-ping" />
      <span className="absolute -inset-1 rounded-full bg-[#25D366]/15 blur-md transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_20px_40px_rgba(37,211,102,0.35)] transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105">
        <WhatsAppGlyph />
      </div>
      <span className="absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-nursery-slate opacity-0 shadow-soft transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        Chat on WhatsApp
      </span>
    </a>
  );
};

export default WhatsAppFloat;
