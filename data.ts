import { PortfolioItem, BlogPost } from './types';

export const portfolioItems: PortfolioItem[] = [
  { 
    id: 1, 
    slug: "ap-so",
    title: "AP SO", 
    category: "Penthouse", 
    year: "2023", 
    location: "Vasile Lascar, Bucuresti",
    services: "Implementare proiect arhitect, Executie, Montaj",
    description: "Un proiect de tip penthouse definit prin rafinament si materiale premium unde am transpus viziunea arhitectului in detalii tehnice impecabile. Am imbinat fronturile din mdf vopsit cu insertii de ceramica si accente calde din lemn pentru a crea un ambient unitar si sofisticat. Fiecare piesa de mobilier, de la zona de dining pana la dormitoarele personalizate pentru copii, a fost executata cu atentie sporita la finisaje pentru a oferi un stil de viata modern si functional.",
    mainImage: "/projects/ap-so/penthouse-vasile-lascar-mobilier-living-mdf-vopsit.webp",
    gallery: [
      "/projects/ap-so/bucatarie-la-comanda-insula-ceramica-atlantis-furnitures.webp",
      "/projects/ap-so/mobilier-dormitor-minimalist-dressing-incastrat-bucuresti.webp",
      "/projects/ap-so/mobilier-camera-copil-pat-personalizat-vasile-lascar.webp",
      [
        "/projects/ap-so/pat-etajat-la-comanda-design-arhitect-atlantis-furnitures.webp",
        "/projects/ap-so/detalii-mobilier-mdf-vopsit-nise-iluminate.webp"
      ]
    ],
    tags: ["MDF VOPSIT", "CERAMICA", "LEMN", "PAL", "PENTHOUSE", "PREMIUM"],
    seoTitle: "Amenajare Penthouse Vasile Lascar | Mobilier la Comanda Bucuresti",
    seoDescription: "Proiect penthouse Vasile Lascar. Mobilier la comanda din mdf vopsit si lemn. Design interior premium pentru living si dormitor in Bucuresti.",
    seoKeywords: "mobilier la comanda bucuresti, mobila mdf vopsit, amenajare penthouse, mobila premium bucuresti, design interior bucuresti"
  },
  { 
    id: 2, 
    slug: "ap-cosmo",
    title: "AP COSMO", 
    category: "Apartament", 
    year: "2024", 
    location: "Cosmopolis, Ilfov",
    services: "Implementare proiect arhitect, Executie, Montaj",
    description: "Un proiect modern situat in complexul Cosmopolis unde am pus accent pe functionalitate si estetica minimalista. Am integrat solutii de depozitare inteligente realizate din mdf vopsit si pal, completate de texturi calde de lemn si finisaje din ceramica. Rezultatul este un spatiu echilibrat, lucrat cu precizie dupa planurile arhitectului, care optimizeaza fiecare metru patrat al apartamentului prin linii curate si volume bine definite.",
    mainImage: "/projects/ap-cosmo/mobilier-dormitor-mat-mdf-vopsit-lemn-cosmopolis.webp",
    gallery: [
      [
        "/projects/ap-cosmo/bucatarie-deschisa-living-masa-rotunda-lemn-atlantis-furnitures.webp",
        "/projects/ap-cosmo/zona-birou-home-office-panouri-riflate-lemn-cosmopolis.webp"
      ],
      [
        "/projects/ap-cosmo/detaliu-bucatarie-mdf-alb-si-lemn-cosmopolis.webp",
        "/projects/ap-cosmo/amenajare-open-space-living-bucatarie-apartament-modern.webp",
        "/projects/ap-cosmo/mobilier-baie-suspendat-mdf-riflat-ceramica-cosmopolis.webp"
      ]
    ],
    tags: ["MDF VOPSIT", "CERAMICA", "LEMN", "PAL", "APARTAMENT", "COSMOPOLIS"],
    seoTitle: "Mobilier Apartament Cosmopolis | Bucatarii la Comanda Ilfov",
    seoDescription: "Amenajare apartament Cosmopolis Ilfov. Bucatarie open space din mdf vopsit si mobilier baie suspendat. Producator mobila la comanda.",
    seoKeywords: "bucatarii la comanda ilfov, mobila la comanda pret, producator mobila mdf vopsit, mobila apartament cosmopolis, amenajari interioare ilfov"
  },
  { 
    id: 3, 
    slug: "csm",
    title: "CSM", 
    category: "Medical", 
    year: "2024", 
    location: "Pitesti, Arges",
    services: "Implementare proiect arhitect, Executie, Montaj",
    description: "Proiectul CSM din Pitesti a presupus renovarea completa a unei sectii de pediatrie, unde am pus accent pe un design ludic si materiale cu standarde inalte de igiena. Am utilizat corian pentru suprafetele de lucru si mdf vopsit pentru elemente decorative complexe, cum este receptia sub forma de copac. Implementarea a urmarit riguros planurile arhitectului, rezultand un spatiu medical sigur si primitor, dotat cu solutii masive de depozitare si cabinete optimizate pentru nevoile micilor pacienti.",
    mainImage: "/projects/CSM/receptie-pediatrie-corian-mdf-vopsit-csm-pitesti.webp",
    gallery: [
      "/projects/CSM/amenajare-cabinet-pediatrie-mobilier-office-medical.webp",
      "/projects/CSM/amenajare-sala-asteptare-pediatrie-mobilier-personalizat.webp",
      "/projects/CSM/chicineta-medicala-si-vestiare-inchidere-electronica-csm.webp",
      "/projects/CSM/mobilier-depozitare-medicala-dulapuri-pal-alb-pitesti.webp"
    ],
    tags: ["CORIAN", "MDF VOPSIT", "PAL", "PEDIATRIE", "CSM", "PITESTI", "MEDICAL"],
    seoTitle: "Mobilier Medical CSM Pitesti | Mobilier la Comanda Arges",
    seoDescription: "Proiect clinica pediatrie CSM Pitesti. Receptie din corian si mobilier medical din mdf vopsit. Executie mobila la comanda pentru spatii comerciale.",
    seoKeywords: "mobilier medical la comanda, receptie corian, mobila mdf vopsit pitesti, mobila la comanda arges, producator mobila premium"
  },
  { 
    id: 4, 
    slug: "s-house",
    title: "S House", 
    category: "Living & Dormitor", 
    year: "2024", 
    location: "Pipera, Ilfov",
    services: "Implementare proiect arhitect, Executie, Montaj",
    description: "Proiectul S House din Pipera reprezinta o fuziune intre eleganta naturala a mdf-ului furniruit si liniile moderne ale designului contemporan. Am implementat viziunea arhitectului intr-un spatiu definit prin texturi calde si volume minimaliste, optimizand zona de zi si dormitorul pentru un confort absolut. Utilizarea materialelor premium si atentia la imbinari asigura o estetica atemporala, unde fiecare piesa de mobilier completeaza perfect lumina naturala a locuintei.",
    mainImage: "/projects/S House/s-house-living-bucatarie-open-space-mdf-furnir-pipera.webp",
    gallery: [
      "/projects/S House/amenajare-living-modern-panouri-lemn-atlantis-furnitures.webp",
      "/projects/S House/masa-dining-lemn-si-canapea-moderna-s-house-pipera.webp",
      "/projects/S House/mobilier-dormitor-modern-perete-riflat-lemn-s-house.webp",
      "/projects/S House/mobilier-living-minimalist-tv-mdf-furnir-pal-pipera.webp"
    ],
    tags: ["MDF FURNIR", "PAL", "PIPERA", "S HOUSE", "LIVING", "DORMITOR", "MODERN"],
    seoTitle: "Mobilier Living si Dormitor Pipera | Mobila Premium Ilfov",
    seoDescription: "Proiect S House Pipera. Mobilier living modern din mdf furniruit si pal. Amenajare dormitor la comanda cu panouri riflate in Ilfov.",
    seoKeywords: "mobila living moderna mdf, dressing la comanda ilfov, mobilier dormitor personalizat, mobila premium pipera, producator mobila ilfov"
  },
  { 
    id: 5, 
    slug: "ap-air-u",
    title: "AP AIR-U", 
    category: "Apartament", 
    year: "2024", 
    location: "Unirii, Bucuresti",
    services: "Proiectare, Executie, Montaj",
    description: "Proiectul AP AIR-U din zona Unirii este un exemplu de amenajare integrata unde am mizat pe o atmosfera calda si primitoare. Am combinat eleganta mdf-ului vopsit in nuante de albastru prafuit cu texturi naturale precum ratanul si lemnul, creand un contrast vizual rafinat. Proiectul a presupus atat partea de proiectare, cat si implementarea completa a mobilierului, rezultand un spatiu aerisit, plin de personalitate si detalii decorative atent alese pentru un stil de viata urban si relaxat.",
    mainImage: "/projects/AP AIR-U/design-interior-apartament-modern-unirii-atlantis-furnitures.webp",
    gallery: [
      "/projects/AP AIR-U/amenajare-zona-dining-masa-lemn-design-interior-unirii.webp",
      "/projects/AP AIR-U/bucatarie-la-comanda-albastra-mdf-vopsit-bucuresti.webp",
      "/projects/AP AIR-U/mobilier-apartament-complet-mdf-vopsit-albastru-unirii.webp",
      "/projects/AP AIR-U/mobilier-dormitor-ratan-lemn-design-unic-atlantis-furnitures.webp",
      "/projects/AP AIR-U/mobilier-living-personalizat-albastru-unirii-atlantis-furnitures.webp",
      "/projects/AP AIR-U/pat-personalizat-dormitor-tineret-ratan-unirii-bucuresti.webp"
    ],
    tags: ["MDF VOPSIT", "LEMN", "RATAN", "TEXTIL", "APARTAMENT", "UNIRII", "DESIGN INTERIOR"],
    seoTitle: "Amenajare Apartament Unirii | Bucatarie MDF Vopsit Bucuresti",
    seoDescription: "Proiect AP AIR-U zona Unirii. Bucatarie la comanda din mdf vopsit mat albastru si mobilier dormitor cu ratan. Design interior si executie mobila.",
    seoKeywords: "bucatarie mdf vopsit mat pret, mobila la comanda bucuresti, bucatarii la comanda bucuresti, amenajare apartament unirii, mobila premium bucuresti"
  },
  { 
    id: 6, 
    slug: "ap-air-v",
    title: "AP AIR-V", 
    category: "Apartament", 
    year: "2024", 
    location: "Victoriei, Bucuresti",
    services: "Implementare proiect mobilier, Executie, Montaj",
    description: "Proiectul AP AIR-V din zona Victoriei este definit prin eleganta si luminozitate. Am mobilat complet acest apartament utilizand mdf vopsit si oglinzi pentru a crea un efect de spatialitate si un design contemporan. Fiecare piesa a fost executata cu atentie la detalii, oferind solutii de depozitare inteligente si finisaje premium care transforma locuinta intr-un spatiu rafinat si confortabil. Implementarea a urmarit un echilibru perfect intre estetica moderna si functionalitatea necesara unei vieti urbane.",
    mainImage: "/projects/AP AIR-V/mobilier-living-modern-mdf-vopsit-albastru-victoriei-bucuresti.webp",
    gallery: [
      "/projects/AP AIR-V/mobilier-baie-lemn-oglinda-rotunda-iluminata-atlantis-furnitures.webp",
      "/projects/AP AIR-V/amenajare-open-space-apartament-modern-victoriei-atlantis.webp",
      "/projects/AP AIR-V/comoda-tv-suspendata-lemn-perete-accent-albastru-living.webp",
      "/projects/AP AIR-V/bucatarie-la-comanda-albastra-mdf-vopsit-mat-victoriei.webp",
      "/projects/AP AIR-V/detaliu-bucatarie-albastra-mdf-vopsit-mat-victoriei-atlantis.webp",
      "/projects/AP AIR-V/detaliu-mobilier-living-mdf-furniruit-atlantis-furnitures.webp",
      "/projects/AP AIR-V/dulap-dormitor-albastru-la-comanda-mdf-vopsit-victoriei.webp",
      "/projects/AP AIR-V/mobilier-hol-personalizat-rafturi-iluminate-led-bucuresti.webp",
      "/projects/AP AIR-V/_RGC6091-HDR.webp"
    ],
    tags: ["MDF VOPSIT", "PAL", "OGLINZI", "APARTAMENT", "VICTORIEI", "PREMIUM"],
    seoTitle: "Mobilier Apartament Victoriei | Dressing la Comanda Bucuresti",
    seoDescription: "Proiect AP AIR-V Victoriei. Mobilier living modern si dressing la comanda cu oglinzi. Executie mobila premium din mdf vopsit in Bucuresti.",
    seoKeywords: "dressing la comanda bucuresti, mobila living moderna mdf, mobilier baie personalizat mdf, mobila la comanda bucuresti, producator mobila premium"
  },
  { 
    id: 7, 
    slug: "tei-house",
    title: "TEI HOUSE", 
    category: "Casa", 
    year: "2024", 
    location: "Lacul Tei, Bucuresti",
    services: "Implementare proiect mobilier, Executie, Montaj",
    description: "Proiectul Tei House reprezinta o amenajare completa pentru o resedinta eleganta unde am imbinat functionalitatea cu un design contemporan rafinat. Am utilizat mdf furniruit pentru texturi naturale si mdf vopsit pentru suprafete curate, completate de oglinzi care amplifica spatialitatea. Implementarea a cuprins solutii complexe, de la biblioteca monumentala si zona de dining cu accente de lux, pana la dormitoarele tematice pentru copii si un dressing walk-in generos cu iluminat integrat. Fiecare piesa reflecta atentia noastra pentru detalii si calitatea executiei Atlantis Furnitures.",
    mainImage: "/projects/TEI HOUSE/amenajare-open-space-dining-living-casa-tei-house.webp",
    gallery: [
      "/projects/TEI HOUSE/dulap-haine-camera-copii-mdf-vopsit-mat.webp",
      "/projects/TEI HOUSE/mobilier-dormitor-copii-tapet-jungle-personalizat.webp",
      [
        "/projects/TEI HOUSE/biblioteca-minimalista-living-mdf-vopsit-tei-house.webp",
        "/projects/TEI HOUSE/detaliu-biblioteca-iluminat-led-tei-house.webp",
        "/projects/TEI HOUSE/detaliu-raft-iluminat-led-mobilier-personalizat.webp"
      ],
      [
        "/projects/TEI HOUSE/mobilier-tv-minimalist-biblioteca-incastrata-lemn.webp",
        "/projects/TEI HOUSE/zona-dining-masa-lemn-masiv-partitie-sticla-atlantis-furnitures.webp"
      ],
      [
        "/projects/TEI HOUSE/amenajare-living-modern-scari-interioare-bucuresti.webp",
        "/projects/TEI HOUSE/paturi-personalizate-copii-design-interior-tei-house.webp"
      ],
      [
        "/projects/TEI HOUSE/amenajare-camera-haine-dressing-atlantis-furnitures.webp",
        "/projects/TEI HOUSE/dressing-walk-in-oglinzi-iluminat-led-premium.webp"
      ]
    ],
    tags: ["MDF VOPSIT", "MDF FURNIR", "OGLINZI", "PAL", "CASA", "LACUL TEI", "PREMIUM"],
    seoTitle: "Mobilier Casa Lacul Tei | Dressing Walk-in la Comanda Bucuresti",
    seoDescription: "Proiect Tei House Bucuresti. Amenajare casa cu biblioteca minimalista, dressing walk-in si mobilier dormitor copii. Mobila din mdf vopsit si furniruit.",
    seoKeywords: "dressing cu usi culisante la comanda, mobila premium bucuresti, mobilier mdf frezat clasic, mobila la comanda bucuresti, amenajari interioare mobilier personalizat"
  },
  { 
    id: 8, 
    slug: "studio-air-v",
    title: "STUDIO AIR-V", 
    category: "Studio", 
    year: "2024", 
    location: "Victoriei, Bucuresti",
    services: "Implementare proiect mobilier, Executie, Montaj",
    description: "Proiectul AP AIR-V2 din zona Victoriei reprezinta o solutie inteligenta de amenajare pentru un studio modern, unde am maximizat eficienta spatiului fara a compromite estetica. Am utilizat o combinatie de mdf vopsit si mdf furniruit pentru a crea texturi calde si suprafete rezistente. Implementarea a urmarit transformarea spatiului intr-un mediu multifunctional, incluzand o zona de dormit incastrata, un spatiu de lucru compact si o chicineta minimalista perfect integrata in designul general.",
    mainImage: "/projects/STUDIO AIR-V/consola-tv-suspendata-lemn-si-baghete-decorative-perete.webp",
    gallery: [
      "/projects/STUDIO AIR-V/amenajare-studio-modern-zona-birou-si-dormitor-victoriei.webp",
      [
        "/projects/STUDIO AIR-V/chicineta-la-comanda-minimalista-studio-victoriei-bucuresti.webp",
        "/projects/STUDIO AIR-V/detaliu-mobilier-dormitor-mdf-furnir-studio-victoriei.webp"
      ],
      [
        "/projects/STUDIO AIR-V/mobilier-baie-premium-mdf-furnir-lavoar-negru-atlantis-furnitures.webp",
        "/projects/STUDIO AIR-V/nisa-pat-personalizata-mdf-vopsit-si-furnir-atlantis.webp"
      ]
    ],
    tags: ["MDF VOPSIT", "MDF FURNIR", "OGLINZI", "PAL", "STUDIO", "VICTORIEI", "AMENAJARE SMART"],
    seoTitle: "Amenajare Studio Victoriei | Mobila la Comanda Bucuresti",
    seoDescription: "Proiect Studio AIR-V Victoriei. Chicineta minimalista si mobilier inteligent pentru spatii mici. Executie mobila din mdf vopsit si furniruit.",
    seoKeywords: "mobila la comanda pret, bucatarii la comanda bucuresti, detalii executie mobila premium, amenajari interioare mobilier personalizat, producator mobila mdf vopsit"
  },
  { 
    id: 9, 
    slug: "office",
    title: "OFFICE", 
    category: "Office", 
    year: "2024", 
    location: "Victoriei, Bucuresti",
    services: "Implementare proiect mobilier, Executie, Montaj",
    description: "Proiectul Office din zona Victoriei reprezinta o transformare eleganta a unui spatiu intr-o cladire istorica, unde am imbinat detaliile arhitecturale clasice cu solutii moderne de mobilier. Am utilizat mdf furniruit pentru mesele de sedinte impunatoare si zonele de depozitare, creand un contrast rafinat cu peretii albi si parchetul original. Implementarea a cuprins piese de mobilier cu design minimalist, precum mese de birou cu baze de sticla si o chicineta optimizata pentru zona de relaxare, oferind un mediu de lucru premium si functional.",
    mainImage: "/projects/OFFICE/masa-sedinte-lemn-lustra-led-design-atlantis-furnitures.webp",
    gallery: [
      [
        "/projects/OFFICE/amenajare-birou-cladire-istorica-masa-lemn-victoriei.webp",
        "/projects/OFFICE/amenajare-chicineta-birou-bar-lemn-zona-coffee.webp"
      ],
      [
        "/projects/OFFICE/amenajare-sala-meeting-moderna-masa-organica-lemn.webp",
        "/projects/OFFICE/biblioteca-birou-mdf-furnir-rafturi-deschise-bucuresti.webp"
      ],
      [
        "/projects/OFFICE/birou-personalizat-lemn-picioare-sticla-victoriei-bucuresti.webp",
        "/projects/OFFICE/detaliu-masa-sedinte-lemn-design-organic-office-premium.webp"
      ],
      [
        "/projects/OFFICE/dulap-depozitare-oglinzi-hol-birou-victoriei.webp",
        "/projects/OFFICE/intrare-sala-sedinte-usi-sticla-mobilier-office-furnir.webp"
      ],
      [
        "/projects/OFFICE/masa-birou-minimalista-picior-sticla-design-modern.webp",
        "/projects/OFFICE/masa-sedinte-premium-mdf-furnir-office-victoriei.webp"
      ],
      [
        "/projects/OFFICE/mobilier-biblioteca-office-masa-meeting-lemn-victoriei.webp",
        "/projects/OFFICE/placare-perete-lemn-si-masa-conferinta-office-lux.webp",
        "/projects/OFFICE/usa-sticla-birou-masa-conferinta-furnir-victoriei.webp"
      ]
    ],
    tags: ["MDF FURNIR", "OGLINZI", "PAL", "OFFICE", "VICTORIEI", "MASA SEDINTE", "BIBLIOTECA"],
    seoTitle: "Mobilier Office Victoriei | Masa Sedinte Lemn Bucuresti",
    seoDescription: "Proiect Office Victoriei. Masa de sedinte din lemn si biblioteca din mdf furniruit. Amenajare spatiu de birouri premium in cladire istorica.",
    seoKeywords: "mobila premium bucuresti, mobilier la comanda bucuresti, producator mobila premium, amenajari interioare mobilier personalizat, mobila mdf vopsit"
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Tendinte in Design Interior 2024",
    category: "Tendinte",
    date: "15 Mar 2024",
    excerpt: "Descopera culorile anului, materialele naturale si texturile care vor domina amenajarile interioare.",
    imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2500&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Cum sa alegi blatul de bucatarie perfect",
    category: "Ghid Practic",
    date: "28 Feb 2024",
    excerpt: "Granit, cuart sau compozit? Analizam avantajele si dezavantajele fiecarui material.",
    imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Maximizarea spatiului in apartamente mici",
    category: "Tips & Tricks",
    date: "10 Feb 2024",
    excerpt: "Solutii inteligente de depozitare si mobilier multifunctional pentru garsoniere.",
    imageUrl: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=2676&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Iluminatul in dressing: Lux si functionalitate",
    category: "Ghid Practic",
    date: "25 Ian 2024",
    excerpt: "Cum sa pozitionezi sursele de lumina pentru a vedea corect culorile hainelor.",
    imageUrl: "https://images.unsplash.com/photo-1551516594-56cb78394645?q=80&w=2530&auto=format&fit=crop"
  }
];