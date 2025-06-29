/*
  # Add type column to products table

  1. Changes
    - Add `type` column to `products` table as text type
    - Set default value to empty string to handle existing records
    - Make column nullable to allow for flexibility

  2. Notes
    - This resolves the "column products_1.type does not exist" error
    - Existing products will have null/empty type values that can be updated later
*/

-- Add the missing type column to products table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'type'
  ) THEN
    ALTER TABLE products ADD COLUMN type text;
  END IF;
END $$;