// Basic interactivity: price estimate, WhatsApp booking, and phone call
(function(){
  const form = document.getElementById('bookingForm');
  const serviceEl = document.getElementById('service');
  const urgencyEl = document.getElementById('urgency');
  const estimateEl = document.getElementById('estimate');
  const callBtn = document.getElementById('callBtn');
  const yearEl = document.getElementById('year');
  const waFab = document.getElementById('waFab');

  yearEl.textContent = new Date().getFullYear();

  function formatINR(n){
    return new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n).replace('₹','₹');
  }
  function calc(){
    const base = parseFloat(serviceEl.selectedOptions[0].dataset.base || '0');
    const mult = parseFloat(urgencyEl.selectedOptions[0].dataset.mult || '1');
    const total = Math.round(base * mult);
    estimateEl.textContent = '₹' + total.toLocaleString('en-IN');
    return total;
  }
  serviceEl.addEventListener('change', calc);
  urgencyEl.addEventListener('change', calc);
  calc();

  function buildWhatsAppMessage(){
    const city = document.getElementById('city').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const address = document.getElementById('address').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const notes = document.getElementById('notes').value;
    const service = serviceEl.value;
    const urgency = urgencyEl.value;
    const est = estimateEl.textContent;

    const lines = [
      '*New Booking — QuickFix*',
      `Service: ${service}`,
      `Urgency: ${urgency}`,
      `City: ${city}`,
      `Date/Time: ${date} ${time}`,
      `Address: ${address}`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Notes: ${notes || '-'}`,
      `Estimated Fare: ${est}`
    ];
    return lines.join('\n');
  }

  const whatsappNumber = '919044286955'; // Replace with your WhatsApp number without +

  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(!form.reportValidity()) return;

    const msg = buildWhatsAppMessage();
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  });

  waFab.addEventListener('click', function(e){
    e.preventDefault();
    const url = `https://wa.me/${whatsappNumber}`;
    window.open(url, '_blank');
  });

  callBtn.addEventListener('click', function(){
    window.location.href = 'tel:+919000000000'; // Replace with your phone number
  });
})();
