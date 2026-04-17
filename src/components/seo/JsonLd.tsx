export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "PestControlService"],
    "@id": "https://spraybuzzoff.com/#organization",
    name: "Buzz Off",
    alternateName: ["Spray Buzz Off", "Buzz Off Pest Prevention", "Buzz Off Pest Control"],
    description:
      "Buzz Off provides 100% plant-based, FIFRA 25(b) exempt pest control services across the Inland Empire and San Gabriel Valley. Safe for kids, pets, and the environment. No contracts.",
    url: "https://spraybuzzoff.com",
    logo: "https://spraybuzzoff.com/assets/spraybuzzoffLogo.png",
    image: "https://spraybuzzoff.com/assets/og-home.jpg",
    telephone: "+19098988955",
    email: "Buzz@spraybuzzoff.com",
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card",
    areaServed: [
      "Rancho Cucamonga",
      "Upland",
      "Ontario",
      "Claremont",
      "Glendora",
      "San Dimas",
      "Fontana",
      "Pomona",
      "La Verne",
      "Arcadia",
      "Monrovia",
      "Azusa",
    ].map((city) => ({
      "@type": "City",
      name: city,
      containedInPlace: {
        "@type": "State",
        name: "California",
      },
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rancho Cucamonga",
      addressRegion: "CA",
      postalCode: "91730",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "34.1064",
      longitude: "-117.5931",
    },
    hasMap: "https://www.google.com/maps/search/?api=1&query=Buzz+Off+Pest+Prevention+Rancho+Cucamonga",
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "34.1064",
        longitude: "-117.5931",
      },
      geoRadius: "32000",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "14:00",
      },
    ],
    sameAs: [
      "https://www.instagram.com/spraybuzzoff",
      "https://www.facebook.com/spraybuzzoff",
    ],
    slogan: "100% Plant-Based Pest Control. Safe for Kids & Pets.",
    knowsAbout: [
      "Plant-based pest control",
      "FIFRA 25(b) exempt pest control",
      "Natural mosquito prevention",
      "Eco-friendly pest management",
      "Botanical pest control",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Pest Control Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mosquito Prevention",
            description:
              "Natural, plant-based mosquito prevention using botanical fogging, granular treatments, and bait stations.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "General Pest Prevention",
            description:
              "Ongoing plant-based pest prevention for ants, spiders, roaches, and common household pests.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Interior Treatment",
            description:
              "Safe, plant-based interior pest treatment for homes with kids and pets.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "One-Time Treatment",
            description:
              "Single-visit pest treatment with no contract required. 100% plant-based.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Perimeter Protection",
            description:
              "Plant-based perimeter spray that creates a natural barrier around your home.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Whole Home Protection",
            description:
              "Complete interior and exterior plant-based pest protection for your entire home.",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "26",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Nate Tate" },
        datePublished: "2026-03-15",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5", worstRating: "1" },
        reviewBody: "One of the main reasons I chose Buzz Off Pest Prevention was because they use a non-toxic, chemical-free solution, which was really important to me since I have a little one at home who loves to play outside.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Andrew V." },
        datePublished: "2026-01-19",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5", worstRating: "1" },
        reviewBody: "I highly recommend Moe and his pest control service. What really sold us was that he uses organic, family- and pet-friendly products.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Megan Stillman" },
        datePublished: "2026-03-25",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5", worstRating: "1" },
        reviewBody: "The mosquito service has saved my sanity and legs from bites! My kids love to play outside all afternoon and now we can enjoy our backyard worry free.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FAQJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function CityServiceJsonLd({
  cityName,
  citySlug,
  geo,
  description,
}: {
  cityName: string;
  citySlug: string;
  geo: { lat: number; lng: number };
  description: string;
}) {
  const url = `https://spraybuzzoff.com/pest-control/${citySlug}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "PestControlService"],
        "@id": `${url}#localbusiness`,
        name: `Buzz Off Pest Control - ${cityName}`,
        description,
        url,
        telephone: "+19098988955",
        email: "Buzz@spraybuzzoff.com",
        priceRange: "$$",
        image: "https://spraybuzzoff.com/assets/og-home.jpg",
        address: {
          "@type": "PostalAddress",
          addressLocality: cityName,
          addressRegion: "CA",
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: String(geo.lat),
          longitude: String(geo.lng),
        },
        areaServed: {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: String(geo.lat),
            longitude: String(geo.lng),
          },
          geoRadius: "16000",
        },
        parentOrganization: { "@id": "https://spraybuzzoff.com/#organization" },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "09:00",
            closes: "14:00",
          },
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5.0",
          reviewCount: "26",
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        serviceType: "Plant-Based Pest Control",
        name: `Plant-Based Pest Control in ${cityName}, CA`,
        description,
        provider: { "@id": `${url}#localbusiness` },
        areaServed: {
          "@type": "City",
          name: cityName,
          containedInPlace: { "@type": "State", name: "California" },
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `Pest Control Services in ${cityName}`,
          itemListElement: [
            "Mosquito Prevention",
            "General Pest Prevention",
            "Interior Treatment",
            "Perimeter Protection",
            "One-Time Treatment",
            "Whole Home Protection",
          ].map((n) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: `${n} in ${cityName}` },
          })),
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
