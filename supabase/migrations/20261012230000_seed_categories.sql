-- Seed categories with estimated weights and values
INSERT INTO public.categories (name, slug, avg_weight_kg, avg_value_usd) VALUES
  ('Electronics', 'electronics', 0.50, 150.00),
  ('Textbooks', 'textbooks', 1.20, 80.00),
  ('Furniture', 'furniture', 15.00, 200.00),
  ('Clothing', 'clothing', 0.30, 25.00),
  ('Kitchen & Dining', 'kitchen-dining', 2.00, 40.00),
  ('Sports & Outdoors', 'sports-outdoors', 1.50, 60.00),
  ('School Supplies', 'school-supplies', 0.20, 15.00),
  ('Home Decor', 'home-decor', 1.00, 35.00),
  ('Musical Instruments', 'musical-instruments', 3.00, 300.00),
  ('Other', 'other', 1.00, 20.00)
ON CONFLICT (slug) DO NOTHING;
