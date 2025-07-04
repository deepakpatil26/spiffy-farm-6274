/*
  # Update cart_items table for products_data integration

  1. Changes
    - Update cart_items.product_id to reference products_data.id
    - Add foreign key constraint to products_data table
    - Update existing data if needed

  2. Security
    - Maintain existing RLS policies
*/

-- First, let's check if we need to update the product_id column type
-- The products_data table uses integer IDs, but cart_items might be using text

-- Update the product_id column to be integer to match products_data.id
ALTER TABLE cart_items 
ALTER COLUMN product_id TYPE integer USING product_id::integer;

-- Add foreign key constraint to products_data table
-- First drop the old foreign key if it exists
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

-- Add new foreign key constraint to products_data
ALTER TABLE cart_items 
ADD CONSTRAINT cart_items_product_id_fkey 
FOREIGN KEY (product_id) REFERENCES products_data(id) ON DELETE CASCADE;

-- Update the unique constraint to use the new structure
DROP INDEX IF EXISTS cart_items_user_product_unique;
CREATE UNIQUE INDEX cart_items_user_product_unique 
ON cart_items (user_id, product_id);