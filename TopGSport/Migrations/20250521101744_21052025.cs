using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TopGSport.Migrations
{
    /// <inheritdoc />
    public partial class _21052025 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 1,
                column: "Img",
                value: "t-shirt-boss-boy.jpg");

            migrationBuilder.UpdateData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 2,
                column: "Img",
                value: "szorty_treningowe.jpg");

            migrationBuilder.UpdateData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 3,
                column: "Img",
                value: "bluza_z_kapturem.jpg");

            migrationBuilder.UpdateData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 4,
                column: "Img",
                value: "t-shirt_classic.webp");

            migrationBuilder.UpdateData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 5,
                column: "Img",
                value: "szorty_pro.jpg");

            migrationBuilder.UpdateData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 6,
                column: "Img",
                value: "kreatyna.jpg");

            migrationBuilder.UpdateData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 7,
                column: "Img",
                value: "proteina.webp");

            migrationBuilder.UpdateData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 8,
                column: "Img",
                value: "bcaa.webp");

            migrationBuilder.UpdateData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 9,
                column: "Img",
                value: "kreatyn_jablczan.jpg");

            migrationBuilder.UpdateData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 10,
                column: "Img",
                value: "bialko_isolate.webp");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 1,
                column: "Img",
                value: "img123.jpg");

            migrationBuilder.UpdateData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 2,
                column: "Img",
                value: "img123.jpg");

            migrationBuilder.UpdateData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 3,
                column: "Img",
                value: "img123.jpg");

            migrationBuilder.UpdateData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 4,
                column: "Img",
                value: "img123.jpg");

            migrationBuilder.UpdateData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 5,
                column: "Img",
                value: "img123.jpg");

            migrationBuilder.UpdateData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 6,
                column: "Img",
                value: "img123.jpg");

            migrationBuilder.UpdateData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 7,
                column: "Img",
                value: "img123.jpg");

            migrationBuilder.UpdateData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 8,
                column: "Img",
                value: "img123.jpg");

            migrationBuilder.UpdateData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 9,
                column: "Img",
                value: "img123.jpg");

            migrationBuilder.UpdateData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 10,
                column: "Img",
                value: "img123.jpg");
        }
    }
}
