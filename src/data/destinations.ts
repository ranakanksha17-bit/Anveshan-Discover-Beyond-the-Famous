import { Destination, CuratedTrail, Badge, LocalFoodSpot, StartingLocation } from '../types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'european-cemetery',
    name: 'European Cemetery & Boer War Memorial',
    hindiName: 'यूरोपीय कब्रिस्तान एवं बोअर युद्ध स्मारक',
    tagline: 'Quiet 19th-century colonial sanctuary with mutiny casualties and Boer POW graves',
    zone: 'Ambala Cantt',
    category: 'Heritage',
    isGem: true,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'European Cemetery stone monuments and leafy avenue in Ambala',
    rating: 4.6,
    reviewsCount: 142,
    location: {
      address: 'Staff Road, Near Cantonment Railway Colony, Ambala Cantt, Haryana 133001',
      neighborhood: 'Ambala Cantonment',
      coordinates: {
        lat: 30.3448,
        lng: 76.8402
      }
    },
    historicalSignificance: 'Established shortly after the Ambala British Cantonment was founded in 1843. It stands as a profound historical chronicle containing graves of soldiers and British officers from the 1857 Sepoy Mutiny, European civilian families of the 19th century, and an extraordinary dedicated enclosure for Boer War prisoners of war (POWs) who were brought to Ambala Cantt from South Africa between 1900 and 1902. The weathered obelisks, Gothic crosses, and sandstone headstones provide deep insight into the subcontinent’s colonial chapter.',
    architecturalStyle: '19th-Century Colonial Gothic & Sandstone Masonry',
    practicalInfo: {
      timings: '08:00 AM – 06:00 PM (Daily)',
      entryFee: 'Free entry',
      suggestedDurationMinutes: 60,
      bestTimeToVisit: 'Early morning (08:00 - 10:00 AM) or gentle late afternoon',
      photography: 'Permitted; respectful still photography recommended',
      accessibility: 'Flat unpaved pathways, partially accessible',
      idealFor: ['History Enthusiasts', 'Architectural Photographers', 'Solitude Seekers']
    },
    source: {
      name: 'District Administration Ambala & Haryana Tourism Archives',
      url: 'https://ambala.gov.in'
    },
    tags: ['Colonial Era', 'Boer War Memorial', '1857 Mutiny Graves', 'Hidden Gem', 'Serene Heritage'],
    highlights: [
      'Grave markers of Boer prisoners transported from South Africa (1900-1902)',
      'Epitaphs dating from 1843 through the Indian Rebellion of 1857',
      'Over a century old banyan and neem canopy providing shaded walking paths',
      'Intricate Victorian wrought-iron railings and hand-carved sandstone crosses'
    ]
  },
  {
    id: 'bhawani-amba-temple',
    name: 'Bhawani Amba Temple',
    hindiName: 'भवानी अम्बा मंदिर',
    tagline: 'Centuries-old sacred shrine from which the city of Ambala derives its name',
    zone: 'Ambala City',
    category: 'Spiritual',
    isGem: false,
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Ancient sanctum and brass bells of Bhawani Amba Temple',
    rating: 4.8,
    reviewsCount: 520,
    location: {
      address: 'Near Old City Post Office & Amba Chowk, Ambala City, Haryana 134003',
      neighborhood: 'Old Ambala City',
      coordinates: {
        lat: 30.3785,
        lng: 76.7767
      }
    },
    historicalSignificance: 'Dedicated to Goddess Bhawani (Maa Amba), this ancient temple forms the spiritual heartbeat and mythological origin of Ambala. Local tradition records that the town was originally named "Amba-Wala" in reverence to the Goddess. Devotees have gathered here for generations, especially during Chaitra and Ashwin Navratras. The temple compound preserves ancient bells, sacred peepal trees, and an atmosphere steeped in devotional heritage.',
    architecturalStyle: 'Traditional North Indian Hindu Temple Architecture with carved shikhara',
    practicalInfo: {
      timings: '05:30 AM – 12:00 PM, 04:00 PM – 09:30 PM (Daily)',
      entryFee: 'Free entry',
      suggestedDurationMinutes: 45,
      bestTimeToVisit: 'Morning Aarti (06:30 AM) or Evening Deepa Aarti (07:00 PM)',
      dressCode: 'Modest traditional attire; footwear to be removed at the courtyard shoe counter',
      photography: 'Allowed in outer courtyards; restricted inside inner garbhagriha',
      accessibility: 'Paved courtyard with low ramp access',
      idealFor: ['Spiritual Pilgrims', 'Cultural Travelers', 'Heritage Lovers']
    },
    source: {
      name: 'Ambala District Gazetteers & Haryana Cultural Affairs',
      url: 'https://ambala.gov.in'
    },
    tags: ['Eponymous Temple', 'Navratri Pilgrimage', 'Ancient Shikhara', 'Cultural Origin'],
    highlights: [
      'The sacred idol of Mata Bhawani Amba enshrined for centuries',
      'Mythological and linguistic root of Ambala’s name',
      'Vibrant community morning and evening Aartis accompanied by brass cymbals',
      'Proximity to Ambala City’s historic old alleys and traditional sweet shops'
    ]
  },
  {
    id: 'gurudwara-badshahi-bagh',
    name: 'Gurudwara Badshahi Bagh',
    hindiName: 'गुरुद्वारा बादशाही बाग़',
    tagline: 'Historic Mughal garden where the Tenth Guru, Sri Guru Gobind Singh Ji, camped in 1670',
    zone: 'Ambala City',
    category: 'Spiritual',
    isGem: false,
    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Gurudwara Badshahi Bagh sacred dome and serene sarovar in Ambala City',
    rating: 4.9,
    reviewsCount: 780,
    location: {
      address: 'Near District Courts & Police Lines, Ambala City, Haryana 134003',
      neighborhood: 'Civil Lines, Ambala City',
      coordinates: {
        lat: 30.3802,
        lng: 76.7820
      }
    },
    historicalSignificance: 'Commemorates the historic visit of Tenth Sikh Guru, Sri Guru Gobind Singh Ji, in 1670 while traveling from Patna Sahib to Anandpur Sahib. Guru Ji, then a young child known as Gobind Rai, rested in what was a lush royal Mughal garden (Badshahi Bagh) belonging to local administrator Pir Mir Din. Tradition recalls Guru Ji letting loose his royal hawk (Baaj) to conquer a wild bird, illustrating fearlessness. The Gurudwara houses historic relics and an expansive tranquil park.',
    architecturalStyle: 'White Marble Sikh Architecture with gold-leaf central dome and arched parikrama',
    practicalInfo: {
      timings: 'Open 24 Hours (04:00 AM – 10:00 PM recommended for tourists)',
      entryFee: 'Free entry; 24-hour Guru Ka Langar available to all',
      suggestedDurationMinutes: 60,
      bestTimeToVisit: 'Morning sunrise prayers (05:00 - 07:00 AM) or peaceful dusk',
      dressCode: 'Head covering mandatory (rumals/scarves provided at entrance); shoes deposited safely at Joda Ghar',
      photography: 'Permitted in outer gardens and courtyard; prohibited inside Darbar Sahib',
      accessibility: 'Wheelchair ramp accessible at main entry gate',
      idealFor: ['Spiritual Seekers', 'Families', 'History Enthusiasts']
    },
    source: {
      name: 'Shiromani Gurdwara Parbandhak Committee (SGPC) & Haryana Tourism',
      url: 'https://ambala.gov.in'
    },
    tags: ['Guru Gobind Singh Ji', 'Historic Relics', '24/7 Langar', 'Spiritual Tranquility'],
    highlights: [
      'Holy site commemorating Guru Gobind Singh Ji’s 1670 visit',
      'Warm community Guru Ka Langar serving fresh nutritious meals round-the-clock',
      'Pristine Sarovar (holy water pond) reflection in the evening lights',
      'Expansive gardens where the Mughal orchards once stood'
    ]
  },
  {
    id: 'gurudwara-lakhnaur-sahib',
    name: 'Gurudwara Lakhnaur Sahib',
    hindiName: 'गुरुद्वारा लखनौर साहिब',
    tagline: 'The ancestral maternal home of Mata Gujri Ji and early childhood training ground of Guru Gobind Singh Ji',
    zone: 'Ambala Rural',
    category: 'Heritage',
    isGem: true,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Gurudwara Lakhnaur Sahib traditional architecture and rural Ambala surroundings',
    rating: 4.9,
    reviewsCount: 460,
    location: {
      address: 'Village Lakhnaur, 12 km South-West of Ambala Cantt, Ambala District, Haryana 134003',
      neighborhood: 'Lakhnaur Village',
      coordinates: {
        lat: 30.3160,
        lng: 76.7450
      }
    },
    historicalSignificance: 'One of the most profound yet lesser-known historical treasures of Haryana. Lakhnaur is the ancestral maternal village (Nanake) of Mata Gujri Ji (mother of Guru Gobind Singh Ji and wife of ninth Guru, Sri Guru Tegh Bahadur Ji). In 1670-1672, young Guru Gobind Singh Ji spent significant formative years here, learning military skills, archery, horsemanship, and martial disciplines under maternal uncles Bhai Mehar Chand and Bhai Kirpal Chand. The complex preserves the historic Baoli (stepwell), the ancient Kuan (well), weapons replicas, and childhood memories.',
    architecturalStyle: 'Traditional Rural Gurudwara complex with preserved historical stepwell structure',
    practicalInfo: {
      timings: '04:30 AM – 09:30 PM (Daily)',
      entryFee: 'Free entry; Langar always open',
      suggestedDurationMinutes: 90,
      bestTimeToVisit: 'Morning 08:00 AM – 11:30 AM or quiet late afternoon 03:30 – 05:30 PM',
      dressCode: 'Head covering mandatory; traditional modest clothing',
      photography: 'Permitted in outer campus; respectful demeanor required',
      accessibility: 'Ground level pathways with assistance available',
      idealFor: ['Historical Scholars', 'Pilgrims', 'Rural Heritage Explorers']
    },
    source: {
      name: 'Historical Gurudwaras of Haryana / Ambala Heritage Registry',
      url: 'https://ambala.gov.in'
    },
    tags: ['Mata Gujri Ji', 'Guru Gobind Singh Childhood', 'Historic Baoli', 'Hidden Gem', 'Rural Haryana Heritage'],
    highlights: [
      'Preserved ancient Baoli (stepwell) and Mata Gujri Ji’s ancestral village home',
      'Site where young Guru Gobind Singh Ji mastered archery and martial arts',
      'Peaceful rural surroundings untouched by modern urban commercial bustle',
      'Gallery of historical paintings depicting the 1670-1672 sojourn'
    ]
  },
  {
    id: 'gurudwara-panjokhara-sahib',
    name: 'Gurudwara Panjokhara Sahib',
    hindiName: 'गुरुद्वारा पंजोखरा साहिब',
    tagline: 'Sacred shrine of the Eighth Guru, Sri Guru Harkrishan Sahib Ji, and the miracle of Chhajju Ram',
    zone: 'Ambala Rural',
    category: 'Spiritual',
    isGem: false,
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Gurudwara Panjokhara Sahib majestic white domes and sacred sarovar',
    rating: 4.9,
    reviewsCount: 1100,
    location: {
      address: 'Panjokhra Village, Ambala-Naraingarh Highway, Ambala District, Haryana 134003',
      neighborhood: 'Panjokhra (8 km east of Ambala City)',
      coordinates: {
        lat: 30.3540,
        lng: 76.8850
      }
    },
    historicalSignificance: 'One of the most sacred pilgrimage shrines in North India. In 1665, when the eighth Sikh Guru, Sri Guru Harkrishan Sahib Ji (then aged only seven), was traveling to Delhi upon summons from Emperor Aurangzeb, he halted at Panjokhra. A learned local scholar, Pandit Lal Chand, boastfully questioned how a young child could comprehend ancient scriptures like the Bhagavad Gita. Guru Ji gently had an unlettered, mute local water-carrier named Chhajju Ram step forward and placed his walking stick on him; instantly, Chhajju Ram began reciting and explaining complex Sanskrit verses of the Gita with sublime wisdom, causing Pandit Lal Chand to bow in reverence.',
    architecturalStyle: 'Grand White Rajasthani-Sikh Marble Architecture with sprawling Sarovar and towering Nishan Sahib',
    practicalInfo: {
      timings: 'Open 24 Hours (Sarovar bathing facilities open early morning)',
      entryFee: 'Free entry; large community Langar Hall serving all visitors',
      suggestedDurationMinutes: 90,
      bestTimeToVisit: '06:00 AM – 10:00 AM or sunset (05:30 – 07:30 PM)',
      dressCode: 'Head covered at all times; modest clothing; footwear deposited at entrance',
      photography: 'Outer courtyards and Sarovar edge permitted; inside sanctum prohibited',
      accessibility: 'Paved ramps, accessible Sarovar Ghat, wheelchair assistance on request',
      idealFor: ['Spiritual Pilgrims', 'Architecture Admirers', 'Families', 'Photographers']
    },
    source: {
      name: 'Shiromani Gurdwara Parbandhak Committee & Haryana Tourism',
      url: 'https://haryanatourism.gov.in'
    },
    tags: ['Guru Harkrishan Ji', 'Gita Miracle', 'Grand Sarovar', 'Sacred Sikh Circuit', 'Must Visit'],
    highlights: [
      'The sacred spot where Chhajju Ram expounded the Bhagavad Gita under divine grace',
      'Expansive crystal-clear Sarovar with dedicated bathing ghats for pilgrims',
      'Magnificent illuminated marble facades during evening twilight',
      'Continuous Gurbani Kirtan and community Langar feeding thousands daily'
    ]
  },
  {
    id: 'ambala-cloth-market',
    name: 'Ambala Cloth Market (Kapda Bazaar)',
    hindiName: 'अम्बाला कपड़ा मार्केट',
    tagline: 'Asia’s premier wholesale and bridal textile bazaar with over 1,000 heritage shops',
    zone: 'Ambala City',
    category: 'Shopping',
    isGem: false,
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Vibrant fabrics, silks, and traditional textiles at Ambala Cloth Market',
    rating: 4.7,
    reviewsCount: 1650,
    location: {
      address: 'Cloth Market Road, Old City, Ambala City, Haryana 134003',
      neighborhood: 'Old City Commercial Heart',
      coordinates: {
        lat: 30.3752,
        lng: 76.7725
      }
    },
    historicalSignificance: 'Regarded as one of the largest wholesale and retail textile hubs in the entire Asian continent. Originating during the mid-20th century as a modest cluster of fabric merchants, it expanded into a sprawling network of over a thousand specialized shops across labyrinthine historic streets. Brides, designers, and families travel from Punjab, Himachal Pradesh, Jammu, Uttarakhand, and Delhi-NCR for wedding trousseaus, hand-embroidered Phulkaris, banarasi silks, pashminas, and bespoke sherwanis at genuine wholesale rates.',
    architecturalStyle: 'Traditional Indian Multistoried Bazaar with narrow lanes, awnings, and bustling pedestrian avenues',
    practicalInfo: {
      timings: '11:00 AM – 08:30 PM (Closed on Sundays; some shops open on festival Sundays)',
      entryFee: 'Free entry; shopping budgets vary',
      suggestedDurationMinutes: 120,
      bestTimeToVisit: 'Weekday afternoons (01:00 – 04:00 PM) to avoid evening crowds',
      photography: 'Permitted in public lanes; ask shopkeepers before photographing merchandise',
      accessibility: 'Best explored on foot or via electric e-rickshaw; narrow alleyways',
      idealFor: ['Wedding Shoppers', 'Fashion Enthusiasts', 'Cultural Explorers', 'Bargain Hunters']
    },
    source: {
      name: 'Ambala Wholesale Cloth Market Merchants Association & Haryana Trade Guide',
      url: 'https://ambala.gov.in'
    },
    tags: ['Asia’s Largest Market', 'Bridal Trousseau', 'Traditional Phulkari', 'Textile Hub', 'Bazaar Walk'],
    highlights: [
      'Unrivaled variety of bridal lehengas, suits, sarees, and fine men’s textiles',
      'Authentic handcrafted Haryanvi and Punjabi Phulkari dupattas',
      'Unmatched wholesale pricing direct from weavers across India',
      'Surrounding historic street food stalls serving hot samosas, lassi, and kachoris'
    ]
  },
  {
    id: 'st-pauls-church-ruins',
    name: 'St. Paul’s Church Ruins & Historic Bell Tower',
    hindiName: 'सेंट पॉल चर्च खंडहर एवं ऐतिहासिक घंटाघर',
    tagline: 'Hauntingly beautiful 1857 Gothic garrison church ruined in the 1965 air raid',
    zone: 'Ambala Cantt',
    category: 'Heritage',
    isGem: true,
    image: 'https://images.unsplash.com/photo-1548625361-16eb162a843e?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Gothic brick arches and bell tower of St. Paul Church ruins in Ambala Cantt',
    rating: 4.6,
    reviewsCount: 210,
    location: {
      address: 'Staff Road, Near Cantonment General Hospital, Ambala Cantt, Haryana 133001',
      neighborhood: 'Ambala Cantonment Heritage Quarter',
      coordinates: {
        lat: 30.3533,
        lng: 76.8378
      }
    },
    historicalSignificance: 'Consecrated in January 1857 just months prior to the outbreak of the 1857 Sepoy Mutiny, St. Paul’s was designed in majestic English Gothic style as the primary garrison church for British forces in northwest India. In September 1965, during the Indo-Pakistani War, an aerial bombardment severely damaged the church nave and roof. Rather than complete demolition, the towering red-brick bell tower and romantic arched skeletal walls were preserved as an evocative open-air monument to history and peace.',
    architecturalStyle: 'Mid-19th Century English Gothic Revival with pointed brick arches and stone pinnacles',
    practicalInfo: {
      timings: '09:00 AM – 06:00 PM (Daily)',
      entryFee: 'Free entry',
      suggestedDurationMinutes: 45,
      bestTimeToVisit: 'Golden Hour (04:00 PM – 05:45 PM) when sun casts dramatic shadows through Gothic arches',
      photography: 'Exceptional photography spot for architectural, fashion, and heritage captures',
      accessibility: 'Open lawn surface, easily walkable',
      idealFor: ['Photographers', 'Architecture Buffs', 'Heritage Lovers', 'War History Scholars']
    },
    source: {
      name: 'Ambala Cantonment Board & Military Historical Records',
      url: 'https://ambala.cantt.gov.in'
    },
    tags: ['Gothic Ruins', '1965 War Relic', '1857 Historic Church', 'Hidden Gem', 'Photographer’s Paradise'],
    highlights: [
      'Iconic multi-tier Gothic bell tower surviving intact through the 1965 bombing',
      'Open-sky nave framed by majestic brick arches overgrown with creeping ivy',
      'Atmospheric sunset lighting creating stunning silhouettes',
      'Peaceful memorial grounds adjacent to historic Cantonment colonial bungalows'
    ]
  },
  {
    id: 'kranti-udyan-memorial',
    name: '1857 Kranti Udyan & Freedom War Memorial',
    hindiName: '1857 क्रांति उद्यान एवं स्वतंत्रता संग्राम स्मारक',
    tagline: 'Monumental tribute to Ambala’s spark that ignited 9 hours before Meerut on May 10, 1857',
    zone: 'Ambala Cantt',
    category: 'Heritage',
    isGem: false,
    image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1200&q=80',
    imageAlt: '1857 Kranti Udyan memorial tower and historical murals in Ambala Cantt',
    rating: 4.7,
    reviewsCount: 640,
    location: {
      address: 'National Highway 44 (GT Road), Ambala Cantt, Haryana 133001',
      neighborhood: 'GT Road Heritage Corridor',
      coordinates: {
        lat: 30.3395,
        lng: 76.8285
      }
    },
    historicalSignificance: 'A landmark memorial dedicated to one of India’s most significant suppressed historical truths: the first armed uprising of the 1857 First War of Independence broke out in Ambala Cantonment on Sunday, May 10, 1857, at approximately 9:00 AM—nearly nine hours before the revolt in Meerut. Soldiers of the 5th and 60th Bengal Native Infantries mutinied here. This state-of-the-art memorial park and museum commemorates the bravery of forgotten martyrs of Haryana and North India with life-sized bronze installations, historic dioramas, and digital galleries.',
    architecturalStyle: 'Modern Monumental Memorial Architecture with towering central victory minaret and stepped amphitheater',
    practicalInfo: {
      timings: '09:00 AM – 07:00 PM (Closed on Mondays for maintenance)',
      entryFee: 'Nominal maintenance fee (₹20 per adult; children under 10 free)',
      suggestedDurationMinutes: 75,
      bestTimeToVisit: 'Late afternoon (03:30 – 06:30 PM) to experience the museum and illuminated fountains',
      photography: 'Permitted in memorial gardens; guidelines apply inside museum galleries',
      accessibility: 'Fully wheelchair accessible with paved ramps and elevators in museum building',
      idealFor: ['Patriots & Students', 'Families', 'History Enthusiasts', 'Tourists on NH-44']
    },
    source: {
      name: 'Department of Archaeology & Museums, Government of Haryana',
      url: 'https://haryanatourism.gov.in'
    },
    tags: ['1857 Mutiny', 'Freedom Trail', 'Historical Museum', 'National Pride', 'GT Road Landmark'],
    highlights: [
      'Detailed chronological exhibits documenting Ambala’s mutiny hours before Meerut',
      'Magnificent central memorial tower visible along the GT Road highway',
      'Life-sized bronze statues depicting rebel sepoys and Haryana leaders',
      'Landscaped gardens with musical water fountains and open-air patriotic amphitheater'
    ]
  },
  {
    id: 'rani-ka-talab',
    name: 'Rani Ka Talab (Historic Royal Pond)',
    hindiName: 'रानी का तालाब',
    tagline: '400-year-old historic water reservoir and temple promenade built by the Raja of Jind',
    zone: 'Ambala Cantt',
    category: 'Nature',
    isGem: false,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Rani Ka Talab historic water tank and surrounding temple promenade in Ambala Cantt',
    rating: 4.5,
    reviewsCount: 890,
    location: {
      address: 'Near Military Camp & Army Area, Ambala Cantt, Haryana 133001',
      neighborhood: 'Cantonment Green Zone',
      coordinates: {
        lat: 30.3475,
        lng: 76.8340
      }
    },
    historicalSignificance: 'Constructed approximately 400 years ago during the royal reign of Raja Ranjeet Singh of Jind for the queen (Rani) and the royal retinue. Flanked on its corners by ancient Shiva Mandir and Anandeshwar Mahadev shrines. It served as both a royal bath, recreational lake, and vital rainwater harvesting reservoir for the region. Restored with manicured perimeter jogging tracks, ornamental lighting, and fountain features, it remains a beloved peaceful green oasis in Ambala Cantt.',
    architecturalStyle: 'Pre-Colonial Indian stepped stone masonry reservoir (Talab) with lakeside shrines',
    practicalInfo: {
      timings: '05:00 AM – 09:00 PM (Daily)',
      entryFee: 'Free entry',
      suggestedDurationMinutes: 60,
      bestTimeToVisit: 'Dawn (05:30 – 07:30 AM) for morning bird watching, or sunset promenade',
      photography: 'Permitted; serene lake views and reflection shots',
      accessibility: 'Level paved walking track encircling the lake; accessible for wheelchairs',
      idealFor: ['Morning Walkers', 'Couples & Families', 'Bird Watchers', 'Heritage Explorers']
    },
    source: {
      name: 'Ambala Cantonment Board Heritage Documentation',
      url: 'https://ambala.cantt.gov.in'
    },
    tags: ['Royal Reservoir', 'Lakeside Promenade', 'Shiva Temple', 'Green Oasis', 'Morning Walks'],
    highlights: [
      'Centuries-old stone steps constructed under the patronage of the Raja of Jind',
      'Ancient Shiv Mandir perched gracefully along the water’s edge',
      'Shaded pedestrian walking promenade popular with residents and visitors',
      'Seasonal migratory water birds and resident kingfishers around the lake'
    ]
  },
  {
    id: 'gurudwara-manji-sahib-baoli',
    name: 'Gurudwara Manji Sahib (Baoli Sahib)',
    hindiName: 'गुरुद्वारा मंजी साहिब (बाओली साहिब)',
    tagline: 'Centuries-old sanctuary sanctified by the Sixth and Ninth Sikh Gurus',
    zone: 'Ambala City',
    category: 'Spiritual',
    isGem: true,
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Gurudwara Manji Sahib Baoli historic facade in Ambala City',
    rating: 4.8,
    reviewsCount: 390,
    location: {
      address: 'Old Kotwali Bazaar, Near Subzi Mandi, Ambala City, Haryana 134003',
      neighborhood: 'Kotwali Quarter, Old Ambala City',
      coordinates: {
        lat: 30.3770,
        lng: 76.7790
      }
    },
    historicalSignificance: 'Deeply revered historical gurudwara graced by two Sikh Gurus. Guru Hargobind Ji (Sixth Guru) stayed here while traveling from Kurukshetra. Later in the 17th century, Sri Guru Tegh Bahadur Ji (Ninth Guru) camped at this spot. The complex is especially noted for its historic Baoli (subterranean stepwell) built to provide clean drinking water to traveling caravans and local inhabitants. Drinking or washing with the water of the sacred baoli is believed to bring inner peace and blessing.',
    architecturalStyle: 'Traditional Punjabi Sikh architecture with subterranean Baoli chambers',
    practicalInfo: {
      timings: '04:30 AM – 10:00 PM (Daily)',
      entryFee: 'Free entry; Langar served daily',
      suggestedDurationMinutes: 45,
      bestTimeToVisit: 'Morning 07:00 – 10:00 AM or evening 06:00 – 08:00 PM',
      dressCode: 'Head covered; modest clothing; shoes deposited at entrance',
      photography: 'Permitted in courtyard; avoid inside sanctum and baoli sanctum',
      accessibility: 'Courtyard is accessible; descending into the subterranean Baoli requires stairs',
      idealFor: ['Spiritual Pilgrims', 'Stepwell & Water Heritage Enthusiasts', 'History Buffs']
    },
    source: {
      name: 'Historical Gurudwaras of Haryana Board & ambala.gov.in',
      url: 'https://ambala.gov.in'
    },
    tags: ['Guru Hargobind Ji', 'Guru Tegh Bahadur Ji', 'Historic Stepwell', 'Hidden Gem', 'Sacred Heritage'],
    highlights: [
      'Historical subterranean stepwell (Baoli) engineered over three centuries ago',
      'Sanctified by the footsteps of both the 6th and 9th Sikh Gurus',
      'Pious and serene prayer hall tucked inside the bustling alleys of Old Ambala',
      'Traditional Karah Parshad and warm community langar served with deep humility'
    ]
  },
  {
    id: 'holy-redeemer-church',
    name: 'Holy Redeemer Church (1848)',
    hindiName: 'होली रिडीमर चर्च (1848)',
    tagline: 'Colonial neoclassical church built in 1848, visited by Viceroy Lord Ripon in 1880',
    zone: 'Ambala Cantt',
    category: 'Heritage',
    isGem: true,
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Holy Redeemer Church historic facade and stained glass windows in Ambala Cantt',
    rating: 4.7,
    reviewsCount: 175,
    location: {
      address: 'Lawrence Road, Near Army Golf Course, Ambala Cantt, Haryana 133001',
      neighborhood: 'Cantonment Military Heritage Area',
      coordinates: {
        lat: 30.3490,
        lng: 76.8360
      }
    },
    historicalSignificance: 'Built in 1848 shortly after the Karnal cantonment was shifted to Ambala due to malaria epidemics. Constructed to cater to the Catholic troops and officers of the British military garrison. Historical records note that Lord Ripon, Viceroy of India, visited and attended holy service here in 1880. When the church building collapsed in 1902 due to structural wear, it was meticulously rebuilt in 1905 with higher towers and reinforced timber arches. The interior contains antique Italian stained-glass windows and brass altar plaques.',
    architecturalStyle: 'Late Georgian / Early Neoclassical British Church Architecture with twin bell towers',
    practicalInfo: {
      timings: '08:00 AM – 06:00 PM (Sunday Mass at 08:30 AM & 05:30 PM)',
      entryFee: 'Free entry',
      suggestedDurationMinutes: 45,
      bestTimeToVisit: 'Morning hours (09:00 – 11:30 AM) when daylight illuminates the stained glass',
      photography: 'Permitted outside and quietly inside outside of active mass services',
      accessibility: 'Ramped entry to main sanctuary nave',
      idealFor: ['Colonial Architecture Lovers', 'Christian Pilgrims', 'Peace Seekers']
    },
    source: {
      name: 'Diocese of Simla and Chandigarh & Ambala Cantt Heritage Register',
      url: 'https://ambala.gov.in'
    },
    tags: ['1848 Colonial Church', 'Lord Ripon Visit', 'Stained Glass Art', 'Hidden Gem', 'Quiet Heritage'],
    highlights: [
      'Remarkable 120-year-old antique stained-glass portrayals of biblical scenes',
      'Historic plaque recording Viceroy Lord Ripon’s attendance in 1880',
      'Lush quiet church compound lined with ancient pines and silver oaks',
      'Atmospheric high timber ceiling trusses and polished colonial pews'
    ]
  },
  {
    id: 'subhash-chandra-bose-park',
    name: 'Netaji Subhash Chandra Bose Eco Park',
    hindiName: 'नेताजी सुभाष चन्द्र बोस पार्क',
    tagline: '14-acre lush urban botanical sanctuary featuring musical fountains and Japanese gardens',
    zone: 'Ambala Cantt',
    category: 'Nature',
    isGem: false,
    image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Subhash Chandra Bose Park verdant lawns, flower beds, and walking pathways',
    rating: 4.6,
    reviewsCount: 920,
    location: {
      address: 'Jagadhri Road, Near Cantonment Board Office, Ambala Cantt, Haryana 133001',
      neighborhood: 'Ambala Cantonment East',
      coordinates: {
        lat: 30.3420,
        lng: 76.8450
      }
    },
    historicalSignificance: 'Named in honor of the revered national hero Netaji Subhash Chandra Bose. Developed by the Cantonment and Municipal administration as Ambala Cantt’s premier green lung spanning over 14 acres. Designed with dedicated botanical enclosures, a Japanese Zen rockery, shaded pergolas, children’s adventure play zone, and illuminated musical fountain shows in the evening. It provides a refreshing nature respite between visiting historic monuments and crowded bazaars.',
    architecturalStyle: 'Modern Landscape Gardening with Zen rockery features and illuminated water bodies',
    practicalInfo: {
      timings: '05:00 AM – 09:00 PM (Musical Fountain runs 07:00 – 07:45 PM during summer/autumn)',
      entryFee: 'Nominal municipal entry (₹10 per person)',
      suggestedDurationMinutes: 60,
      bestTimeToVisit: '05:30 – 07:30 PM for sunset breeze and musical fountain displays',
      photography: 'Permitted; great spot for family photos and nature close-ups',
      accessibility: 'Completely paved wide pathways suitable for wheelchairs and strollers',
      idealFor: ['Families with Kids', 'Nature Lovers', 'Joggers & Walkers', 'Evening Relaxation']
    },
    source: {
      name: 'Municipal Corporation Ambala & Haryana Urban Development',
      url: 'https://ambala.gov.in'
    },
    tags: ['Botanical Garden', 'Musical Fountains', 'Zen Garden', 'Family Friendly', 'Green Sanctuary'],
    highlights: [
      '14 acres of manicured rolling lawns and seasonal flower gardens',
      'Evening illuminated musical fountain show choreographing water and classical melodies',
      'Tranquil Japanese Zen rockery corner with bamboo clusters and stepping stones',
      'Safe open playgrounds and open-air gymnasium facilities for all ages'
    ]
  },
  {
    id: 'sadar-bazaar-culinary-walk',
    name: 'Ambala Cantt Sadar Bazaar & Culinary Trail',
    hindiName: 'सदर बाज़ार एवं प्रसिद्ध खान-पान गलियारा',
    tagline: 'Vibrant 1840s garrison bazaar famous for iconic Desi Ghee Jalebis and street delicacies',
    zone: 'Ambala Cantt',
    category: 'Culture',
    isGem: false,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Sadar Bazaar Ambala bustling sweet shops and evening street food culture',
    rating: 4.8,
    reviewsCount: 1420,
    location: {
      address: 'Sadar Bazaar Main Road & Halwai Bazaar, Ambala Cantt, Haryana 133001',
      neighborhood: 'Heart of Ambala Cantonment',
      coordinates: {
        lat: 30.3460,
        lng: 76.8320
      }
    },
    historicalSignificance: 'Established alongside the establishment of the Ambala military garrison in 1843 to serve officers, soldiers, and cantonment merchants. Sadar Bazaar preserves distinctive colonial arcade shophouses with vintage wooden balconies. Today, it is acclaimed throughout northern India as a culinary epicenter. Discerning foodies travel here specifically to savor legendary giant golden Desi Ghee Jalebis, slow-cooked Khurchan, crisp Dal Samosas, and authentic Puran Singh style gravies that made Ambala world-famous on the Grand Trunk road.',
    architecturalStyle: '19th-Century Cantonment Colonial Shophouses with timber verandas and street arcades',
    practicalInfo: {
      timings: '10:00 AM – 10:30 PM (Food stalls peak from 04:30 PM onwards; Halwai Bazaar open early)',
      entryFee: 'Free entry; street food items range from ₹30 to ₹150',
      suggestedDurationMinutes: 90,
      bestTimeToVisit: '05:00 PM – 09:30 PM when the bazaar is lit and street food is prepared piping hot',
      photography: 'Street food culture photography is warmly welcomed',
      accessibility: 'Pedestrian crowded streets; manageable on foot or cycle-rickshaw',
      idealFor: ['Foodies', 'Street Photographers', 'Culture Lovers', 'Night Explorers']
    },
    source: {
      name: 'Ambala Heritage & Culinary Traditions Documentation',
      url: 'https://ambala.gov.in'
    },
    tags: ['Legendary Jalebis', 'Cantonment Street Food', 'Colonial Shophouses', 'Night Bazaar', 'Culinary Icon'],
    highlights: [
      'Ambala’s renowned Desi Ghee Jalebis fried in giant copper karahis and soaked in saffron syrup',
      'Famous Khurchan and Rabri sweets prepared in Halwai Bazaar since pre-independence days',
      'Crispy stuffed Tikki with spicy mint and sweet tamarind chutneys',
      'Bustling evening atmosphere showcasing genuine North Indian bazaar hospitality'
    ]
  },
  {
    id: 'nahan-kothi-rang-mahal',
    name: 'Nahan Kothi (Historic Princely Pavilion)',
    hindiName: 'नाहन कोठी (रंग महल)',
    tagline: 'Colonial-princely retreat built in the 1850s for the royal rulers of Sirmaur State',
    zone: 'Ambala Cantt',
    category: 'Heritage',
    isGem: true,
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Nahan Kothi historic colonial arches and royal portico in Ambala Cantt',
    rating: 4.5,
    reviewsCount: 110,
    location: {
      address: 'Near Old Cantonment Residency, Ambala Cantt, Haryana 133001',
      neighborhood: 'Ambala Cantonment Administrative Zone',
      coordinates: {
        lat: 30.3435,
        lng: 76.8385
      }
    },
    historicalSignificance: 'Built in the mid-19th century by the royal rulers of Sirmaur (Nahan) princely state (now in Himachal Pradesh). Sirmaur kings maintained this majestic kothi as their official diplomatic residence and rest lodge while conducting treaty negotiations with the British Cantonment Commissioner and military generals. The architectural layout represents a unique marriage of hill Rajput royal decorative cornices with sturdy British colonial neoclassical verandas and circular masonry pillars.',
    architecturalStyle: 'Indo-Colonial Princely Architecture with neoclassical colonnades and Rajasthani chhatri influences',
    practicalInfo: {
      timings: '09:30 AM – 05:30 PM (Exterior viewing during daytime hours)',
      entryFee: 'Free exterior grounds access',
      suggestedDurationMinutes: 40,
      bestTimeToVisit: 'Morning 10:00 AM – 12:30 PM or late afternoon for exterior architectural photography',
      photography: 'Permitted outside the monument compound',
      accessibility: 'Surrounding grounds are flat and easily walked',
      idealFor: ['Colonial & Princely History Buffs', 'Architectural Photographers', 'Heritage Explorers']
    },
    source: {
      name: 'Ambala District Gazetteers & Sirmaur Royal State Archives',
      url: 'https://ambala.gov.in'
    },
    tags: ['Princely State Kothi', 'Sirmaur Nahan History', 'Indo-Colonial', 'Hidden Gem', 'Rare Architecture'],
    highlights: [
      'Rare surviving example of a princely state diplomatic residence in an imperial cantonment',
      'Distinctive semicircular portico designed to receive horse-drawn royal carriages',
      'Preserved ornamental brick cornices and high ceiling colonial verandas',
      'Close proximity to St. Paul’s and European Cemetery for an interconnected heritage walk'
    ]
  }
];

export const CURATED_TRAILS: CuratedTrail[] = [
  {
    id: 'trail-1857-mutiny',
    title: 'The 1857 Ambala Revolt & Garrison Trail',
    subtitle: 'Where the first spark ignited 9 hours before Meerut',
    durationLabel: '3.5 - 4 Hours',
    distanceLabel: '6.8 km circuit',
    highlightTag: 'Freedom History',
    themeColor: 'from-amber-700 to-saffron-600',
    description: 'Walk through the fateful Sunday of May 10, 1857. Trace the spark from the Native Infantry lines along GT Road to the ruins of St. Paul’s Gothic Church, the historic European Cemetery, and the 1848 Holy Redeemer Church.',
    destinationIds: ['kranti-udyan-memorial', 'st-pauls-church-ruins', 'european-cemetery', 'holy-redeemer-church']
  },
  {
    id: 'trail-sacred-gurus',
    title: 'Sacred Gurus Circuit of Ambala',
    subtitle: 'In the divine footsteps of Guru Hargobind, Guru Tegh Bahadur, Guru Harkrishan & Guru Gobind Singh',
    durationLabel: 'Full Day (5 - 6 Hours)',
    distanceLabel: '24 km pilgrimage route',
    highlightTag: 'Spiritual Legacy',
    themeColor: 'from-forest-800 to-forest-600',
    description: 'Ambala has been blessed by the physical presence of four Sikh Gurus. Experience the profound tranquility of Badshahi Bagh, the divine wisdom of Panjokhara Sahib, and the historic childhood home of Mata Gujri Ji at Lakhnaur Sahib.',
    destinationIds: ['gurudwara-badshahi-bagh', 'gurudwara-manji-sahib-baoli', 'gurudwara-panjokhara-sahib', 'gurudwara-lakhnaur-sahib']
  },
  {
    id: 'trail-textiles-tasting',
    title: 'Silk, Scent & Savor: The Bazaar & Culinary Walk',
    subtitle: 'Asia’s largest textile alleys paired with legendary century-old street treats',
    durationLabel: '3.5 Hours (Afternoon to Dusk)',
    distanceLabel: '8.5 km (City to Cantt)',
    highlightTag: 'Sensory & Culture',
    themeColor: 'from-rose-800 to-saffron-600',
    description: 'Begin amidst the vibrant silk weaves and bridal splendor of the historic Ambala Cloth Market, then transition into Sadar Bazaar at dusk for golden Desi Ghee Jalebis, crisp kachoris, and evening tea.',
    destinationIds: ['ambala-cloth-market', 'bhawani-amba-temple', 'sadar-bazaar-culinary-walk', 'rani-ka-talab']
  },
  {
    id: 'trail-hidden-gems-sanctuaries',
    title: 'The Hidden Heritage & Green Sanctuaries',
    subtitle: 'Lesser-known colonial relics, quiet royal lakes, and botanical gardens',
    durationLabel: '3 Hours',
    distanceLabel: '5.2 km walk & drive',
    highlightTag: 'Solitude & Nature',
    themeColor: 'from-emerald-800 to-teal-700',
    description: 'Escape the crowds to explore the quiet Boer war memorial at European Cemetery, the romantic Gothic arches of St. Paul’s ruins, the peaceful waters of Rani Ka Talab, and Netaji Subhash Chandra Bose Eco Park.',
    destinationIds: ['european-cemetery', 'st-pauls-church-ruins', 'rani-ka-talab', 'subhash-chandra-bose-park']
  }
];

export const BADGES: Badge[] = [
  {
    id: 'badge-first-explorer',
    title: 'First Explorer',
    description: 'Began your discovery journey: logged your first verified destination visit in Ambala.',
    iconName: 'Compass',
    criteriaDescription: 'Visit 1 destination',
    category: 'Mastery'
  },
  {
    id: 'badge-heritage-hunter',
    title: 'Heritage Hunter',
    description: 'Immersed in Ambala’s living past: explored 3 verified historical heritage landmarks.',
    iconName: 'Landmark',
    criteriaDescription: 'Visit 3 heritage destinations',
    category: 'Heritage'
  },
  {
    id: 'badge-culture-explorer',
    title: 'Culture Explorer',
    description: 'Experienced the authentic sights, bazaar alleys, and flavors across 3 cultural destinations.',
    iconName: 'Sparkles',
    criteriaDescription: 'Explore 3 cultural/bazaar destinations',
    category: 'Culture'
  },
  {
    id: 'badge-spiritual-seeker',
    title: 'Spiritual Seeker',
    description: 'Stepped into deep tranquility and revered Guru history: visited 3 sacred shrines.',
    iconName: 'HeartHandshake',
    criteriaDescription: 'Visit 3 spiritual destinations',
    category: 'Spiritual'
  },
  {
    id: 'badge-local-legend',
    title: 'Local Legend',
    description: 'Distinguished pioneer of Ambala: visited 5 different verified destinations across the district.',
    iconName: 'Crown',
    criteriaDescription: 'Visit 5 different destinations',
    category: 'Mastery'
  },
  {
    id: 'badge-hidden-gem-hunter',
    title: 'Hidden Gem Hunter',
    description: 'Ventured beyond popular landmarks to discover 2+ lesser-known treasures.',
    iconName: 'Gem',
    criteriaDescription: 'Visit 2+ hidden gems',
    category: 'Heritage'
  },
  {
    id: 'badge-grand-anveshak',
    title: 'Grand Anveshak (Master Voyager)',
    description: 'True sovereign voyager of Ambala: unlocked comprehensive mastery with 8+ visits.',
    iconName: 'Award',
    criteriaDescription: 'Visit 8 or more total destinations',
    category: 'Mastery'
  }
];

export const LOCAL_FOOD_SPOTS: LocalFoodSpot[] = [
  {
    id: 'food-jalebi-cantt',
    name: 'Desi Ghee Jalebi Corner (Halwai Bazaar)',
    zone: 'Ambala Cantt',
    specialty: 'Giant Crispy Saffron Desi Ghee Jalebi & Thick Rabri',
    historicalContext: 'A culinary tradition since 1952. Jalebis are shaped with artisan speed into pure clarified desi ghee, delivering a golden crunch that melts into fragrant cardamom-saffron nectar.',
    estimatedCost: '₹60 - ₹120 for 250g',
    timings: '08:00 AM – 10:30 PM',
    location: 'Halwai Bazaar, Sadar Bazaar, Ambala Cantt',
    coordinates: { lat: 30.3462, lng: 76.8322 }
  },
  {
    id: 'food-chhole-bhature',
    name: 'Rawal Pindi Chhole Bhature',
    zone: 'Ambala Cantt',
    specialty: 'Paneer Stuffed Bhature with Slow-cooked Amritsari Chhole',
    historicalContext: 'Post-partition culinary heritage brought to Ambala Cantt. The chhole are simmered overnight with anardana (pomegranate seed) and dry amla for their signature dark, spicy glaze.',
    estimatedCost: '₹80 - ₹110 per plate',
    timings: '08:00 AM – 03:30 PM',
    location: 'Near Cantonment Railway Station, Ambala Cantt',
    coordinates: { lat: 30.3415, lng: 76.8290 }
  },
  {
    id: 'food-cloth-market-chaat',
    name: 'Ambala City Shahi Tikki & Dahi Bhalla',
    zone: 'Ambala City',
    specialty: 'Crisp Desi Ghee Aloo Tikki with spiced chana stuffing and saunth',
    historicalContext: 'Generations of textile merchants and wedding shoppers have paused their bargain hunts at this iconic cart right at the edge of the Cloth Market.',
    estimatedCost: '₹50 - ₹80 per plate',
    timings: '03:00 PM – 09:30 PM',
    location: 'Entrance lane to Cloth Market, Old Ambala City',
    coordinates: { lat: 30.3755, lng: 76.7730 }
  },
  {
    id: 'food-khurchan-malai',
    name: 'Traditional Khurchan & Khoya Kulfi',
    zone: 'Ambala Cantt',
    specialty: 'Traditional Buffalo Milk Khurchan & Matka Malai Kulfi',
    historicalContext: 'Prepared by meticulously scraping and layering caramelized clotted cream from broad iron kadhais over slow simmering cow and buffalo milk.',
    estimatedCost: '₹70 - ₹150',
    timings: '11:00 AM – 10:30 PM',
    location: 'Sadar Bazaar Main Chowk, Ambala Cantt',
    coordinates: { lat: 30.3468, lng: 76.8328 }
  }
];

export const STARTING_LOCATIONS: StartingLocation[] = [
  {
    id: 'cantt-station',
    name: 'Ambala Cantt Railway Station',
    label: 'Ambala Cantt Railway Station (Junction)',
    zone: 'Ambala Cantt',
    coordinates: { lat: 30.3421, lng: 76.8288 },
    description: 'Premier transit hub on Northern Railway connecting Delhi, Chandigarh, and Amritsar.'
  },
  {
    id: 'city-bus-stand',
    name: 'Ambala City Bus Stand',
    label: 'Ambala City Bus Stand / ISBT',
    zone: 'Ambala City',
    coordinates: { lat: 30.3792, lng: 76.7775 },
    description: 'Central hub for intercity and Haryana Roadways buses near the Old City markets.'
  },
  {
    id: 'sadar-bazaar-clock-tower',
    name: 'Sadar Bazaar Chowk',
    label: 'Sadar Bazaar Chowk (Ambala Cantt)',
    zone: 'Ambala Cantt',
    coordinates: { lat: 30.3465, lng: 76.8325 },
    description: 'Historic cantonment commercial heart with street food, shops, and heritage avenues.'
  },
  {
    id: 'gt-road-entry',
    name: 'GT Road (NH-44) Northern Gateway',
    label: 'GT Road (NH-44) Highway Entry / Kingfisher',
    zone: 'Ambala Cantt',
    coordinates: { lat: 30.3620, lng: 76.8150 },
    description: 'Gateway for travelers driving along National Highway 44 (Grand Trunk Road).'
  },
  {
    id: 'cloth-market-entry',
    name: 'Cloth Market Gate',
    label: 'Ambala Cloth Market Entry (Ambala City)',
    zone: 'Ambala City',
    coordinates: { lat: 30.3752, lng: 76.7725 },
    description: 'Entrance to Asia’s largest textile and traditional bridal wear bazaar.'
  }
];
