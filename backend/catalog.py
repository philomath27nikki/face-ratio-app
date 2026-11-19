"""
Beauty & Skincare Product Catalog for FaceSemantic System.
Curated dataset containing cosmetic and skincare items with anthropometric facial
shape matching, formulation, finish, and semantic descriptors.
"""

from typing import List, Dict, Any, Optional

PRODUCTS: List[Dict[str, Any]] = [
    # ------------------ CONTOUR & SCULPT ------------------
    {
        "id": "prod-contour-01",
        "name": "Match Stix Contour Skinstick",
        "brand": "Fenty Beauty",
        "category": "Contour & Sculpt",
        "sub_category": "Cream Contour Stick",
        "price": 32.00,
        "rating": 4.7,
        "review_count": 2840,
        "description": "Matte, cool-toned contour stick designed to carve out hollows of cheeks and chisel strong jawline shadows. Perfect for round and square faces seeking vertical elongation and angular cheekbone definition.",
        "key_benefits": ["Chiseled cheekbone hollows", "Cool undertone shadow illusion", "Non-greasy buildable matte finish"],
        "target_face_shapes": ["Round", "Square", "Oval"],
        "target_skin_types": ["All", "Oily", "Combination"],
        "formulation": "Stick",
        "finish": "Matte",
        "image_url": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80",
        "tags": ["contour stick", "sculpting", "cheek hollows", "jawline chisel", "matte contour", "slimming"]
    },
    {
        "id": "prod-contour-02",
        "name": "Filmstar Bronze & Glow Contour Duo",
        "brand": "Charlotte Tilbury",
        "category": "Contour & Sculpt",
        "sub_category": "Powder Contour Palette",
        "price": 68.00,
        "rating": 4.8,
        "review_count": 1950,
        "description": "Subtle, luminous bronzer and candlelit highlighter duo. Soft-focus micronized pigments soften angular jaws and square jawlines while adding a golden temple warmth.",
        "key_benefits": ["Softens sharp mandibular jaw angles", "Subtle dimensional bronze", "Seamless blending"],
        "target_face_shapes": ["Square", "Rectangle", "Diamond"],
        "target_skin_types": ["Normal", "Dry", "Combination"],
        "formulation": "Pressed Powder",
        "finish": "Satin Radiant",
        "image_url": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
        "tags": ["bronzer", "soft focus", "jawline softening", "powder contour", "luminous sculpt"]
    },
    {
        "id": "prod-contour-03",
        "name": "Pro Contour Palette Deep/Medium",
        "brand": "Anastasia Beverly Hills",
        "category": "Contour & Sculpt",
        "sub_category": "Multi-Shade Sculpting Kit",
        "price": 40.00,
        "rating": 4.6,
        "review_count": 3120,
        "description": "Six-pan customizable powder contour kit. Deep ash tones for jaw angle receding, forehead hairline shading to shorten oblong faces, and chin tip shading to reduce lower-third length.",
        "key_benefits": ["Forehead hairline shading", "Chin tip shortening", "Custom shadow depth"],
        "target_face_shapes": ["Oblong", "Rectangle", "Oval", "Heart"],
        "target_skin_types": ["All", "Oily", "Normal"],
        "formulation": "Pressed Powder",
        "finish": "Velvet Matte",
        "image_url": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80",
        "tags": ["contour kit", "oblong shortening", "forehead contour", "chin contour", "sculpting palette"]
    },
    {
        "id": "prod-contour-04",
        "name": "Warm Wishes Effortless Bronzer Stick",
        "brand": "Rare Beauty",
        "category": "Contour & Sculpt",
        "sub_category": "Cream Bronzer Stick",
        "price": 26.00,
        "rating": 4.9,
        "review_count": 4200,
        "description": "Weightless cream bronzer stick that glides effortlessly. Buffs into the temples, cheekbones, and jaw with second-skin warmth, blending out harsh facial edges.",
        "key_benefits": ["Second-skin warmth", "Diffuses sharp jaw angles", "Weightless cream formula"],
        "target_face_shapes": ["Square", "Diamond", "Heart", "Oval"],
        "target_skin_types": ["Dry", "Normal", "Combination", "Sensitive"],
        "formulation": "Cream",
        "finish": "Natural / Satin",
        "image_url": "https://images.unsplash.com/photo-1599733589046-10c005739ef9?auto=format&fit=crop&w=600&q=80",
        "tags": ["cream bronzer", "diffusing bronzer", "soft contour", "warm sculpt"]
    },
    {
        "id": "prod-contour-05",
        "name": "Shade and Illuminate Contour Duo",
        "brand": "Tom Ford",
        "category": "Contour & Sculpt",
        "sub_category": "Luxury Cream Contour",
        "price": 90.00,
        "rating": 4.7,
        "review_count": 890,
        "description": "Iconic cream contour and light-reflecting enhancer. Specifically designed to draw the eye vertically along the center of the face, narrowing wide cheekbones and balancing heart-shaped foreheads.",
        "key_benefits": ["Vertical facial dimension", "Balances wide bizygomatic cheeks", "Translucent light reflection"],
        "target_face_shapes": ["Heart", "Round", "Diamond"],
        "target_skin_types": ["Dry", "Normal", "Mature"],
        "formulation": "Cream",
        "finish": "Dewy Luminous",
        "image_url": "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80",
        "tags": ["luxury contour", "cheekbone balance", "vertical elongation", "cream sculpt"]
    },

    # ------------------ BLUSH ------------------
    {
        "id": "prod-blush-01",
        "name": "Soft Pinch Liquid Blush (Matte)",
        "brand": "Rare Beauty",
        "category": "Blush",
        "sub_category": "Liquid Blush",
        "price": 23.00,
        "rating": 4.9,
        "review_count": 6800,
        "description": "Ultra-pigmented long-wearing liquid blush. When applied at high 45-degree angle from cheekbone towards temples, creates an instant lifting effect for round and square face structures.",
        "key_benefits": ["Upward lifting cheekbone drape", "12-hour all-day wear", "Featherweight blendability"],
        "target_face_shapes": ["Round", "Square", "Oval"],
        "target_skin_types": ["All", "Oily", "Combination"],
        "formulation": "Liquid",
        "finish": "Soft Matte",
        "image_url": "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=600&q=80",
        "tags": ["liquid blush", "cheek lifting", "high cheekbone", "matte blush", "pigmented"]
    },
    {
        "id": "prod-blush-02",
        "name": "Afterglow Liquid Blush - Orgasm",
        "brand": "NARS",
        "category": "Blush",
        "sub_category": "Luminous Liquid Blush",
        "price": 32.00,
        "rating": 4.8,
        "review_count": 2150,
        "description": "Hydrating, glow-infused peachy pink blush with subtle golden micro-shimmer. Applied horizontally across the center of cheeks to visually shorten and widen oblong or rectangular faces.",
        "key_benefits": ["Horizontal cheek fullness", "8-hour continuous hydration", "Juicy dewy radiance"],
        "target_face_shapes": ["Oblong", "Rectangle"],
        "target_skin_types": ["Normal", "Dry", "Combination"],
        "formulation": "Liquid",
        "finish": "Dewy Luminous",
        "image_url": "https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&w=600&q=80",
        "tags": ["dewy blush", "horizontal blush", "oblong balancing", "peach shimmer", "hydrating"]
    },
    {
        "id": "prod-blush-03",
        "name": "Cloud Paint Gel-Cream Blush",
        "brand": "Glossier",
        "category": "Blush",
        "sub_category": "Gel-Cream Blush",
        "price": 22.00,
        "rating": 4.6,
        "review_count": 5100,
        "description": "Sheer, pillowy seamless gel-cream cheek color. Tap directly onto the apples of the cheeks to soften high angular cheekbones in heart and diamond shaped faces.",
        "key_benefits": ["Apples-of-cheeks softening", "Foolproof sheer wash", "Pore-smoothing collagen blend"],
        "target_face_shapes": ["Heart", "Diamond", "Square"],
        "target_skin_types": ["Dry", "Normal", "Sensitive"],
        "formulation": "Cream",
        "finish": "Dewy",
        "image_url": "https://images.unsplash.com/photo-1583241800698-e8ab01c85b27?auto=format&fit=crop&w=600&q=80",
        "tags": ["cream blush", "apple of cheeks", "softening blush", "natural flush"]
    },
    {
        "id": "prod-blush-04",
        "name": "Ambient Lighting Blush",
        "brand": "Hourglass",
        "category": "Blush",
        "sub_category": "Photoluminescent Powder Blush",
        "price": 46.00,
        "rating": 4.8,
        "review_count": 1820,
        "description": "Airbrushed marbled powder blush combining vibrant pigment with ambient lighting powder. Diffuses harsh facial angles with a multidimensional soft-focus glow.",
        "key_benefits": ["Photoluminescent optical diffusion", "Blurs skin texture", "Flattering angle softener"],
        "target_face_shapes": ["Square", "Rectangle", "Oval", "Diamond"],
        "target_skin_types": ["All", "Combination", "Mature"],
        "formulation": "Pressed Powder",
        "finish": "Soft-Focus Radiant",
        "image_url": "https://images.unsplash.com/photo-1557205465-f3762edea6d3?auto=format&fit=crop&w=600&q=80",
        "tags": ["powder blush", "soft focus", "blurring", "multidimensional glow"]
    },

    # ------------------ HIGHLIGHTER ------------------
    {
        "id": "prod-high-01",
        "name": "Positive Light Liquid Luminizer",
        "brand": "Rare Beauty",
        "category": "Highlighter",
        "sub_category": "Liquid Highlighter",
        "price": 25.00,
        "rating": 4.9,
        "review_count": 3950,
        "description": "Silky, second-skin liquid highlighter. Best applied precisely down the bridge of the nose and high cupids bow to draw focal attention inward and elongate round or square facial proportions.",
        "key_benefits": ["Central facial elongation", "Zero glitter glass-skin shine", "Botanical lotus blend"],
        "target_face_shapes": ["Round", "Square", "Oval"],
        "target_skin_types": ["All", "Normal", "Dry"],
        "formulation": "Liquid",
        "finish": "Dewy Glass-Skin",
        "image_url": "https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=600&q=80",
        "tags": ["liquid highlighter", "glass skin", "bridge of nose", "vertical light", "luminizer"]
    },
    {
        "id": "prod-high-02",
        "name": "Hollywood Flawless Filter",
        "brand": "Charlotte Tilbury",
        "category": "Highlighter",
        "sub_category": "Complexion Booster Glow",
        "price": 49.00,
        "rating": 4.7,
        "review_count": 5200,
        "description": "Illuminating complexion booster that mimics Hollywood ring lights. Perfect for highlighting narrow temples in heart and pear shapes to restore upper facial balance.",
        "key_benefits": ["Widens narrow temples", "Smoothing polymers blur pores", "Glossy radiant finish"],
        "target_face_shapes": ["Heart", "Diamond", "Pear"],
        "target_skin_types": ["Dry", "Normal", "Combination"],
        "formulation": "Liquid",
        "finish": "Radiant Glow",
        "image_url": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=80",
        "tags": ["temple highlighter", "glow booster", "complexion illuminator", "radiant primer"]
    },
    {
        "id": "prod-high-03",
        "name": "Killawatt Freestyle Highlighter",
        "brand": "Fenty Beauty",
        "category": "Highlighter",
        "sub_category": "Duo Powder Highlighter",
        "price": 40.00,
        "rating": 4.8,
        "review_count": 3400,
        "description": "Cream-to-powder hybrid duo with subtle daytime sheen and hyper-reflective strobe. Accentuate the high points of the zygomatic arch without adding width to the middle third.",
        "key_benefits": ["Zygomatic arch definition", "Weightless cream-to-powder", "Sweat-resistant wear"],
        "target_face_shapes": ["Oval", "Heart", "Oblong"],
        "target_skin_types": ["All", "Oily", "Combination"],
        "formulation": "Pressed Powder",
        "finish": "Metallic Sheen",
        "image_url": "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=600&q=80",
        "tags": ["powder highlighter", "zygomatic arch", "high cheekbone", "strobing"]
    },

    # ------------------ BROW & EYE SCULPT ------------------
    {
        "id": "prod-brow-01",
        "name": "Brow Wiz Ultra-Slim Precision Pencil",
        "brand": "Anastasia Beverly Hills",
        "category": "Brow & Eye",
        "sub_category": "Micro Brow Pencil",
        "price": 25.00,
        "rating": 4.8,
        "review_count": 9100,
        "description": "Ultra-fine tip mechanical eyebrow pencil. Sculpt high, angular arches to add vertical lift and frame round faces, or create soft rounded arches to balance square jawlines.",
        "key_benefits": ["High arch vertical lift", "Hair-like precise strokes", "Smudge-proof 12h wax"],
        "target_face_shapes": ["Round", "Square", "Diamond"],
        "target_skin_types": ["All"],
        "formulation": "Stick",
        "finish": "Matte",
        "image_url": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
        "tags": ["brow pencil", "high arch", "vertical lift", "eyebrow sculpting", "micro pencil"]
    },
    {
        "id": "prod-brow-02",
        "name": "Boy Brow Volumizing Grooming Pomade",
        "brand": "Glossier",
        "category": "Brow & Eye",
        "sub_category": "Tinted Brow Gel Pomade",
        "price": 18.00,
        "rating": 4.7,
        "review_count": 6400,
        "description": "Brushable flexible pomade that thickens and fluffs brows into straight, flat horizontal shapes. Ideal for oblong and rectangular faces to break up vertical length.",
        "key_benefits": ["Fluffy horizontal straight brows", "Breaks up vertical face height", "Flexible non-stiff hold"],
        "target_face_shapes": ["Oblong", "Rectangle"],
        "target_skin_types": ["All"],
        "formulation": "Gel",
        "finish": "Natural",
        "image_url": "https://images.unsplash.com/photo-1597225244660-1cd128c64284?auto=format&fit=crop&w=600&q=80",
        "tags": ["brow gel", "straight brows", "oblong shortening", "fluffy brows", "pomade"]
    },
    {
        "id": "prod-eye-01",
        "name": "Tattoo Liner Waterproof Liquid Eyeliner",
        "brand": "KVD Beauty",
        "category": "Brow & Eye",
        "sub_category": "Felt Tip Liquid Eyeliner",
        "price": 25.00,
        "rating": 4.7,
        "review_count": 4500,
        "description": "Precision waterproof calligraphy brush tip. Elongate eyes outward with an upward wing to balance wide cheeks in round faces and lift downturned outer canthi.",
        "key_benefits": ["Extended winged cat-eye", "Draws eyes outward & upward", "24-hour waterproof black"],
        "target_face_shapes": ["Round", "Heart", "Oval"],
        "target_skin_types": ["All"],
        "formulation": "Liquid",
        "finish": "Satin Black",
        "image_url": "https://images.unsplash.com/photo-1583241772648-b4b39b5b2907?auto=format&fit=crop&w=600&q=80",
        "tags": ["eyeliner", "winged liner", "cat eye", "eye lifting", "waterproof"]
    },

    # ------------------ SKINCARE ESSENTIALS ------------------
    {
        "id": "prod-skin-01",
        "name": "Skin Perfecting 2% BHA Liquid Exfoliant",
        "brand": "Paula's Choice",
        "category": "Skincare",
        "sub_category": "Chemical Exfoliant",
        "price": 35.00,
        "rating": 4.8,
        "review_count": 12400,
        "description": "Clinically proven salicylic acid liquid exfoliant. Clears clogged pores, regulates excess T-zone sebum, refines facial skin texture, and smooths uneven cheek blemishes before makeup application.",
        "key_benefits": ["Unclogs enlarged pores", "Reduces T-zone shine & blemishes", "Smoothes skin for seamless contour"],
        "target_face_shapes": ["All"],
        "target_skin_types": ["Oily", "Combination", "Acne-Prone"],
        "formulation": "Liquid",
        "finish": "Matte Clarifying",
        "image_url": "https://images.unsplash.com/photo-1608248597359-05206037b51b?auto=format&fit=crop&w=600&q=80",
        "tags": ["salicylic acid", "bha", "pore clearing", "acne", "oil control", "smooth canvas"]
    },
    {
        "id": "prod-skin-02",
        "name": "Niacinamide 10% + Zinc 1%",
        "brand": "The Ordinary",
        "category": "Skincare",
        "sub_category": "Blemish & Sebum Serum",
        "price": 6.50,
        "rating": 4.6,
        "review_count": 18900,
        "description": "High-strength vitamin and mineral blemish formula. Controls forehead and nose shine, reduces skin redness, and reinforces the lipid barrier for a shine-free matte complexion.",
        "key_benefits": ["Minimizes visible oiliness", "Calms facial erythema & redness", "Strengthens epidermal barrier"],
        "target_face_shapes": ["All"],
        "target_skin_types": ["Oily", "Combination"],
        "formulation": "Serum",
        "finish": "Matte",
        "image_url": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
        "tags": ["niacinamide", "zinc", "redness reduction", "sebum control", "matte serum"]
    },
    {
        "id": "prod-skin-03",
        "name": "Hyaluronic Acid 2% + B5 Hydrating Serum",
        "brand": "The Ordinary",
        "category": "Skincare",
        "sub_category": "Deep Hydration Serum",
        "price": 9.20,
        "rating": 4.7,
        "review_count": 14200,
        "description": "Multi-molecular hyaluronic acid serum with pro-vitamin B5. Plumps skin cells with moisture, softening harsh facial angles and preparing dry skin for dewy foundation application.",
        "key_benefits": ["Plumps dehydrated cheek contours", "Multi-depth hydration", "Preps skin for radiant makeup"],
        "target_face_shapes": ["All"],
        "target_skin_types": ["Dry", "Normal", "Sensitive"],
        "formulation": "Serum",
        "finish": "Dewy Plumping",
        "image_url": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80",
        "tags": ["hyaluronic acid", "plumping", "hydration", "dry skin", "dewy prep"]
    },
    {
        "id": "prod-skin-04",
        "name": "Moisturizing Cream with 3 Essential Ceramides",
        "brand": "CeraVe",
        "category": "Skincare",
        "sub_category": "Barrier Repair Moisturizer",
        "price": 19.99,
        "rating": 4.8,
        "review_count": 15600,
        "description": "Rich, non-greasy barrier restore cream with ceramides 1, 3, 6-II and hyaluronic acid. Locks in hydration, soothes irritated skin, and creates a supple canvas for contour blending.",
        "key_benefits": ["Restores skin barrier", "24-hour MVE hydration delivery", "Non-comedogenic barrier shield"],
        "target_face_shapes": ["All"],
        "target_skin_types": ["Dry", "Normal", "Sensitive"],
        "formulation": "Cream",
        "finish": "Natural / Velvet",
        "image_url": "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
        "tags": ["ceramides", "moisturizer", "barrier repair", "dry skin", "sensitive skin"]
    },
    {
        "id": "prod-skin-05",
        "name": "Anthelios Clear Skin Dry Touch SPF 60",
        "brand": "La Roche-Posay",
        "category": "Skincare",
        "sub_category": "Matte Oil-Control Sunscreen",
        "price": 20.99,
        "rating": 4.7,
        "review_count": 8700,
        "description": "Oil-free matte sunscreen formulated with perlite and silica to absorb excess sweat and sebum even in high humidity. Prevents photo-aging while keeping the T-zone perfectly shine-free.",
        "key_benefits": ["100% oil-free shine control", "Broad spectrum UVA/UVB SPF 60", "Zero white cast under makeup"],
        "target_face_shapes": ["All"],
        "target_skin_types": ["Oily", "Combination", "Acne-Prone"],
        "formulation": "Cream",
        "finish": "Dry-Touch Matte",
        "image_url": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80",
        "tags": ["sunscreen", "spf 60", "matte sunscreen", "oil absorbing", "uv protection"]
    },
    {
        "id": "prod-skin-06",
        "name": "C-Firma Fresh Vitamin C Day Serum",
        "brand": "Drunk Elephant",
        "category": "Skincare",
        "sub_category": "Brightening Antioxidant Serum",
        "price": 78.00,
        "rating": 4.5,
        "review_count": 3100,
        "description": "Potent 15% L-Ascorbic Acid and Ferulic Acid antioxidant day serum. Dissolves dull surface cells, brightens skin tone, and enhances natural cheek luminescence for a glowing foundation base.",
        "key_benefits": ["Brightens skin tone & dark spots", "Firming antioxidant protection", "Enhances natural radiance"],
        "target_face_shapes": ["All"],
        "target_skin_types": ["Normal", "Dry", "Combination"],
        "formulation": "Serum",
        "finish": "Radiant",
        "image_url": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
        "tags": ["vitamin c", "antioxidant", "brightening", "firming", "radiant serum"]
    }
]


def get_all_products() -> List[Dict[str, Any]]:
    return PRODUCTS


def get_products_by_category(category: Optional[str] = None) -> List[Dict[str, Any]]:
    if not category or category.lower() in ["all", ""]:
        return PRODUCTS
    cat_lower = category.lower()
    return [p for p in PRODUCTS if p["category"].lower() == cat_lower]


def get_products_by_face_shape(face_shape: str) -> List[Dict[str, Any]]:
    fs_lower = face_shape.lower()
    results = []
    for p in PRODUCTS:
        shapes = [s.lower() for s in p.get("target_face_shapes", [])]
        if "all" in shapes or fs_lower in shapes:
            results.append(p)
    return results
