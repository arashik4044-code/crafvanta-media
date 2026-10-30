// Helper utility to generate and download a valid Crafvanta Media Agency Capability Deck PDF

export function generateCapabilityPdfBlob(): Blob {
  const pdfContent = `%PDF-1.4
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
>>
endobj
2 0 obj
<<
  /Type /Pages
  /Kids [3 0 R]
  /Count 1
>>
endobj
3 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /MediaBox [0 0 612 792]
  /Resources <<
    /Font <<
      /F1 4 0 R
      /F2 5 0 R
    >>
  >>
  /Contents 6 0 R
>>
endobj
4 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica-Bold
>>
endobj
5 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica
>>
endobj
6 0 obj
<<
  /Length 1200
>>
stream
BT
/F1 22 Tf
50 740 TD
(CRAFVANTA MEDIA - AGENCY CAPABILITY DECK 2026) Tj
/F2 10 Tf
0 -18 TD
(Architecting High-Growth Digital Ecosystems & Performance Media) Tj
0 -25 TD
(======================================================================) Tj
0 -25 TD
/F1 14 Tf
(1. ABOUT CRAFVANTA MEDIA) Tj
/F2 10 Tf
0 -16 TD
(Crafvanta Media is a full-service digital agency specializing in custom) Tj
0 -14 TD
(software development, omnichannel ERPs, headless e-commerce, and high-ROAS) Tj
0 -14 TD
(performance advertising for growth brands worldwide.) Tj
0 -25 TD
/F1 14 Tf
(2. CORE SERVICE CAPABILITIES) Tj
/F2 10 Tf
0 -16 TD
(- Web & Mobile Development: React, Next.js, Node.js, Custom Webapps) Tj
0 -14 TD
(- Enterprise Software: Cloud POS, Multi-branch ERP, CRM, Billing Automation) Tj
0 -14 TD
(- Digital Marketing: Meta Ads, Google PPC, TikTok Ads, ROI Scaling) Tj
0 -14 TD
(- Media Production: 4K Commercials, Motion Graphics, Viral Reels) Tj
0 -14 TD
(- Brand Strategy: Visual Identity, Logos, Packaging & Design Systems) Tj
0 -25 TD
/F1 14 Tf
(3. PROVEN CASE STUDY IMPACT) Tj
/F2 10 Tf
0 -16 TD
(* Kacchi Bhai Food Ltd: +480% Order Velocity, 32 Branches Real-Time POS/ERP) Tj
0 -14 TD
(* Heaven Bakers: 4.8x Blended ROAS, Scaled to 2,350 Monthly Cake Deliveries) Tj
0 -14 TD
(* Ranga Fashion: 3.4x Conversion Rate, Sub-second Mobile Checkout) Tj
0 -14 TD
(* SLSH Global: 100% Pipeline Visibility, Saved 120+ Weekly Admin Hours) Tj
0 -25 TD
/F1 14 Tf
(4. KEY CLIENT PORTFOLIO) Tj
/F2 10 Tf
0 -16 TD
(Kacchi Bhai | Heaven Bakers | Ranga Fashion | SLSH Global | Learning Kabbo) Tj
0 -14 TD
(Red Cherry Sweets | Baby Care Store | Smoron Biyer Ghor) Tj
0 -25 TD
/F1 14 Tf
(5. CONTACT & DISCOVERY) Tj
/F2 10 Tf
0 -16 TD
(Website: www.crafvantamedia.com | Email: info@crafvantamedia.com) Tj
0 -14 TD
(Phone / WhatsApp: +880 1845 058 879 | Location: Dhaka, Bangladesh) Tj
ET
endstream
endobj
xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000264 00000 n 
0000000339 00000 n 
0000000409 00000 n 
trailer
<<
  /Size 7
  /Root 1 0 R
>>
startxref
1660
%%EOF`;

  return new Blob([pdfContent], { type: 'application/pdf' });
}

export function triggerPdfDownload(
  onProgress?: (percent: number) => void,
  onComplete?: () => void
) {
  let progress = 0;
  
  const interval = setInterval(() => {
    progress += 25;
    if (onProgress) {
      onProgress(Math.min(progress, 100));
    }

    if (progress >= 100) {
      clearInterval(interval);
      
      // Generate Blob and trigger download
      const blob = generateCapabilityPdfBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Crafvanta_Media_Agency_Capability_Deck_2026.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      if (onComplete) {
        onComplete();
      }
    }
  }, 200);
}
