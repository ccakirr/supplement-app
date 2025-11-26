using ReportProject.Models;

namespace ReportProject.Data
{
	public static class SeedData
	{
		public static void Initialize(AppDbContext context)
		{
			// Eğer zaten veri varsa, seeding'i atla
			if (context.Products.Any())
			{
				return;
			}

			// 1. Markalar oluştur
			var brands = new Brand[]
			{
				new Brand { Name = "Optimum Nutrition" },
				new Brand { Name = "MuscleTech" },
				new Brand { Name = "BSN" },
				new Brand { Name = "Dymatize" },
				new Brand { Name = "Scitec Nutrition" }
			};

			context.Brands.AddRange(brands);
			context.SaveChanges();

			// 2. Kategoriler oluştur
			var categories = new Category[]
			{
				new Category { Name = "Protein Tozu" },
				new Category { Name = "Kreatin" },
				new Category { Name = "BCAA" },
				new Category { Name = "Pre-Workout" },
				new Category { Name = "Vitamin & Mineral" }
			};

			context.Categories.AddRange(categories);
			context.SaveChanges();

			// 3. Depolar oluştur
			var warehouses = new Warehouse[]
			{
				new Warehouse { Name = "Ana Depo", Location = "İstanbul" },
				new Warehouse { Name = "İkinci Depo", Location = "Ankara" }
			};

			context.Warehouses.AddRange(warehouses);
			context.SaveChanges();

			// 4. Müşteriler oluştur
			var customers = new Customer[]
			{
				new Customer { Name = "Ahmet Yılmaz", Phone = "0532-123-4567" },
				new Customer { Name = "Mehmet Demir", Phone = "0533-987-6543" },
				new Customer { Name = "Ali Kaya", Phone = "0534-456-7890" }
			};

			context.Customers.AddRange(customers);
			context.SaveChanges();

			// 5. Ürünler oluştur (farklı SKT durumlarıyla)
			var today = DateTime.Today;
			var products = new Product[]
			{
                // Expired ürünler (SKT geçmiş)
                new Product
				{
					Name = "Whey Gold Standard - Expired",
					Barcode = "WGS001",
					BrandId = brands[0].Id,
					CategoryId = categories[0].Id,
					Stock = 15,
					ExpirationDate = today.AddDays(-30) // 30 gün önce expire olmuş
                },
                
                // 3 ay içinde expire olacaklar
                new Product
				{
					Name = "Creatine Monohydrate",
					Barcode = "CRM002",
					BrandId = brands[1].Id,
					CategoryId = categories[1].Id,
					Stock = 8, // Kritik stok (< 10)
                    ExpirationDate = today.AddMonths(2) // 2 ay sonra expire
                },
                
                // 12 ay içinde expire olacaklar
                new Product
				{
					Name = "BCAA Energy",
					Barcode = "BCE003",
					BrandId = brands[2].Id,
					CategoryId = categories[2].Id,
					Stock = 25,
					ExpirationDate = today.AddMonths(8) // 8 ay sonra expire
                },
                
                // Normal ürünler (uzun süre expire olmayacak)
                new Product
				{
					Name = "NO-Xplode Pre-Workout",
					Barcode = "NOX004",
					BrandId = brands[2].Id,
					CategoryId = categories[3].Id,
					Stock = 50,
					ExpirationDate = today.AddMonths(18)
				},

				new Product
				{
					Name = "Multivitamin Complex",
					Barcode = "MVC005",
					BrandId = brands[3].Id,
					CategoryId = categories[4].Id,
					Stock = 5, // Kritik stok (< 10)
                    ExpirationDate = today.AddMonths(24)
				},

				new Product
				{
					Name = "Iso-100 Whey",
					Barcode = "I100006",
					BrandId = brands[3].Id,
					CategoryId = categories[0].Id,
					Stock = 30,
					ExpirationDate = today.AddMonths(15)
				}
			};

			context.Products.AddRange(products);
			context.SaveChanges();

			// 6. Price History oluştur (her ürün için güncel fiyat)
			var priceRecords = new List<PriceRecord>();

			foreach (var product in products)
			{
				priceRecords.Add(new PriceRecord
				{
					ProductId = product.Id,
					CostPrice = 45.0m, // Maliyet fiyatı
					SalePrice = 75.0m, // Satış fiyatı
					EffectiveDate = today.AddDays(-10) // 10 gün öncesinden geçerli
				});
			}

			context.PriceRecords.AddRange(priceRecords);
			context.SaveChanges();

			// 7. Örnek satışlar oluştur (stok devir hızı hesabı için)
			var sales = new List<Sale>();
			var random = new Random();

			foreach (var product in products)
			{
				// Her ürün için son 30 günde rastgele satışlar
				var salesCount = random.Next(2, 8); // 2-7 arası satış

				for (int i = 0; i < salesCount; i++)
				{
					sales.Add(new Sale
					{
						ProductId = product.Id,
						CustomerId = customers[random.Next(customers.Length)].Id,
						Quantity = random.Next(1, 5), // 1-4 adet
						UnitPrice = 75.0m, // Satış fiyatı
						SaleDate = today.AddDays(-random.Next(1, 30)) // Son 30 gün içinde
					});
				}
			}

			context.Sales.AddRange(sales);
			context.SaveChanges();

			// 8. Örnek alışlar oluştur
			var purchases = new List<Purchase>();

			foreach (var product in products)
			{
				purchases.Add(new Purchase
				{
					ProductId = product.Id,
					Quantity = product.Stock, // Mevcut stok kadar alış yapılmış
					CostPrice = 45.0m,
					PurchaseDate = today.AddDays(-random.Next(15, 45)) // 15-45 gün önce alınmış
				});
			}

			context.Purchases.AddRange(purchases);
			context.SaveChanges();

			Console.WriteLine("✅ Seed data başarıyla eklendi!");
			Console.WriteLine($"📦 {products.Length} ürün, {brands.Length} marka, {categories.Length} kategori eklendi.");
			Console.WriteLine($"💰 Toplam {priceRecords.Count} fiyat kaydı ve {sales.Count} satış işlemi oluşturuldu.");
		}
	}
}