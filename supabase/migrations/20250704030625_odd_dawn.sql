/*
  # Update cart_items table for products_data compatibility

  1. Changes
    - Update product_id column type from text to integer
    - Update foreign key constraint to reference products_data table
    - Ensure compatibility with new product structure

  2. Security
    - Maintain existing RLS policies
    - Preserve user data integrity
*/

-- First, let's check the current structure and clean up existing data if needed
-- Remove any cart items that don't have valid integer product IDs
DELETE FROM cart_items 
WHERE product_id !~ '^[0-9]+$' OR product_id IS NULL;

-- Drop existing foreign key constraint if it exists
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'cart_items_product_id_fkey' 
        AND table_name = 'cart_items'
    ) THEN
        ALTER TABLE cart_items DROP CONSTRAINT cart_items_product_id_fkey;
    END IF;
END $$;

-- Drop existing unique index
DROP INDEX IF EXISTS cart_items_user_product_unique;

-- Update the product_id column type from text to integer
-- This will only work if all existing values are valid integers
ALTER TABLE cart_items 
ALTER COLUMN product_id TYPE integer USING product_id::integer;

-- Add new foreign key constraint to products_data table
ALTER TABLE cart_items 
ADD CONSTRAINT cart_items_product_id_fkey 
FOREIGN KEY (product_id) REFERENCES products_data(id) ON DELETE CASCADE;

-- Recreate the unique constraint with the new integer type
CREATE UNIQUE INDEX cart_items_user_product_unique 
ON cart_items (user_id, product_id);

-- Add index for better performance
CREATE INDEX IF NOT EXISTS cart_items_product_id_idx 
ON cart_items (product_id);

-- Ensure the updated_at trigger function exists and is applied
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Ensure the trigger exists
DROP TRIGGER IF EXISTS handle_cart_items_updated_at ON cart_items;
CREATE TRIGGER handle_cart_items_updated_at
    BEFORE UPDATE ON cart_items
    FOR EACH ROW
    EXECUTE PROCEDURE handle_updated_at();