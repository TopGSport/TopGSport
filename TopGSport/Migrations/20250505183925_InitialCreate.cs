using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TopGSport.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Membership",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Price = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Bonus = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Hours = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Features = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Membership", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Shop",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Type = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Img = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shop", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Phone = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    BirthDate = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    Password = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MembershipId = table.Column<int>(type: "int", nullable: true),
                    MembershipStartDate = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    Options = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MembershipPurchaseDate = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Membership_MembershipId",
                        column: x => x.MembershipId,
                        principalTable: "Membership",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Membership",
                columns: new[] { "Id", "Bonus", "Description", "Features", "Hours", "Name", "Price" },
                values: new object[,]
                {
                    { 1, "Pierwszy tydzień gratis!", "Dostęp od 22:00 do 6:00. Idealny dla nocnych marków!", "[\"Dost\\u0119p do si\\u0142owni w godzinach nocnych\",\"Szafka na okres treningu\",\"Dost\\u0119p do prysznic\\u00F3w\"]", "22:00 - 6:00", "Nocny Karnet", "59 zł / miesiąc" },
                    { 2, "", "Pełny dostęp przez 7 dni. Świetny na start lub dla gości.", "[\"7 dni pe\\u0142nego dost\\u0119pu\",\"Wszystkie strefy\",\"Szafka na okres treningu\"]", "6:00 - 22:00", "Tygodniowy Karnet", "39 zł / tydzień" },
                    { 3, "Darmowa konsultacja z trenerem!", "Nielimitowany dostęp do siłowni przez całą dobę!", "[\"Nielimitowany dost\\u0119p\",\"Wszystkie strefy\",\"Konsultacja z trenerem\"]", "24/7", "24/7 Karnet", "99 zł / miesiąc" },
                    { 4, "", "Pełny dostęp do wszystkich stref przez 30 dni.", "[\"30 dni pe\\u0142nego dost\\u0119pu\",\"Wszystkie strefy\",\"Szafka na okres treningu\"]", "6:00 - 22:00", "Miesięczny Karnet", "89 zł / miesiąc" },
                    { 5, "", "Dla uczniów i studentów do 26 lat. WymUsdana legitymacja.", "[\"Dla uczni\\u00F3w i student\\u00F3w\",\"Wszystkie strefy\",\"Szafka na okres treningu\"]", "6:00 - 22:00", "Studencki Karnet", "69 zł / miesiąc" },
                    { 6, "Darmowy zestaw startowy!", "Wszystko bez limitu + sauna, konsultacje, priorytetowa obsługa.", "[\"Nielimitowany dost\\u0119p\",\"Sauna\",\"Konsultacje\",\"Priorytetowa obs\\u0142uga\"]", "24/7", "VIP Karnet", "159 zł / miesiąc" },
                    { 7, "", "Dla 2 dorosłych + dzieci do 16 lat. Trenujcie razem!", "[\"Dla rodzin\",\"Wszystkie strefy\",\"Strefa dla dzieci\"]", "6:00 - 22:00", "Rodzinny Karnet", "199 zł / miesiąc" },
                    { 8, "", "Jednorazowy wstęp do siłowni. Bez zobowiązań.", "[\"Jednorazowy dost\\u0119p\",\"Wszystkie strefy\"]", "6:00 - 22:00", "Wejście Jednorazowe", "15 zł / wejście" }
                });

            migrationBuilder.InsertData(
                table: "Shop",
                columns: new[] { "Id", "Img", "Name", "Price", "Type" },
                values: new object[,]
                {
                    { 1, "img123.jpg", "T-shirt BossBoy", 25.00m, "tshirt" },
                    { 2, "img123.jpg", "Szorty treningowe", 22.00m, "shorts" },
                    { 3, "img123.jpg", "Bluza z kapturem", 40.00m, "hoodie" },
                    { 4, "img123.jpg", "T-shirt Classic", 20.00m, "tshirt" },
                    { 5, "img123.jpg", "Szorty Pro", 28.00m, "shorts" },
                    { 6, "img123.jpg", "Kreatyna Monohydrat", 18.00m, "creatine" },
                    { 7, "img123.jpg", "Białko WPC 80", 32.00m, "protein" },
                    { 8, "img123.jpg", "BCAA 2:1:1", 15.00m, "bcaa" },
                    { 9, "img123.jpg", "Kreatyna Jabłczan", 20.00m, "creatine" },
                    { 10, "img123.jpg", "Białko Isolate", 38.00m, "protein" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_MembershipId",
                table: "Users",
                column: "MembershipId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Shop");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Membership");
        }
    }
}
