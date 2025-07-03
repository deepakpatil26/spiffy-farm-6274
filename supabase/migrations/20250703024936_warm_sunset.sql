/*
  # Add individual image columns to products_data table

  1. Changes
    - Add `images__001` column for first image
    - Add `images__002` column for second image  
    - Add `images__003` column for third image
    - Add `images__004` column for fourth image
    - Add `images__005` column for fifth image
    - All columns are text type and nullable

  2. Notes
    - These columns will work alongside the existing `images` array column
    - Allows for easier querying of individual images
    - Maintains backward compatibility with existing `images` array
*/

-- Add individual image columns to products_data table
DO $$
BEGIN
  -- Add images__001 column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products_data' AND column_name = 'images__001'
  ) THEN
    ALTER TABLE products_data ADD COLUMN images__001 text;
  END IF;

  -- Add images__002 column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products_data' AND column_name = 'images__002'
  ) THEN
    ALTER TABLE products_data ADD COLUMN images__002 text;
  END IF;

  -- Add images__003 column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products_data' AND column_name = 'images__003'
  ) THEN
    ALTER TABLE products_data ADD COLUMN images__003 text;
  END IF;

  -- Add images__004 column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products_data' AND column_name = 'images__004'
  ) THEN
    ALTER TABLE products_data ADD COLUMN images__004 text;
  END IF;

  -- Add images__005 column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products_data' AND column_name = 'images__005'
  ) THEN
    ALTER TABLE products_data ADD COLUMN images__005 text;
  END IF;
END $$;

-- Create a function to automatically populate individual image columns from the images array
CREATE OR REPLACE FUNCTION populate_individual_images()
RETURNS trigger AS $$
BEGIN
  -- Extract individual images from the array and populate separate columns
  NEW.images__001 := CASE WHEN array_length(NEW.images, 1) >= 1 THEN NEW.images[1] ELSE NULL END;
  NEW.images__002 := CASE WHEN array_length(NEW.images, 1) >= 2 THEN NEW.images[2] ELSE NULL END;
  NEW.images__003 := CASE WHEN array_length(NEW.images, 1) >= 3 THEN NEW.images[3] ELSE NULL END;
  NEW.images__004 := CASE WHEN array_length(NEW.images, 1) >= 4 THEN NEW.images[4] ELSE NULL END;
  NEW.images__005 := CASE WHEN array_length(NEW.images, 1) >= 5 THEN NEW.images[5] ELSE NULL END;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically populate individual image columns
DROP TRIGGER IF EXISTS populate_individual_images_trigger ON products_data;
CREATE TRIGGER populate_individual_images_trigger
  BEFORE INSERT OR UPDATE ON products_data
  FOR EACH ROW EXECUTE PROCEDURE populate_individual_images();

-- Update existing records to populate the individual image columns
UPDATE products_data SET 
  images__001 = CASE WHEN array_length(images, 1) >= 1 THEN images[1] ELSE NULL END,
  images__002 = CASE WHEN array_length(images, 1) >= 2 THEN images[2] ELSE NULL END,
  images__003 = CASE WHEN array_length(images, 1) >= 3 THEN images[3] ELSE NULL END,
  images__004 = CASE WHEN array_length(images, 1) >= 4 THEN images[4] ELSE NULL END,
  images__005 = CASE WHEN array_length(images, 1) >= 5 THEN images[5] ELSE NULL END
WHERE images IS NOT NULL;