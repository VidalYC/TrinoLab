db = db.getSiblingDB('shop');
db.createCollection('orders');
db.orders.insertMany([
  { _id: 1, country: "Colombia", items: [{sku:"CFA",qty:2},{sku:"CAF",qty:1}], total: 16.5 },
  { _id: 2, country: "México",   items: [{sku:"CAC",qty:3}],                 total: 12.75 },
  { _id: 3, country: "Perú",     items: [{sku:"QIN",qty:1},{sku:"CAF",qty:2}], total: 18.0 },
  { _id: 4, country: "Chile",    items: [{sku:"CAF",qty:5}],                  total: 25.0 },
  { _id: 5, country: "Colombia", items: [{sku:"CFA",qty:1},{sku:"QIN",qty:2}], total: 22.0 },
  { _id: 6, country: "México",   items: [{sku:"CAF",qty:2},{sku:"CAC",qty:1}], total: 15.5 },
  { _id: 7, country: "Argentina",items: [{sku:"QIN",qty:4}],                  total: 40.0 },
  { _id: 8, country: "Perú",     items: [{sku:"CAF",qty:1},{sku:"CFA",qty:3}], total: 28.0 },
  { _id: 9, country: "Colombia", items: [{sku:"CAC",qty:2}],                  total: 8.5 },
  { _id: 10,country: "México",   items: [{sku:"QIN",qty:2},{sku:"CFA",qty:1}], total: 21.0 },
  { _id: 11,country: "Chile",    items: [{sku:"CAF",qty:2},{sku:"CAC",qty:2}], total: 20.5 },
  { _id: 12,country: "Argentina",items: [{sku:"CFA",qty:2},{sku:"CAF",qty:2}], total: 30.0 },
  { _id: 13,country: "Perú",     items: [{sku:"CAC",qty:5}],                  total: 20.0 },
  { _id: 14,country: "Colombia", items: [{sku:"CAF",qty:3},{sku:"QIN",qty:1}], total: 19.0 },
  { _id: 15,country: "México",   items: [{sku:"CFA",qty:4}],                  total: 32.0 }
]);
