-- Seed the projects table from the portfolio that used to live only in
-- src/lib/site-data.ts, so /projects is editable in the CMS instead of in code.
-- Slugs match the hardcoded entries exactly, and ON CONFLICT keeps this
-- migration safe to re-run without clobbering later admin edits.
INSERT INTO public.projects
  (slug, title, category, location, timeline, client, value, summary, image_url, overview, scope, outcomes, is_published, sort_order)
VALUES
  (
    'central-business-tower',
    'Central Business Tower',
    'Construction',
    'Abuja, FCT',
    '2022 – 2024',
    'Institutional Investor',
    'Confidential',
    '24-storey Grade-A commercial tower delivered on schedule with a LEED-oriented specification.',
    '/project-images/central-business-tower.webp',
    'A flagship commercial development delivered with tight project controls, high-grade specifications and coordinated stakeholder management.',
    ARRAY['Project planning and scheduling', 'Construction management', 'Quality assurance', 'Facility readiness planning'],
    ARRAY['Grade-A workspace delivered to institutional standards', 'Improved commercial asset value', 'Coordinated handover for operations teams'],
    true, 1
  ),
  (
    'regional-fuel-depot',
    'Regional Fuel Storage Depot',
    'Oil & Gas',
    'Port Harcourt, Rivers',
    '2021 – 2023',
    'Downstream Operator',
    'Confidential',
    '48ML strategic petroleum products depot with automated loading and safety systems.',
    '/project-images/regional-fuel-depot.webp',
    'A strategic downstream storage asset designed to improve fuel availability, safety and distribution reliability.',
    ARRAY['Depot infrastructure coordination', 'Safety systems integration', 'Loading operations support', 'Maintenance planning'],
    ARRAY['Improved distribution resilience', 'Modernised safety controls', 'More reliable product movement'],
    true, 2
  ),
  (
    'northern-agro-estate',
    'Northern Agro Estate',
    'Agriculture',
    'Kaduna State',
    '2020 – Ongoing',
    'Consortium',
    'Confidential',
    '2,500-hectare mechanised grain estate integrated with storage and off-take logistics.',
    '/project-images/northern-agro-estate.webp',
    'A mechanised agriculture programme integrating cultivation, storage, logistics and commercial off-take support.',
    ARRAY['Farm planning', 'Mechanised operations', 'Storage strategy', 'Logistics coordination'],
    ARRAY['Expanded production capacity', 'Reduced post-harvest losses', 'Improved market access for produce'],
    true, 3
  ),
  (
    'national-distribution-hub',
    'National Distribution Hub',
    'Logistics',
    'Lagos',
    '2022 – 2023',
    'FMCG Group',
    'Confidential',
    '45,000 sqm cross-dock warehouse serving nationwide last-mile operations.',
    '/project-images/national-distribution-hub.webp',
    'A high-throughput distribution facility built to support nationwide supply-chain movement and last-mile execution.',
    ARRAY['Warehouse planning', 'Fleet integration', 'Procurement systems', 'Distribution workflow design'],
    ARRAY['Faster fulfilment cycles', 'Stronger inventory visibility', 'Improved route efficiency'],
    true, 4
  ),
  (
    'renaissance-grand-hotel',
    'Renaissance Grand Hotel',
    'Hospitality',
    'Abuja, FCT',
    '2023 – 2025',
    'Private Group',
    'Confidential',
    'Five-star 220-key hospitality property with conferencing, dining and wellness suites.',
    '/project-images/renaissance-grand-hotel.webp',
    'A premium hospitality destination combining accommodation, conferencing, dining and wellness amenities.',
    ARRAY['Hospitality concept planning', 'Facilities coordination', 'Event infrastructure', 'Service model development'],
    ARRAY['Expanded premium hospitality capacity', 'Integrated conference offering', 'Elevated guest experience'],
    true, 5
  ),
  (
    'industrial-park-fitout',
    'Industrial Park Fit-out',
    'Manufacturing',
    'Ogun State',
    '2023 – 2024',
    'Industrial Consortium',
    'Confidential',
    'Turn-key civil and MEP fit-out for a multi-tenant manufacturing cluster.',
    '/project-images/industrial-park-fitout.webp',
    'A multi-tenant industrial fit-out programme coordinating civil, MEP and operational readiness requirements.',
    ARRAY['Civil works coordination', 'MEP delivery', 'Tenant readiness', 'Industrial safety standards'],
    ARRAY['Accelerated tenant occupancy', 'Improved facility reliability', 'Scalable industrial operating environment'],
    true, 6
  )
ON CONFLICT (slug) DO NOTHING;
