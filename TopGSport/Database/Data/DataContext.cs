namespace TopGSport.Database.Data
{
    using Microsoft.EntityFrameworkCore;
    using System.Text.Json;
    using TopGSport.Database.Models;

    public class DataContext : DbContext
    {
        public DbSet<Users> Users { get; set; }
        public DbSet<Membership> Membership { get; set; }
        public DbSet<Shop> Shop { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Users>()
                .HasOne(u => u.Membership)
                .WithMany()
                .HasForeignKey(u => u.MembershipId);

            modelBuilder.Entity<Membership>().HasData(
                new Membership
                {
                    Id = 1,
                    Name = "Nocny Karnet",
                    Price = "59 zł / miesiąc",
                    Description = "Dostęp od 22:00 do 6:00. Idealny dla nocnych marków!",
                    Bonus = "Pierwszy tydzień gratis!",
                    Hours = "22:00 - 6:00",
                    Features = JsonSerializer.Serialize(new List<string>
                    {
                        "Dostęp do siłowni w godzinach nocnych",
                        "Szafka na okres treningu",
                        "Dostęp do pryszniców"
                    })
                },
                new Membership
                {
                    Id = 2,
                    Name = "Tygodniowy Karnet",
                    Price = "39 zł / tydzień",
                    Description = "Pełny dostęp przez 7 dni. Świetny na start lub dla gości.",
                    Bonus = "",
                    Hours = "6:00 - 22:00",
                    Features = JsonSerializer.Serialize(new List<string>
                    {
                        "7 dni pełnego dostępu",
                        "Wszystkie strefy",
                        "Szafka na okres treningu"
                    })
                },
                new Membership
                {
                    Id = 3,
                    Name = "24/7 Karnet",
                    Price = "99 zł / miesiąc",
                    Description = "Nielimitowany dostęp do siłowni przez całą dobę!",
                    Bonus = "Darmowa konsultacja z trenerem!",
                    Hours = "24/7",
                    Features = JsonSerializer.Serialize(new List<string>
                    {
                        "Nielimitowany dostęp",
                        "Wszystkie strefy",
                        "Konsultacja z trenerem"
                    })
                },
                new Membership
                {
                    Id = 4,
                    Name = "Miesięczny Karnet",
                    Price = "89 zł / miesiąc",
                    Description = "Pełny dostęp do wszystkich stref przez 30 dni.",
                    Bonus = "",
                    Hours = "6:00 - 22:00",
                    Features = JsonSerializer.Serialize(new List<string>
                    {
                        "30 dni pełnego dostępu",
                        "Wszystkie strefy",
                        "Szafka na okres treningu"
                    })
                },
                new Membership
                {
                    Id = 5,
                    Name = "Studencki Karnet",
                    Price = "69 zł / miesiąc",
                    Description = "Dla uczniów i studentów do 26 lat. WymUsdana legitymacja.",
                    Bonus = "",
                    Hours = "6:00 - 22:00",
                    Features = JsonSerializer.Serialize(new List<string>
                    {
                        "Dla uczniów i studentów",
                        "Wszystkie strefy",
                        "Szafka na okres treningu"
                    })
                },
                new Membership
                {
                    Id = 6,
                    Name = "VIP Karnet",
                    Price = "159 zł / miesiąc",
                    Description = "Wszystko bez limitu + sauna, konsultacje, priorytetowa obsługa.",
                    Bonus = "Darmowy zestaw startowy!",
                    Hours = "24/7",
                    Features = JsonSerializer.Serialize(new List<string>
                    {
                        "Nielimitowany dostęp",
                        "Sauna",
                        "Konsultacje",
                        "Priorytetowa obsługa"
                    })
                },
                new Membership
                {
                    Id = 7,
                    Name = "Rodzinny Karnet",
                    Price = "199 zł / miesiąc",
                    Description = "Dla 2 dorosłych + dzieci do 16 lat. Trenujcie razem!",
                    Bonus = "",
                    Hours = "6:00 - 22:00",
                    Features = JsonSerializer.Serialize(new List<string>
                    {
                        "Dla rodzin",
                        "Wszystkie strefy",
                        "Strefa dla dzieci"
                    })
                },
                new Membership
                {
                    Id = 8,
                    Name = "Wejście Jednorazowe",
                    Price = "15 zł / wejście",
                    Description = "Jednorazowy wstęp do siłowni. Bez zobowiązań.",
                    Bonus = "",
                    Hours = "6:00 - 22:00",
                    Features = JsonSerializer.Serialize(new List<string>
                    {
                        "Jednorazowy dostęp",
                        "Wszystkie strefy"
                    })
                }
            );

            modelBuilder.Entity<Shop>().HasData(
                new Shop { Id = 1, Name = "T-shirt BossBoy", Category = "Clothes", Type = "tshirt", Price = 25.00M, Img = "t-shirt-boss-boy.jpg" },
                new Shop { Id = 2, Name = "Szorty treningowe", Category = "Clothes", Type = "shorts", Price = 22.00M, Img = "szorty_treningowe.jpg" },
                new Shop { Id = 3, Name = "Bluza z kapturem", Category = "Clothes", Type = "hoodie", Price = 40.00M, Img = "bluza_z_kapturem.jpg" },
                new Shop { Id = 4, Name = "T-shirt Classic", Category = "Clothes", Type = "tshirt", Price = 20.00M, Img = "t-shirt_classic.webp" },
                new Shop { Id = 5, Name = "Szorty Pro", Category = "Clothes", Type = "shorts", Price = 28.00M, Img = "szorty_pro.jpg" },
                new Shop { Id = 6, Name = "Kreatyna Monohydrat", Category = "Supplements", Type = "creatine", Price = 18.00M, Img = "kreatyna.jpg" },
                new Shop { Id = 7, Name = "Białko WPC 80", Category = "Supplements", Type = "protein", Price = 32.00M, Img = "proteina.webp" },
                new Shop { Id = 8, Name = "BCAA 2:1:1", Category = "Supplements", Type = "bcaa", Price = 15.00M, Img = "bcaa.webp" },
                new Shop { Id = 9, Name = "Kreatyna Jabłczan", Category = "Supplements", Type = "creatine", Price = 20.00M, Img = "kreatyn_jablczan.jpg" },
                new Shop { Id = 10, Name = "Białko Isolate", Category = "Supplements", Type = "protein", Price = 38.00M, Img = "bialko_isolate.webp" }
            );
        }



    }
}
