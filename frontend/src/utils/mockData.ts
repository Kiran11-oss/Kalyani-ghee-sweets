// Seed / fallback data mirroring the reference designs & backend seed.py
// Used so the UI renders fully even before the FastAPI backend is running.
import { Product, Category, Order, Customer, Review, Coupon, Banner } from "@/types";

// Category images
import pickleImg from "@/assets/images/Pickle.jpg.jpeg";
import nonvegImg from "@/assets/images/Nonveg.jpg.jpeg";
import powderImg from "@/assets/images/Powder.jpg.jpeg";
import sweetsImg from "@/assets/images/Sweets.jpg.jpeg";
import ladduImg from "@/assets/images/Laddu.jpg.jpeg";
import snacksImg from "@/assets/images/Namkeen.jpg.jpeg";
import namkeenImg from "@/assets/images/Namkeen.jpg.jpeg";
import papadImg from "@/assets/images/Papad.jpg.jpeg";

// Pickle images
import mangoPickleImg from "@/assets/images/Mango Pickle.jpg.jpeg";
import tomatoPickleImg from "@/assets/images/Tomato Pickle.jpg.jpeg";
import lemonPickleImg from "@/assets/images/Lemon Pickle.jpg.jpeg";
import amlaPickleImg from "@/assets/images/Amla Pickle.jpg.jpeg";
import chickenPickleImg from "@/assets/images/Chicken Pickle.jpg.jpg";
import muttonPickleImg from "@/assets/images/Mutton Pickle.jpg.jpg";
import prawnsPickleImg from "@/assets/images/Prawns Pickle.jpg.jpeg";

// Laddu images
import ladduGeneralImg from "@/assets/images/Laddu.jpg.jpeg";
import lavuBoondiLadduImg from "@/assets/images/Lavu Boondi Laddu.jpg";
import motichurLadduImg from "@/assets/images/Motichur Laddu.jpg.jpeg";
import nuvvulaLadduImg from "@/assets/images/Nuvvula Laddu.jpg";
import palliNuvvulaLadduImg from "@/assets/images/Palli Nuvvula Laddu.jpg";

// Sweets images
import kajuBarfiImg from "@/assets/images/Kaju barfi.jpg";
import milkMysorePakImg from "@/assets/images/Milk MysorePak.jpg";
import mysorePakImg from "@/assets/images/Mysore Pak.jpg";

// Papad images
import papadGeneralImg from "@/assets/images/Papad.jpg.jpeg";

export const categories: Category[] = [
  { id: 1, name: "Pickles", slug: "pickles", icon: "🥭", image: pickleImg },
  { id: 2, name: "Non Veg Pickles", slug: "non-veg-pickles", icon: "🍗", image: nonvegImg },
  { id: 3, name: "Powders", slug: "powders", icon: "🌶️", image: powderImg },
  { id: 4, name: "Sweets", slug: "sweets", icon: "🍬", image: sweetsImg },
  { id: 5, name: "Laddu's", slug: "laddus", icon: "🟡", image: ladduImg },
  { id: 6, name: "Snacks", slug: "snacks", icon: "🥨", image: snacksImg },
  { id: 7, name: "Namkeens", slug: "namkeens", icon: "🥜", image: namkeenImg },
  { id: 8, name: "Papads", slug: "papads", icon: "🫓", image: papadImg },
];

export const products: Product[] = [
  { id: 1, name: "Mango Pickle", slug: "mango-pickle", category_id: 1, category_name: "Pickles", price: 400, mrp: 450, unit: "400 g", image: mangoPickleImg, rating: 4.7, reviews_count: 210, stock: 80, best_seller: true, is_veg: true, description: "Traditional Andhra-style tangy mango pickle in cold-pressed oil." },
  { id: 2, name: "Tomato Pickle", slug: "tomato-pickle", category_id: 1, category_name: "Pickles", price: 400, mrp: 450, unit: "400 g", image: tomatoPickleImg, rating: 4.5, reviews_count: 132, stock: 75, is_veg: true },
  { id: 3, name: "Nimmakaya Pickle", slug: "nimmakaya-pickle", category_id: 1, category_name: "Pickles", price: 400, mrp: 450, unit: "400 g", image: lemonPickleImg, rating: 4.6, reviews_count: 128, stock: 72, is_veg: true },
  { id: 4, name: "Amla Pickle", slug: "amla-pickle", category_id: 1, category_name: "Pickles", price: 400, mrp: 450, unit: "400 g", image: amlaPickleImg, rating: 4.4, reviews_count: 91, stock: 70, is_veg: true },
  { id: 5, name: "Gongura Pickle", slug: "gongura-pickle", category_id: 1, category_name: "Pickles", price: 400, mrp: 450, unit: "400 g", image: pickleImg, rating: 4.6, reviews_count: 140, stock: 68, is_veg: true },
  { id: 6, name: "Chinthakaya Pickle", slug: "chinthakaya-pickle", category_id: 1, category_name: "Pickles", price: 400, mrp: 450, unit: "400 g", image: pickleImg, rating: 4.5, reviews_count: 88, stock: 62, is_veg: true },
  { id: 7, name: "Red Chilli Pickle", slug: "red-chilli-pickle", category_id: 1, category_name: "Pickles", price: 400, mrp: 450, unit: "400 g", image: pickleImg, rating: 4.8, reviews_count: 154, stock: 73, is_veg: true },
  { id: 8, name: "Allam Pickle", slug: "allam-pickle", category_id: 1, category_name: "Pickles", price: 400, mrp: 450, unit: "400 g", image: pickleImg, rating: 4.5, reviews_count: 77, stock: 61, is_veg: true },
  { id: 9, name: "Garlic Pickle", slug: "garlic-pickle", category_id: 1, category_name: "Pickles", price: 400, mrp: 450, unit: "400 g", image: pickleImg, rating: 4.7, reviews_count: 99, stock: 64, is_veg: true },
  { id: 10, name: "Kakarakaya Pickle", slug: "kakarakaya-pickle", category_id: 1, category_name: "Pickles", price: 400, mrp: 450, unit: "400 g", image: pickleImg, rating: 4.3, reviews_count: 66, stock: 48, is_veg: true },
  { id: 11, name: "Munagaku Pickle", slug: "munagaku-pickle", category_id: 1, category_name: "Pickles", price: 400, mrp: 450, unit: "400 g", image: pickleImg, rating: 4.4, reviews_count: 70, stock: 55, is_veg: true },
  { id: 12, name: "Budamkaya Pickle", slug: "budamkaya-pickle", category_id: 1, category_name: "Pickles", price: 400, mrp: 450, unit: "400 g", image: pickleImg, rating: 4.5, reviews_count: 74, stock: 60, is_veg: true },
  { id: 13, name: "Mixed Veg Pickle", slug: "mixed-veg-pickle", category_id: 1, category_name: "Pickles", price: 400, mrp: 450, unit: "400 g", image: pickleImg, rating: 4.6, reviews_count: 86, stock: 53, is_veg: true },
  { id: 14, name: "Pulihora Pulusu", slug: "pulihora-pulusu", category_id: 1, category_name: "Pickles", price: 400, mrp: 450, unit: "400 g", image: pickleImg, rating: 4.7, reviews_count: 118, stock: 58, is_veg: true },

  { id: 15, name: "Chicken Pickle", slug: "chicken-pickle", category_id: 2, category_name: "Non Veg Pickles", price: 1600, mrp: 1750, unit: "400 g", image: chickenPickleImg, rating: 4.8, reviews_count: 134, stock: 36, is_veg: false },
  { id: 16, name: "Mutton Pickle", slug: "mutton-pickle", category_id: 2, category_name: "Non Veg Pickles", price: 2000, mrp: 2200, unit: "400 g", image: muttonPickleImg, rating: 4.9, reviews_count: 157, stock: 24, is_veg: false },
  { id: 17, name: "Fish Pickle", slug: "fish-pickle", category_id: 2, category_name: "Non Veg Pickles", price: 2000, mrp: 2200, unit: "400 g", image: nonvegImg, rating: 4.7, reviews_count: 120, stock: 28, is_veg: false },
  { id: 18, name: "Prawn Pickle", slug: "prawn-pickle", category_id: 2, category_name: "Non Veg Pickles", price: 2000, mrp: 2200, unit: "400 g", image: prawnsPickleImg, rating: 4.8, reviews_count: 112, stock: 27, is_veg: false },

  { id: 19, name: "Velluli Karam", slug: "velluli-karam", category_id: 3, category_name: "Powders", price: 90, mrp: 110, unit: "150 g", image: powderImg, rating: 4.6, reviews_count: 58, stock: 90, is_veg: true },
  { id: 20, name: "Karvepaku Karam", slug: "karvepaku-karam", category_id: 3, category_name: "Powders", price: 80, mrp: 95, unit: "150 g", image: powderImg, rating: 4.5, reviews_count: 51, stock: 95, is_veg: true },
  { id: 21, name: "Pudhina Karam", slug: "pudhina-karam", category_id: 3, category_name: "Powders", price: 80, mrp: 95, unit: "150 g", image: powderImg, rating: 4.4, reviews_count: 43, stock: 89, is_veg: true },
  { id: 22, name: "Chennagaku Karam", slug: "chennagaku-karam", category_id: 3, category_name: "Powders", price: 80, mrp: 95, unit: "150 g", image: powderImg, rating: 4.5, reviews_count: 45, stock: 87, is_veg: true },
  { id: 23, name: "Munagaku Karam", slug: "munagaku-karam", category_id: 3, category_name: "Powders", price: 80, mrp: 95, unit: "150 g", image: powderImg, rating: 4.5, reviews_count: 47, stock: 86, is_veg: true },
  { id: 24, name: "Putnala Karam", slug: "putnala-karam", category_id: 3, category_name: "Powders", price: 80, mrp: 95, unit: "150 g", image: powderImg, rating: 4.4, reviews_count: 39, stock: 83, is_veg: true },
  { id: 25, name: "Pappula Karam", slug: "pappula-karam", category_id: 3, category_name: "Powders", price: 80, mrp: 95, unit: "150 g", image: powderImg, rating: 4.3, reviews_count: 38, stock: 82, is_veg: true },
  { id: 26, name: "Kandhi Pappu Karam", slug: "kandhi-pappu-karam", category_id: 3, category_name: "Powders", price: 80, mrp: 95, unit: "150 g", image: powderImg, rating: 4.4, reviews_count: 41, stock: 80, is_veg: true },
  { id: 27, name: "Kobbari Karam", slug: "kobbari-karam", category_id: 3, category_name: "Powders", price: 80, mrp: 95, unit: "150 g", image: powderImg, rating: 4.6, reviews_count: 49, stock: 90, is_veg: true },
  { id: 28, name: "Avisaginjala Karam", slug: "avisaginjala-karam", category_id: 3, category_name: "Powders", price: 80, mrp: 95, unit: "150 g", image: powderImg, rating: 4.3, reviews_count: 36, stock: 79, is_veg: true },
  { id: 29, name: "Kakarakaya Karam", slug: "kakarakaya-karam", category_id: 3, category_name: "Powders", price: 80, mrp: 95, unit: "150 g", image: powderImg, rating: 4.2, reviews_count: 31, stock: 74, is_veg: true },
  { id: 30, name: "Pallila Karam", slug: "pallila-karam", category_id: 3, category_name: "Powders", price: 80, mrp: 95, unit: "150 g", image: powderImg, rating: 4.3, reviews_count: 35, stock: 76, is_veg: true },
  { id: 31, name: "Nuvvula Karam", slug: "nuvvula-karam", category_id: 3, category_name: "Powders", price: 80, mrp: 95, unit: "150 g", image: powderImg, rating: 4.6, reviews_count: 56, stock: 91, is_veg: true },
  { id: 32, name: "Idli Karam", slug: "idli-karam", category_id: 3, category_name: "Powders", price: 80, mrp: 95, unit: "150 g", image: powderImg, rating: 4.5, reviews_count: 48, stock: 85, is_veg: true },

  { id: 33, name: "Kaju Pakam", slug: "kaju-pakam", category_id: 4, category_name: "Sweets", price: 1000, mrp: 1100, unit: "1 kg", image: sweetsImg, rating: 4.8, reviews_count: 124, stock: 42, best_seller: true, is_veg: true, description: "Rich cashew fudge slow-cooked in pure ghee, a Kalyani signature sweet." },
  { id: 34, name: "Kaju Barfi", slug: "kaju-barfi", category_id: 4, category_name: "Sweets", price: 1120, mrp: 1200, unit: "1 kg", image: kajuBarfiImg, rating: 4.8, reviews_count: 109, stock: 38, is_veg: true },
  { id: 35, name: "Dry Fruit Halwa", slug: "dry-fruit-halwa", category_id: 4, category_name: "Sweets", price: 640, mrp: 700, unit: "1 kg", image: sweetsImg, rating: 4.7, reviews_count: 90, stock: 52, is_veg: true },
  { id: 36, name: "Seeds Barfi", slug: "seeds-barfi", category_id: 4, category_name: "Sweets", price: 800, mrp: 860, unit: "1 kg", image: sweetsImg, rating: 4.5, reviews_count: 78, stock: 46, is_veg: true },
  { id: 37, name: "Milk Mysore Pak", slug: "milk-mysore-pak", category_id: 4, category_name: "Sweets", price: 640, mrp: 700, unit: "1 kg", image: milkMysorePakImg, rating: 4.6, reviews_count: 85, stock: 50, is_veg: true },
  { id: 38, name: "Ghee Soanpapadi", slug: "ghee-soanpapadi", category_id: 4, category_name: "Sweets", price: 640, mrp: 700, unit: "1 kg", image: sweetsImg, rating: 4.5, reviews_count: 72, stock: 43, is_veg: true },
  { id: 39, name: "Anjeer Ajmeri Kalakand", slug: "anjeer-ajmeri-kalakand", category_id: 4, category_name: "Sweets", price: 640, mrp: 700, unit: "1 kg", image: sweetsImg, rating: 4.7, reviews_count: 81, stock: 44, is_veg: true },
  { id: 40, name: "Ajmeri Kalakand", slug: "ajmeri-kalakand", category_id: 4, category_name: "Sweets", price: 640, mrp: 700, unit: "1 kg", image: sweetsImg, rating: 4.6, reviews_count: 79, stock: 40, is_veg: true },
  { id: 41, name: "Malai Kalakand", slug: "malai-kalakand", category_id: 4, category_name: "Sweets", price: 600, mrp: 660, unit: "1 kg", image: sweetsImg, rating: 4.8, reviews_count: 96, stock: 45, is_veg: true },
  { id: 42, name: "Roast Cova", slug: "roast-cova", category_id: 4, category_name: "Sweets", price: 600, mrp: 660, unit: "1 kg", image: sweetsImg, rating: 4.5, reviews_count: 69, stock: 37, is_veg: true },
  { id: 43, name: "Ghee Kajalu", slug: "ghee-kajalu", category_id: 4, category_name: "Sweets", price: 640, mrp: 700, unit: "1 kg", image: sweetsImg, rating: 4.6, reviews_count: 73, stock: 42, is_veg: true },
  { id: 44, name: "Ghee Chandrakala", slug: "ghee-chandrakala", category_id: 4, category_name: "Sweets", price: 640, mrp: 700, unit: "1 kg", image: sweetsImg, rating: 4.7, reviews_count: 88, stock: 39, is_veg: true },
  { id: 45, name: "Ghee Mysore Pak", slug: "ghee-mysore-pak", category_id: 4, category_name: "Sweets", price: 640, mrp: 700, unit: "1 kg", image: mysorePakImg, rating: 4.7, reviews_count: 98, stock: 55, best_seller: true, is_veg: true, description: "Classic melt-in-mouth Mysore Pak made with generous pure ghee." },
  { id: 46, name: "Mysore Pak", slug: "mysore-pak", category_id: 4, category_name: "Sweets", price: 360, mrp: 420, unit: "1 kg", image: mysorePakImg, rating: 4.5, reviews_count: 82, stock: 60, is_veg: true },
  { id: 47, name: "Kala Jamun", slug: "kala-jamun", category_id: 4, category_name: "Sweets", price: 440, mrp: 500, unit: "1 kg", image: sweetsImg, rating: 4.6, reviews_count: 76, stock: 58, is_veg: true },
  { id: 48, name: "Badhusha", slug: "badhusha", category_id: 4, category_name: "Sweets", price: 360, mrp: 420, unit: "1 kg", image: sweetsImg, rating: 4.5, reviews_count: 62, stock: 61, is_veg: true },
  { id: 49, name: "Jangri", slug: "jangri", category_id: 4, category_name: "Sweets", price: 320, mrp: 360, unit: "1 kg", image: sweetsImg, rating: 4.4, reviews_count: 58, stock: 63, is_veg: true },
  { id: 50, name: "Mango Jelli", slug: "mango-jelli", category_id: 4, category_name: "Sweets", price: 520, mrp: 580, unit: "1 kg", image: sweetsImg, rating: 4.5, reviews_count: 67, stock: 40, is_veg: true },

  { id: 51, name: "Dry Fruits Laddu (Sugar)", slug: "dry-fruits-laddu-sugar", category_id: 5, category_name: "Laddu's", price: 1120, mrp: 1200, unit: "1 kg", image: ladduImg, rating: 4.9, reviews_count: 76, stock: 30, best_seller: true, is_veg: true },
  { id: 52, name: "Protein Laddu", slug: "protein-laddu", category_id: 5, category_name: "Laddu's", price: 1000, mrp: 1080, unit: "1 kg", image: ladduImg, rating: 4.7, reviews_count: 65, stock: 33, is_veg: true },
  { id: 53, name: "Dry Fruits Laddu (Bellam)", slug: "dry-fruits-laddu-bellam", category_id: 5, category_name: "Laddu's", price: 1000, mrp: 1100, unit: "1 kg", image: ladduImg, rating: 4.8, reviews_count: 72, stock: 29, is_veg: true },
  { id: 54, name: "Gondhu Laddu", slug: "gondhu-laddu", category_id: 5, category_name: "Laddu's", price: 640, mrp: 700, unit: "1 kg", image: ladduGeneralImg, rating: 4.6, reviews_count: 63, stock: 38, is_veg: true },
  { id: 55, name: "Besan Laddu", slug: "besan-laddu", category_id: 5, category_name: "Laddu's", price: 640, mrp: 700, unit: "1 kg", image: ladduGeneralImg, rating: 4.5, reviews_count: 59, stock: 41, is_veg: true },
  { id: 56, name: "Motichur Laddu", slug: "motichur-laddu", category_id: 5, category_name: "Laddu's", price: 640, mrp: 700, unit: "1 kg", image: motichurLadduImg, rating: 4.7, reviews_count: 71, stock: 46, is_veg: true },
  { id: 57, name: "Lavu Boondi Laddu", slug: "lavu-bondhi-laddu", category_id: 5, category_name: "Laddu's", price: 400, mrp: 460, unit: "1 kg", image: lavuBoondiLadduImg, rating: 4.4, reviews_count: 54, stock: 48, is_veg: true },
  { id: 58, name: "Sanna Boondi Laddu", slug: "sanna-bondhi-laddu", category_id: 5, category_name: "Laddu's", price: 360, mrp: 420, unit: "1 kg", image: ladduGeneralImg, rating: 4.4, reviews_count: 52, stock: 50, is_veg: true },
  { id: 59, name: "Sugar Sunnunda", slug: "sugar-sunnunda", category_id: 5, category_name: "Laddu's", price: 480, mrp: 520, unit: "1 kg", image: ladduGeneralImg, rating: 4.5, reviews_count: 60, stock: 35, is_veg: true },
  { id: 60, name: "Bellam Sunnunda", slug: "bellam-sunnunda", category_id: 5, category_name: "Laddu's", price: 560, mrp: 620, unit: "1 kg", image: ladduGeneralImg, rating: 4.6, reviews_count: 61, stock: 36, is_veg: true },
  { id: 61, name: "Sajja Laddu", slug: "sajja-laddu", category_id: 5, category_name: "Laddu's", price: 560, mrp: 620, unit: "1 kg", image: ladduGeneralImg, rating: 4.4, reviews_count: 49, stock: 40, is_veg: true },
  { id: 62, name: "Ragi Laddu", slug: "ragi-laddu", category_id: 5, category_name: "Laddu's", price: 560, mrp: 620, unit: "1 kg", image: ladduGeneralImg, rating: 4.3, reviews_count: 44, stock: 33, is_veg: true },
  { id: 63, name: "Avisaginjala Laddu", slug: "avisaginjala-laddu", category_id: 5, category_name: "Laddu's", price: 560, mrp: 620, unit: "1 kg", image: ladduGeneralImg, rating: 4.3, reviews_count: 42, stock: 30, is_veg: true },
  { id: 64, name: "Millet Laddu", slug: "millet-laddu", category_id: 5, category_name: "Laddu's", price: 560, mrp: 620, unit: "1 kg", image: ladduGeneralImg, rating: 4.4, reviews_count: 46, stock: 34, is_veg: true },
  { id: 65, name: "Pallila Laddu", slug: "pallila-laddu", category_id: 5, category_name: "Laddu's", price: 400, mrp: 460, unit: "1 kg", image: ladduGeneralImg, rating: 4.3, reviews_count: 39, stock: 42, is_veg: true },
  { id: 66, name: "Nuvvula Laddu", slug: "nuvvula-laddu", category_id: 5, category_name: "Laddu's", price: 400, mrp: 460, unit: "1 kg", image: nuvvulaLadduImg, rating: 4.4, reviews_count: 40, stock: 43, is_veg: true },
  { id: 67, name: "Nuvvula Pallila Laddu", slug: "nuvvula-pallila-laddu", category_id: 5, category_name: "Laddu's", price: 400, mrp: 460, unit: "1 kg", image: palliNuvvulaLadduImg, rating: 4.3, reviews_count: 38, stock: 35, is_veg: true },
  { id: 68, name: "Seeds Laddu", slug: "seeds-laddu", category_id: 5, category_name: "Laddu's", price: 800, mrp: 880, unit: "1 kg", image: ladduGeneralImg, rating: 4.5, reviews_count: 56, stock: 30, is_veg: true },

  { id: 69, name: "Sakinalu", slug: "sakinalu", category_id: 6, category_name: "Snacks", price: 400, mrp: 430, unit: "1 kg", image: snacksImg, rating: 4.5, reviews_count: 64, stock: 65, best_seller: true, is_veg: true },
  { id: 70, name: "Karam Sakinalu", slug: "karam-sakinalu", category_id: 6, category_name: "Snacks", price: 400, mrp: 430, unit: "1 kg", image: snacksImg, rating: 4.4, reviews_count: 50, stock: 60, is_veg: true },
  { id: 71, name: "Karam Billalu", slug: "karam-billalu", category_id: 6, category_name: "Snacks", price: 400, mrp: 430, unit: "1 kg", image: snacksImg, rating: 4.4, reviews_count: 46, stock: 54, is_veg: true },
  { id: 72, name: "Pachi Mirchi Billalu", slug: "pachi-mirchi-billalu", category_id: 6, category_name: "Snacks", price: 400, mrp: 430, unit: "1 kg", image: snacksImg, rating: 4.5, reviews_count: 48, stock: 56, is_veg: true },
  { id: 73, name: "Shanaga Pindi Madugulu", slug: "shanaga-pindi-madugulu", category_id: 6, category_name: "Snacks", price: 400, mrp: 430, unit: "1 kg", image: snacksImg, rating: 4.5, reviews_count: 52, stock: 57, is_veg: true },
  { id: 74, name: "Minnapappu Pusa", slug: "minnapappu-pusa", category_id: 6, category_name: "Snacks", price: 400, mrp: 430, unit: "1 kg", image: snacksImg, rating: 4.4, reviews_count: 41, stock: 50, is_veg: true },
  { id: 75, name: "Minnapappu Madugulu", slug: "minnapappu-madugulu", category_id: 6, category_name: "Snacks", price: 400, mrp: 430, unit: "1 kg", image: snacksImg, rating: 4.3, reviews_count: 37, stock: 48, is_veg: true },
  { id: 76, name: "Janthikalu", slug: "janthikalu", category_id: 6, category_name: "Snacks", price: 400, mrp: 430, unit: "1 kg", image: snacksImg, rating: 4.2, reviews_count: 36, stock: 52, is_veg: true },
  { id: 77, name: "Pedda Chegodi", slug: "pedda-chegodi", category_id: 6, category_name: "Snacks", price: 400, mrp: 430, unit: "1 kg", image: snacksImg, rating: 4.4, reviews_count: 43, stock: 50, is_veg: true },
  { id: 78, name: "Chinna Chegodi", slug: "chinna-chegodi", category_id: 6, category_name: "Snacks", price: 400, mrp: 430, unit: "1 kg", image: snacksImg, rating: 4.3, reviews_count: 40, stock: 49, is_veg: true },
  { id: 79, name: "Ragi Pusa", slug: "ragi-pusa", category_id: 6, category_name: "Snacks", price: 400, mrp: 430, unit: "1 kg", image: snacksImg, rating: 4.4, reviews_count: 44, stock: 46, is_veg: true },
  { id: 80, name: "Millet Murukulu", slug: "millet-murukulu", category_id: 6, category_name: "Snacks", price: 400, mrp: 430, unit: "1 kg", image: snacksImg, rating: 4.3, reviews_count: 45, stock: 51, is_veg: true },
  { id: 81, name: "Bellam Gavvalu", slug: "bellam-gavvalu", category_id: 6, category_name: "Snacks", price: 400, mrp: 430, unit: "1 kg", image: snacksImg, rating: 4.5, reviews_count: 53, stock: 55, is_veg: true },
  { id: 82, name: "Arishalu", slug: "arishalu", category_id: 6, category_name: "Snacks", price: 400, mrp: 430, unit: "1 kg", image: snacksImg, rating: 4.6, reviews_count: 57, stock: 58, is_veg: true },
  { id: 83, name: "Nuvvula Arishalu", slug: "nuvvula-arishalu", category_id: 6, category_name: "Snacks", price: 400, mrp: 430, unit: "1 kg", image: snacksImg, rating: 4.5, reviews_count: 54, stock: 52, is_veg: true },
  { id: 84, name: "Kobbari Garjalu", slug: "kobbari-garjalu", category_id: 6, category_name: "Snacks", price: 400, mrp: 430, unit: "1 kg", image: snacksImg, rating: 4.4, reviews_count: 41, stock: 46, is_veg: true },
  { id: 85, name: "Nuvvula Garjalu", slug: "nuvvula-garjalu", category_id: 6, category_name: "Snacks", price: 400, mrp: 430, unit: "1 kg", image: snacksImg, rating: 4.4, reviews_count: 45, stock: 50, is_veg: true },
  { id: 86, name: "Chalividi", slug: "chalividi", category_id: 6, category_name: "Snacks", price: 400, mrp: 430, unit: "1 kg", image: snacksImg, rating: 4.3, reviews_count: 35, stock: 44, is_veg: true },
  { id: 87, name: "Rosecakes", slug: "rosecakes", category_id: 6, category_name: "Snacks", price: 500, mrp: 550, unit: "1 kg", image: snacksImg, rating: 4.5, reviews_count: 52, stock: 42, is_veg: true },

  { id: 88, name: "Bondhi", slug: "bondhi", category_id: 7, category_name: "Namkeens", price: 360, mrp: 420, unit: "1 kg", image: namkeenImg, rating: 4.3, reviews_count: 49, stock: 62, is_veg: true },
  { id: 89, name: "Mixture", slug: "mixture", category_id: 7, category_name: "Namkeens", price: 360, mrp: 420, unit: "1 kg", image: namkeenImg, rating: 4.3, reviews_count: 52, stock: 68, is_veg: true },
  { id: 90, name: "Salt Pusa", slug: "salt-pusa", category_id: 7, category_name: "Namkeens", price: 400, mrp: 450, unit: "1 kg", image: namkeenImg, rating: 4.2, reviews_count: 36, stock: 58, is_veg: true },
  { id: 91, name: "Karam Pusa", slug: "karam-pusa", category_id: 7, category_name: "Namkeens", price: 400, mrp: 450, unit: "1 kg", image: namkeenImg, rating: 4.4, reviews_count: 41, stock: 60, is_veg: true },
  { id: 92, name: "Karam Chuduva", slug: "karam-chuduva", category_id: 7, category_name: "Namkeens", price: 360, mrp: 420, unit: "1 kg", image: namkeenImg, rating: 4.3, reviews_count: 39, stock: 64, is_veg: true },
  { id: 93, name: "Mixed Chuduva", slug: "mixed-chuduva", category_id: 7, category_name: "Namkeens", price: 360, mrp: 420, unit: "1 kg", image: namkeenImg, rating: 4.3, reviews_count: 41, stock: 61, is_veg: true },
  { id: 94, name: "Makka Atukulu", slug: "makka-atukulu", category_id: 7, category_name: "Namkeens", price: 360, mrp: 420, unit: "1 kg", image: namkeenImg, rating: 4.2, reviews_count: 32, stock: 58, is_veg: true },
  { id: 95, name: "Palli Fry", slug: "palli-fry", category_id: 7, category_name: "Namkeens", price: 360, mrp: 420, unit: "1 kg", image: namkeenImg, rating: 4.4, reviews_count: 40, stock: 57, is_veg: true },
  { id: 96, name: "Palli Pakodi", slug: "palli-pakodi", category_id: 7, category_name: "Namkeens", price: 360, mrp: 420, unit: "1 kg", image: namkeenImg, rating: 4.4, reviews_count: 43, stock: 59, is_veg: true },
  { id: 97, name: "Kaju Dalmoti", slug: "kaju-dalmoti", category_id: 7, category_name: "Namkeens", price: 480, mrp: 540, unit: "1 kg", image: namkeenImg, rating: 4.7, reviews_count: 55, stock: 35, is_veg: true },
  { id: 98, name: "Dalmoti", slug: "dalmoti", category_id: 7, category_name: "Namkeens", price: 360, mrp: 420, unit: "1 kg", image: namkeenImg, rating: 4.2, reviews_count: 31, stock: 46, is_veg: true },
  { id: 99, name: "Kaju Fry Masala", slug: "kaju-fry-masala", category_id: 7, category_name: "Namkeens", price: 1400, mrp: 1500, unit: "1 kg", image: namkeenImg, rating: 4.8, reviews_count: 68, stock: 22, is_veg: true },
  { id: 100, name: "Kaju Fry Pepper", slug: "kaju-fry-pepper", category_id: 7, category_name: "Namkeens", price: 1400, mrp: 1500, unit: "1 kg", image: namkeenImg, rating: 4.8, reviews_count: 65, stock: 21, is_veg: true },
  { id: 101, name: "Aloo Chips", slug: "aloo-chips", category_id: 7, category_name: "Namkeens", price: 400, mrp: 470, unit: "1 kg", image: namkeenImg, rating: 4.2, reviews_count: 34, stock: 58, is_veg: true },
  { id: 102, name: "Namak Para", slug: "namak-para", category_id: 7, category_name: "Namkeens", price: 360, mrp: 420, unit: "1 kg", image: namkeenImg, rating: 4.2, reviews_count: 31, stock: 60, is_veg: true },
  { id: 103, name: "Maramara Mixture", slug: "maramara-mixture", category_id: 7, category_name: "Namkeens", price: 300, mrp: 350, unit: "1 kg", image: namkeenImg, rating: 4.1, reviews_count: 29, stock: 72, is_veg: true },
  { id: 104, name: "Banana Chips", slug: "banana-chips", category_id: 7, category_name: "Namkeens", price: 480, mrp: 540, unit: "1 kg", image: namkeenImg, rating: 4.3, reviews_count: 38, stock: 51, is_veg: true },
  { id: 105, name: "Vegetable Chips", slug: "vegetable-chips", category_id: 7, category_name: "Namkeens", price: 1500, mrp: 1600, unit: "1 kg", image: namkeenImg, rating: 4.4, reviews_count: 44, stock: 15, is_veg: true },
  { id: 106, name: "Fruits Chips", slug: "fruits-chips", category_id: 7, category_name: "Namkeens", price: 1500, mrp: 1600, unit: "1 kg", image: namkeenImg, rating: 4.5, reviews_count: 46, stock: 14, is_veg: true },
  { id: 107, name: "Cool Makhana Box", slug: "cool-makhana-box", category_id: 7, category_name: "Namkeens", price: 190, mrp: 220, unit: "1 box", image: namkeenImg, rating: 4.6, reviews_count: 40, stock: 34, is_veg: true },

  { id: 108, name: "Palakura Papad", slug: "palakura-papad", category_id: 8, category_name: "Papads", price: 600, mrp: 650, unit: "1 pack", image: papadGeneralImg, rating: 4.4, reviews_count: 32, stock: 28, is_veg: true },
  { id: 109, name: "Biyyam Papad", slug: "biyyam-papad", category_id: 8, category_name: "Papads", price: 300, mrp: 350, unit: "1 pack", image: papadGeneralImg, rating: 4.2, reviews_count: 24, stock: 30, is_veg: true },
  { id: 110, name: "Sabudhana Papad", slug: "sabudhana-papad", category_id: 8, category_name: "Papads", price: 400, mrp: 450, unit: "1 pack", image: papadGeneralImg, rating: 4.3, reviews_count: 29, stock: 32, is_veg: true },
  { id: 111, name: "Challa Mirchi", slug: "challa-mirchi", category_id: 8, category_name: "Papads", price: 700, mrp: 760, unit: "1 pack", image: papadGeneralImg, rating: 4.5, reviews_count: 35, stock: 27, is_veg: true },

  { id: 112, name: "Dry Fruits Laddu", slug: "dry-fruits-laddu", category_id: 5, category_name: "Laddu's", price: 1120, mrp: 1250, unit: "1 kg", image: ladduImg, rating: 4.9, reviews_count: 76, stock: 30, best_seller: true, is_veg: true, description: "Loaded with almonds, cashews and dates, bound in pure ghee." },
  { id: 113, name: "Sakinalu", slug: "sakinalu", category_id: 6, category_name: "Snacks", price: 400, mrp: 430, unit: "1 kg", image: snacksImg, rating: 4.5, reviews_count: 64, stock: 65, best_seller: true, is_veg: true, description: "Crispy rice-flour spirals, a Telangana festival favourite." },
  { id: 114, name: "Boondi", slug: "boondi", category_id: 6, category_name: "Snacks", price: 360, mrp: 400, unit: "1 kg", image: snacksImg, rating: 4.4, reviews_count: 51, stock: 70, best_seller: true, is_veg: true, description: "Crunchy spiced gram-flour boondi, roasted golden." },
  { id: 115, name: "Palli Powder", slug: "palli-powder", category_id: 3, category_name: "Powders", price: 220, mrp: 250, unit: "500 g", image: powderImg, rating: 4.3, reviews_count: 22, stock: 90, is_veg: true },
  { id: 116, name: "Karam Podi", slug: "karam-podi", category_id: 3, category_name: "Powders", price: 250, mrp: 280, unit: "500 g", image: powderImg, rating: 4.6, reviews_count: 40, stock: 60, is_veg: true },
];

export const banners: Banner[] = [
  { id: 1, title: "Pure Ghee, Perfect Love", subtitle: "Authentic Telangana Sweets, Pickles & Snacks made with love", image: "hero-sweets.jpg", active: true },
];

export const orders: Order[] = [
  { id: 1, order_number: "ORD12548", customer_name: "Ramesh Kumar", store_name: "Kalyani Ghee Sweets", items: [{ product_name: "Kaju Pakam", quantity: 1, price: 1000 }], total: 1250, status: "Delivered", payment_method: "UPI", created_at: "2024-05-20T14:30:00" },
  { id: 2, order_number: "ORD12547", customer_name: "Sunita Reddy", store_name: "Sweet House", items: [{ product_name: "Mango Pickle", quantity: 2, price: 400 }], total: 890, status: "Processing", payment_method: "Card", created_at: "2024-05-20T13:15:00" },
  { id: 3, order_number: "ORD12546", customer_name: "Vijay Rao", store_name: "Nandini Sweets", items: [{ product_name: "Dry Fruits Laddu", quantity: 2, price: 1120 }], total: 2450, status: "Shipped", payment_method: "COD", created_at: "2024-05-20T12:45:00" },
  { id: 4, order_number: "ORD12545", customer_name: "Lakshmi Devi", store_name: "Sri Venkateswara Sweets", items: [{ product_name: "Sakinalu", quantity: 3, price: 400 }], total: 1150, status: "Pending", payment_method: "UPI", created_at: "2024-05-20T11:20:00" },
  { id: 5, order_number: "ORD12544", customer_name: "Anil Chowdary", store_name: "Royal Sweets", items: [{ product_name: "Boondi", quantity: 2, price: 360 }], total: 760, status: "Cancelled", payment_method: "COD", created_at: "2024-05-20T10:05:00" },
];

export const customers: Customer[] = [
  { id: 1, name: "Ramesh Kumar", email: "ramesh@example.com", phone: "8341930200", orders_count: 12, total_spent: 24500, joined_at: "2023-02-11" },
  { id: 2, name: "Sunita Reddy", email: "sunita@example.com", phone: "9848112233", orders_count: 8, total_spent: 15600, joined_at: "2023-05-19" },
  { id: 3, name: "Vijay Rao", email: "vijay@example.com", phone: "9963344556", orders_count: 20, total_spent: 41200, joined_at: "2022-11-02" },
];

export const reviews: Review[] = [
  { id: 1, product_name: "Kaju Pakam", customer_name: "Ramesh Kumar", rating: 5, comment: "Tastes just like homemade! Excellent quality.", created_at: "2024-05-18", status: "Published" },
  { id: 2, product_name: "Mango Pickle", customer_name: "Sunita Reddy", rating: 4, comment: "Authentic spicy flavor, will order again.", created_at: "2024-05-17", status: "Published" },
];

export const coupons: Coupon[] = [
  { id: 1, code: "WELCOME100", discount_type: "flat", discount_value: 100, min_order: 999, expiry: "2026-12-31", active: true },
  { id: 2, code: "FEST20", discount_type: "percent", discount_value: 20, min_order: 1500, expiry: "2026-10-31", active: true },
];

export const topStores = [
  { name: "Kalyani Ghee Sweets", orders: 624, revenue: 485320, customers: 2350 },
  { name: "Sweet House", orders: 412, revenue: 312450, customers: 1245 },
  { name: "Nandini Sweets", orders: 398, revenue: 285760, customers: 1105 },
  { name: "Sri Venkateswara Sweets", orders: 365, revenue: 215640, customers: 980 },
  { name: "Royal Sweets", orders: 312, revenue: 178900, customers: 875 },
];

export const revenueByDay = [
  { day: "14 May", revenue: 160000 },
  { day: "15 May", revenue: 95000 },
  { day: "16 May", revenue: 130000 },
  { day: "17 May", revenue: 90000 },
  { day: "18 May", revenue: 150000 },
  { day: "19 May", revenue: 145000 },
  { day: "20 May", revenue: 210000 },
];

export const ordersByDay = [
  { day: "14 May", orders: 420 },
  { day: "15 May", orders: 610 },
  { day: "16 May", orders: 350 },
  { day: "17 May", orders: 700 },
  { day: "18 May", orders: 380 },
  { day: "19 May", orders: 650 },
  { day: "20 May", orders: 300 },
];

export const orderStatusSplit = [
  { name: "Delivered", value: 1020, color: "#22C55E" },
  { name: "Processing", value: 620, color: "#F59E0B" },
  { name: "Shipped", value: 510, color: "#3B82F6" },
  { name: "Pending", value: 260, color: "#EF4444" },
  { name: "Cancelled", value: 138, color: "#9CA3AF" },
];

export const dashboardStats = {
  totalStores: 12,
  totalOrders: 2548,
  totalRevenue: 1845320,
  totalPayments: 1712450,
  totalCustomers: 8956,
  pendingPayments: 132870,
  refunds: 25680,
};
