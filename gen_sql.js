const fs = require('fs');
const https = require('https');

const sqlFile =
  'C:/Users/deepa/.gemini/antigravity/brain/06cedfe6-e13e-4711-86da-b61f84b3d2c5/import_db_json.sql';

function fetchProducts() {
  return new Promise((resolve, reject) => {
    https
      .get('https://api.escuelajs.co/api/v1/products', (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on('error', reject);
  });
}

function escape(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/'/g, "''");
}

async function generate() {
  try {
    console.log('Fetching products from Platzi API...');
    const products = await fetchProducts();
    console.log(`Fetched ${products.length} products.`);

    let sql = '-- IMPORT DATA FROM PLATZI API\n';
    sql +=
      'ALTER TABLE public.products_data ADD COLUMN IF NOT EXISTS gender text;\n';
    sql += 'TRUNCATE TABLE public.products_data CASCADE;\n\n';

    products.forEach((p) => {
      const images = p.images || [];
      const cat = p.category;
      const slug = `${p.slug}-${p.id}`;
      const imagesSql = "ARRAY['" + images.map(escape).join("','") + "']";
      const catImage = cat.image || '';

      // Assign gender based on category or randomly for demo
      let gender = 'unisex';
      if (cat.name === 'Clothes') {
        // Randomly assign for variety in Lifestyle store
        gender = Math.random() > 0.5 ? 'men' : 'women';
      }

      sql += `INSERT INTO public.products_data (title, slug, price, description, category__id, category__name, category__slug, category__image, images, gender) 
VALUES ('${escape(p.title)}', '${escape(slug)}', ${p.price}, '${escape(p.description)}', ${cat.id}, '${escape(cat.name)}', '${escape(cat.slug)}', '${escape(catImage)}', ${imagesSql}, '${gender}');\n`;
    });

    fs.writeFileSync(sqlFile, sql);
    console.log('SQL script generated at:', sqlFile);
  } catch (err) {
    console.error('Error generating SQL:', err);
  }
}

generate();
