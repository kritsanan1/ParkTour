interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object;
}

export function SEOHead({
  title = "ที่นี่ วังสามหมอ - แหล่งท่องเที่ยวอุดรธานี | Wang Sam Mo Tourism Guide",
  description = "ค้นพบสถานที่ท่องเที่ยว ร้านอาหาร และที่พักในอำเภอวังสามหมอ อุดรธานี พร้อมรีวิวและข้อมูลครบครัน | Discover attractions, restaurants, and accommodations in Wang Sam Mo District, Udon Thani",
  keywords = "วังสามหมอ, อุดรธานี, ท่องเที่ยว, Wang Sam Mo, Udon Thani, tourism, attractions, restaurants, Thailand travel",
  canonicalUrl = "https://tourderwang.com",
  ogImage = "/og-image.jpg",
  ogType = "website",
  structuredData
}: SEOHeadProps) {
  
  // Update document title
  if (typeof document !== 'undefined') {
    document.title = title;
    
    // Update meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('author', 'Tour Der Wang');
    
    // Update Open Graph tags
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:type', ogType, 'property');
    updateMetaTag('og:url', canonicalUrl, 'property');
    updateMetaTag('og:image', ogImage, 'property');
    updateMetaTag('og:site_name', 'Tour Der Wang', 'property');
    updateMetaTag('og:locale', 'th_TH', 'property');
    updateMetaTag('og:locale:alternate', 'en_US', 'property');
    
    // Update Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
    
    // Update canonical URL
    updateCanonicalUrl(canonicalUrl);
    
    // Add structured data if provided
    if (structuredData) {
      updateStructuredData(structuredData);
    }
  }
  
  return null; // This component doesn't render anything
}

function updateMetaTag(name: string, content: string, attribute: string = 'name') {
  let tag = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
  
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }
  
  tag.content = content;
}

function updateCanonicalUrl(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  
  link.href = url;
}

function updateStructuredData(data: object) {
  let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
  
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  
  script.textContent = JSON.stringify(data);
}