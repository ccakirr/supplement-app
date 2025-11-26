using ReportProject.Data;
using ReportProject.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Get database path from environment or use default
var dbPath = Environment.GetEnvironmentVariable("DB_PATH") ?? "Data Source=/app/data/report.db";
if (!dbPath.StartsWith("Data Source="))
{
    dbPath = $"Data Source={dbPath}";
}

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(dbPath));

// Services'leri DI container'a kaydet
builder.Services.AddScoped<StockService>();
builder.Services.AddScoped<SalesService>();
builder.Services.AddScoped<PurchaseService>();

// Get allowed origins from environment or use defaults
var allowedOrigins = Environment.GetEnvironmentVariable("ALLOWED_ORIGINS")?.Split(',') 
    ?? new[] { "http://localhost:3000", "http://localhost:5173", "http://localhost:4173" };

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.WithOrigins(allowedOrigins)
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
});

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Veritabanını oluştur ve seed data'yı initialize et
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    
    try
    {
        // Veritabanını oluştur
        context.Database.EnsureCreated();
        
        // Seed data ekle
        SeedData.Initialize(context);
        
        Console.WriteLine("Database initialized successfully");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error initializing database: {ex.Message}");
        throw;
    }
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

// Serve static files from wwwroot
app.UseStaticFiles();

// Enable CORS
app.UseCors("AllowAll");

app.UseRouting();

app.UseAuthorization();

// API routes
app.MapControllers();

// Fallback to index.html for SPA routing
app.MapFallbackToFile("index.html");

var port = Environment.GetEnvironmentVariable("PORT") ?? "5237";
Console.WriteLine($"Starting server on port {port}");

app.Run();
