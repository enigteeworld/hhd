export const SITE = {
  name: 'Happy Hearts Daycare',
  shortName: 'Happy Hearts',
  email: 'happyheart1925@outlook.com',
  phoneDisplay: '+44 7449 529831',
  phoneHref: 'tel:+447449529831',
  whatsappNumber: '447449529831',
  addressLines: ['173 Ashley Lane', 'Manchester, M9 4NQ'],
  whatsappMessage: 'Hi, I would like to know more about Happy Hearts Daycare.',
  openingHours: 'Mon - Fri: 7:30 AM - 6:00 PM',
};

export const getWhatsAppHref = () => {
  const message = encodeURIComponent(SITE.whatsappMessage);
  return `https://wa.me/${SITE.whatsappNumber}?text=${message}`;
};