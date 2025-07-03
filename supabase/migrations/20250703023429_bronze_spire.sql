/*
  # Create products_data table for new API integration

  1. New Tables
    - `products_data`
      - `id` (integer, primary key)
      - `title` (text, product title)
      - `slug` (text, URL-friendly version)
      - `price` (integer, price in cents)
      - `description` (text, product description)
      - `category_id` (integer, category ID)
      - `category_name` (text, category name)
      - `category_slug` (text, category slug)
      - `category_image` (text, category image URL)
      - `images` (text[], array of image URLs)
      - `creation_at` (timestamptz, creation timestamp)
      - `updated_at` (timestamptz, update timestamp)

  2. Security
    - Enable RLS on `products_data` table
    - Add policy for public read access
    - Add policy for authenticated users to insert/update (for admin)
*/

CREATE TABLE IF NOT EXISTS products_data (
  id integer PRIMARY KEY,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  price integer NOT NULL,
  description text,
  category_id integer,
  category_name text,
  category_slug text,
  category_image text,
  images text[],
  creation_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products_data ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users"
  ON products_data
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Enable insert for authenticated users"
  ON products_data
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users"
  ON products_data
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Enable delete for authenticated users"
  ON products_data
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS products_data_category_id_idx ON products_data(category_id);
CREATE INDEX IF NOT EXISTS products_data_category_name_idx ON products_data(category_name);
CREATE INDEX IF NOT EXISTS products_data_price_idx ON products_data(price);
CREATE INDEX IF NOT EXISTS products_data_slug_idx ON products_data(slug);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_products_data_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at on changes
CREATE TRIGGER update_products_data_updated_at
  BEFORE UPDATE ON products_data
  FOR EACH ROW EXECUTE PROCEDURE update_products_data_updated_at();