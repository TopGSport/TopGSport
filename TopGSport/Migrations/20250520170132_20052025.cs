using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TopGSport.Migrations
{
    /// <inheritdoc />
    public partial class _20052025 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Shop",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 1,
                column: "Category",
                value: "Clothes");

            migrationBuilder.UpdateData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Category", "Name" },
                values: new object[] { "Clothes", "Szorty SStreningowe" });

            migrationBuilder.UpdateData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 3,
                column: "Category",
                value: "Clothes");

            migrationBuilder.UpdateData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 4,
                column: "Category",
                value: "Clothes");

            migrationBuilder.UpdateData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 5,
                column: "Category",
                value: "Clothes");

            migrationBuilder.UpdateData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 6,
                column: "Category",
                value: "Supplements");

            migrationBuilder.UpdateData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 7,
                column: "Category",
                value: "Supplements");

            migrationBuilder.UpdateData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 8,
                column: "Category",
                value: "Supplements");

            migrationBuilder.UpdateData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 9,
                column: "Category",
                value: "Supplements");

            migrationBuilder.UpdateData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 10,
                column: "Category",
                value: "Supplements");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Shop");

            migrationBuilder.UpdateData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 2,
                column: "Name",
                value: "Szorty treningowe");
        }
    }
}
